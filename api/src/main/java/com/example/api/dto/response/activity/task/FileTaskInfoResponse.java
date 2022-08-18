package com.example.api.dto.response.activity.task;

import com.example.api.dto.response.activity.task.util.FileResponse;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FileTaskInfoResponse {
    private Long fileTaskId;
    private String name;
    private String description;
    private String answer;
    private List<FileResponse> taskFiles;
    private Double points;
    private String remarks;
    private FileResponse feedbackFile;
}
