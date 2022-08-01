package com.example.api.dto.response.task;

import com.example.api.model.util.File;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TaskToEvaluateResponse {
    private String userEmail;
    private Long fileTaskId;
    private String activityName;
    private Boolean isLate;
    private String activityDetails;
    private String userAnswer;
    private List<File> file;
    private Double maxPoints;
    private Long remaining;
}
