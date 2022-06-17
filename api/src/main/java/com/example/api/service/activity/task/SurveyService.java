package com.example.api.service.activity.task;

import com.example.api.dto.response.task.SurveyInfoResponse;
import com.example.api.error.exception.EntityNotFoundException;
import com.example.api.model.activity.task.Survey;
import com.example.api.repo.activity.task.SurveyRepo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class SurveyService {
    private final SurveyRepo surveyRepo;

    public SurveyInfoResponse getSurveyInfo(Long id) throws EntityNotFoundException {
        Survey survey = surveyRepo.findSurveyById(id);
        if(survey == null) {
            log.error("Survey with id {} not found in database", id);
            throw new EntityNotFoundException("Survey with id" + id + " not found in database");
        }
        return new SurveyInfoResponse(survey.getName(), survey.getDescription(), survey.getExperiance());
    }
}
