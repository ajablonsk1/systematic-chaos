package com.example.api.model.map;

import com.example.api.model.activity.task.*;
import com.example.api.model.util.File;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Collection;
import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class ActivityMap {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToMany
    private List<GraphTask> graphTasks = new LinkedList<>();

    @OneToMany
    private List<FileTask> fileTasks = new LinkedList<>();

    @OneToMany
    private List<Info> infos = new LinkedList<>();

    @OneToMany
    private List<Survey> surveys = new LinkedList<>();

    private Integer mapSizeX;
    private Integer mapSizeY;

    @OneToOne
    private File image;

    public ActivityMap(int mapSizeX, int mapSizeY, File image) {
        this.mapSizeX = mapSizeX;
        this.mapSizeY = mapSizeY;
        this.image = image;
    }

    public boolean hasActivity(Activity activity) {
        return Stream.of(graphTasks, fileTasks, infos, surveys)
                .flatMap(Collection::stream)
                .toList()
                .contains(activity);
    }
}