package in.pratikbabar.authify.service;

import in.pratikbabar.authify.io.ProfileRequest;
import in.pratikbabar.authify.io.ProfileResponse;

public interface IProfileService {


    ProfileResponse createProfile(ProfileRequest request);

    ProfileResponse getProfile(String email);

    void sendResetOtp(String email);
    void resetPassword(String email,String otp,String newPassword);

    void sendOtp(String email);

    void verifyOtp(String email,String otp);

}
