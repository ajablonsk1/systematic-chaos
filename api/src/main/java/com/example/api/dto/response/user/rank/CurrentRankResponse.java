package com.example.api.dto.response.user.rank;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CurrentRankResponse {
    private final RankResponse previousRank;
    private final RankResponse currentRank;
    private final RankResponse nextRank;
    private final Double currentPoints;
}
