package com.example.api.model.activity.feedback;

import com.example.api.model.activity.result.FileTaskResult;
import com.example.api.model.activity.result.GraphTaskResult;
import com.example.api.model.user.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.lang.Nullable;

import javax.persistence.Entity;
import javax.persistence.OneToOne;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class ProfessorFeedback extends Feedback{
    @OneToOne
    private User to;

    @OneToOne
    @Nullable
    private GraphTaskResult graphTaskResult;

    @OneToOne
    @Nullable
    private FileTaskResult fileTaskResult;

    private Double points;
}
