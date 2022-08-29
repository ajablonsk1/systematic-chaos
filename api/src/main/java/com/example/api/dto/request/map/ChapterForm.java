package com.example.api.dto.request.map;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ChapterForm {
    private String name;
    private Integer sizeX;
    private Integer sizeY;
    private Long imageId;
}
