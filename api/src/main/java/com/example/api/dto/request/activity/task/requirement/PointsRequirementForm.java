package com.example.api.dto.request.activity.task.requirement;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PointsRequirementForm {
    private Boolean selected;
    private Double minPoints;
}
