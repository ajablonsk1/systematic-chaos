package com.example.api.model.map;

import com.example.api.model.activity.task.FileTask;
import com.example.api.model.activity.task.GraphTask;
import com.example.api.model.activity.task.Info;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.LinkedList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class ActivityMap {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    @OneToMany
    private List<GraphTask> graphTasks = new LinkedList<>();

    @OneToMany
    private List<FileTask> fileTasks = new LinkedList<>();

    @OneToMany
    private List<Info> infos = new LinkedList<>();

    private Integer mapSizeX;
    private Integer mapSizeY;
}