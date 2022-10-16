package com.example.api.repo.activity.feedback;

import com.example.api.model.activity.feedback.UserFeedback;
import com.example.api.model.activity.task.Survey;
import com.example.api.model.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserFeedbackRepo extends JpaRepository<UserFeedback, Long> {
    UserFeedback findUserFeedbackBySurveyAndFrom(Survey survey, User from);
    List<UserFeedback> findAllBySurvey(Survey survey);
}
