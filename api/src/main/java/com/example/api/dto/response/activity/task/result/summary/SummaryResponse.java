package com.example.api.dto.response.activity.task.result.summary;

import lombok.Data;

import java.util.List;

@Data
public class SummaryResponse {
    private Double avgGrade;
    private String bestScoreActivityName;
    private String worstScoreActivityName;
    private Integer assessedActivityCounter;
    private Integer notAssessedActivityCounter;
    private Integer waitingAnswersNumber;
    private List<AverageGrade> avgGradesList;
    private List<AverageActivityScore> avgActivitiesScore;

}
