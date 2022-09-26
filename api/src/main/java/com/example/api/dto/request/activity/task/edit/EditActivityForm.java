package com.example.api.dto.request.activity.task.edit;

import com.example.api.dto.request.activity.task.create.CreateActivityForm;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
public abstract class EditActivityForm {
    @Schema(required = true) private Long activityID;
    @Schema(required = true) private CreateActivityForm activityBody;

}
