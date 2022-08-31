package com.example.api.model.activity.task;

import com.example.api.dto.request.activity.task.create.CreateFileTaskForm;
import com.example.api.model.user.User;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;

@Getter
@Setter
@NoArgsConstructor
@Entity
public class FileTask extends Task {

    public FileTask(CreateFileTaskForm form, User professor, Long expireDateMillis) {
        super(form.getTitle(), form.getDescription(), form.getPosX(), form.getPosY(), professor,
                form.getRequiredKnowledge(), form.getMaxPoints(), expireDateMillis);
        double experiance = form.getMaxPoints() * 10;
        super.setExperience(experiance);
    }
}
