package com.example.api.model.map;
import com.example.api.model.activity.task.FileTask;
import com.example.api.model.activity.task.GraphTask;
import com.example.api.model.activity.task.Survey;
import com.example.api.model.map.requirement.Requirement;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Chapter {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private Integer posX;
    private Integer posY;

    @OneToOne
    private Requirement requirement;

    @OneToOne
    private Chapter nextChapter;

    @OneToOne
    private ActivityMap activityMap;

    public Chapter(String name, ActivityMap activityMap, Integer posX, Integer poxY) {
        this.name = name;
        this.activityMap = activityMap;
        this.posX = posX;
        this.posY = poxY;
    }

    public int getNoActivities() {
        return activityMap.getGraphTasks().size() + activityMap.getFileTasks().size() +
                activityMap.getInfos().size() + activityMap.getSurveys().size();
    }

    public double getMaxPoints() {
        double maxPoints = activityMap.getGraphTasks().stream().mapToDouble(GraphTask::getMaxPoints).sum();
        maxPoints += activityMap.getFileTasks().stream().mapToDouble(FileTask::getMaxPoints).sum();
        maxPoints += activityMap.getSurveys().stream().mapToDouble(Survey::getPoints).sum();
        return maxPoints;
    }
}
