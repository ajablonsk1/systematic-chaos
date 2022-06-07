package com.example.api.repo.activity.task;

import com.example.api.model.activity.task.GraphTask;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GraphTaskRepo extends JpaRepository<GraphTask, Long> {
    GraphTask findGraphTaskById(Long id);
}
