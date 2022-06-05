package com.example.api.form;

import com.example.api.model.user.HeroType;
import com.example.api.model.user.AccountType;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
public class RegisterUserForm {
    @Schema(required = true) private String firstName;
    @Schema(required = true) private String lastName;
    @Schema(required = true) private String email;
    @Schema(required = true) private String password;
    @Schema(required = true) private String invitationCode;
    @Schema(required = true) private AccountType accountType;
    @Schema(required = true) private HeroType heroType;
}
