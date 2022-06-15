package com.example.api.repo.activity.feedback;

import com.example.api.model.activity.feedback.ProfessorFeedback;
import com.example.api.model.activity.result.FileTaskResult;
import com.example.api.model.activity.result.GraphTaskResult;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProfessorFeedbackRepo extends JpaRepository<ProfessorFeedback, Long> {
    ProfessorFeedback findProfessorFeedbackByGraphTaskResult(GraphTaskResult result);
    ProfessorFeedback findProfessorFeedbackByFileTaskResult(FileTaskResult result);
}
