package com.example.api.service.group;

import com.example.api.dto.request.group.SaveGroupForm;
import com.example.api.dto.response.group.GroupCode;
import com.example.api.dto.response.user.BasicUser;
import com.example.api.error.exception.EntityAlreadyInDatabaseException;
import com.example.api.error.exception.EntityNotFoundException;
import com.example.api.model.group.Group;
import com.example.api.model.user.AccountType;
import com.example.api.repo.group.AccessDateRepo;
import com.example.api.repo.group.GroupRepo;
import com.example.api.error.exception.ExceptionMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class GroupService {
    private final GroupRepo groupRepo;
    private final AccessDateRepo accessDateRepo;

    public Group saveGroup(Group group) {
        log.info("Saving group to database with name {}", group.getName());
        return groupRepo.save(group);
    }

    public Long saveGroup(SaveGroupForm form) throws EntityAlreadyInDatabaseException {
        log.info("Saving group to database with name {}", form.getName());
        List<Group> groups = groupRepo.findAll();
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
        Group group = new Group(null, form.getName(), new ArrayList<>(), form.getInvitationCode());
        groupRepo.save(group);
        return group.getId();
    }

    public Group getGroupById(Long id) throws EntityNotFoundException {
        log.info("Fetching group with id {}", id);
        Group group = groupRepo.findGroupById(id);
        if (group == null) {
            log.error("Group with id {} not found in database", id);
            throw new EntityNotFoundException("Group with id" + id + " not found in database");
        }
        return group;
    }

    public Group getGroupByInvitationCode(String code) throws EntityNotFoundException {
        log.info("Fetching group with code {}", code);
        Group group = groupRepo.findGroupByInvitationCode(code);
        if (group == null) {
            log.error("Group with id {} not found in database", code);
            throw new EntityNotFoundException("Group with code" + code + " not found in database");
        }
        return group;
    }

    public List<GroupCode> getInvitationCodeList() {
        log.info("Fetching group code list");
        return groupRepo.findAll()
                .stream()
                .map(group -> new GroupCode(group.getId(),
                                            group.getName(),
                                            group.getInvitationCode()))
                .toList();

    }

    public List<BasicUser> getGroupUserList(Long id) throws EntityNotFoundException {
        log.info("Fetching users from group with id {}", id);
        Optional<Group> groupOptional = groupRepo.findById(id);
        if (groupOptional.isEmpty()) {
            throw new EntityNotFoundException("Group with id " + id + " not found in database");
        }
        return groupOptional.get()
                .getUsers()
                .stream()
                .map(BasicUser::new)
                .toList();

    }

    public List<BasicUser> getGroupStudentList(Long id) throws EntityNotFoundException {
        log.info("Fetching users from group with id {}", id);
        Optional<Group> groupOptional = groupRepo.findById(id);
        if (groupOptional.isEmpty()) {
            throw new EntityNotFoundException("Group with id " + id + " not found in database");
        }
        return groupOptional.get()
                .getUsers()
                .stream()
                .filter(user -> user.getAccountType() == AccountType.STUDENT)
                .map(BasicUser::new)
                .toList();

    }

    public List<BasicUser> getGroupProfessorList(Long id) throws EntityNotFoundException {
        log.info("Fetching users from group with id {}", id);
        Optional<Group> groupOptional = groupRepo.findById(id);
        if (groupOptional.isEmpty()) {
            throw new EntityNotFoundException("Group with id " + id + " not found in database");
        }
        return groupOptional.get()
                .getUsers()
                .stream()
                .filter(user -> user.getAccountType() == AccountType.PROFESSOR)
                .map(BasicUser::new)
                .toList();

    }

}
