package com.example.api.service.group;

import com.example.api.dto.request.group.SaveGroupForm;
import com.example.api.dto.response.user.BasicUser;
import com.example.api.error.exception.EntityNotFoundException;
import com.example.api.dto.response.group.GroupCode;
import com.example.api.model.group.AccessDate;
import com.example.api.model.group.Group;
import com.example.api.repo.group.AccessDateRepo;
import com.example.api.repo.group.GroupRepo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

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

    public Group saveGroup(SaveGroupForm form) {
        log.info("Saving group to database with name {}", form.getName());
        AccessDate accessDate = new AccessDate();
        accessDate.setDateFrom(form.getDateFrom());
        if(form.getDateTo() != null) {
            accessDate.setDateTo(form.getDateTo());
        }
        accessDateRepo.save(accessDate);
        Group group = new Group(null, form.getName(), new ArrayList<>(), accessDate, form.getInvitationCode());
        return groupRepo.save(group);
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
        if (id < 0) {
            log.info("Fetching users from all groups");
            return groupRepo.findAll()
                    .stream()
                    .flatMap(group -> group.getUsers().stream())
                    .map(BasicUser::new)
                    .collect(Collectors.toList());
        }
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
}
