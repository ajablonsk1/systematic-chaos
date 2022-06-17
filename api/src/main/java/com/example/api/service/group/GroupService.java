package com.example.api.service.group;

import com.example.api.dto.request.group.SaveGroupForm;
import com.example.api.model.group.AccessDate;
import com.example.api.model.group.Group;
import com.example.api.repo.group.AccessDateRepo;
import com.example.api.repo.group.GroupRepo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class GroupService {
    private final GroupRepo groupRepo;
    private final AccessDateRepo accessDateRepo;

    public Group saveGroup(Group group) {
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
}
