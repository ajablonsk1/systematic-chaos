package com.example.api.util.visitor;

import com.example.api.model.map.requirement.*;
import com.example.api.model.user.User;
import com.example.api.security.AuthenticationService;
import com.example.api.service.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Calendar;

@Service
@RequiredArgsConstructor
public class RequirementFulfilledVisitor {
    private final UserService userService;

    public boolean visitDateFromRequirement(DateFromRequirement requirement) {
        Calendar calendar = Calendar.getInstance();
        return calendar.getTimeInMillis() > requirement.getDateFromMillis();
    }

    public boolean visitDateToRequirement(DateToRequirement requirement) {
        Calendar calendar = Calendar.getInstance();
        return calendar.getTimeInMillis() < requirement.getDateToMillis();
    }

    public boolean visitFileTasksRequirement(FileTasksRequirement requirement) {
        User student = userService.getCurrentUser();
        return false;

    }

    public boolean visitDGraphTasksRequirement(GraphTasksRequirement requirement) {
        return false;

    }

    public boolean visitGroupsRequirement(GroupsRequirement requirement) {
        return false;

    }

    public boolean visitMinPointsRequirement(MinPointsRequirement requirement) {
        return false;

    }

    public boolean visitStudentsRequirements(StudentsRequirements requirement) {
        return false;

    }
}
