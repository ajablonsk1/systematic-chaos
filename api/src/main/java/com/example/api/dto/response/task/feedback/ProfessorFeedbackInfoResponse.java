package com.example.api.dto.response.task.feedback;

import com.example.api.dto.response.task.util.FileResponse;
import com.example.api.error.exception.EntityNotFoundException;
import com.example.api.error.exception.MissingProfessorFeedbackAttributeException;
import com.example.api.model.activity.feedback.ProfessorFeedback;
import com.example.api.model.activity.result.FileTaskResult;
import com.example.api.model.activity.task.FileTask;
import com.example.api.model.user.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProfessorFeedbackInfoResponse {
    private Long feedbackId;
    private Long fileTaskResultId;
    private String studentEmail;
    private Long fileTaskId;
    private String taskName;
    private String description;
    private List<FileResponse> taskFiles;
    private Double points;
    private String remarks;
    private List<FileResponse> feedbackFiles;

    public ProfessorFeedbackInfoResponse(ProfessorFeedback professorFeedback) throws MissingProfessorFeedbackAttributeException, EntityNotFoundException {
        if (professorFeedback == null) {
            String msg = "Professor feedback doesn't exist";
            throw new EntityNotFoundException(msg);
        }
        FileTaskResult fileTaskResult = professorFeedback.getFileTaskResult();
        if (fileTaskResult == null) {
            String msg = "Professor feedback with id " + professorFeedback.getId() + " is missing fileTaskResult attribute";
            throw new MissingProfessorFeedbackAttributeException(msg, "fileTaskResult");
        }
        User student = professorFeedback.getFileTaskResult().getUser();
        if (student == null) {
            String msg = "Professor feedback with id " + professorFeedback.getId() + " is missing student attribute";
            throw new MissingProfessorFeedbackAttributeException(msg, "student");
        }
        FileTask fileTask = professorFeedback.getFileTaskResult().getFileTask();
        if (fileTask == null) {
            String msg = "Professor feedback with id " + professorFeedback.getId() + " is missing fileTask attribute";
            throw new MissingProfessorFeedbackAttributeException(msg, "fileTask");
        }

        this.feedbackId = professorFeedback.getId();
        this.fileTaskResultId = fileTaskResult.getId();
        this.studentEmail = student.getEmail();
        this.fileTaskId = fileTask.getId();
        this.taskName = fileTask.getName();
        this.description = fileTask.getDescription();
        this.taskFiles = fileTaskResult.getFiles()
                .stream()
                .map(FileResponse::new)
                .collect(Collectors.toList());
        this.points = fileTaskResult.getPointsReceived();
        this.remarks = professorFeedback.getContent();
        this.feedbackFiles = professorFeedback.getFeedbackFiles()
                .stream()
                .map(FileResponse::new)
                .collect(Collectors.toList());
    }
}

