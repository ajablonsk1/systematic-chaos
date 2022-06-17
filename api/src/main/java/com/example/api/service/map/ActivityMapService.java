package com.example.api.service.map;

import com.example.api.dto.response.map.ActivityMapResponse;
import com.example.api.dto.response.map.task.ActivityType;
import com.example.api.dto.response.map.task.MapTask;
import com.example.api.error.exception.EntityNotFoundException;
import com.example.api.model.map.ActivityMap;
import com.example.api.repo.map.MapRepo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.LinkedList;
import java.util.List;
import java.util.stream.Stream;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class ActivityMapService {
    private final MapRepo mapRepo;

    public ActivityMapResponse getActivityMap(Long id) throws EntityNotFoundException {
        ActivityMap activityMap = mapRepo.findActivityMapById(id);
        if(activityMap == null) {
            log.error("ActivityMap with id {} not found in database", id);
            throw new EntityNotFoundException("ActivityMap with id" + id + " not found in database");
        }
        List<MapTask> graphTasks = activityMap.getGraphTasks()
                .stream()
                .map(graphTask -> new MapTask(graphTask.getId(), graphTask.getPosX(), graphTask.getPosY(), ActivityType.EXPEDITION))
                .toList();
        List<MapTask> fileTasks = activityMap.getFileTasks()
                .stream()
                .map(fileTask -> new MapTask(fileTask.getId(), fileTask.getPosX(), fileTask.getPosY(), ActivityType.TASK))
                .toList();
        List<MapTask> infos = activityMap.getInfos()
                .stream()
                .map(info -> new MapTask(info.getId(), info.getPosX(), info.getPosY(), ActivityType.EXPEDITION))
                .toList();
        List<MapTask> allTasks = Stream.of(graphTasks, fileTasks, infos)
                .flatMap(List::stream)
                .toList();
        return new ActivityMapResponse(activityMap.getId(), allTasks, activityMap.getMapSizeX(), activityMap.getMapSizeY());
    }
}
