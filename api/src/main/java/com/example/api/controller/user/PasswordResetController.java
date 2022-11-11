package com.example.api.controller.user;

import com.example.api.dto.request.user.ResetPasswordForm;
import com.example.api.error.exception.RequestValidationException;
import com.example.api.service.user.PasswordResetService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/password")
@RequiredArgsConstructor
public class PasswordResetController {
    private final PasswordResetService passwordResetService;

    @GetMapping("/reset-email")
    public ResponseEntity<?> sendPasswordResetEmail(@RequestParam String email) {
        passwordResetService.sendPasswordResetEmail(email);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping("/reset")
    public ResponseEntity<?> resetPassword(@RequestBody ResetPasswordForm form) throws RequestValidationException {
        passwordResetService.resetPassword(form);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
