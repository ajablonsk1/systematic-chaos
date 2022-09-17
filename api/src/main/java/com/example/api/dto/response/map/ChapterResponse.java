package com.example.api.dto.response.map;

import com.example.api.model.map.Chapter;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ChapterResponse {
    private Long id;
    private String name;
    private Integer noActivities;
    private Double maxPoints;
    private String mapSize;
    private Integer posX;
    private Integer posY;

    public ChapterResponse(Chapter chapter) {
        this.id = chapter.getId();
        this.name = chapter.getName();
        this.noActivities = chapter.getNoActivities();
        this.maxPoints = chapter.getMaxPoints();
        this.mapSize = chapter.getActivityMap().getMapSizeX() + " x " + chapter.getActivityMap().getMapSizeY();
        this.posX = chapter.getPosX();
        this.posY = chapter.getPosY();
    }
}
