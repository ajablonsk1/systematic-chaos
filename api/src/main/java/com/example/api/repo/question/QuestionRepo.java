package com.example.api.repo.question;

import com.example.api.model.question.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface QuestionRepo extends JpaRepository<Question, Long> {
    Question findQuestionById(Long id);
}
