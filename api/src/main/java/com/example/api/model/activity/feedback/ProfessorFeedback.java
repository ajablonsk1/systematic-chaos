package com.example.api.model.activity.feedback;

import com.example.api.dto.response.task.feedback.ProfessorFeedbackInfoResponse;
import com.example.api.error.exception.EntityNotFoundException;
import com.example.api.error.exception.MissingProfessorFeedbackAttributeException;
import com.example.api.model.activity.result.FileTaskResult;
import com.example.api.model.util.File;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import java.util.LinkedList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class ProfessorFeedback extends Feedback{
    @OneToOne
    private FileTaskResult fileTaskResult;

    @OneToMany
    private List<File> feedbackFiles = new LinkedList<>();

    private Double points;

    public ProfessorFeedbackInfoResponse toInfoResponse() throws MissingProfessorFeedbackAttributeException, EntityNotFoundException {
        return new ProfessorFeedbackInfoResponse(this);
    }
}
