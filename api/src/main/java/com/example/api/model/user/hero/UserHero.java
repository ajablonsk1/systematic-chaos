package com.example.api.model.user.hero;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.ManyToOne;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserHero {
    @ManyToOne
    private Hero hero;
    private Integer timesSuperPowerUsedInResult;
    private Long lastSuperPowerUsageTimeMillis;
}
