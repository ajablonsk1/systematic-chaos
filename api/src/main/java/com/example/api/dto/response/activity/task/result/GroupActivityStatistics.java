package com.example.api.dto.response.activity.task.result;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class GroupActivityStatistics {
    private String groupName;
    private Double avgPoints;
    private Double avgPercentageResult;
}
