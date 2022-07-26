package com.example.api.service.map;

import com.example.api.model.map.Requirement;
import com.example.api.repo.map.RequirementRepo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class RequirementService {
    private final RequirementRepo requirementRepo;

    public Requirement saveRequirement(Requirement requirement) {
        return requirementRepo.save(requirement);
    }
}
