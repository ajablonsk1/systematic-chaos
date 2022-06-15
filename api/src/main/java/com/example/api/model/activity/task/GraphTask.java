package com.example.api.model.activity.task;

import com.example.api.model.question.Question;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.OneToMany;
import java.util.LinkedList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class GraphTask extends Task {
    @OneToMany
    private List<Question> questions = new LinkedList<>();
    private Double maxPoints100;
    private Integer timeToSolve;
}
