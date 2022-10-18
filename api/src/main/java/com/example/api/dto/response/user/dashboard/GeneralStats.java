package com.example.api.dto.response.user.dashboard;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@AllArgsConstructor
@Getter
@Setter
public class GeneralStats {
    private Double avgGraphTask;
    private Double avgFileTask;
    private Long surveysNumber;
    private Double graphTaskPoints;
    private Double fileTaskPoints;
    private Double allPoints;
    private Double maxPoints;
}
