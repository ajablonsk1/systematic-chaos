package com.example.api.dto.response.map;

import com.example.api.dto.response.map.task.MapTask;
import lombok.AllArgsConstructor;
import lombok.Data;
import java.util.List;

@Data
@AllArgsConstructor
public class ActivityMapResponse {
    private Long id;
    private List<MapTask> tasks;
    private Integer mapSizeX;
    private Integer mapSizeY;
}
