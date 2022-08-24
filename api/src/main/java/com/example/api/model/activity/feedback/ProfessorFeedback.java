package com.example.api.model.activity.feedback;

import com.example.api.model.activity.result.FileTaskResult;
import com.example.api.model.util.File;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.OneToOne;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class ProfessorFeedback extends Feedback{
    @OneToOne
    private FileTaskResult fileTaskResult;

    @OneToOne
    private File feedbackFile;

    private Double points;
}
