package com.example.api.dto.response.activity.task.result;

import com.example.api.dto.response.map.task.ActivityType;
import lombok.Data;

@Data
public class AdditionalPointsListResponse extends PointsResponse {

    public AdditionalPointsListResponse(AdditionalPointsResponse additionalPointsResponse) {
        super(
                additionalPointsResponse.getDateMillis(),
                additionalPointsResponse.getPoints(),
                ActivityType.ADDITIONAL,
                additionalPointsResponse.getDescription()
        );
    }
}
