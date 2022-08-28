package com.example.api.repo.activity.result;

import com.example.api.model.activity.result.GraphTaskResult;
import com.example.api.model.activity.task.GraphTask;
import com.example.api.model.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GraphTaskResultRepo extends JpaRepository<GraphTaskResult, Long> {
    GraphTaskResult findGraphTaskResultById(Long id);
    GraphTaskResult findGraphTaskResultByGraphTaskAndUser(GraphTask task, User user);
    List<GraphTaskResult> findAllByUser(User user);
    List<GraphTaskResult> findAllByAndGraphTask(GraphTask graphTask);
}
