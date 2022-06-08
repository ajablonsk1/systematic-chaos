package com.example.api.model.map;

import com.example.api.model.activity.task.FileTask;
import com.example.api.model.activity.task.GraphTask;
import com.example.api.model.group.AccessDate;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Requirement {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    @Enumerated(EnumType.STRING)
    private MustFulfil mustFulfil;

    @OneToMany
    private List<GraphTask> finishedGraphTasks;

    @OneToMany
    private List<FileTask> finishedFileTasks;

    private Integer experienceRequired;

    @OneToMany
    private List<AccessDate> accessDates;
}
