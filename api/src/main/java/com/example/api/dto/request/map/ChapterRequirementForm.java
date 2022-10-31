package com.example.api.dto.request.map;

import com.example.api.dto.request.activity.task.requirement.RequirementForm;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ChapterRequirementForm {
    private Long chapterId;
    private Boolean isBlocked;
    private List<RequirementForm> requirements;
}
