package com.example.api.dto.response.user.dashboard;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@AllArgsConstructor
@Getter
@Setter
public class LastAddedActivity {
    private String chapterName;
    private String activityType;
    private Double points;
    private Long availableUntil;
}
