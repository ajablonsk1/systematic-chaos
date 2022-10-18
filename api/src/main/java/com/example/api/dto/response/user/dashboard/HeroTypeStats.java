package com.example.api.dto.response.user.dashboard;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@AllArgsConstructor
@Getter
@Setter
public class HeroTypeStats {
    private String heroType;
    private Integer rankPosition;
    private Long rankLength;
    private Double betterPlayerPoints;
    private Double worsePlayerPoints;
}
