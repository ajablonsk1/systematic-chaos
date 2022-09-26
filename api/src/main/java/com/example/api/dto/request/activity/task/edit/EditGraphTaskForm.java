package com.example.api.dto.request.activity.task.edit;

import com.example.api.dto.request.activity.task.create.CreateGraphTaskForm;
import com.example.api.model.activity.task.GraphTask;
import lombok.Data;

@Data
public class EditGraphTaskForm extends EditActivityForm {
    public EditGraphTaskForm(GraphTask graphTask) {
        this.setActivityID(graphTask.getId());
        this.setActivityBody(new CreateGraphTaskForm(graphTask));
    }

}
