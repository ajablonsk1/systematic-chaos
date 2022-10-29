package com.example.api.util.visitor;

import com.example.api.error.exception.ExceptionMessage;
import com.example.api.error.exception.RequestValidationException;
import com.example.api.model.activity.task.FileTask;
import com.example.api.model.activity.task.GraphTask;
import com.example.api.model.group.Group;
import com.example.api.model.map.requirement.*;
import com.example.api.model.user.User;
import com.example.api.repo.activity.task.FileTaskRepo;
import com.example.api.repo.activity.task.GraphTaskRepo;
import com.example.api.repo.group.GroupRepo;
import com.example.api.repo.user.UserRepo;
import com.example.api.service.validator.GroupValidator;
import com.example.api.service.validator.UserValidator;
import com.example.api.service.validator.activity.ActivityValidator;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.LinkedList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class RequirementValueVisitor {
    private final FileTaskRepo fileTaskRepo;
    private final GraphTaskRepo graphTaskRepo;
    private final GroupRepo groupRepo;
    private final UserRepo userRepo;
    private final ActivityValidator activityValidator;
    private final GroupValidator groupValidator;
    private final UserValidator userValidator;

    public void visitDateFromRequirement(DateFromRequirement requirement, String value) throws RequestValidationException {
        try {
            Long dateFrom = value.equals("") ? null : Long.valueOf(value);
            requirement.setDateFromMillis(dateFrom);
        } catch (NumberFormatException e) {
            throw new RequestValidationException(ExceptionMessage.DATE_NOT_LONG);
        }
    }

    public void visitDateToRequirement(DateToRequirement requirement, String value) throws RequestValidationException {
        try {
            Long dateFrom = value.equals("") ? null : Long.valueOf(value);
            requirement.setDateToMillis(dateFrom);
        } catch (NumberFormatException e) {
            throw new RequestValidationException(ExceptionMessage.DATE_NOT_LONG);
        }
    }

    public void visitFileTasksRequirement(FileTasksRequirement requirement, String value) throws RequestValidationException {
        if (value.equals("")) {
            return;
        }
        String[] titles = value.split(";");
        List<FileTask> fileTasks = new LinkedList<>();
        for (String title: titles) {
            FileTask fileTask = fileTaskRepo.findFileTaskByTitle(title);
            activityValidator.validateActivityIsNotNullWithMessage(
                    fileTask,
                    title,
                    ExceptionMessage.FILE_TASK_NOT_FOUND + title
            );
            fileTasks.add(fileTask);
        }
        requirement.setFinishedFileTasks(fileTasks);
    }

    public void visitGraphTasksRequirement(GraphTasksRequirement requirement, String value) throws RequestValidationException {
        if (value.equals("")) {
            return;
        }
        String[] titles = value.split(";");
        List<GraphTask> graphTasks = new LinkedList<>();
        for (String title: titles) {
            GraphTask graphTask = graphTaskRepo.findGraphTaskByTitle(title);
            activityValidator.validateActivityIsNotNullWithMessage(
                    graphTask,
                    title,
                    ExceptionMessage.GRAPH_TASK_NOT_FOUND + title
            );
            graphTasks.add(graphTask);
        }
        requirement.setFinishedGraphTasks(graphTasks);
    }

    public void visitGroupsTasksRequirement(GroupsRequirement requirement, String value) throws RequestValidationException {
        if (value.equals("")) {
            return;
        }
        String[] groupNames = value.split(";");
        List<Group> groups = new LinkedList<>();
        for (String groupName: groupNames) {
            Group group = groupRepo.findGroupByName(groupName);
            groupValidator.validateGroupIsNotNullWithMessage(
                    group,
                    groupName,
                    ExceptionMessage.GROUP_NOT_FOUND + groupName
            );
            groups.add(group);
        }
        requirement.setAllowedGroups(groups);
    }

    public void visitMinPointsRequirement(MinPointsRequirement requirement, String value) throws RequestValidationException {
        try {
            Double minPoints =  value.equals("") ? null : Double.valueOf(value);
            requirement.setMinPoints(minPoints);
        } catch (NumberFormatException e) {
            throw new RequestValidationException(ExceptionMessage.MIN_POINTS_NOT_DOUBLE);
        }
    }

    public void visitStudentsRequirements(StudentsRequirements requirement, String value) throws RequestValidationException {
        if (value.equals("")) {
            return;
        }
        String[] emails = value.split(";");
        List<User> students = new LinkedList<>();
        for(String email: emails) {
            User student = userRepo.findUserByEmail(email);
            userValidator.validateUserIsNotNullWithMessage(
                    student,
                    email,
                    ExceptionMessage.STUDENT_NOT_FOUND + email
            );
            students.add(student);
        }
        requirement.setAllowedStudents(students);
    }
}
