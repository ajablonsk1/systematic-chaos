package com.example.api.model.activity.task;

import com.example.api.model.map.Requirement;
import com.example.api.model.user.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@MappedSuperclass
public abstract class Activity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String description;
    private Integer posX;
    private Integer posY;
    private Integer experiance;

    @OneToOne
    private Requirement requirement;

    @OneToOne
    private User professor;
}
