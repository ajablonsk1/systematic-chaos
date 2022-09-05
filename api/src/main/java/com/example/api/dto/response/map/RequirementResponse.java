package com.example.api.dto.response.map;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class RequirementResponse<T> {
    private Long id;
    private String name;
    private T value;
    private Boolean selected;
}
