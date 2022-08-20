package com.example.api.service.validator;

import com.example.api.error.exception.MissingAttributeException;
import com.example.api.model.user.User;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

@Component
@Slf4j
public class GroupValidator {

    public void validateUserGroupIsNotNull(User user) throws MissingAttributeException {
        if (user.getGroup() == null) {
            log.error("User with email {} does not have a group", user.getEmail());
            throw new MissingAttributeException("Usere with email " + user.getEmail() + " does not have a group");
        }
    }
}