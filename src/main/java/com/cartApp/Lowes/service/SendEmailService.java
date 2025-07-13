package com.cartApp.Lowes.service;

import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.InternetAddressEditor;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class SendEmailService {

    @Autowired
    private JavaMailSender javaMailSender;

    @Value("$(spring.mail.username)")
    private String fromEmailId;

    public  void sendEmail(String recipient , String subject , String body){
        try {
            MimeMessage message = javaMailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            helper.setTo(recipient);
            helper.setSubject(subject);
            helper.setText(body, true);

            // Handle UnsupportedEncodingException
            try {
                helper.setFrom(new InternetAddress("expensesyncsuppport@gmail.com", "ExpenseSync Support"));
            } catch (java.io.UnsupportedEncodingException e) {
                // Fallback: just set the email without display name
                helper.setFrom("expensesyncsuppport@gmail.com");
            }

            javaMailSender.send(message);
        } catch (Exception e) {
            e.printStackTrace();
            // Handle or rethrow as needed
        }
    }

}
