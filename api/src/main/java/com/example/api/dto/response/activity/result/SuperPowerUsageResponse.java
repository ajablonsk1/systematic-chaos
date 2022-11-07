package com.example.api.dto.response.activity.result;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Setter;

@Data
@AllArgsConstructor
@Setter
public class SuperPowerUsageResponse {
    private Boolean canBeUsed;
    private String message;
}
