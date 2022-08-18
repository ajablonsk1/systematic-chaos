package com.example.api.dto.response.ranking;

import com.example.api.model.user.HeroType;
import com.example.api.model.user.User;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class RankingResponse {
    @Schema(required = true) private String firstName;
    @Schema(required = true) private String lastName;
    @Schema(required = true) private String groupName;
    @Schema(required = true) private HeroType heroType;
    @Schema(required = true) private Double points;
    @Schema(required = true) private Integer position;

    public RankingResponse(User user) {
        this.firstName = user.getFirstName();
        this.lastName = user.getLastName();
        this.groupName = user.getGroup().getName();
        this.heroType = user.getHeroType();
    }
}
