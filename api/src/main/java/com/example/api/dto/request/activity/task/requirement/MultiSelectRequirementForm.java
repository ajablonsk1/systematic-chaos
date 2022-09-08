package com.example.api.dto.request.activity.task.requirement;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MultiSelectRequirementForm {
    private Boolean selected;
    private List<String> values;
}
