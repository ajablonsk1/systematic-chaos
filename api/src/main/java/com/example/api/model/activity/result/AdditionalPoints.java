package com.example.api.model.activity.result;

import com.example.api.model.user.User;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;

@Getter
@Setter
@NoArgsConstructor
@Entity
public class AdditionalPoints extends TaskResult{
    private String professorEmail;
    private String description;

    public AdditionalPoints(Long id,
                            User student,
                            Double points,
                            Long sendDateMillis,
                            String professorEmail,
                            String description) {
        super(id, student, points, sendDateMillis);
        this.professorEmail = professorEmail;
        this.description = description;
    }
}
