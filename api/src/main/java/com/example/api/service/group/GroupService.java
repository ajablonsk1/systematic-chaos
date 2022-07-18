package com.example.api.service.group;

import com.example.api.dto.request.group.SaveGroupForm;
import com.example.api.dto.response.group.GroupCode;
import com.example.api.dto.response.group.GroupResponse;
import com.example.api.error.exception.EntityAlreadyInDatabaseException;
import com.example.api.error.exception.EntityNotFoundException;
import com.example.api.model.group.AccessDate;
import com.example.api.model.group.Group;
import com.example.api.repo.group.AccessDateRepo;
import com.example.api.repo.group.GroupRepo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

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

    public GroupResponse saveGroup(SaveGroupForm form) {
        log.info("Saving group to database with name {}", form.getName());
        List<Group> groups = groupRepo.findAll();
        boolean groupNameExists = groups.stream()
                .anyMatch(group -> group.getName().equals(form.getName()));
        if(groupNameExists) {
            log.warn("Group with given name {} already exists", form.getName());
            return GroupResponse.NAME_TAKEN;
        }
        boolean groupCodeExists = groups.stream()
                .anyMatch(group -> group.getInvitationCode().equals(form.getInvitationCode()));
        if(groupCodeExists) {
            log.warn("Group with given code {} already exists", form.getInvitationCode());
            return GroupResponse.CODE_TAKEN;
        }
        Group group = new Group(null, form.getName(), new ArrayList<>(), form.getInvitationCode());
        groupRepo.save(group);
        return GroupResponse.SUCCESS;
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
}
