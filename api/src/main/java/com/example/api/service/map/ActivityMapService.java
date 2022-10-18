package com.example.api.service.map;

import com.example.api.dto.response.map.ActivityMapResponse;
import com.example.api.dto.response.map.task.MapTask;
import com.example.api.dto.response.map.task.MapTaskProfessor;
import com.example.api.dto.response.map.task.MapTaskStudent;
import com.example.api.error.exception.EntityNotFoundException;
import com.example.api.error.exception.WrongUserTypeException;
import com.example.api.model.activity.result.FileTaskResult;
import com.example.api.model.activity.result.GraphTaskResult;
import com.example.api.model.activity.result.SurveyResult;
import com.example.api.model.activity.task.Activity;
import com.example.api.model.activity.task.FileTask;
import com.example.api.model.activity.task.GraphTask;
import com.example.api.model.activity.task.Survey;
import com.example.api.model.map.ActivityMap;
import com.example.api.model.user.AccountType;
import com.example.api.model.user.User;
import com.example.api.repo.activity.result.FileTaskResultRepo;
import com.example.api.repo.activity.result.GraphTaskResultRepo;
import com.example.api.repo.activity.result.SurveyResultRepo;
import com.example.api.repo.map.MapRepo;
import com.example.api.repo.user.UserRepo;
import com.example.api.security.AuthenticationService;
import com.example.api.service.validator.MapValidator;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Stream;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class ActivityMapService {
    private final MapRepo mapRepo;
    private final RequirementService requirementService;
    private final MapValidator mapValidator;
    private final AuthenticationService authService;
    private final UserRepo userRepo;
    private final GraphTaskResultRepo graphTaskResultRepo;
    private final FileTaskResultRepo fileTaskResultRepo;
    private final SurveyResultRepo surveyResultRepo;

    public ActivityMap saveActivityMap(ActivityMap activityMap){
        return mapRepo.save(activityMap);
    }

    public ActivityMapResponse getActivityMap(Long id) throws EntityNotFoundException, WrongUserTypeException {
        log.info("Fetching activity map with id {} as ActivityMapResponse", id);
        String studentEmail = authService.getAuthentication().getName();
        User user = userRepo.findUserByEmail(studentEmail);

        ActivityMap activityMap = mapRepo.findActivityMapById(id);
        mapValidator.validateActivityMapIsNotNull(activityMap, id);
        List<? extends MapTask> allTasks;
        if (user.getAccountType() == AccountType.STUDENT) {
            allTasks = getMapTasksForStudent(activityMap, user);
        } else {
            allTasks = getMapTasksForProfessor(activityMap, user);
        }
        return new ActivityMapResponse(activityMap.getId(), allTasks, activityMap.getMapSizeX(), activityMap.getMapSizeY(), activityMap.getImage());
    }

    public List<MapTaskProfessor> getMapTasksForProfessor(ActivityMap activityMap, User professor) {
        return Stream.of(activityMap.getGraphTasks(), activityMap.getFileTasks(), activityMap.getSurveys(), activityMap.getInfos())
                .flatMap(List::stream)
                .map(activity -> new MapTaskProfessor(activity, activity.getIsBlocked()))
                .sorted(Comparator.comparingLong(MapTask::getId))
                .toList();
    }

    public List<MapTaskStudent> getMapTasksForStudent(ActivityMap activityMap, User student) {
        List<MapTaskStudent> graphTasks = activityMap.getGraphTasks()
                .stream()
                .filter(graphTask -> !graphTask.getIsBlocked())
                .map(graphTask -> new MapTaskStudent(
                        graphTask,
                        areRequirementsFulfilled(graphTask),
                        isGraphTaskCompleted(graphTask, student)))
                .toList();
        List<MapTaskStudent> fileTasks = activityMap.getFileTasks()
                .stream()
                .filter(fileTask -> !fileTask.getIsBlocked())
                .map(fileTask -> new MapTaskStudent(
                        fileTask,
                        areRequirementsFulfilled(fileTask),
                        isFileTaskCompleted(fileTask, student)))
                .toList();
        List<MapTaskStudent> infos = activityMap.getInfos()
                .stream()
                .filter(info -> !info.getIsBlocked())
                .map(info -> new MapTaskStudent(
                        info,
                        areRequirementsFulfilled(info),
                        true))
                .toList();
        List<MapTaskStudent> surveys = activityMap.getSurveys()
                .stream()
                .filter(survey -> !survey.getIsBlocked())
                .map(survey -> new MapTaskStudent(
                        survey,
                        areRequirementsFulfilled(survey),
                        isSurveyCompleted(survey, student)))
                .toList();
        return Stream.of(graphTasks, fileTasks, infos, surveys)
                .flatMap(List::stream)
                .sorted(Comparator.comparingLong(MapTask::getId))
                .toList();
    }

    private Boolean areRequirementsFulfilled(Activity activity) {
        return requirementService.areRequirementsFulfilled(activity.getRequirements());
    }

    private Boolean isGraphTaskCompleted(GraphTask graphTask, User user) {
        GraphTaskResult result = graphTaskResultRepo.findGraphTaskResultByGraphTaskAndUser(graphTask, user);
        return result != null && result.getSendDateMillis() != null;
    }

    private Boolean isFileTaskCompleted(FileTask fileTask, User user) {
        FileTaskResult result = fileTaskResultRepo.findFileTaskResultByFileTaskAndUser(fileTask, user);
        return result != null;
    }

    private Boolean isSurveyCompleted(Survey survey, User student) {
        SurveyResult result = surveyResultRepo.findSurveyResultBySurveyAndUser(survey, student);
        return result != null;
    }
}
