package com.example.api.dto.response.util;

import com.example.api.model.util.ImageType;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ChapterImageResponse {
    private Long id;
    private String name;
    private ImageType type;
}
