package com.example.api.dto.request.activity.task.edit;

import com.example.api.dto.request.activity.task.create.CreateFileTaskForm;
import com.example.api.dto.response.map.task.ActivityType;
import com.example.api.model.activity.task.FileTask;
import lombok.*;

@Data
@AllArgsConstructor
public class EditFileTaskForm extends EditActivityForm {
    public EditFileTaskForm(FileTask fileTask) {
        super(fileTask.getId(), ActivityType.TASK, new CreateFileTaskForm(fileTask));
    }
}
