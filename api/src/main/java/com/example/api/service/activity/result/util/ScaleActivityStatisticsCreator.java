package com.example.api.service.activity.result.util;

import com.example.api.dto.response.activity.task.result.ScaleActivityStatistics;
import com.example.api.dto.response.map.task.ActivityType;
import com.example.api.model.activity.result.SurveyResult;
import com.example.api.model.activity.result.TaskResult;
import com.example.api.model.activity.task.Activity;
import com.example.api.model.activity.task.Survey;
import com.example.api.model.activity.task.Task;
import com.example.api.util.csv.PointsToGradeMapper;

import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.stream.Stream;

public class ScaleActivityStatisticsCreator {
    private Double maxPoints;
    private PointsToGradeMapper gradeMapper = new PointsToGradeMapper();
    private HashMap<Double, ScaleActivityStatistics> statistics = new HashMap<>();

    public ScaleActivityStatisticsCreator(Activity activity) {
        if (activity.getActivityType().equals(ActivityType.SURVEY)) {
            initSurvey((Survey) activity);
        }
        else initTask((Task) activity);
    }

    public void initTask(Task task) {
        this.maxPoints = task.getMaxPoints();

        Stream.of(5.0, 4.5, 4.0, 3.5, 3.0, 2.0)
                .forEach(grade -> statistics.put(grade, new ScaleActivityStatistics(grade)));
    }

    public void initSurvey(Survey survey) {
        Stream.of(5.0, 4.0, 3.0, 2.0, 1.0)
                .forEach(grade -> statistics.put(grade, new ScaleActivityStatistics(grade)));
    }

    public void add(TaskResult taskResult) {
        if (taskResult.getActivity().getActivityType().equals(ActivityType.SURVEY)) {
            addSurvey((SurveyResult) taskResult);
        }
        else addTask(taskResult);
    }
    public void addTask(TaskResult taskResult) {
        Double grade = gradeMapper.getGrade(taskResult.getPointsReceived(), maxPoints);
        statistics.get(grade).incrementResults();
    }

    public void addSurvey(SurveyResult surveyResult) {
        if (surveyResult.getPointsReceived() != null) {
            statistics.get(surveyResult.getPointsReceived()).incrementResults();
        }
    }

    public List<ScaleActivityStatistics> create() {
        return statistics.values()
                .stream()
                .sorted(Comparator.comparingDouble(ScaleActivityStatistics::getGrade).reversed())
                .toList();
    }
}
