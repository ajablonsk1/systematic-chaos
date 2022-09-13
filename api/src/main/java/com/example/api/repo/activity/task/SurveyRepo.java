package com.example.api.repo.activity.task;

import com.example.api.model.activity.task.Survey;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SurveyRepo extends JpaRepository<Survey, Long> {
    Survey findSurveyById(Long id);
    boolean existsById(long id);
}
