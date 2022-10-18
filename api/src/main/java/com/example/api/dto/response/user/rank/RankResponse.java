package com.example.api.dto.response.user.rank;

import com.example.api.model.user.Rank;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class RankResponse {
    private final Long rankId;
    private final String name;
    private final Double minPoints;
    private final byte[] image;

    public RankResponse(Rank rank) {
        this.rankId = rank.getId();
        this.name = rank.getName();
        this.minPoints = rank.getMinPoints();
        this.image = rank.getImage().getFile();
    }
}
