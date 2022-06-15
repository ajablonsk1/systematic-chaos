package com.example.api.repo.activity.result;

import com.example.api.model.activity.result.GraphTaskResult;
import com.example.api.model.activity.task.GraphTask;
import com.example.api.model.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GraphTaskResultRepo extends JpaRepository<GraphTaskResult, Long> {
    GraphTaskResult findGraphTaskResultById(Long id);
    GraphTaskResult findGraphTaskResultByGraphTaskAndUser(GraphTask task, User user);
}
