package com.example.api.model.map;

import com.example.api.model.activity.task.*;
import com.example.api.model.util.File;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.util.Collection;
import java.util.LinkedList;
import java.util.List;
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
    @JoinColumn
    @OnDelete(action = OnDeleteAction.CASCADE)
    private List<GraphTask> graphTasks = new LinkedList<>();

    @OneToMany
    @JoinColumn
    @OnDelete(action = OnDeleteAction.CASCADE)
    private List<FileTask> fileTasks = new LinkedList<>();

    @OneToMany
    @JoinColumn
    @OnDelete(action = OnDeleteAction.CASCADE)
    private List<Info> infos = new LinkedList<>();

    @OneToMany
    @JoinColumn
    @OnDelete(action = OnDeleteAction.CASCADE)
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