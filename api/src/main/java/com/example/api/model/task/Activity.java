package com.example.api.model.task;

import com.example.api.model.map.ActivityMap;
import com.example.api.model.map.Requirement;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.persistence.criteria.CriteriaBuilder;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Activity {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;
    private String name;
    private String description;
    private Integer posX;
    private Integer posY;
    private Integer experiance;

    @OneToOne
    private Requirement requirement;

    @ManyToOne
    @JoinColumn(name = "requirementFinished_id")
    private Requirement requirementFinished;

    @ManyToOne
    @JoinColumn(name = "activityMap_id")
    private ActivityMap activityMap;
}
