package com.example.api.unit.service.user;

import com.example.api.dto.request.user.RegisterUserForm;
import com.example.api.dto.request.user.SetStudentGroupForm;
import com.example.api.dto.response.user.BasicStudent;
import com.example.api.error.exception.*;
import com.example.api.model.group.Group;
import com.example.api.model.user.AccountType;
import com.example.api.model.user.HeroType;
import com.example.api.model.user.User;
import com.example.api.repo.activity.result.AdditionalPointsRepo;
import com.example.api.repo.activity.task.FileTaskRepo;
import com.example.api.repo.activity.task.GraphTaskRepo;
import com.example.api.repo.activity.task.InfoRepo;
import com.example.api.repo.activity.task.SurveyRepo;
import com.example.api.repo.group.GroupRepo;
import com.example.api.repo.user.UserRepo;
import com.example.api.security.AuthenticationService;
import com.example.api.service.user.UserService;
import com.example.api.service.user.util.ProfessorRegisterToken;
import com.example.api.service.validator.PasswordValidator;
import com.example.api.service.validator.UserValidator;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.mockito.Captor;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.ArrayList;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;

public class UserServiceTests {
    private UserService userService;

    @Mock private UserRepo userRepo;
    @Mock private GroupRepo groupRepo;
    @Mock private PasswordEncoder passwordEncoder;
    @Mock private AuthenticationService authService;
    @Mock private Authentication authentication;
    @Mock private UserValidator userValidator;
    @Mock private GraphTaskRepo graphTaskRepo;
    @Mock private FileTaskRepo fileTaskRepo;
    @Mock private SurveyRepo surveyRepo;
    @Mock private InfoRepo infoRepo;
    @Mock private AdditionalPointsRepo additionalPointsRepo;
    @Mock private ProfessorRegisterToken professorRegisterToken;
    @Mock private PasswordValidator passwordValidator;
    @Captor private ArgumentCaptor<String> stringArgumentCaptor = ArgumentCaptor.forClass(String.class);
    @Captor private ArgumentCaptor<Integer> integerArgumentCaptor = ArgumentCaptor.forClass(Integer.class);
    @Captor private ArgumentCaptor<Long> idArgumentCaptor = ArgumentCaptor.forClass(Long.class);
    @Captor private ArgumentCaptor<User> userArgumentCaptor = ArgumentCaptor.forClass(User.class);
    @Captor private ArgumentCaptor<Group> groupArgumentCaptor = ArgumentCaptor.forClass(Group.class);
    @Captor private ArgumentCaptor<AccountType> accountTypeArgumentCaptor = ArgumentCaptor.forClass(AccountType.class);

    User user;
    RegisterUserForm registerUserForm;
    Group group;

    @BeforeEach
    public void init() {
        MockitoAnnotations.openMocks(this);
        userService = new UserService(userRepo,
                groupRepo,
                graphTaskRepo,
                fileTaskRepo,
                surveyRepo,
                infoRepo,
                additionalPointsRepo,
                authService,
                passwordEncoder,
                userValidator,
                professorRegisterToken,
                passwordValidator
        );
        user = new User();
        user.setId(1L);
        user.setEmail("user@gmail.com");
        user.setPassword("password");

        group = new Group();
        group.setId(1L);
        group.setName("group");
        group.setInvitationCode("invitation-code");

        registerUserForm = new RegisterUserForm();
    }

    @Test
    public void loadUserByUsername() {
        // given
        user.setAccountType(AccountType.STUDENT);
        given(userRepo.findUserByEmail(user.getEmail())).willReturn(user);

        // when
        userService.loadUserByUsername(user.getEmail());

        // then
        verify(userRepo).findUserByEmail(stringArgumentCaptor.capture());
        String capturedEmail = stringArgumentCaptor.getValue();
        assertThat(capturedEmail).isEqualTo(user.getEmail());
    }

