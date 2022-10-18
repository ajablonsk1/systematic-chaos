package com.example.api.service.map;

import com.example.api.dto.response.map.ActivityMapResponse;
import com.example.api.dto.response.map.task.ActivityType;
import com.example.api.dto.response.map.task.MapTask;
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
import com.example.api.service.validator.UserValidator;
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
    private final UserValidator userValidator;

    public ActivityMap saveActivityMap(ActivityMap activityMap){
        return mapRepo.save(activityMap);
    }

    public ActivityMapResponse getActivityMap(Long id) throws EntityNotFoundException, WrongUserTypeException {
        log.info("Fetching activity map with id {} as ActivityMapResponse", id);
        String studentEmail = authService.getAuthentication().getName();
        User student = userRepo.findUserByEmail(studentEmail);

        ActivityMap activityMap = mapRepo.findActivityMapById(id);
        mapValidator.validateActivityMapIsNotNull(activityMap, id);
        List<MapTask> allTasks = getMapTasks(activityMap, student);
        return new ActivityMapResponse(activityMap.getId(), allTasks, activityMap.getMapSizeX(), activityMap.getMapSizeY(), activityMap.getImage());
    }

    public List<MapTask> getMapTasks(ActivityMap activityMap) {
        return getMapTasks(activityMap, null); // results for professor
    }

    public List<MapTask> getMapTasks(ActivityMap activityMap, User user) {
        List<MapTask> graphTasks = activityMap.getGraphTasks()
                .stream()
                .map(graphTask -> new MapTask(
                        graphTask.getId(),
                        graphTask.getPosX(),
                        graphTask.getPosY(),
                        ActivityType.EXPEDITION,
                        graphTask.getTitle(),
                        graphTask.getMaxPoints(),
                        areRequirementsFulfilled(user, graphTask),
                        isGraphTaskCompleted(graphTask, user),
                        !requirementService.areRequirementsDefault(graphTask.getRequirements())))
                .toList();
        List<MapTask> fileTasks = activityMap.getFileTasks()
                .stream()
                .map(fileTask -> new MapTask(
                        fileTask.getId(),
                        fileTask.getPosX(),
                        fileTask.getPosY(),
                        ActivityType.TASK,
                        fileTask.getTitle(),
                        fileTask.getMaxPoints(),
                        areRequirementsFulfilled(user, fileTask),
                        isFileTaskCompleted(fileTask, user),
                        !requirementService.areRequirementsDefault(fileTask.getRequirements())))
                .toList();
        List<MapTask> infos = activityMap.getInfos()
                .stream()
                .map(info -> new MapTask(
                        info.getId(),
                        info.getPosX(),
                        info.getPosY(),
                        ActivityType.INFO,
                        info.getTitle(),
                        0.0,
                        areRequirementsFulfilled(user, info),
                        isInfoCompleted(user),
                        !requirementService.areRequirementsDefault(info.getRequirements())))
                .toList();
        List<MapTask> surveys = activityMap.getSurveys()
                .stream()
                .map(survey -> new MapTask(
                        survey.getId(),
                        survey.getPosX(),
                        survey.getPosY(),
                        ActivityType.SURVEY,
                        survey.getTitle(),
                        survey.getPoints(),
                        areRequirementsFulfilled(user, survey),
                        isSurveyCompleted(survey, user),
                        !requirementService.areRequirementsDefault(survey.getRequirements())))
                .toList();
        return Stream.of(graphTasks, fileTasks, infos, surveys)
                .flatMap(List::stream)
                .sorted(Comparator.comparingLong(MapTask::getId))
                .toList();
    }

    private boolean areRequirementsFulfilled(User user, Activity activity) {
        if (user.getAccountType() == AccountType.PROFESSOR) {
            return true;
        }
        return requirementService.areRequirementsFulfilled(activity.getRequirements());
    }

    private boolean isGraphTaskCompleted(GraphTask graphTask, User student) {
        if (!isValidStudent(student)) {
            return false;
        }
        GraphTaskResult result = graphTaskResultRepo.findGraphTaskResultByGraphTaskAndUser(graphTask, student);
        return result != null && result.getSendDateMillis() != null;
    }

    private boolean isInfoCompleted(User student) {
        return isValidStudent(student);
    }

    private boolean isFileTaskCompleted(FileTask fileTask, User student) {
        if (!isValidStudent(student)) {
            return false;
        }
        FileTaskResult result = fileTaskResultRepo.findFileTaskResultByFileTaskAndUser(fileTask, student);
        return result != null;
    }

    // TODO: after adding survey result it probably should be updated
    private boolean isSurveyCompleted(Survey survey, User student) {
        if (!isValidStudent(student)) {
            return false;
        }
        SurveyResult result = surveyResultRepo.findSurveyResultBySurveyAndUser(survey, student);
        return result != null;
    }

    private boolean isValidStudent(User student) {
        return student != null && student.getAccountType() == AccountType.STUDENT;
    }
}
