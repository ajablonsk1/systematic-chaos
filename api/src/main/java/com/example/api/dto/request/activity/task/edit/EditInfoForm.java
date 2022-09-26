package com.example.api.dto.request.activity.task.edit;

import com.example.api.dto.request.activity.task.create.CreateInfoForm;
import com.example.api.model.activity.task.Info;
import lombok.Data;

@Data
public class EditInfoForm extends EditActivityForm {
    public EditInfoForm(Info info) {
        this.setActivityID(info.getId());
        this.setActivityBody(new CreateInfoForm(info));
    }
}
