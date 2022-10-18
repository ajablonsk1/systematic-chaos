package com.example.api.dto.response.map.task;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public abstract class MapTask {
    private Long id;
    private Integer posX;
    private Integer posY;
    private ActivityType type;
    private String title;
    private Double points;
}
