package com.example.api.unit.service.activity.feedback;

import com.example.api.dto.request.activity.feedback.SaveProfessorFeedbackForm;
import com.example.api.error.exception.EntityNotFoundException;
import com.example.api.error.exception.MissingAttributeException;
import com.example.api.error.exception.WrongPointsNumberException;
import com.example.api.error.exception.WrongUserTypeException;
import com.example.api.model.activity.feedback.ProfessorFeedback;
import com.example.api.model.activity.result.FileTaskResult;
import com.example.api.model.activity.task.FileTask;
import com.example.api.model.user.User;
import com.example.api.repo.activity.feedback.ProfessorFeedbackRepo;
import com.example.api.repo.activity.result.FileTaskResultRepo;
import com.example.api.repo.activity.task.FileTaskRepo;
import com.example.api.repo.user.UserRepo;
import com.example.api.service.activity.feedback.ProfessorFeedbackService;
import com.example.api.service.validator.FeedbackValidator;
import com.example.api.service.validator.UserValidator;
import com.example.api.service.validator.activity.ActivityValidator;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.mockito.Captor;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.io.IOException;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.verify;

// TODO: update and complete tests
public class ProfessorFeedbackServiceTest {
    private ProfessorFeedbackService professorFeedbackService;
    @Mock private ProfessorFeedbackRepo professorFeedbackRepo;
    @Mock private FeedbackValidator feedbackValidator;
    @Mock private FileTaskResultRepo fileTaskResultRepo;
    @Mock private FileTaskRepo fileTaskRepo;
    @Mock private UserRepo userRepo;
    @Mock private ActivityValidator activityValidator;
    @Mock private UserValidator userValidator;
    @Captor private ArgumentCaptor<ProfessorFeedback> professorFeedbackArgumentCaptor;
    @Captor private ArgumentCaptor<SaveProfessorFeedbackForm> formArgumentCaptor;
    @Captor private ArgumentCaptor<Long> idArgumentCaptor;
    @Captor private ArgumentCaptor<FileTaskResult> fileTaskResultArgumentCaptor;

    @BeforeEach
    public void init() {
        MockitoAnnotations.openMocks(this);

        professorFeedbackService = new ProfessorFeedbackService(
                professorFeedbackRepo,
                feedbackValidator,
                fileTaskResultRepo,
                fileTaskRepo,
                userRepo,
                activityValidator,
                userValidator);
    }

    @Test
    public void saveProfessorFeedback() throws MissingAttributeException, EntityNotFoundException {
        //given
        ProfessorFeedback feedback = new ProfessorFeedback();
        User user = new User();
        user.setEmail("email");
        FileTask fileTask = new FileTask();
        fileTask.setId(1L);
        FileTaskResult fileTaskResult = new FileTaskResult();
        fileTaskResult.setUser(user);
        fileTaskResult.setFileTask(fileTask);
        feedback.setFileTaskResult(fileTaskResult);

        given(professorFeedbackRepo.save(feedback)).willReturn(feedback);

        //when
        professorFeedbackService.saveProfessorFeedback(feedback);

        //then
        verify(professorFeedbackRepo).save(professorFeedbackArgumentCaptor.capture());
        ProfessorFeedback capturedFeedback = professorFeedbackArgumentCaptor.getValue();
        assertThat(capturedFeedback).isEqualTo(feedback);
    }

    @Test
    public void saveProfessorFeedbackForm() throws WrongUserTypeException, EntityNotFoundException, IOException, MissingAttributeException, WrongPointsNumberException {
        //given
        SaveProfessorFeedbackForm form = new SaveProfessorFeedbackForm();
        form.setContent("random content");
        form.setPoints(10.0);
        form.setFileTaskResultId(2L);
        ProfessorFeedback feedback = new ProfessorFeedback();
        User user = new User();
        user.setEmail("email");
        FileTask fileTask = new FileTask();
        fileTask.setId(1L);
        FileTaskResult fileTaskResult = new FileTaskResult();
        fileTaskResult.setUser(user);
        fileTaskResult.setFileTask(fileTask);
        feedback.setFileTaskResult(fileTaskResult);
        given(feedbackValidator.validateAndSetProfessorFeedbackTaskForm(form)).willReturn(feedback);
        given(professorFeedbackRepo.save(feedback)).willReturn(feedback);

        //when
        professorFeedbackService.saveProfessorFeedback(form);

        //then
        verify(feedbackValidator).validateAndSetProfessorFeedbackTaskForm(formArgumentCaptor.capture());
        verify(professorFeedbackRepo).save(professorFeedbackArgumentCaptor.capture());
        SaveProfessorFeedbackForm capturedForm = formArgumentCaptor.getValue();
        ProfessorFeedback capturedFeedback = professorFeedbackArgumentCaptor.getValue();
        assertThat(capturedForm).isEqualTo(form);
        assertThat(capturedFeedback).isEqualTo(feedback);
    }

    @Test
    public void getProfessorFeedbackForFileTask() throws EntityNotFoundException, MissingAttributeException {
        //given
        Long id = 1L;
        FileTaskResult result = new FileTaskResult();
        given(fileTaskResultRepo.findFileTaskResultById(id)).willReturn(result);

        //when
        professorFeedbackService.getProfessorFeedbackForFileTaskResult(id);

        //then
        verify(fileTaskResultRepo).findFileTaskResultById(idArgumentCaptor.capture());
        verify(professorFeedbackRepo).findProfessorFeedbackByFileTaskResult(fileTaskResultArgumentCaptor.capture());
        Long capturedId = idArgumentCaptor.getValue();
        FileTaskResult capturedResult = fileTaskResultArgumentCaptor.getValue();
        assertThat(capturedId).isEqualTo(id);
        assertThat(capturedResult).isEqualTo(result);
    }

}
