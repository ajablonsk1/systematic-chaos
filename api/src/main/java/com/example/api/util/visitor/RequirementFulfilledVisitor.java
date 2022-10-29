package com.example.api.util.visitor;

import com.example.api.model.activity.result.FileTaskResult;
import com.example.api.model.activity.result.GraphTaskResult;
import com.example.api.model.activity.task.FileTask;
import com.example.api.model.activity.task.GraphTask;
import com.example.api.model.map.requirement.*;
import com.example.api.model.user.User;
import com.example.api.repo.activity.result.FileTaskResultRepo;
import com.example.api.repo.activity.result.GraphTaskResultRepo;
import com.example.api.service.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Calendar;
import java.util.HashSet;
import java.util.List;

@Service
@RequiredArgsConstructor
public class RequirementFulfilledVisitor {
    private final UserService userService;
    private final GraphTaskResultRepo graphTaskResultRepo;
    private final FileTaskResultRepo fileTaskResultRepo;

    public boolean visitDateFromRequirement(DateFromRequirement requirement) {
        if (!requirement.getSelected()) {
            return true;
        }
        Calendar calendar = Calendar.getInstance();
        return calendar.getTimeInMillis() > requirement.getDateFromMillis();
    }

    public boolean visitDateToRequirement(DateToRequirement requirement) {
        if (!requirement.getSelected()) {
            return true;
        }
        Calendar calendar = Calendar.getInstance();
        return calendar.getTimeInMillis() < requirement.getDateToMillis();
    }

    public boolean visitFileTasksRequirement(FileTasksRequirement requirement) {
        if (!requirement.getSelected()) {
            return true;
        }
        User student = userService.getCurrentUser();
        List<FileTask> fileTasks = fileTaskResultRepo.findAllByUser(student)
                .stream()
                .map(FileTaskResult::getFileTask)
                .toList();
        return new HashSet<>(fileTasks).containsAll(requirement.getFinishedFileTasks());
    }

    public boolean visitGraphTasksRequirement(GraphTasksRequirement requirement) {
        if (!requirement.getSelected()) {
            return true;
        }
        User student = userService.getCurrentUser();
        List<GraphTask> graphTasks = graphTaskResultRepo.findAllByUser(student)
                .stream()
                .map(GraphTaskResult::getGraphTask)
                .toList();
        return new HashSet<>(graphTasks).containsAll(requirement.getFinishedGraphTasks());
    }

    public boolean visitGroupsRequirement(GroupsRequirement requirement) {
        if (!requirement.getSelected()) {
            return true;
        }
        User student = userService.getCurrentUser();
        return requirement.getAllowedGroups().contains(student.getGroup());

    }

    public boolean visitMinPointsRequirement(MinPointsRequirement requirement) {
        if (!requirement.getSelected()) {
            return true;
        }
        User student = userService.getCurrentUser();
        return student.getPoints() >= requirement.getMinPoints();
    }

    public boolean visitStudentsRequirements(StudentsRequirements requirement) {
        if (!requirement.getSelected()) {
            return true;
        }
        User student = userService.getCurrentUser();
        return requirement.getAllowedStudents().contains(student);
    }
}
