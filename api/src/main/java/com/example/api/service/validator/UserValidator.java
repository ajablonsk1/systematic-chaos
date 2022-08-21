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
    public void validateUser(User user, String email) throws UsernameNotFoundException, WrongUserTypeException {
        if(user == null) {
            log.error("User {} not found in database", email);
            throw new UsernameNotFoundException("User " + email + " not found in database");
        }
    }

    public void validateStudentAccount(User student, String email) throws UsernameNotFoundException, WrongUserTypeException {
        validateUser(student, email);
        if(student.getAccountType() != AccountType.STUDENT) {
            throw new WrongUserTypeException("Wrong user type!", AccountType.STUDENT);
        }
    }

    public void validateStudentAccount(User student, Long id) throws UsernameNotFoundException, WrongUserTypeException {
        if(student == null) {
            log.error("User with id {} not found in database", id);
            throw new UsernameNotFoundException("User" + id + " not found in database");
        }
        if(student.getAccountType() != AccountType.STUDENT) {
            throw new WrongUserTypeException("Wrong user type!", AccountType.STUDENT);
        }
    }

    public void validateProfessorAccount(User professor, String email) throws UsernameNotFoundException, WrongUserTypeException {
        validateUser(professor, email);
        if(professor.getAccountType() != AccountType.PROFESSOR) {
            throw new WrongUserTypeException("Wrong user type!", AccountType.PROFESSOR);
        }
    }
}
