package com.example.api.repo.group;

import com.example.api.model.group.Group;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GroupRepo extends JpaRepository<Group, Long> {
    Group findGroupById(Long id);
    Group findGroupByInvitationCode(String invitationCode);
    Group findGroupByName(String name);
}
