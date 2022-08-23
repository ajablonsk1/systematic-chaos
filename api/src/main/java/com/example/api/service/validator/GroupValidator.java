package com.example.api.service.validator;

import com.example.api.dto.request.group.SaveGroupForm;
import com.example.api.error.exception.EntityAlreadyInDatabaseException;
import com.example.api.error.exception.EntityNotFoundException;
import com.example.api.error.exception.ExceptionMessage;
import com.example.api.model.group.Group;
import org.springframework.stereotype.Component;

import java.util.List;
import com.example.api.error.exception.MissingAttributeException;
import com.example.api.model.user.User;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

@Component
@Slf4j
public class GroupValidator {

    public void validateGroupIsNotNull(Group group, Long id) throws EntityNotFoundException {
        if (group == null) {
            log.error("Group with id {} not found in database", id);
            throw new EntityNotFoundException("Group with id" + id + " not found in database");
        }
    }

    public void validateGroupIsNotNull(Group group, String code) throws EntityNotFoundException {
        if (group == null) {
            log.error("Group with code {} not found in database", code);
            throw new EntityNotFoundException("Group with code" + code + " not found in database");
        }
    }

    public void validateGroup(List<Group> groups, SaveGroupForm form) throws EntityAlreadyInDatabaseException {
        boolean groupNameExists = groups.stream()
                .anyMatch(group -> group.getName().equals(form.getName()));
        if(groupNameExists) {
            log.error("Group with given name {} already exists", form.getName());
            throw new EntityAlreadyInDatabaseException(ExceptionMessage.GROUP_NAME_TAKEN);
        }
        boolean groupCodeExists = groups.stream()
                .anyMatch(group -> group.getInvitationCode().equals(form.getInvitationCode()));
        if(groupCodeExists) {
            log.error("Group with given code {} already exists", form.getInvitationCode());
            throw new EntityAlreadyInDatabaseException(ExceptionMessage.GROUP_CODE_TAKEN);
        }
    }
    
    public void validateUserGroupIsNotNull(User user) throws MissingAttributeException {
        if (user.getGroup() == null) {
            log.error("User with email {} does not have a group", user.getEmail());
            throw new MissingAttributeException("Usere with email " + user.getEmail() + " does not have a group");
        }
    }
}
