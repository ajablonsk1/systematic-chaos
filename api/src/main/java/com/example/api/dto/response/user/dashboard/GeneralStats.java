package com.example.api.dto.response.user.dashboard;

import lombok.*;

@Data
@AllArgsConstructor
@Getter
@Setter
public class GeneralStats {
    private Double avgGraphTask;
    private Double avgCombatTask;
    private Long surveysNumber;
    private Double graphTaskPoints;
    private Double combatTaskPoints;
    private Double allPoints;
    private Double maxPoints;
}
