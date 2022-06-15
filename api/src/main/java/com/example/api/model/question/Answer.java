package com.example.api.model.question;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.lang.Nullable;

import javax.persistence.*;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Answer {

    public Answer(Long id, Question question){
        this.id = id;
        this.question = question;
    }

    public Answer(Long id, @Nullable Option option, Question question){
        this.id = id;
        this.option = option;
        this.question = question;
    }

    public Answer(Long id, @Nullable String openAnswer, Question question){
        this.id = id;
        this.openAnswer = openAnswer;
        this.question = question;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    @ManyToOne
    private Question question;

    @Nullable
    @OneToOne
    private Option option;

    @Nullable
    @OneToMany
    private List<Option> options;

    @Nullable
    private String openAnswer;
}
