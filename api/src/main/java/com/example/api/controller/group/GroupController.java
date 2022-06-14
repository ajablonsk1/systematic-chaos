package com.example.api.controller.group;

import com.example.api.error.exception.EntityNotFoundException;
import com.example.api.model.group.Group;
import com.example.api.model.question.Question;
import com.example.api.service.group.GroupService;
import com.example.api.service.group.form.SaveGroupForm;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
