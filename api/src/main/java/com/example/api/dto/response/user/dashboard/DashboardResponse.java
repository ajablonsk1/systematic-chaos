package com.example.api.dto.response.user.dashboard;

import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Data
@NoArgsConstructor
@Getter
@Setter
public class DashboardResponse {
    private HeroTypeStats heroTypeStats;
    private GeneralStats generalStats;
    private List<LastAddedActivity> lastAddedActivities;
    private HeroStats heroStats;

}
