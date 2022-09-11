package com.example.api.util.calculator;

import com.example.api.model.activity.result.GraphTaskResult;
import com.example.api.model.question.Answer;
import com.example.api.model.question.Option;
import com.example.api.model.question.Question;
import com.example.api.model.question.QuestionType;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.List;

@Slf4j
@Component
public class PointsCalculator {

    public double calculateMaxAvailablePoints(GraphTaskResult result) {
        return calculateMaxClosedPoints(result) + calculateMaxOpenedPoints(result);
    }

    public double calculateMaxOpenedPoints(GraphTaskResult result) {
        List<Answer> answers = result.getAnswers()
                .stream()
                .filter(answer -> answer.getQuestion().getType() == QuestionType.OPENED)
                .toList();
        double points = 0;
        for(Answer answer: answers) {
            points += answer.getQuestion().getPoints();
        }
        return points;
    }

    public double calculateMaxClosedPoints(GraphTaskResult result) {
        List<Answer> answers = result.getAnswers()
                .stream()
                .filter(answer -> answer.getQuestion().getType() != QuestionType.OPENED)
                .toList();
        double points = 0;
        for(Answer answer: answers) {
            points += answer.getQuestion().getPoints();
        }
        return points;
    }

    public double calculateAllPoints(GraphTaskResult result) {
        return calculatePointsForClosedQuestions(result) + calculatePointsForOpenedQuestions(result);
    }

    private Double calculatePointsForSingleChoiceQuestion(Answer answer) {
        Question question = answer.getQuestion();
        Option option = answer.getOption();
        if (option == null) return 0D;
        return option.isCorrect() ? question.getPoints() : 0D;
    }

    private Double calculatePointsForMultipleChoiceQuestion(Answer answer) {
        Question question = answer.getQuestion();
        List<Option> options = answer.getOptions();
        if (options == null) return 0D;
        long correctOptionsNumber = question.getOptions().stream().filter(Option::isCorrect).count();
        double pointsPerOption = question.getPoints() / correctOptionsNumber;
        long correctAnswers = options.stream().filter(Option::isCorrect).count();
        long wrongAnswers = options.size() - correctAnswers;
        double pointsReceived = pointsPerOption * (correctAnswers - wrongAnswers);
        return pointsReceived > 0 ? pointsReceived : 0D;
    }

    private Double calculatePointsForAnswer(Answer answer) {
        Question question = answer.getQuestion();
        if (question.getType().equals(QuestionType.SINGLE_CHOICE)) {
            return calculatePointsForSingleChoiceQuestion(answer);
        }
        else if (question.getType().equals(QuestionType.MULTIPLE_CHOICE)) {
            return calculatePointsForMultipleChoiceQuestion(answer);
        }
        return 0D;
    }

    public double calculatePointsForClosedQuestions(GraphTaskResult result) {
        return result.getAnswers()
                .stream()
                .filter(answer -> answer.getQuestion().getType() != QuestionType.OPENED)
                .mapToDouble(this::calculatePointsForAnswer)
                .sum();
    }

    private double calculatePointsForOpenedQuestion(Answer answer) {
        Question question = answer.getQuestion();
        String openAnswer = answer.getOpenAnswer();
        String correctAnswer = answer.getQuestion().getAnswerForOpenedQuestion();
        if (openAnswer != null && correctAnswer != null) {
            openAnswer = openAnswer.toLowerCase();
            correctAnswer = correctAnswer.toLowerCase();
            return openAnswer.equals(correctAnswer) ? question.getPoints() : 0D;
        }
        return 0D;
    }
    public double calculatePointsForOpenedQuestions(GraphTaskResult result) {
        return result.getAnswers()
                .stream()
                .filter(answer -> answer.getQuestion().getType() == QuestionType.OPENED)
                .mapToDouble(this::calculatePointsForOpenedQuestion)
                .sum();
    }
}
