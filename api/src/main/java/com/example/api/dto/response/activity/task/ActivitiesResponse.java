package com.example.api.dto.response.activity.task;

import com.example.api.dto.response.map.task.ActivityType;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ActivitiesResponse {
    private Long id;
    private String name;
    private String chapterName;
    private ActivityType type;
}
