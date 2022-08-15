package com.example.api.dto.request.activity.result;

import com.example.api.dto.response.map.task.ActivityType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ActivityTypeWithIdForm {
    private Long id;
    private ActivityType type;
}
