package com.example.api.model.activity.feedback;

import com.example.api.model.activity.task.Survey;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class UserFeedback extends Feedback {
    private Integer rate;

    @ManyToOne
    private Survey survey;
}
