package com.example.api.dto.response.activity.task.result.summary;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class Score {
    private String groupName;
    private Double score;
}
