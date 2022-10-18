package com.example.api.service.validator;

import com.example.api.error.exception.EntityNotFoundException;
import com.example.api.model.map.ActivityMap;
import com.example.api.model.map.requirement.Requirement;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

@Component
@Slf4j
public class MapValidator {

    public void validateActivityMapIsNotNull(ActivityMap activityMap, Long id) throws EntityNotFoundException {
        if(activityMap == null) {
            log.error("ActivityMap with id {} not found in database", id);
            throw new EntityNotFoundException("ActivityMap with id" + id + " not found in database");
        }
    }

    public void validateRequirementIsNotNull(Requirement requirement, Long id) throws EntityNotFoundException {
        if(requirement == null) {
            log.error("Requirement with id {} not found in database", id);
            throw new EntityNotFoundException("Requirement with id" + id + " not found in database");
        }
    }
}
