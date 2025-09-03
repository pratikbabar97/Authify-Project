package in.pratikbabar.authify.controller;

import in.pratikbabar.authify.io.ProfileRequest;
import in.pratikbabar.authify.io.ProfileResponse;
import in.pratikbabar.authify.service.EmailService;
import in.pratikbabar.authify.service.IProfileService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.CurrentSecurityContext;
import org.springframework.web.bind.annotation.*;

@RestController
//@RequestMapping("/api/v1.0")
public class ProfileController {

    private final IProfileService iProfileService;
    private final EmailService emailService;

    public ProfileController(IProfileService iProfileService, EmailService emailService) {
        this.iProfileService = iProfileService;
        this.emailService = emailService;
    }

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public ProfileResponse register(@Valid @RequestBody ProfileRequest request){
        ProfileResponse response = iProfileService.createProfile(request);
       //todo:send welcome email
        emailService.sendWelcomeEmail(response.getEmail(), response.getName());
        return response;
    }
//    @GetMapping("/test")
//    public String test(){
//        return "Auth is working";
//    }

    //if user is not logged in means not saved in security context and if user tries to access this end point then exception will be throen

    @GetMapping("/profile")
    public ProfileResponse getProfile(@CurrentSecurityContext(expression = "authentication?.name") String email){
       return iProfileService.getProfile(email);
    }
}