    @Test
    public void saveUser() {
        // given
        String password = user.getPassword();
        String encodedPassword = "encodedPassword";
        given(userRepo.save(user)).willReturn(user);
        given(passwordEncoder.encode(user.getPassword())).willReturn(encodedPassword);

        // when
        userService.saveUser(user);

        // then
        verify(userRepo).save(userArgumentCaptor.capture());
        verify(passwordEncoder).encode(stringArgumentCaptor.capture());
        User capturedUser = userArgumentCaptor.getValue();
        String capturedPassword = stringArgumentCaptor.getValue();
        assertThat(capturedUser).isEqualTo(user);
        assertThat(capturedPassword).isEqualTo(password);
        assertThat(user.getPassword()).isEqualTo(encodedPassword);
    }

    @Test
    public void registerUserStudent() throws RequestValidationException {
        // given
        registerUserForm.setEmail(user.getEmail());
        registerUserForm.setInvitationCode(group.getInvitationCode());
        registerUserForm.setAccountType(AccountType.STUDENT);
        registerUserForm.setHeroType(HeroType.PRIEST);
        registerUserForm.setIndexNumber(99);
        String encodedPassword = "encodedPassword";
        given(userRepo.findUserByEmail(registerUserForm.getEmail())).willReturn(null);
        given(groupRepo.findGroupByInvitationCode(registerUserForm.getInvitationCode())).willReturn(group);
        given(userRepo.existsUserByIndexNumber(registerUserForm.getIndexNumber())).willReturn(false);
        given(passwordEncoder.encode(user.getPassword())).willReturn(encodedPassword);

        // when
        userService.registerUser(registerUserForm);

        // then
        verify(userRepo).findUserByEmail(stringArgumentCaptor.capture());
        verify(passwordEncoder).encode(stringArgumentCaptor.capture());
        String capturedEmail = stringArgumentCaptor.getAllValues().get(0);
        String capturedPassword = stringArgumentCaptor.getAllValues().get(1);
        assertThat(capturedEmail).isEqualTo(registerUserForm.getEmail());
        assertThat(capturedPassword).isEqualTo(registerUserForm.getPassword());
    }

    @Test
    public void registerUserProfessor() throws RequestValidationException {
        // given
        registerUserForm.setEmail(user.getEmail());
        registerUserForm.setAccountType(AccountType.PROFESSOR);
        String encodedPassword = "encodedPassword";
        given(userRepo.findUserByEmail(registerUserForm.getEmail())).willReturn(null);
        given(passwordEncoder.encode(user.getPassword())).willReturn(encodedPassword);

        // when
        userService.registerUser(registerUserForm);

        // then
        verify(userRepo).findUserByEmail(stringArgumentCaptor.capture());
        verify(passwordEncoder).encode(stringArgumentCaptor.capture());
        String capturedEmail = stringArgumentCaptor.getAllValues().get(0);
        String capturedPassword = stringArgumentCaptor.getAllValues().get(1);
        assertThat(capturedEmail).isEqualTo(registerUserForm.getEmail());
        assertThat(capturedPassword).isEqualTo(registerUserForm.getPassword());
    }

    @Test
    public void getUser() {
        // given
        given(userRepo.findUserByEmail(user.getEmail())).willReturn(user);

        // when
        User returnedUser = userService.getUser(user.getEmail());

        // then
        verify(userRepo).findUserByEmail(stringArgumentCaptor.capture());
        String capturedEmail = stringArgumentCaptor.getValue();
        assertThat(capturedEmail).isEqualTo(user.getEmail());
        assertThat(returnedUser).isEqualTo(user);
    }

    @Test
    public void getUsers() {
        // given
        User secondUser = new User();
        secondUser.setId(2L);
        given(userRepo.findAll()).willReturn(List.of(user, secondUser));

        // when
        List<User> returnedUsers = userService.getUsers();

        // then
        verify(userRepo).findAll();
        assertThat(returnedUsers.size()).isEqualTo(2);
        assertThat(returnedUsers.contains(user)).isTrue();
        assertThat(returnedUsers.contains(secondUser)).isTrue();
    }

