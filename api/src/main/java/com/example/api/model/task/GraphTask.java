package com.example.api.model.task;

import com.example.api.model.question.Question;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class GraphTask extends Task{
    @OneToMany(mappedBy = "graphTask")
    private List<Question> questions;
}
