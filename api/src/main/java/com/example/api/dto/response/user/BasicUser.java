package com.example.api.dto.response.user;

import com.example.api.model.user.User;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class BasicUser {
    @Schema(required = true) private Long id;
    @Schema(required = true) private String firstName;
    @Schema(required = true) private String lastName;

    public BasicUser(User user) {
        this.id = user.getId();
        this.firstName = user.getFirstName();
        this.lastName = user.getLastName();
    }
}
