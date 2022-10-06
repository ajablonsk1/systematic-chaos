package com.example.api.model.user.badge;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.lang.Nullable;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class BadgeRequirement {
    @Nullable
    private Double scorePercentage;

    @Nullable
    private Integer weeksInRow;

    @Nullable
    private Integer quantity;
}
