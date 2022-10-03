package com.example.api.dto.response.user.rank;

import com.example.api.model.user.HeroType;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class RanksForHeroTypeResponse {
    private final HeroType heroType;
    private final List<RankResponse> ranks;
}
