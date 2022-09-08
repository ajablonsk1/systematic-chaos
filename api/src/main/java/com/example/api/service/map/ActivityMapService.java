package com.example.api.service.map;

import com.example.api.dto.response.map.ActivityMapResponse;
import com.example.api.dto.response.map.task.ActivityType;
import com.example.api.dto.response.map.task.MapTask;
import com.example.api.error.exception.EntityNotFoundException;
import com.example.api.model.map.ActivityMap;
import com.example.api.repo.map.MapRepo;
import com.example.api.service.validator.MapValidator;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
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

    public ActivityMap saveActivityMap(ActivityMap activityMap){
        return mapRepo.save(activityMap);
    }

    public ActivityMapResponse getActivityMap(Long id) throws EntityNotFoundException {
        log.info("Fetching activity map with id {} as ActivityMapResponse", id);
        ActivityMap activityMap = mapRepo.findActivityMapById(id);
        mapValidator.validateActivityMapIsNotNull(activityMap, id);
        List<MapTask> allTasks = getMapTasks(activityMap);
        return new ActivityMapResponse(activityMap.getId(), allTasks, activityMap.getMapSizeX(), activityMap.getMapSizeY());
    }

    public List<MapTask> getMapTasks(ActivityMap activityMap) {
        List<MapTask> graphTasks = activityMap.getGraphTasks()
                .stream()
                .map(graphTask -> new MapTask(
                        graphTask.getId(),
                        graphTask.getPosX(),
                        graphTask.getPosY(),
                        ActivityType.EXPEDITION,
                        graphTask.getTitle(),
                        graphTask.getMaxPoints(),
                        requirementService.areRequirementsFulfilled(graphTask.getRequirements())))
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
                        requirementService.areRequirementsFulfilled(fileTask.getRequirements())))
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
                        requirementService.areRequirementsFulfilled(info.getRequirements())))
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
                        requirementService.areRequirementsFulfilled(survey.getRequirements())))
                .toList();
        return Stream.of(graphTasks, fileTasks, infos, surveys)
                .flatMap(List::stream)
                .toList();
    }


}
