package com.example.api.service.activity.task;

import com.example.api.error.exception.EntityNotFoundException;
import com.example.api.model.activity.task.GraphTask;
import com.example.api.repo.activity.task.GraphTaskRepo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class GraphTaskService {
    private final GraphTaskRepo graphTaskRepo;

    public GraphTask saveGraphTask(GraphTask graphTask) {
        return graphTaskRepo.save(graphTask);
    }

    public GraphTask getGraphTaskById(Long id) throws EntityNotFoundException {
        log.info("Fetching graph task with id {}", id);
        GraphTask graphTask = graphTaskRepo.findGraphTaskById(id);
        if(graphTask == null) {
            log.error("Graph task with id {} not found in database", id);
            throw new EntityNotFoundException("Graph task with id" + id + " not found in database");
        }
        return graphTaskRepo.findGraphTaskById(id);
    }
}
