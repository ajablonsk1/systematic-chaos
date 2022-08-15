package com.example.api.controller.group;

import com.example.api.dto.request.group.SaveGroupForm;
import com.example.api.dto.response.group.GroupCode;
import com.example.api.dto.response.user.BasicUser;
import com.example.api.error.exception.EntityAlreadyInDatabaseException;
import com.example.api.error.exception.EntityNotFoundException;
import com.example.api.error.exception.WrongUserTypeException;
import com.example.api.service.group.GroupService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/group")
@SecurityRequirement(name = "JWT_AUTH")
public class GroupController {
    private final GroupService groupService;

    @PostMapping
    public ResponseEntity<Long> saveGroup(@RequestBody SaveGroupForm form) throws EntityAlreadyInDatabaseException, WrongUserTypeException {
        return ResponseEntity.ok().body(groupService.saveGroup(form));
    }

    @GetMapping("/invitation-code/list")
    ResponseEntity<List<GroupCode>> getInvitationCodeList() {
        return ResponseEntity.ok().body(groupService.getInvitationCodeList());
    }

    @GetMapping("/users")
    public ResponseEntity<List<BasicUser>> getGroupUserList(@RequestParam Long groupId)
            throws EntityNotFoundException {
        return ResponseEntity.ok().body(groupService.getGroupUserList(groupId));
    }

    @GetMapping("/students")
    public ResponseEntity<List<BasicUser>> getGroupStudentsList(@RequestParam Long groupId)
            throws EntityNotFoundException {
        return ResponseEntity.ok().body(groupService.getGroupStudentList(groupId));
    }

    @GetMapping("/owner")
    public ResponseEntity<BasicUser> getGroupOwner(@RequestParam Long groupId)
            throws EntityNotFoundException {
        return ResponseEntity.ok().body(groupService.getGroupOwner(groupId));
    }
}
