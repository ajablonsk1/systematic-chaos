package com.example.api.repo.activity.result;

import com.example.api.model.activity.result.FileTaskResult;
import com.example.api.model.activity.task.FileTask;
import com.example.api.model.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FileTaskResultRepo extends JpaRepository<FileTaskResult, Long> {
    FileTaskResult findFileTaskResultById(Long id);
    FileTaskResult findFileTaskResultByFileTaskAndUser(FileTask fileTask, User user);
    List<FileTaskResult> findAllByUser(User user);
    List<FileTaskResult> findAllByFileTask(FileTask fileTask);
}
