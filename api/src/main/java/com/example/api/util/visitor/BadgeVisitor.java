package com.example.api.util.visitor;

import com.example.api.model.activity.result.FileTaskResult;
import com.example.api.model.activity.result.GraphTaskResult;
import com.example.api.model.activity.result.TaskResult;
import com.example.api.model.activity.task.Activity;
import com.example.api.model.user.User;
import com.example.api.model.user.badge.*;
import com.example.api.service.activity.result.FileTaskResultService;
import com.example.api.service.activity.result.GraphTaskResultService;
import com.example.api.service.activity.result.TaskResultService;
import com.example.api.service.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class BadgeVisitor {
    private final TaskResultService taskResultService;
    private final GraphTaskResultService graphTaskResultService;
    private final FileTaskResultService fileTaskResultService;
    private final UserService userService;

    public boolean visitActivityNumberBadge(ActivityNumberBadge badge) {
        User student = userService.getCurrentUser();
        List<? extends TaskResult> results = taskResultService.getAllResultsForStudent(student)
                .stream()
                .filter(TaskResult::isEvaluated)
                .toList();
        int activityNumber = results.size();
        return activityNumber >= badge.getActivityNumber();
    }

    public boolean visitActivityScoreBadge(ActivityScoreBadge badge) {
        User student = userService.getCurrentUser();
        List<? extends TaskResult> results = taskResultService.getGraphAndFileResultsForStudent(student)
                .stream()
                .filter(TaskResult::isEvaluated)
                .toList();
        List<Activity> activities = results.stream()
                .map(TaskResult::getActivity)
                .toList();

        double currentPoints = results.stream()
                .mapToDouble(TaskResult::getPointsReceived)
                .sum();
        double maxPoints = activities.stream()
                .mapToDouble(Activity::getMaxPoints)
                .sum();

        double score = currentPoints / maxPoints;
        return score >= badge.getActivityScore();
    }

    public boolean visitConsistencyBadge(ConsistencyBadge badge) {
        User student = userService.getCurrentUser();
        List<? extends TaskResult> results = taskResultService.getAllResultsForStudent(student);
        Long[] datesInMillis = results.stream()
                .filter(TaskResult::isEvaluated)
                .map(TaskResult::getSendDateMillis)
                .sorted()
                .toArray(Long[]::new);

        List<Long> differences = new LinkedList<>();
        for (int i=0; i < datesInMillis.length-1; i++) {
            differences.add(Math.abs(datesInMillis[i] - datesInMillis[i+1]));
        }

        int weeksInRow = badge.getWeeksInRow();
        int counter = 0;
        Calendar calendar = Calendar.getInstance();
        for (Long diff: differences) {
            calendar.setTimeInMillis(diff);

            if (calendar.get(Calendar.DAY_OF_YEAR) < 7 && calendar.get(Calendar.YEAR) == 1970){
                counter++;
            } else {
                counter = 0;
            }

            if (counter >= weeksInRow) {
                return true;
            }
        }
        return false;
    }

    public boolean visitFileTaskNumberBadge(FileTaskNumberBadge badge) {
        User student = userService.getCurrentUser();
        List<FileTaskResult> results = fileTaskResultService.getAllFileTaskResultsForStudent(student)
                .stream()
                .filter(FileTaskResult::isEvaluated)
                .toList();
        int fileTaskNumber = results.size();
        return fileTaskNumber >= badge.getFileTaskNumber();
    }

    public boolean visitGraphTaskNumberBadge(GraphTaskNumberBadge badge) {
        User student = userService.getCurrentUser();
        List<GraphTaskResult> results = graphTaskResultService.getAllGraphTaskResultsForStudent(student)
                .stream()
                .filter(GraphTaskResult::isEvaluated)
                .toList();
        int graphTaskNumber = results.size();
        return graphTaskNumber >= badge.getGraphTaskNumber();
    }

    public boolean visitTopScoreBadge(TopScoreBadge badge) {
        User student = userService.getCurrentUser();
        List<? extends TaskResult> results = taskResultService.getGraphAndFileResultsForStudent(student)
                .stream()
                .filter(TaskResult::isEvaluated)
                .toList();

        if (results.size() < 5) {
            return false;
        }

        return false;
    }
}

