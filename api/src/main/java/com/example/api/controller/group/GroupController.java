package com.example.api.controller.group;

import com.example.api.dto.request.group.SaveGroupForm;
import com.example.api.model.group.Group;
import com.example.api.service.group.GroupService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/group")
public class GroupController {
    private final GroupService groupService;

    @PostMapping
    public ResponseEntity<Group> saveGroup(@RequestBody SaveGroupForm form) {
        return ResponseEntity.ok().body(groupService.saveGroup(form));
    }
}
