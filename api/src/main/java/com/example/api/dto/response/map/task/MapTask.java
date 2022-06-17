package com.example.api.dto.response.map.task;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class MapTask {
    private Long id;
    private Integer posX;
    private Integer posY;
    private ActivityType type;
}
