package com.example.api.dto.response.group;

import com.example.api.model.group.Group;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class GroupCode {
    @Schema(required = true) private Long id;
    @Schema(required = true) private String name;
    @Schema(required = true) private String invitationCode;
    @Schema(required = true) private Long studentsCount;

    public GroupCode(Group group) {
        this.id = group.getId();
        this.name = group.getName();
        this.invitationCode = group.getInvitationCode();
    }
}
