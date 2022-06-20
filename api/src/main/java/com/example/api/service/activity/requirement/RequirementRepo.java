package com.example.api.service.activity.requirement;

import com.example.api.model.map.Requirement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RequirementRepo extends JpaRepository<Requirement, Long> {

}
