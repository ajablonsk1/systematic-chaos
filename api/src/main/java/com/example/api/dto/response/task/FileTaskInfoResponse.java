package com.example.api.dto.response.task;

import com.example.api.dto.response.task.util.FileResponse;
import com.example.api.model.util.File;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class FileTaskInfoResponse {
    private Long fileTaskId;
    private String name;
    private String description;
    private List<FileResponse> files;
    private String content;
}
