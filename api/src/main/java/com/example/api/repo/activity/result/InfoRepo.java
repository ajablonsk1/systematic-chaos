package com.example.api.repo.activity.result;

import com.example.api.model.activity.task.Info;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InfoRepo extends JpaRepository<Info, Long> {
}
