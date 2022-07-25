package com.example.api.unit.service.user;

import com.example.api.dto.request.user.SetStudentGroupForm;
import com.example.api.error.exception.EntityNotFoundException;
import com.example.api.error.exception.StudentAlreadyAssignedToGroupException;
import com.example.api.error.exception.WrongUserTypeException;
import com.example.api.model.group.Group;
import com.example.api.model.user.AccountType;
import com.example.api.model.user.User;
import com.example.api.repo.group.GroupRepo;
import com.example.api.repo.user.UserRepo;
import com.example.api.service.user.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.ArrayList;
import java.util.List;

import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

public class UserServiceTests {
    private UserService userService;
    @Mock
    private UserRepo userRepo;
    @Mock
    private GroupRepo groupRepo;
    @Mock
    private PasswordEncoder passwordEncoder;

    User user;

    @BeforeEach
    public void init() {
        MockitoAnnotations.openMocks(this);
        userService = new UserService(userRepo, groupRepo, passwordEncoder);

        user = new User();
        user.setId(1L);
        user.setEmail("user@gmail.com");
    }

    @Test
    public void setStudentGroup() throws WrongUserTypeException, StudentAlreadyAssignedToGroupException, EntityNotFoundException {
        // given
        user.setAccountType(AccountType.STUDENT);;
        List<User> oldGroupUsers = new ArrayList<>();
        oldGroupUsers.add(user);
        Group oldGroup = new Group();
        oldGroup.setId(1L);
        oldGroup.setUsers(oldGroupUsers);
        user.setGroup(oldGroup);
        Group newGroup = new Group();
        newGroup.setId(2L);
        newGroup.setUsers(new ArrayList<>());
        SetStudentGroupForm setStudentGroupForm = new SetStudentGroupForm();
        setStudentGroupForm.setStudentId(user.getId());
        setStudentGroupForm.setNewGroupId(newGroup.getId());
        given(userRepo.findUserById(user.getId())).willReturn(user);
        given(groupRepo.findGroupById(oldGroup.getId())).willReturn(oldGroup);
        given(groupRepo.findGroupById(newGroup.getId())).willReturn(newGroup);

        //when
        userService.setStudentGroup(setStudentGroupForm);

        // then
        ArgumentCaptor<Long> userIdCaptor = ArgumentCaptor.forClass(Long.class);
        ArgumentCaptor<Long> newGroupIdCaptor = ArgumentCaptor.forClass(Long.class);
        ArgumentCaptor<User> userCaptor = ArgumentCaptor.forClass(User.class);
        ArgumentCaptor<Group> groupCaptor = ArgumentCaptor.forClass(Group.class);
        verify(userRepo).findUserById(userIdCaptor.capture());
        verify(groupRepo).findGroupById(newGroupIdCaptor.capture());
        verify(userRepo).save(userCaptor.capture());
        verify(groupRepo, times(2)).save(groupCaptor.capture());
        Long capturedUserId = userIdCaptor.getValue();
        Long capturedNewGroupId = newGroupIdCaptor.getValue();
        User capturedUser = userCaptor.getValue();
        Group capturedOldGroup = groupCaptor.getAllValues().get(0);
        Group capturedNewGroup = groupCaptor.getAllValues().get(1);
        assertThat(capturedUserId).isEqualTo(user.getId());
        assertThat(capturedNewGroupId).isEqualTo(newGroup.getId());
        assertThat(capturedUser.getGroup()).isEqualTo(newGroup);
        assertThat(capturedOldGroup.getUsers().contains(user)).isFalse();
        assertThat(capturedNewGroup.getUsers().contains(user)).isTrue();
    }

    @Test
    public void setStudentGroupThrowWhenTryToAssignSameGroup() {
        // given
        user.setFirstName("John");
        user.setLastName("Doe");
        user.setAccountType(AccountType.STUDENT);
        List<User> groupUsers = new ArrayList<>();
        groupUsers.add(user);
        Group group = new Group();
        group.setId(1L);
        group.setUsers(groupUsers);
        user.setGroup(group);
        SetStudentGroupForm setStudentGroupForm = new SetStudentGroupForm();
        setStudentGroupForm.setStudentId(user.getId());
        setStudentGroupForm.setNewGroupId(group.getId());
        given(userRepo.findUserById(user.getId())).willReturn(user);
        given(groupRepo.findGroupById(group.getId())).willReturn(group);

        // when
        // then
        assertThatThrownBy(() -> userService.setStudentGroup(setStudentGroupForm))
                .isInstanceOf(StudentAlreadyAssignedToGroupException.class)
                .hasMessageContaining("Student is already assigned to group", user, user.getGroup());
    }

    @Test
    public void setStudentGroupThrowWrongUserTypeException() {
        // given
        user.setAccountType(AccountType.PROFESSOR);
        List<User> groupUsers = new ArrayList<>();
        groupUsers.add(user);
        Group group = new Group();
        group.setName("group");
        group.setId(1L);
        group.setUsers(groupUsers);
        user.setGroup(group);
        SetStudentGroupForm setStudentGroupForm = new SetStudentGroupForm();
        setStudentGroupForm.setStudentId(user.getId());
        setStudentGroupForm.setNewGroupId(group.getId());
        given(userRepo.findUserById(user.getId())).willReturn(user);
        given(groupRepo.findGroupById(group.getId())).willReturn(group);

        // when
        // then
        assertThatThrownBy(() -> userService.setStudentGroup(setStudentGroupForm))
                .isInstanceOf(WrongUserTypeException.class)
                .hasMessageContaining("Wrong user type exception!", AccountType.STUDENT);
    }

    @Test
    public void setStudentGroupWhenNewGroupNotExist() {
        // given
        user.setAccountType(AccountType.STUDENT);
        List<User> groupUsers = new ArrayList<>();
        groupUsers.add(user);
        Group group = new Group();
        group.setName("group");
        group.setId(1L);
        group.setUsers(groupUsers);
        user.setGroup(group);
        SetStudentGroupForm setStudentGroupForm = new SetStudentGroupForm();
        setStudentGroupForm.setStudentId(user.getId());
        setStudentGroupForm.setNewGroupId(group.getId());
        given(userRepo.findUserById(user.getId())).willReturn(user);
        given(groupRepo.findGroupById(group.getId())).willReturn(null);

        // when
        // then
        assertThatThrownBy(() -> userService.setStudentGroup(setStudentGroupForm))
                .isInstanceOf(EntityNotFoundException.class)
                .hasMessageContaining("Group with id " + group.getId() + " not found in database");
    }

    @Test
    public void setStudentGroupWhenUserNotExist() {
        // given
        user.setAccountType(AccountType.STUDENT);
        List<User> groupUsers = new ArrayList<>();
        groupUsers.add(user);
        Group group = new Group();
        group.setName("group");
        group.setId(1L);
        group.setUsers(groupUsers);
        user.setGroup(group);
        SetStudentGroupForm setStudentGroupForm = new SetStudentGroupForm();
        setStudentGroupForm.setStudentId(user.getId());
        setStudentGroupForm.setNewGroupId(group.getId());
        given(userRepo.findUserById(user.getId())).willReturn(null);
        given(groupRepo.findGroupById(group.getId())).willReturn(group);

        // when
        // then
        assertThatThrownBy(() -> userService.setStudentGroup(setStudentGroupForm))
                .isInstanceOf(EntityNotFoundException.class)
                .hasMessageContaining("User with id " + user.getId() + " not found in database");
    }
}