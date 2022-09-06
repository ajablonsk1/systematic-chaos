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
    private List<GraphTask> graphTasks = new LinkedList<>();

    @OneToMany
    private List<FileTask> fileTasks = new LinkedList<>();
}
