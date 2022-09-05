package com.example.api.util.visitor;

import com.example.api.dto.response.group.AccessDateResponse;
import com.example.api.dto.response.map.RequirementResponse;
import com.example.api.model.activity.task.FileTask;
import com.example.api.model.activity.task.GraphTask;
import com.example.api.model.group.AccessDate;
import com.example.api.model.group.Group;
import com.example.api.model.map.requirement.*;
import com.example.api.model.user.User;
import org.springframework.stereotype.Component;

import java.util.Collection;
import java.util.List;
import java.util.stream.Stream;

@Component
public class RequirementResponseVisitorImpl implements RequirementResponseVisitor {
    @Override
    public RequirementResponse<AccessDateResponse> getForDateRequirement(DateRequirement requirement) {
        AccessDate accessDate = requirement.getAccessDate();
        AccessDateResponse response = new AccessDateResponse(accessDate.getDateFrom(), accessDate.getDateTo());
        return new RequirementResponse<>(requirement.getId(), requirement.getName(), response, requirement.isSelected());
    }

    @Override
    public RequirementResponse<Double> getForPointsRequirement(PointsRequirement requirement) {
        return new RequirementResponse<>(requirement.getId(), requirement.getName(), requirement.getMinPoints(), requirement.isSelected());
    }

    @Override
    public RequirementResponse<List<String>> getForGroupRequirement(GroupRequirement requirement) {
        List<String> names = requirement.getGroups()
                .stream()
                .map(Group::getName)
                .toList();
        return new RequirementResponse<>(requirement.getId(), requirement.getName(), names, requirement.isSelected());
    }

    @Override
    public RequirementResponse<List<String>> getForStudentRequirement(StudentRequirement requirement) {
        List<String> emails = requirement.getStudents()
                .stream()
                .map(User::getEmail)
                .toList();
        return new RequirementResponse<>(requirement.getId(), requirement.getName(), emails, requirement.isSelected());
    }

    @Override
    public RequirementResponse<List<String>> getForActivitiesRequirement(ActivitiesRequirement requirement) {
        List<String> graphTaskTitles = requirement.getFinishedGraphTasks()
                .stream()
                .map(GraphTask::getTitle)
                .toList();
        List<String> fileTaskTitles = requirement.getFinishedFileTasks()
                .stream()
                .map(FileTask::getTitle)
                .toList();
        List<String> titles = Stream.of(graphTaskTitles, fileTaskTitles)
                .flatMap(Collection::stream)
                .toList();
        return new RequirementResponse<>(requirement.getId(), requirement.getName(), titles, requirement.isSelected());
    }
}
