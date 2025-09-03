package in.pratikbabar.authify.service;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender mailSender;

    @Value("${spring.mail.properties.mail.smtp.from}")
    private String fromEmail;

    public void sendWelcomeEmail(String toEmail, String name){
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(fromEmail);
        message.setTo(toEmail);
        message.setSubject("Welcome to out platform");
        message.setText("Hello "+name+",\n\nThanks for registering with us!\n\nRegards,\nAuthify Team.");

        mailSender.send(message);
    }

    public void sendResetOtpEmail(String email, String otp){
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(fromEmail);
        message.setTo(email);
        message.setSubject("Password reset OTP");
        message.setText("Your OTP for resetting your password is "+otp+". Use this OTP to proceed with resetting your password.");
        mailSender.send(message);
    }
    public void setOtpEmail(String toEmail, String otp){
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(fromEmail);
        message.setTo(toEmail);
        message.setSubject("Account verification OTP");
        message.setText("Your OTP is "+otp+". Verify your account using this otp.");
        mailSender.send(message);

    }

}
