package com.example.api.dto.response.user.dashboard;

import lombok.*;

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
