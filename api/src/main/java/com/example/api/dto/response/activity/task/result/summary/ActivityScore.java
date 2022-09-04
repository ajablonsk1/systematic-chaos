package com.example.api.dto.response.activity.task.result.summary;

import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Data
@NoArgsConstructor
@Getter
@Setter
public class ActivityScore {
    private String activityName;
    private Double avgScore;
    private List<Score> scores;
}
