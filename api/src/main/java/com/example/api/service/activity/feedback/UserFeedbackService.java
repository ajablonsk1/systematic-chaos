package com.example.api.service.activity.feedback;

import com.example.api.dto.request.activity.feedback.SaveUserFeedbackForm;
import com.example.api.error.exception.EntityNotFoundException;
import com.example.api.error.exception.WrongUserTypeException;
import com.example.api.model.activity.feedback.UserFeedback;
import com.example.api.model.activity.task.Survey;
import com.example.api.model.user.AccountType;
import com.example.api.model.user.User;
import com.example.api.repo.activity.feedback.UserFeedbackRepo;
import com.example.api.repo.activity.task.SurveyRepo;
import com.example.api.repo.user.UserRepo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
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

    public UserFeedback saveUserFeedback(UserFeedback feedback) {
        return userFeedbackRepo.save(feedback);
    }

    public UserFeedback saveUserFeedback(SaveUserFeedbackForm form) throws WrongUserTypeException, EntityNotFoundException {
        String email = form.getStudentEmail();
        User student = userRepo.findUserByEmail(email);
        if(student == null) {
            log.error("User {} not found in database", email);
            throw new UsernameNotFoundException("User" + email + " not found in database");
        }
        if(student.getAccountType() != AccountType.STUDENT) {
            throw new WrongUserTypeException("Wrong user type!", AccountType.STUDENT);
        }
        UserFeedback feedback = new UserFeedback();
        feedback.setContent(form.getContent());
        feedback.setFrom(student);
        feedback.setRate(form.getRate());
        Long id = form.getSurveyId();
        Survey survey = surveyRepo.findSurveyById(id);
        if(survey == null) {
            log.error("Survey with id {} not found in database", id);
            throw new EntityNotFoundException("Survey with id" + id + " not found in database");
        }
        feedback.setSurvey(survey);
        return userFeedbackRepo.save(feedback);
    }
}
