package com.example.api.dto.response.activity.task.result;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class ActivityStatisticsResponse {
    private Double activity100;
    private Integer answersNumber;
    private Double avgPoints;
    private Double avgPercentageResult;
    private Double bestScore;
    private Double worstScore;
    private List<GroupActivityStatistics> avgScores;
    private List<ScaleActivityStatistics> scaleScores;
}
