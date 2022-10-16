package com.example.api.model.activity.feedback;

import com.example.api.model.activity.task.Survey;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class UserFeedback extends Feedback {
    @NonNull
    @Min(1)
    @Max(5)
    private Integer rate;

    @ManyToOne
    private Survey survey;
}
