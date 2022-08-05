package com.example.api.dto.response.task.util;

import com.example.api.model.util.File;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class FileResponse {
    private Long id;
    private String name;

    public FileResponse(File file) {
        this.id = file.getId();
        this.name = file.getName();
    }
}
