package com.example.api.dto.response.map.task;

import com.example.api.model.activity.task.Activity;
import lombok.*;

@Getter
@Setter
public class MapTaskProfessor extends MapTask{
    private Boolean isActivityBlocked;

    public MapTaskProfessor(Long id, Integer posX, Integer posY, ActivityType type, String title, Double points, Boolean isActivityBlocked) {
        super(id, posX, posY, type, title, points);
        this.isActivityBlocked = isActivityBlocked;
    }

    public MapTaskProfessor(Activity activity, Boolean isActivityBlocked) {
        super(activity.getId(), activity.getPosX(), activity.getPosY(), activity.getActivityType(), activity.getTitle(), activity.getMaxPoints());
        this.isActivityBlocked = isActivityBlocked;
    }
}
