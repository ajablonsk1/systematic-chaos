package com.example.api.model.question;

import com.example.api.model.task.GraphTaskResult;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.lang.Nullable;

import javax.persistence.*;
import java.util.LinkedList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Answer {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    @Nullable
    @OneToOne
    private Option option;

    @Nullable
    @OneToMany(mappedBy = "answer")
    private List<Option> options = new LinkedList<>();

    @Nullable
    private String openAnswer;

    @ManyToOne
    @JoinColumn(name = "graphTaskResult_id")
    private GraphTaskResult graphTaskResult;
}
