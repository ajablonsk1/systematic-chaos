package com.example.api.model.activity.task;

import com.example.api.dto.response.map.task.ActivityType;
import com.example.api.model.map.requirement.Requirement;
import com.example.api.model.user.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.util.LinkedList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@MappedSuperclass
public abstract class Activity {
    @TableGenerator(name = "myGen", table = "ID_GEN", pkColumnName = "GEN_KEY", valueColumnName = "GEN_VALUE", pkColumnValue = "NEXT_ID", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.TABLE, generator = "myGen")
    @Id
    private Long id;
    private String title;
    private String description;
    private Integer posX;
    private Integer posY;
    private Double experience;
    private Long creationTime = System.currentTimeMillis();

    @OneToMany
    private List<Requirement> requirements = new LinkedList<>();
    private Boolean isBlocked = true;

    @OneToOne
    @OnDelete(action = OnDeleteAction.NO_ACTION)
    private User professor;

    @Enumerated(EnumType.STRING)
    private ActivityType activityType;

    public Activity(String name, String description, int posX, int posY, User professor){
        this.title = name;
        this.description = description;
        this.posX = posX;
        this.posY = posY;
        this.professor = professor;
    }
    abstract public Double getMaxPoints();
}
