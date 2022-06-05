package com.example.api.repo.activity.feedback;

import com.example.api.model.activity.feedback.UserFeedback;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserFeedbackRepo extends JpaRepository<UserFeedback, Long> {
}
