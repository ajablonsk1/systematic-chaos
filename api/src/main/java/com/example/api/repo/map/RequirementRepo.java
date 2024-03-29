package com.example.api.repo.map;

import com.example.api.model.map.requirement.Requirement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RequirementRepo extends JpaRepository<Requirement, Long> {
    Requirement findRequirementById(Long id);
}
