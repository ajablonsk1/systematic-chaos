package com.example.api.dto.request.map;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RequirementForm<T> {
    private Long id;
    private Boolean selected;
    private T value;
}
