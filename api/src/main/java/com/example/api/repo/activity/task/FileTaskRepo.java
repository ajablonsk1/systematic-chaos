package com.example.api.repo.activity.task;

import com.example.api.model.activity.task.FileTask;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FileTaskRepo extends JpaRepository<FileTask, Long> {
}
