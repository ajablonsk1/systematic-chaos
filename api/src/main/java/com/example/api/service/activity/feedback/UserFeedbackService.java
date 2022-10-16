package com.example.api.service.activity.feedback;

import com.example.api.dto.request.activity.feedback.SaveUserFeedbackForm;
import com.example.api.dto.response.activity.feedback.UserFeedbackInfoResponse;
import com.example.api.error.exception.*;
import com.example.api.model.activity.feedback.UserFeedback;
import com.example.api.model.activity.task.Survey;
import com.example.api.model.user.User;
import com.example.api.repo.activity.feedback.UserFeedbackRepo;
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
public class UserFeedbackService {
    private final UserFeedbackRepo userFeedbackRepo;
    private final UserRepo userRepo;
    private final SurveyRepo surveyRepo;
    private final UserValidator userValidator;
    private final AuthenticationService authService;
    private final ActivityValidator activityValidator;
    private final BadgeService badgeService;
    private final FeedbackValidator feedbackValidator;

    public UserFeedback saveUserFeedback(UserFeedback feedback) {
        return userFeedbackRepo.save(feedback);
    }

    public UserFeedbackInfoResponse saveUserFeedback(SaveUserFeedbackForm form) throws RequestValidationException {
        String email = authService.getAuthentication().getName();
        log.info("Saving user {} feedback for survey with id {}", email, form.getSurveyId());
        User student = userRepo.findUserByEmail(email);
        userValidator.validateStudentAccount(student, email);
        Long id = form.getSurveyId();
        Survey survey = surveyRepo.findSurveyById(id);
        activityValidator.validateActivityIsNotNull(survey, id);

        UserFeedback feedback = userFeedbackRepo.findUserFeedbackBySurveyAndFrom(survey, student);
        if (feedback == null) {
            feedback = new UserFeedback();
            student.setPoints(survey.getMaxPoints());
            badgeService.checkAllBadges();
        }

        feedback.setContent(form.getFeedback());
        feedback.setFrom(student);

        if (form.getRate() < 1 || form.getRate() > 5) {
            log.error("UserFeedback rate {} is out of range", form.getRate());
            throw new RequestValidationException(ExceptionMessage.USER_FEEDBACK_RATE_OUT_OF_RANGE);
        }
        feedback.setRate(form.getRate());
        feedback.setSurvey(survey);
        userFeedbackRepo.save(feedback);
        return new UserFeedbackInfoResponse(feedback);
    }

    public UserFeedbackInfoResponse getUserFeedback(Long surveyId) throws WrongUserTypeException, EntityNotFoundException {
        String email = authService.getAuthentication().getName();
        log.info("Getting user {} feedback for survey with id {}", email, surveyId);
        User student = userRepo.findUserByEmail(email);
        userValidator.validateStudentAccount(student, email);

        Survey survey = surveyRepo.findSurveyById(surveyId);
        activityValidator.validateActivityIsNotNull(survey, surveyId);

        UserFeedback feedback = userFeedbackRepo.findUserFeedbackBySurveyAndFrom(survey, student);
        feedbackValidator.validateFeedbackIsNotNull(feedback, surveyId, email);

        return new UserFeedbackInfoResponse(feedback);

    }
}
