package com.example.api.model.map.requirement;

import com.example.api.model.activity.task.FileTask;
import com.example.api.model.activity.task.GraphTask;
import com.example.api.model.group.Group;
import com.example.api.model.user.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.lang.Nullable;

import javax.persistence.*;
import java.util.LinkedList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Requirement {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private RequirementType type;
    private boolean selected;

    @Nullable
    private Long dateFrom;

    @Nullable
    private Long dateTo;

    @Nullable
    private Double minPoints;

    @OneToMany
    private List<Group> allowedGroups = new LinkedList<>();

    @OneToMany
    private List<User> allowedStudents = new LinkedList<>();

    @OneToMany
    private List<GraphTask> finishedGraphTasks = new LinkedList<>();

    @OneToMany
    private List<FileTask> finishedFileTasks = new LinkedList<>();

    public Requirement(String name, RequirementType type, boolean selected) {
        this.name = name;
        this.type = type;
        this.selected = selected;
    }

    public boolean isFulfilled(User student, List<GraphTask> graphTasks, List<FileTask> fileTasks) {
        if (!selected) {
            return true;
        }
        switch (type) {
            case DATE_FROM -> {
                return System.currentTimeMillis() > dateFrom;
            }
            case DATE_TO -> {
                return System.currentTimeMillis() < dateTo;
            }
            case MIN_POINTS -> {
                return student.getPoints() >= minPoints;
            }
            case GROUPS -> {
                return allowedGroups.contains(student.getGroup());
            }
            case STUDENTS -> {
                return allowedStudents.contains(student);
            }
            case GRAPH_TASKS -> {
                return graphTasks.containsAll(finishedGraphTasks);
            }
            case FILE_TASKS -> {
                return fileTasks.containsAll(finishedFileTasks);
            }
            default -> {
                return false;
            }
        }
    }
}
