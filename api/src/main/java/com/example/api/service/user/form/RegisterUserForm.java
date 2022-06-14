package com.example.api.service.user.form;

import com.example.api.model.user.AccountType;
import com.example.api.model.user.HeroType;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
public class RegisterUserForm {
    @Schema(required = true) private String firstName;
    @Schema(required = true) private String lastName;
    @Schema(required = true) private String email;
    @Schema(required = true) private String password;
    @Schema(required = false) private String invitationCode;
    @Schema(required = true) private AccountType accountType;
    @Schema(required = false) private HeroType heroType;
}
