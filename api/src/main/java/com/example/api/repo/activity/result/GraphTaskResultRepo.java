package com.example.api.repo.activity.result;

import com.example.api.model.activity.result.GraphTaskResult;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GraphTaskResultRepo extends JpaRepository<GraphTaskResult, Long> {
    GraphTaskResult findGraphTaskResultById(Long id);
}
