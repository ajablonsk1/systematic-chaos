package com.example.api.controller.activity;

import com.example.api.dto.request.activity.task.edit.EditActivityForm;
import com.example.api.error.exception.EntityNotFoundException;
import com.example.api.error.exception.RequestValidationException;
import com.example.api.error.exception.WrongUserTypeException;
import com.example.api.service.activity.ActivityService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;

@RestController
@RequiredArgsConstructor
@RequestMapping("/activity")
@SecurityRequirement(name = "JWT_AUTH")
public class ActivityController {
    private final ActivityService activityService;

    @GetMapping("/edit/info")
    ResponseEntity<EditActivityForm> getActivityEditInfo(@RequestParam Long activityID) throws WrongUserTypeException, EntityNotFoundException {
        return ResponseEntity.ok().body(activityService.getActivityEditInfo(activityID));
    }

    @PostMapping("/edit")
    ResponseEntity<?> getActivityEditInfo(@RequestBody EditActivityForm form) throws RequestValidationException, ParseException {
        activityService.editActivity(form);
        return ResponseEntity.ok().body(null);
    }

    @DeleteMapping("/delete")
    ResponseEntity<?> deleteActivity(@RequestParam Long activityID) throws WrongUserTypeException, EntityNotFoundException {
        activityService.deleteActivity(activityID);
        return new ResponseEntity<>(HttpStatus.OK);
    }


}
