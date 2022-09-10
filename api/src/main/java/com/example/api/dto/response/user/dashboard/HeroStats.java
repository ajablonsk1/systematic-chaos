package com.example.api.dto.response.user.dashboard;

import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@NoArgsConstructor
@Getter
@Setter
public class HeroStats {
    private Double experiencePoints;
    private Double nextLvlPoints;
    private String rankName;
    private Long badgesNumber;
    private Long completedActivities;
}
