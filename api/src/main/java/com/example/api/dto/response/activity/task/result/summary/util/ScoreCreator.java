package com.example.api.dto.response.activity.task.result.summary.util;

import com.example.api.dto.response.activity.task.result.summary.Score;
import com.example.api.model.activity.result.TaskResult;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ScoreCreator {
    private String groupName;
    private Double maxPoints;
    private Double sumOfScores;
    private Integer numberOfScores;

    public ScoreCreator(String groupName, Double maxPoints) {
        this.groupName = groupName;
        this.maxPoints = maxPoints;
        this.sumOfScores = 0D;
        this.numberOfScores = 0;
    }

    public void add(TaskResult taskResult) {
            sumOfScores += taskResult.getPointsReceived();
            numberOfScores += 1;
    }

    public Score create() {
        Double score = 100 * sumOfScores / (maxPoints * numberOfScores);
        score = Math.round(score * 10.0) / 10.0;
        return new Score(groupName, score);
    }
}
