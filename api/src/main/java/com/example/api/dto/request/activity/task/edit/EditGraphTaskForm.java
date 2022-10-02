package com.example.api.dto.request.activity.task.edit;

import com.example.api.dto.request.activity.task.create.CreateGraphTaskForm;
import com.example.api.dto.response.map.task.ActivityType;
import com.example.api.model.activity.task.GraphTask;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class EditGraphTaskForm extends EditActivityForm {
    public EditGraphTaskForm(GraphTask graphTask) {
        super(graphTask.getId(), ActivityType.EXPEDITION, new CreateGraphTaskForm(graphTask));
    }
}
