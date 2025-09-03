package in.pratikbabar.authify.controller;

import in.pratikbabar.authify.io.AuthRequest;
import in.pratikbabar.authify.io.AuthResponse;
import in.pratikbabar.authify.io.ResetPasswordRequest;
import in.pratikbabar.authify.service.AppUserDetailsService;
import in.pratikbabar.authify.service.IProfileService;
import in.pratikbabar.authify.util.JwtUtil;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.annotation.CurrentSecurityContext;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.time.Duration;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequiredArgsConstructor
public class AuthController {

    private final AppUserDetailsService appUserDetailsService;
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private final IProfileService iProfileService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest authRequest){
        try{
            authenticator(authRequest.getEmail(),authRequest.getPassword());
                   final UserDetails userDetails = appUserDetailsService.loadUserByUsername(authRequest.getEmail());
                     final String jwtToken= jwtUtil.generateToken(userDetails);
            ResponseCookie cookie= ResponseCookie.from("jwt",jwtToken)
                    .httpOnly(true)
                    .path("/")
                    .maxAge(Duration.ofDays(1))
                    .sameSite("Strict")
                    .build();
                   return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE,cookie.toString()).body(new AuthResponse (authRequest.getEmail(),jwtToken));
        }catch(BadCredentialsException e){
            Map<String,Object> error = new HashMap<>();
             error.put("error",true);
             error.put("message","Email or password is not correct");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
        }
        catch(DisabledException e){
            Map<String,Object> error = new HashMap<>();
            error.put("error",true);
            error.put("message","Account is disabled");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(error);
        }
        catch(Exception e){
            Map<String,Object> error = new HashMap<>();
            error.put("error",true);
            error.put("message","Authentication has failed");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(error);
        }


    }
    private void authenticator(String email,String password){
     authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(email,password));

    }
    @GetMapping("/is-authenticated")
    public ResponseEntity<Boolean> isAuthenticated(@CurrentSecurityContext(expression = "authentication?.name") String email){

     return ResponseEntity.ok(email!=null);
    }

    @PostMapping("/send-reset-otp")
     public void sendResetOtp(@RequestParam String email){
        try {
            iProfileService.sendResetOtp(email);
        }catch(Exception e){
           throw  new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,e.getMessage());
        }
     }

     @PostMapping("/reset-password")
     public void resetPassword( @Valid @RequestBody ResetPasswordRequest request){
       try{
             iProfileService.resetPassword(request.getEmail(),request.getOtp(), request.getNewPassword());
       }catch(Exception e){
           throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,e.getMessage());

       }
     }

     @PostMapping("/send-otp")
     public void sendVerifyOtp(@CurrentSecurityContext(expression = "authentication?.name") String email){
        try{
             iProfileService.sendOtp(email);
        }catch(Exception e){
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,e.getMessage());

        }
     }
    @PostMapping("/verify-otp")
    public void verifyOtp(@RequestBody Map<String ,Object> request, @CurrentSecurityContext(expression = "authentication?.name") String email){
                if(request.get("otp").toString()==null){
                    throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"Missing Details");
                }

                 try{
                    iProfileService.verifyOtp(email,request.get("otp").toString());
                 } catch (Exception e) {
                     throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,e.getMessage());
                 }
    }
    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletResponse response){
         ResponseCookie cookie = ResponseCookie.from("jwt","")
                 .httpOnly(true)
                 .secure(false)
                 .path("/")
                 .maxAge(0)
                 .sameSite("Strict")
                 .build();
         return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE,cookie.toString()).body("Logged out successfully");
    }

}
