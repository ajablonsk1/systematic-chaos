package com.example.api.service.activity.feedback.util;

import com.example.api.error.exception.WrongBodyParametersNumberException;
import com.example.api.error.exception.WrongUserTypeException;
import com.example.api.model.activity.feedback.ProfessorFeedback;
import com.example.api.model.activity.result.FileTaskResult;
import com.example.api.model.activity.result.GraphTaskResult;
import com.example.api.model.user.AccountType;
import com.example.api.model.user.User;
import com.example.api.repo.activity.result.FileTaskResultRepo;
import com.example.api.repo.activity.result.GraphTaskResultRepo;
import com.example.api.repo.user.UserRepo;
import com.example.api.service.activity.feedback.form.SaveProfessorFeedbackForm;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import javax.transaction.Transactional;
import java.util.List;

@Component
@Slf4j
@Transactional
@RequiredArgsConstructor
public class FeedbackValidator {
    private final GraphTaskResultRepo graphTaskResultRepo;
    private final FileTaskResultRepo fileTaskResultRepo;
    private final UserRepo userRepo;

    public ProfessorFeedback validateAndSetProfessorFeedbackTaskForm(SaveProfessorFeedbackForm form)
            throws WrongBodyParametersNumberException, WrongUserTypeException {
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
        String studentEmail = form.getStudentEmail();
        User student = userRepo.findUserByEmail(studentEmail);
        if(student == null) {
            log.error("User {} not found in database", studentEmail);
            throw new UsernameNotFoundException("User" + studentEmail + " not found in database");
        }
        if(student.getAccountType() != AccountType.STUDENT) {
            throw new WrongUserTypeException("Wrong user type!", AccountType.STUDENT);
        }
        GraphTaskResult graphTaskResult = graphTaskResultRepo.findGraphTaskResultById(form.getGraphTaskResultId());
        FileTaskResult fileTaskResult = fileTaskResultRepo.findFileTaskResultById(form.getFileTaskResultId());
        if(graphTaskResult == null && fileTaskResult == null) {
            log.error("Wrong number of SaveProfessorFeedbackForm parameters. One parameter should be provided.");
            throw new WrongBodyParametersNumberException("Wrong number of SaveProfessorFeedbackForm parameters. One parameter should be provided.",
                    List.of("graphTaskResultId", "fileTaskResultId"), 2);
        } else if(graphTaskResult == null) {
            feedback.setFileTaskResult(fileTaskResult);
        } else if(fileTaskResult == null) {
            feedback.setGraphTaskResult(graphTaskResult);
        } else {
            log.error("Wrong number of SaveProfessorFeedbackForm parameters. One parameter should be provided.");
            throw new WrongBodyParametersNumberException("Wrong number of SaveProfessorFeedbackForm parameters. One parameter should be provided.",
                    List.of("graphTaskResultId", "fileTaskResultId"), 2);
        }
        feedback.setFrom(professor);
        feedback.setTo(student);
        feedback.setContent(form.getContent());
        feedback.setPoints(form.getPoints());
        return feedback;
    }
}
