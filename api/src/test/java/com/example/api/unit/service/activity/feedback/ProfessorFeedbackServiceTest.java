package com.example.api.unit.service.activity.feedback;

import com.example.api.dto.request.activity.feedback.SaveProfessorFeedbackForm;
import com.example.api.error.exception.EntityNotFoundException;
import com.example.api.error.exception.WrongUserTypeException;
import com.example.api.model.activity.feedback.ProfessorFeedback;
import com.example.api.model.activity.result.FileTaskResult;
import com.example.api.repo.activity.feedback.ProfessorFeedbackRepo;
import com.example.api.repo.activity.result.FileTaskResultRepo;
import com.example.api.service.activity.feedback.ProfessorFeedbackService;
import com.example.api.service.validator.FeedbackValidator;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.mockito.Captor;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.verify;

public class ProfessorFeedbackServiceTest {
    private ProfessorFeedbackService professorFeedbackService;
    @Mock private ProfessorFeedbackRepo professorFeedbackRepo;
    @Mock private FeedbackValidator feedbackValidator;
    @Mock private FileTaskResultRepo fileTaskResultRepo;
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
                fileTaskResultRepo);
    }

    @Test
    public void saveProfessorFeedback() {
        //given
        ProfessorFeedback feedback = new ProfessorFeedback();

        //when
        professorFeedbackService.saveProfessorFeedback(feedback);

        //then
        verify(professorFeedbackRepo).save(professorFeedbackArgumentCaptor.capture());
        ProfessorFeedback capturedFeedback = professorFeedbackArgumentCaptor.getValue();
        assertThat(capturedFeedback).isEqualTo(feedback);
    }

    @Test
    public void saveProfessorFeedbackForm() throws WrongUserTypeException, EntityNotFoundException {
        //given
        SaveProfessorFeedbackForm form = new SaveProfessorFeedbackForm("random@email.com",
                "random content",
                10.0,
                2L);
        ProfessorFeedback feedback = new ProfessorFeedback();
        given(feedbackValidator.validateAndSetProfessorFeedbackTaskForm(form)).willReturn(feedback);

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
    public void getProfessorFeedbackForFileTask() throws EntityNotFoundException {
        //given
        Long id = 1L;
        FileTaskResult result = new FileTaskResult();
        given(fileTaskResultRepo.findFileTaskResultById(id)).willReturn(result);

        //when
        professorFeedbackService.getProfessorFeedbackForFileTask(id);

        //then
        verify(fileTaskResultRepo).findFileTaskResultById(idArgumentCaptor.capture());
        verify(professorFeedbackRepo).findProfessorFeedbackByFileTaskResult(fileTaskResultArgumentCaptor.capture());
        Long capturedId = idArgumentCaptor.getValue();
        FileTaskResult capturedResult = fileTaskResultArgumentCaptor.getValue();
        assertThat(capturedId).isEqualTo(id);
        assertThat(capturedResult).isEqualTo(result);
    }

    @Test
    public void getProfessorFeedbackForFileTaskThrowEntityNotFoundException() throws EntityNotFoundException {
        //given
        Long id = 1L;

        //when
        //then
        assertThatThrownBy(() -> professorFeedbackService.getProfessorFeedbackForFileTask(id))
                .isInstanceOf(EntityNotFoundException.class)
                .hasMessageContaining("Graph task result with given id " + id + " does not exist");
    }
}