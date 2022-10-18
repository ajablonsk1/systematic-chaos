package com.example.api.dto.response.user.dashboard;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Data
@AllArgsConstructor
@Getter
@Setter
public class DashboardResponse {
    private HeroTypeStats heroTypeStats;
    private GeneralStats generalStats;
    private List<LastAddedActivity> lastAddedActivities;
    private HeroStats heroStats;

}
