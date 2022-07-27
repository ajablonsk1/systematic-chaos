package com.example.api.dto.request.user;

import com.example.api.model.user.AccountType;
import com.example.api.model.user.HeroType;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RegisterUserForm {
    @Schema(required = true) private String firstName;
    @Schema(required = true) private String lastName;
    @Schema(required = true) private String email;
    @Schema(required = true) private String password;
    @Schema(required = false) private String invitationCode;
    @Schema(required = true) private AccountType accountType;
    @Schema(required = false) private HeroType heroType;
    @Schema(required = false) private Integer indexNumber;
}
