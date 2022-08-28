package com.example.api.service.activity.task;

import com.example.api.dto.response.activity.task.SurveyInfoResponse;
import com.example.api.error.exception.EntityNotFoundException;
import com.example.api.model.activity.task.Survey;
import com.example.api.repo.activity.task.SurveyRepo;
import com.example.api.service.validator.ActivityValidator;
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
    private final ActivityValidator activityValidator;

    public Survey saveSurvey(Survey survey){
        return surveyRepo.save(survey);
    }

    public SurveyInfoResponse getSurveyInfo(Long id) throws EntityNotFoundException {
        log.info("Fetching survey info");
        Survey survey = surveyRepo.findSurveyById(id);
        activityValidator.validateActivityIsNotNull(survey, id);
        return new SurveyInfoResponse(survey.getTitle(), survey.getDescription(), survey.getExperience());
    }
}
