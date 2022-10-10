package com.example.api.util.visitor;

import com.example.api.model.activity.result.TaskResult;
import com.example.api.model.activity.task.Activity;
import com.example.api.model.user.User;
import com.example.api.model.user.badge.*;
import com.example.api.service.activity.result.TaskResultService;
import com.example.api.service.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BadgeVisitor {
    private final TaskResultService taskResultService;
    private final UserService userService;

    public boolean visitActivityNumberBadge(ActivityNumberBadge badge) {
        User student = userService.getCurrentUser();
        List<? extends TaskResult> results = taskResultService.getAllResultsForStudent(student);
        int activityNumber = results.size();
        return activityNumber >= badge.getActivityNumber();
    }

    public boolean visitActivityScoreBadge(ActivityScoreBadge badge) {
        User student = userService.getCurrentUser();
        List<? extends TaskResult> results = taskResultService.getGraphAndFileResultsForStudent(student);
        List<Activity> activities = results.stream()
                .map(TaskResult::getActivity)
                .toList();

        double currentPoints = student.getPoints();
        double maxPoints = 0.0;
        for (Activity activity: activities) {
            maxPoints += activity.getMaxPoints();
        }
        double score = currentPoints / maxPoints;

        return score >= badge.getActivityScore();
    }

    public boolean visitConsistencyBadge(ConsistencyBadge badge) {
        return false;
    }

    public boolean visitFileTaskNumberBadge(FileTaskNumberBadge badge) {
        return false;
    }

    public boolean visitGraphTaskNumberBadge(GraphTaskNumberBadge badge) {
        return false;
    }

    public boolean visitTopScoreBadge(TopScoreBadge badge) {
        return false;
    }
}

