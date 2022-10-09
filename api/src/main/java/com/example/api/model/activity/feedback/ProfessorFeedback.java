package com.example.api.model.activity.feedback;

import com.example.api.model.activity.result.FileTaskResult;
import com.example.api.model.util.File;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.Entity;
import javax.persistence.OneToOne;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class ProfessorFeedback extends Feedback{
    @OneToOne
    @OnDelete(action = OnDeleteAction.CASCADE)
    private FileTaskResult fileTaskResult;

    @OneToOne
    @OnDelete(action = OnDeleteAction.CASCADE)
    private File feedbackFile;

    private Double points;
}
