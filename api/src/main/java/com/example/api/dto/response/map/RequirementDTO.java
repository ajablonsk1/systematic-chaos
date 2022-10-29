package com.example.api.dto.response.map;

import com.example.api.model.map.requirement.RequirementValueType;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class RequirementDTO<T> {
    private Long id;
    private String name;
    private T value;
    private RequirementValueType type;
    private Boolean selected;
}
