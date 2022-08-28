package com.example.api.dto.response.activity.task.result;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ScaleActivityStatistics {
    private Double grade;
    private Integer results;

    public ScaleActivityStatistics(Double grade) {
        this.grade = grade;
        this.results = 0;
    }

    public void incrementResults() {
        this.results += 1;
    }
}
