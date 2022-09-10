package com.example.api.dto.response.user.dashboard;

import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@NoArgsConstructor
@Getter
@Setter
public class LastAddedActivity {
    private String chapterName;
    private String activityType;
    private Double points;
    private String availableUntil;
}
