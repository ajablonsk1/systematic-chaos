package com.example.api.dto.response.activity.task.result;

import com.example.api.dto.response.map.task.ActivityType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.MappedSuperclass;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@MappedSuperclass
public abstract class PointsResponse {
    protected Long dateMillis;
    protected Double pointsReceived;
    protected ActivityType activityType;
    protected String activityName;

    public Long getDateMillis() {
        return this.dateMillis;
    }
}
