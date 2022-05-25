package com.example.api.model.map;

import com.example.api.model.group.AccessDate;
import com.example.api.model.task.Activity;
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

    @OneToMany(mappedBy = "requirementFinished")
    private List<Activity> finishedActivities;
    private Integer points;

    @OneToMany(mappedBy = "requirement")
    private List<AccessDate> accessDates;
}
