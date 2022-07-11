package com.example.api.service.validator;

import com.example.api.error.exception.WrongUserTypeException;
import com.example.api.model.user.AccountType;
import com.example.api.model.user.User;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

@Component
@Slf4j
public class UserValidator {

    public void validateStudentAccount(User student, String email) throws UsernameNotFoundException, WrongUserTypeException {
        if(student == null) {
            log.error("User {} not found in database", email);
            throw new UsernameNotFoundException("User" + email + " not found in database");
        }
        if(student.getAccountType() != AccountType.STUDENT) {
            throw new WrongUserTypeException("Wrong user type!", AccountType.STUDENT);
        }
    }
}
