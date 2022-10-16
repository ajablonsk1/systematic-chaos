package com.example.api.dto.response.util;

import com.example.api.model.util.File;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ByteFileResponse {
    private Long fileId;
    private String name;
    private byte[] file;

    public ByteFileResponse(File file) {
        this.fileId = file.getId();
        this.name = file.getName();
        this.file = file.getFile();
    }
}
