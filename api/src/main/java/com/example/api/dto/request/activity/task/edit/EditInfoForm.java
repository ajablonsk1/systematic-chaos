package com.example.api.dto.request.activity.task.edit;

import com.example.api.dto.request.activity.task.create.CreateInfoForm;
import com.example.api.dto.response.map.task.ActivityType;
import com.example.api.model.activity.task.Info;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class EditInfoForm extends EditActivityForm {
    public EditInfoForm(Info info) {
        super(info.getId(), ActivityType.INFO, new CreateInfoForm(info));
    }
}
