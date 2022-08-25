package com.example.api.dto.response.activity.task.result;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class TotalPointsResponse {
    Double totalPointsReceived;
    Double totalPointsPossibleToReceive;
}
