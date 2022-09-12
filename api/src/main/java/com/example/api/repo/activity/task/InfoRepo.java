package com.example.api.repo.activity.task;

import com.example.api.model.activity.task.Info;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InfoRepo extends JpaRepository<Info, Long> {
    Info findInfoById(Long id);
    boolean existsById(long id);
}
