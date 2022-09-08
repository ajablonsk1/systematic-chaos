package com.example.api.dto.request.activity.task.requirement;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ActivityRequirementForm {
    private Long activityId;
    private DateRequirementForm dateFrom;
    private DateRequirementForm dateTo;
    private PointsRequirementForm minPoints;
    private MultiSelectRequirementForm allowedGroups;
    private MultiSelectRequirementForm allowedStudents;
    private MultiSelectRequirementForm finishedGraphTasks;
    private MultiSelectRequirementForm finishedFileTasks;
}
