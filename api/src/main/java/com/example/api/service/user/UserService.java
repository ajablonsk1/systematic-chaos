package com.example.api.service.user;

import com.example.api.dto.request.user.EditPasswordForm;
import com.example.api.dto.request.user.RegisterUserForm;
import com.example.api.dto.request.user.SetStudentGroupForm;
import com.example.api.dto.request.user.SetStudentIndexForm;
import com.example.api.dto.response.user.BasicStudent;
import com.example.api.error.exception.*;
import com.example.api.model.group.Group;
import com.example.api.model.user.AccountType;
import com.example.api.model.user.User;
import com.example.api.repo.activity.result.AdditionalPointsRepo;
import com.example.api.repo.activity.task.FileTaskRepo;
import com.example.api.repo.activity.task.GraphTaskRepo;
import com.example.api.repo.activity.task.InfoRepo;
import com.example.api.repo.activity.task.SurveyRepo;
import com.example.api.repo.group.GroupRepo;
import com.example.api.repo.user.UserRepo;
import com.example.api.security.AuthenticationService;
import com.example.api.service.user.util.ProfessorRegisterToken;
import com.example.api.service.validator.UserValidator;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class UserService implements UserDetailsService {
    private final UserRepo userRepo;
    private final GroupRepo groupRepo;
    private final GraphTaskRepo graphTaskRepo;
    private final FileTaskRepo fileTaskRepo;
    private final SurveyRepo surveyRepo;
    private final InfoRepo infoRepo;
    private final AdditionalPointsRepo additionalPointsRepo;
    private final AuthenticationService authService;
    private final PasswordEncoder passwordEncoder;
    private final UserValidator userValidator;
    private final ProfessorRegisterToken professorRegisterToken;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepo.findUserByEmail(email);
        userValidator.validateUserIsNotNull(user, email);
        log.info("User {} found in database", email);
        Collection<SimpleGrantedAuthority> authorities = List.of(new SimpleGrantedAuthority(user.getAccountType().getName()));
        return new org.springframework.security.core.userdetails.User(user.getEmail(), user.getPassword(), authorities);
    }

    public User saveUser(User user) {
        log.info("Saving user {} to the database", user.getEmail());
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepo.save(user);
    }

    public Long registerUser(RegisterUserForm form)
            throws RequestValidationException {
        String email = form.getEmail();
        log.info("Registering user {}", email);
        User dbUser = userRepo.findUserByEmail(email);
        User user = new User(form.getEmail(), form.getFirstName(), form.getLastName(), form.getAccountType());
        userValidator.validateUserRegistration(dbUser, user, form, email);
        user.setPassword(passwordEncoder.encode(form.getPassword()));
        user.setPoints(0D);
        userRepo.save(user);
        return user.getId();
    }

    public void editPassword(EditPasswordForm form){
        String email = authService.getAuthentication().getName();
        User user = getUser(email);
        user.setPassword(passwordEncoder.encode(form.getNewPassword()));
    }

    public User getUser(String email) throws UsernameNotFoundException {
        log.info("Fetching user {}", email);
        User user = userRepo.findUserByEmail(email);
        userValidator.validateUserIsNotNull(user, email);
        return user;
    }

    public User getCurrentUser() throws UsernameNotFoundException {
        String email = authService.getAuthentication().getName();
        return getUser(email);
    }

    public List<User> getUsers() {
        log.info("Fetching all users");
        return userRepo.findAll();
    }

    public Group getUserGroup() {
        String email = authService.getAuthentication().getName();
        log.info("Fetching group for user {}", email);
        User user = userRepo.findUserByEmail(email);
        userValidator.validateUserIsNotNull(user, email);
        return user.getGroup();
    }

    public List<BasicStudent> getAllStudentsWithGroup() {
        log.info("Fetching all students with group");
        List<User> students = userRepo.findAllByAccountTypeEquals(AccountType.STUDENT);
        return students.stream()
                .map(BasicStudent::new)
                .collect(Collectors.toList());
    }

    public Group setStudentGroup(SetStudentGroupForm setStudentGroupForm)
            throws EntityNotFoundException, WrongUserTypeException, StudentAlreadyAssignedToGroupException {
        Long studentId = setStudentGroupForm.getStudentId();
        Long newGroupId = setStudentGroupForm.getNewGroupId();
        log.info("Setting group for student with id {}", studentId);
        User user = userRepo.findUserById(studentId);
        userValidator.validateStudentAccount(user, studentId);
        Group newGroup = groupRepo.findGroupById(newGroupId);
        Group previousGroup = user.getGroup();
        userValidator.validateAndSetUserGroup(newGroup, previousGroup, newGroupId, user);
        return newGroup;
    }

    public Integer setIndexNumber(SetStudentIndexForm setStudentIndexForm) throws WrongUserTypeException, EntityAlreadyInDatabaseException {
        String email = authService.getAuthentication().getName();
        log.info("Setting index number {} for user with email {}", setStudentIndexForm.getNewIndexNumber(), email);
        User student = userRepo.findUserByEmail(email);
        userValidator.validateStudentAccount(student, email);

        if (student.getIndexNumber().equals(setStudentIndexForm.getNewIndexNumber())) {
            log.info("Student with email {} set again index number to {}", email, setStudentIndexForm.getNewIndexNumber());
            return student.getIndexNumber();
        }

        if (userRepo.existsUserByIndexNumber(setStudentIndexForm.getNewIndexNumber())) {
            log.error("Cannot set index number student with email {} to {} because it is taken", email, setStudentIndexForm.getNewIndexNumber());
            throw new EntityAlreadyInDatabaseException("Cannot set index number for user with email " + email + " to " + setStudentIndexForm.getNewIndexNumber() + " because is taken");
        }
        student.setIndexNumber(setStudentIndexForm.getNewIndexNumber());
        userRepo.save(student);
        return student.getIndexNumber();
    }

    public String getProfessorRegisterToken() throws WrongUserTypeException {
        User user = getCurrentUser();
        userValidator.validateProfessorAccount(user, authService.getAuthentication().getName());

        log.info("Professor {} fetch ProfessorRegisterToken", user.getEmail());
        return professorRegisterToken.getToken();
    }

    public void deleteProfessorAccount(String email) throws WrongUserTypeException {
        User user = getCurrentUser();
        User professor = userRepo.findUserByEmail(email);
        userValidator.validateProfessorAccount(professor, email);
        userValidator.validateProfessorAccount(user, user.getEmail());

        changeUserForActivitiesAndAdditionalPoints(user, professor);
        userRepo.delete(user);
    }

    public void deleteStudentAccount() throws WrongUserTypeException {
        User user = getCurrentUser();
        userValidator.validateStudentAccount(user, user.getEmail());
        userRepo.delete(user);
    }

    private void changeUserForActivitiesAndAdditionalPoints(User from, User to){
        graphTaskRepo.findAll()
                .stream()
                .filter(graphTask -> graphTask.getProfessor() == from)
                .forEach(graphTask -> graphTask.setProfessor(to));
        fileTaskRepo.findAll()
                .stream()
                .filter(fileTask -> fileTask.getProfessor() == from)
                .forEach(fileTask -> fileTask.setProfessor(to));
        surveyRepo.findAll()
                .stream()
                .filter(survey -> survey.getProfessor() == from)
                .forEach(survey -> survey.setProfessor(to));
        infoRepo.findAll()
                .stream()
                .filter(info -> info.getProfessor() == from)
                .forEach(info -> info.setProfessor(to));
        additionalPointsRepo.findAll()
                .stream()
                .filter(additionalPoint -> additionalPoint.getProfessorEmail().equals(from.getEmail()))
                .forEach(additionalPoint -> additionalPoint.setProfessorEmail(to.getEmail()));
    }
}