    @Test
    public void getUsersWhenIsEmpty() {
        // given
        given(userRepo.findAll()).willReturn(List.of());

        // when
        List<User> returnedUsers = userService.getUsers();

        // then
        verify(userRepo).findAll();
        assertThat(returnedUsers.size()).isEqualTo(0);
    }

    @Test
    public void getUserGroup() throws EntityNotFoundException {
        // given
        user.setGroup(group);
        given(userRepo.findUserByEmail(user.getEmail())).willReturn(user);
        given(authService.getAuthentication()).willReturn(authentication);
        given(authentication.getName()).willReturn(user.getEmail());

        // when
        Group userGroup = userService.getUserGroup();

        // then
        verify(userRepo).findUserByEmail(stringArgumentCaptor.capture());
        String capturedEmail = stringArgumentCaptor.getValue();
        assertThat(capturedEmail).isEqualTo(user.getEmail());
        assertThat(userGroup).isEqualTo(group);
    }

    @Test
    public void getAllStudentsWithGroup() {
        // given
        User secondUser = new User();
        Group secondGroup = new Group();
        user.setGroup(group);
        secondUser.setGroup(secondGroup);
        given(userRepo.findAllByAccountTypeEquals(AccountType.STUDENT)).willReturn(List.of(user, secondUser));

        // when
        List<BasicStudent> studentsWithGroup = userService.getAllStudentsWithGroup();

        // then
        verify(userRepo).findAllByAccountTypeEquals(accountTypeArgumentCaptor.capture());
        AccountType capturedAccountType = accountTypeArgumentCaptor.getValue();
        assertThat(capturedAccountType).isEqualTo(AccountType.STUDENT);
        assertThat(studentsWithGroup.contains(new BasicStudent(user))).isTrue();
        assertThat(studentsWithGroup.contains(new BasicStudent(secondUser))).isTrue();
        assertThat(studentsWithGroup.size()).isEqualTo(2);
    }

    @Test
    public void getAllStudentsWithGroupWhenIsEmpty() {
        // given
        given(userRepo.findAllByAccountTypeEquals(AccountType.STUDENT)).willReturn(List.of());

        // when
        List<BasicStudent> studentsWithGroup = userService.getAllStudentsWithGroup();

        // then
        verify(userRepo).findAllByAccountTypeEquals(accountTypeArgumentCaptor.capture());
        AccountType capturedAccountType = accountTypeArgumentCaptor.getValue();
        assertThat(capturedAccountType).isEqualTo(AccountType.STUDENT);
        assertThat(studentsWithGroup.size()).isEqualTo(0);
    }

    @Test
    public void setStudentGroup() throws WrongUserTypeException, StudentAlreadyAssignedToGroupException, EntityNotFoundException {
        // given
        user.setAccountType(AccountType.STUDENT);;
        List<User> oldGroupUsers = new ArrayList<>();
        oldGroupUsers.add(user);
        group.setUsers(oldGroupUsers);
        user.setGroup(group);
        Group newGroup = new Group();
        newGroup.setId(2L);
        newGroup.setUsers(new ArrayList<>());
        SetStudentGroupForm setStudentGroupForm = new SetStudentGroupForm();
        setStudentGroupForm.setStudentId(user.getId());
        setStudentGroupForm.setNewGroupId(newGroup.getId());
        given(userRepo.findUserById(user.getId())).willReturn(user);
        given(groupRepo.findGroupById(group.getId())).willReturn(group);
        given(groupRepo.findGroupById(newGroup.getId())).willReturn(newGroup);

        //when
        userService.setStudentGroup(setStudentGroupForm);

        // then
        verify(userRepo).findUserById(idArgumentCaptor.capture());
        verify(groupRepo).findGroupById(idArgumentCaptor.capture());
        Long capturedUserId = idArgumentCaptor.getAllValues().get(0);
        Long capturedNewGroupId = idArgumentCaptor.getAllValues().get(1);
        assertThat(capturedUserId).isEqualTo(user.getId());
        assertThat(capturedNewGroupId).isEqualTo(newGroup.getId());
    }
}