package com.example.api.model.activity.result;

import com.example.api.model.activity.task.Activity;
import com.example.api.model.user.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@MappedSuperclass
public abstract class TaskResult {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    private User user;

    private Double pointsReceived;
    private Long sendDateMillis;

    public abstract boolean isEvaluated();
    public abstract Activity getActivity();
}
