package com.example.api.model.activity.task;

import com.example.api.model.user.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.MappedSuperclass;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@MappedSuperclass
public abstract class Task extends Activity {
    private String requiredKnowledge;
    private Double maxPoints;

    public Task(String name, String description, int posX, int posY, User professor,
                String requiredKnowledge, Double maxPoints){
        super(name, description, posX, posY, professor);
        this.requiredKnowledge = requiredKnowledge;
        this.maxPoints = maxPoints;
    }
}
