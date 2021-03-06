package com.example.api.repo.group;

import com.example.api.model.group.AccessDate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AccessDateRepo extends JpaRepository<AccessDate, Long> {

}
