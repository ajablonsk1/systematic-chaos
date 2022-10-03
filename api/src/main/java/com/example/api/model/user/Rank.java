package com.example.api.model.user;

import com.example.api.model.util.Image;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Rank {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private HeroType heroType;
    private String name;
    private Double minPoints;
    private Double maxPoints;

    @OneToOne
    private Image image;
}
