package com.example.api.dto.request.activity.task.edit;

import com.example.api.dto.request.activity.task.create.CreateFileTaskForm;
import com.example.api.model.activity.task.FileTask;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class EditFileTaskForm extends EditActivityForm {
    public EditFileTaskForm(FileTask fileTask) {
        this.setActivityID(fileTask.getId());
        this.setActivityBody(new CreateFileTaskForm(fileTask));
    }
}
