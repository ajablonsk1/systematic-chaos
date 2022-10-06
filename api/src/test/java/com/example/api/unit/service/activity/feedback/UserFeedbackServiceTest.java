package com.example.api.unit.service.activity.feedback;

import com.example.api.dto.request.activity.feedback.SaveUserFeedbackForm;
import com.example.api.error.exception.EntityNotFoundException;
import com.example.api.error.exception.WrongUserTypeException;
import com.example.api.model.activity.feedback.UserFeedback;
import com.example.api.model.activity.task.Survey;
import com.example.api.model.user.User;
import com.example.api.repo.activity.feedback.UserFeedbackRepo;
import com.example.api.repo.activity.task.SurveyRepo;
import com.example.api.repo.user.UserRepo;
import com.example.api.security.AuthenticationService;
import com.example.api.service.activity.feedback.UserFeedbackService;
import com.example.api.service.validator.UserValidator;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.mockito.Captor;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.core.Authentication;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.verify;

public class UserFeedbackServiceTest {
    private UserFeedbackService userFeedbackService;
    @Mock private UserFeedbackRepo userFeedbackRepo;
    @Mock private UserRepo userRepo;
    @Mock private SurveyRepo surveyRepo;
    @Mock private UserValidator userValidator;
    @Mock private AuthenticationService authService;
    @Mock private Authentication authentication;
    @Captor private ArgumentCaptor<UserFeedback> userFeedbackArgumentCaptor;
    @Captor private ArgumentCaptor<Long> idArgumentCaptor;
    @Captor private ArgumentCaptor<String> stringArgumentCaptor;

    @BeforeEach
    public void init() {
        MockitoAnnotations.openMocks(this);

        userFeedbackService = new UserFeedbackService(
                userFeedbackRepo,
                userRepo,
                surveyRepo,
                userValidator,
                authService);
    }

    @Test
    public void saveUserFeedback() {
        // given
        UserFeedback feedback = new UserFeedback();

        // when
        userFeedbackService.saveUserFeedback(feedback);

        // then
        verify(userFeedbackRepo).save(userFeedbackArgumentCaptor.capture());
        UserFeedback capturedFeedback = userFeedbackArgumentCaptor.getValue();
        assertThat(capturedFeedback).isEqualTo(feedback);
    }

    @Test
    public void saveUserFeedbackForm() throws WrongUserTypeException, EntityNotFoundException {
        // given
        SaveUserFeedbackForm form = new SaveUserFeedbackForm(
                "random content",
                10,
                1L);
        User user = new User();
        Survey survey = new Survey();
        String email = "random@email.com";
        given(authService.getAuthentication()).willReturn(authentication);
        given(authentication.getName()).willReturn(email);
        given(userRepo.findUserByEmail(email)).willReturn(user);
        given(surveyRepo.findSurveyById(form.getSurveyId())).willReturn(survey);

        // when
        userFeedbackService.saveUserFeedback(form);

        // then
        verify(userRepo).findUserByEmail(stringArgumentCaptor.capture());
        verify(surveyRepo).findSurveyById(idArgumentCaptor.capture());
        String capturedEmail = stringArgumentCaptor.getValue();
        Long capturedId = idArgumentCaptor.getValue();
        assertThat(capturedEmail).isEqualTo(email);
        assertThat(capturedId).isEqualTo(form.getSurveyId());
    }

    @Test
    public void saveUserFeedbackFormThrowEntityNotFoundException() throws WrongUserTypeException, EntityNotFoundException {
        // given
        SaveUserFeedbackForm form = new SaveUserFeedbackForm(
                "random content",
                10,
                1L);
        given(authService.getAuthentication()).willReturn(authentication);
        given(authentication.getName()).willReturn("random@email.com");
        // when
        // then
        assertThatThrownBy(() -> userFeedbackService.saveUserFeedback(form))
                .isInstanceOf(EntityNotFoundException.class)
                .hasMessageContaining("Survey with id" + form.getSurveyId() + " not found in database");
    }
}
