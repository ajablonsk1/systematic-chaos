package com.example.api.service.activity.feedback;

import com.example.api.dto.request.activity.result.SurveyResultForm;
import com.example.api.dto.response.activity.result.SurveyResultInfoResponse;
import com.example.api.error.exception.*;
import com.example.api.model.activity.result.SurveyResult;
import com.example.api.model.activity.task.Survey;
import com.example.api.model.user.User;
import com.example.api.repo.activity.result.SurveyResultRepo;
import com.example.api.repo.activity.task.SurveyRepo;
import com.example.api.repo.user.UserRepo;
import com.example.api.security.AuthenticationService;
import com.example.api.service.user.BadgeService;
import com.example.api.service.validator.FeedbackValidator;
import com.example.api.service.validator.UserValidator;
import com.example.api.service.validator.activity.ActivityValidator;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class SurveyResultService {
    private final SurveyResultRepo surveyResultRepo;
    private final UserRepo userRepo;
    private final SurveyRepo surveyRepo;
    private final UserValidator userValidator;
    private final AuthenticationService authService;
    private final ActivityValidator activityValidator;
    private final BadgeService badgeService;
    private final FeedbackValidator feedbackValidator;

    public SurveyResult saveSurveyResult(SurveyResult surveyResult) {
        return surveyResultRepo.save(surveyResult);
    }

    public SurveyResultInfoResponse saveSurveyResult(SurveyResultForm form) throws RequestValidationException {
        String email = authService.getAuthentication().getName();
        log.info("Saving user {} feedback for survey with id {}", email, form.getSurveyId());
        User student = userRepo.findUserByEmail(email);
        userValidator.validateStudentAccount(student, email);
        Long id = form.getSurveyId();
        Survey survey = surveyRepo.findSurveyById(id);
        activityValidator.validateActivityIsNotNull(survey, id);

        SurveyResult surveyResult = surveyResultRepo.findSurveyResultBySurveyAndUser(survey, student);
        if (surveyResult == null) {
            surveyResult = new SurveyResult();
            surveyResult.setPointsReceived(survey.getMaxPoints());
            badgeService.checkAllBadges();
        }

        surveyResult.setFeedback(form.getFeedback());
        surveyResult.setUser(student);

        if (form.getRate() < 1 || form.getRate() > 5) {
            log.error("SurveyResult rate {} is out of range", form.getRate());
            throw new RequestValidationException(ExceptionMessage.USER_FEEDBACK_RATE_OUT_OF_RANGE);
        }
        surveyResult.setRate(form.getRate());
        surveyResult.setSurvey(survey);
        surveyResultRepo.save(surveyResult);
        return new SurveyResultInfoResponse(surveyResult);
    }

    public SurveyResultInfoResponse getSurveyResult(Long surveyId) throws WrongUserTypeException, EntityNotFoundException {
        String email = authService.getAuthentication().getName();
        log.info("Getting user {} feedback for survey with id {}", email, surveyId);
        User student = userRepo.findUserByEmail(email);
        userValidator.validateStudentAccount(student, email);

        Survey survey = surveyRepo.findSurveyById(surveyId);
        activityValidator.validateActivityIsNotNull(survey, surveyId);

        SurveyResult surveyResult = surveyResultRepo.findSurveyResultBySurveyAndUser(survey, student);
        feedbackValidator.validateFeedbackIsNotNull(surveyResult, surveyId, email);

        return new SurveyResultInfoResponse(surveyResult);

    }
}
