package com.example.api.service.validator;

import com.example.api.error.exception.EntityNotFoundException;
import com.example.api.model.map.ActivityMap;
import com.example.api.model.map.Chapter;
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

    public void validateChapterIsNotNull(Chapter chapter, Long id) throws EntityNotFoundException {
        if(chapter == null) {
            log.error("Chapter with id {} not found in database", id);
            throw new EntityNotFoundException("Chapter with id" + id + " not found in database");
        }
    }
}
