package com.example.api.repo.activity.feedback;

import com.example.api.model.activity.feedback.ProfessorFeedback;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProfessorFeedbackRepo extends JpaRepository<ProfessorFeedback, Long> {
}
