package com.example.api.service.activity.feedback.util;

import com.example.api.dto.request.activity.feedback.SaveProfessorFeedbackForm;
import com.example.api.error.exception.EntityNotFoundException;
import com.example.api.error.exception.WrongUserTypeException;
import com.example.api.model.activity.feedback.ProfessorFeedback;
import com.example.api.model.activity.result.FileTaskResult;
import com.example.api.model.user.AccountType;
import com.example.api.model.user.User;
import com.example.api.repo.activity.result.FileTaskResultRepo;
import com.example.api.repo.activity.result.GraphTaskResultRepo;
import com.example.api.repo.user.UserRepo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import javax.transaction.Transactional;

@Component
@Slf4j
@Transactional
@RequiredArgsConstructor
public class FeedbackValidator {
    private final GraphTaskResultRepo graphTaskResultRepo;
    private final FileTaskResultRepo fileTaskResultRepo;
    private final UserRepo userRepo;

    public ProfessorFeedback validateAndSetProfessorFeedbackTaskForm(SaveProfessorFeedbackForm form)
            throws WrongUserTypeException, EntityNotFoundException {
        ProfessorFeedback feedback = new ProfessorFeedback();
        String professorEmail = form.getProfessorEmail();
        User professor = userRepo.findUserByEmail(professorEmail);
        if(professor == null) {
            log.error("User {} not found in database", professorEmail);
            throw new UsernameNotFoundException("User" + professorEmail + " not found in database");
        }
        if(professor.getAccountType() != AccountType.PROFESSOR) {
            throw new WrongUserTypeException("Wrong user type!", AccountType.PROFESSOR);
        }
        Long id = form.getFileTaskResultId();
        FileTaskResult fileTaskResult = fileTaskResultRepo.findFileTaskResultById(id);
        if(fileTaskResult == null) {
            log.error("File task with id {} not found in database", id);
            throw new EntityNotFoundException("File task with id" + id + " not found in database");
        }
        User student = fileTaskResult.getUser();
        feedback.setFrom(professor);
        feedback.setTo(student);
        feedback.setContent(form.getContent());
        feedback.setPoints(form.getPoints());
        feedback.setFileTaskResult(fileTaskResult);
        return feedback;
    }
}
