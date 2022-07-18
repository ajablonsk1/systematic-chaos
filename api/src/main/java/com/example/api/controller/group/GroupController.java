package com.example.api.controller.group;

import com.example.api.dto.request.group.SaveGroupForm;
import com.example.api.dto.response.group.GroupCode;
import com.example.api.dto.response.group.GroupResponse;
import com.example.api.error.exception.EntityAlreadyInDatabaseException;
import com.example.api.model.group.Group;
import com.example.api.service.group.GroupService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/group")
public class GroupController {
    private final GroupService groupService;

    @PostMapping
    public ResponseEntity<GroupResponse> saveGroup(@RequestBody SaveGroupForm form) {
        return ResponseEntity.ok().body(groupService.saveGroup(form));
    }

    @GetMapping("/invitation-code/list")
    ResponseEntity<List<GroupCode>> getInvitationCodeList() {
        return ResponseEntity.ok().body(groupService.getInvitationCodeList());
    }
}
