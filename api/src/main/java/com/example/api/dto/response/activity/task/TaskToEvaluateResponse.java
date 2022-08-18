package com.example.api.dto.response.activity.task;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

import com.example.api.dto.response.activity.task.util.FileResponse;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TaskToEvaluateResponse {
    private String userEmail;
    private Long fileTaskResponseId;
    private String firstName;
    private String lastName;
    private String activityName;
    private Boolean isLate;
    private String activityDetails;
    private String userAnswer;
    private List<FileResponse> file;
    private Double maxPoints;
    private Long fileTaskId;
    private Long remaining;
}
