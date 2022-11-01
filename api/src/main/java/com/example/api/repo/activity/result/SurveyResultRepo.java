package com.example.api.repo.activity.result;

import com.example.api.model.activity.result.SurveyResult;
import com.example.api.model.activity.task.Survey;
import com.example.api.model.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SurveyResultRepo extends JpaRepository<SurveyResult, Long> {
    List<SurveyResult> findAllByUser(User user);
    SurveyResult findSurveyResultById(Long id);
    SurveyResult findSurveyResultBySurveyAndUser(Survey survey, User user);
    List<SurveyResult> findAllBySurvey(Survey survey);
    void deleteAllByUser(User user);
}
