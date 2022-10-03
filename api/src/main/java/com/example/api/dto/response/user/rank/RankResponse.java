package com.example.api.dto.response.user.rank;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class RankResponse {
    private final Long rankId;
    private final String name;
    private final Double minPoints;
    private final Double maxPoints;
    private final byte[] image;
}
