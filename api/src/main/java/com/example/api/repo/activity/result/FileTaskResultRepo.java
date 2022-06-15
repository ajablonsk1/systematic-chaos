package com.example.api.repo.activity.result;

import com.example.api.model.activity.result.FileTaskResult;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FileTaskResultRepo extends JpaRepository<FileTaskResult, Long> {
    FileTaskResult findFileTaskResultById(Long id);
}
