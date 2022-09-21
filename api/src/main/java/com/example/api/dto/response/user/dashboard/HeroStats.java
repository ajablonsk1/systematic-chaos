package com.example.api.dto.response.user.dashboard;

import lombok.*;

@Data
@AllArgsConstructor
@Getter
@Setter
public class HeroStats {
    private Double experiencePoints;
    private Double nextLvlPoints;
    private String rankName;
    private Long badgesNumber;
    private Long completedActivities;
}
