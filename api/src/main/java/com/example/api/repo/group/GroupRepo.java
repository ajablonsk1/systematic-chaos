package com.example.api.repo.group;

import com.example.api.model.group.Group;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GroupRepo extends JpaRepository<Group, Long> {
    Group findGroupByInvitationCode(String invitationCode);
}
