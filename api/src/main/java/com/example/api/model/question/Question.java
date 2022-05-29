package com.example.api.model.question;


import com.example.api.model.task.GraphTask;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.LinkedList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Question {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    @Enumerated(EnumType.STRING)
    private QuestionType type;
    private String content;
    private String hint;

    @Enumerated(EnumType.STRING)
    private Difficulty difficulty;

    @OneToMany(mappedBy = "question")
    private List<Option> options = new LinkedList<>();
    private Integer points;

    @ManyToMany
    private List<Question> next = new LinkedList<>();

    @ManyToOne
    @JoinColumn(name = "graphTask_id")
    private GraphTask graphTask;
}
