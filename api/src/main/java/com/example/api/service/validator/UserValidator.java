package com.example.api.service.validator;

import com.example.api.dto.request.user.RegisterUserForm;
import com.example.api.error.exception.*;
import com.example.api.model.group.Group;
import com.example.api.model.user.AccountType;
import com.example.api.model.user.User;
import com.example.api.repo.group.GroupRepo;
import com.example.api.repo.user.UserRepo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import javax.transaction.Transactional;
import java.util.List;

@Component
@Slf4j
@RequiredArgsConstructor
@Transactional
public class UserValidator {
    private final GroupRepo groupRepo;
    private final UserRepo userRepo;

    public void validateUserIsNotNull(User user, String email) throws UsernameNotFoundException {
        if(user == null) {
            log.error("User {} not found in database", email);
            throw new UsernameNotFoundException("User " + email + " not found in database");
        }
    }
    
    public void validateUserAccountType(User user, AccountType type) throws WrongUserTypeException {
        if(user.getAccountType() != type) {
            throw new WrongUserTypeException("Wrong user type!", AccountType.STUDENT);
        }
    }

    public void validateStudentAccount(User student, String email) throws UsernameNotFoundException, WrongUserTypeException {
        validateUserIsNotNull(student, email);
        validateUserAccountType(student, AccountType.STUDENT);
    }

    public void validateStudentAccount(User student, Long id) throws UsernameNotFoundException, WrongUserTypeException {
        if(student == null) {
            log.error("User with id {} not found in database", id);
            throw new UsernameNotFoundException("User with id" + id + " not found in database");
        }
        validateUserAccountType(student, AccountType.STUDENT);
    }

    public void validateProfessorAccount(User professor, String email) throws UsernameNotFoundException, WrongUserTypeException {
        validateUserIsNotNull(professor, email);
        validateUserAccountType(professor, AccountType.PROFESSOR);
    }

    public void validateAndSetUserGroup(Group newGroup, Group previousGroup, Long newGroupId, User user) throws EntityNotFoundException, StudentAlreadyAssignedToGroupException {
        if (newGroup == null) {
            log.error("Group with id {} not found in database", newGroupId);
            throw new EntityNotFoundException("Group with id " + newGroupId + " not found in database");
        }
        if (previousGroup != null && previousGroup.getId() == newGroupId) {
            log.error("Student try to set same group");
            throw new StudentAlreadyAssignedToGroupException("Student is already assigned to group", user, user.getGroup());
        }
        if (previousGroup == null) {
            log.warn("Student previous group doesn't exist");
        }
        else {
            previousGroup.getUsers().remove(user);
            groupRepo.save(previousGroup);
        }
        user.setGroup(newGroup);
        newGroup.getUsers().add(user);
        userRepo.save(user);
        groupRepo.save(newGroup);
    }

    public void validateUserRegistration(User dbUser, User newUser, RegisterUserForm form, String email) throws EntityAlreadyInDatabaseException, WrongBodyParametersNumberException, EntityNotFoundException {
        if(dbUser != null) {
            log.error("User {} already exist in database", email);
            throw new EntityAlreadyInDatabaseException(ExceptionMessage.EMAIL_TAKEN);
        }
        if(form.getAccountType() == AccountType.STUDENT){
            if(form.getHeroType() == null || form.getInvitationCode() == null) {
                log.error("Request body for registering student requires 6 body parameters");
                throw new WrongBodyParametersNumberException("Request body for registering student requires 6 body parameters",
                        List.of("firstName", "lastName", "email", "password", "heroType", "invitationCode"), 1);
            }
            String code = form.getInvitationCode();
            Group group = groupRepo.findGroupByInvitationCode(code);
            if(group == null) {
                log.error("Group with invitational code {} not found in database", code);
                throw new EntityNotFoundException(ExceptionMessage.GROUP_CODE_NOT_EXIST);
            }
            newUser.setGroup(group);
            newUser.setHeroType(form.getHeroType());
            Integer indexNumber = form.getIndexNumber();

            if(indexNumber == null || userRepo.existsUserByIndexNumber(indexNumber)) {
                log.error("User with index number {} already in database", indexNumber);
                throw new EntityAlreadyInDatabaseException(ExceptionMessage.INDEX_TAKEN);
            }
            newUser.setIndexNumber(indexNumber);
        } else {
            if(form.getHeroType() != null || form.getInvitationCode() != null || form.getIndexNumber() != null){
                log.error("Request body for registering professor requires 4 body parameters");
                throw new WrongBodyParametersNumberException("Request body for registering professor requires 4 body parameters",
                        List.of("firstName", "lastName", "email", "password"), 1);
            }
        }
    }
}
