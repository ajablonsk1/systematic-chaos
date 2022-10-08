package com.example.api.dto.request.user.rank;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class EditRankForm extends AddRankForm{
    @Schema(required = true) private Long rankId;
}
