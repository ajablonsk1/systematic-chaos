package com.example.api.dto.response.map.task;

import com.example.api.model.activity.task.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MapTaskStudent extends MapTask{
    private Boolean isFulfilled;
    private Boolean isCompleted;

    public MapTaskStudent(Long id, Integer posX, Integer posY, ActivityType type, String title, Double points, Boolean isFulfilled, Boolean isCompleted) {
        super(id, posX, posY, type, title, points);
        this.isFulfilled = isFulfilled;
        this.isCompleted = isCompleted;
    }

    public MapTaskStudent(Activity activity, Boolean isFulfilled, Boolean isCompleted) {
        super(activity.getId(), activity.getPosX(), activity.getPosY(), activity.getActivityType(), activity.getTitle(), activity.getMaxPoints());
        this.isFulfilled = isFulfilled;
        this.isCompleted = isCompleted;
    }
}
