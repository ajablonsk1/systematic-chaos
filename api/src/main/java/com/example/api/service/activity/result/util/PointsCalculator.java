package com.example.api.service.activity.result.util;

import com.example.api.error.exception.WrongAnswerTypeException;
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

    public double calculatePointsInClosedQuestions(List<Answer> answers) throws WrongAnswerTypeException {
        double points = 0.0;
        for(Answer answer: answers){
            Question question = answer.getQuestion();
            double questionPoints = answer.getQuestion().getPoints();
            if(question.getType() == QuestionType.MULTIPLE_CHOICE) {
                List<Option> chosenOptions = answer.getOptions();
                if(chosenOptions == null) {
                    log.error("Answer for multiple choice question doesn't have chosen options collection");
                    throw new WrongAnswerTypeException("Answer for multiple choice question doesn't have options collection",
                            QuestionType.MULTIPLE_CHOICE);
                }
                long correctOptionsNumber = question.getOptions()
                        .stream()
                        .filter(Option::isCorrect)
                        .count();
                double pointsForCorrectAnswer = questionPoints / correctOptionsNumber;
                double pointsToAdd = 0;
                for (Option option: chosenOptions){
                    if(option.isCorrect()) {
                        pointsToAdd += pointsForCorrectAnswer;
                    } else {
                        pointsToAdd -= pointsForCorrectAnswer;
                    }
                }
                points += pointsToAdd > 0 ? pointsToAdd : 0;
            } else if (answer.getQuestion().getType() == QuestionType.SINGLE_CHOICE) {
                Option option = answer.getOption();
                if(option == null) {
                    log.error("Answer for single choice question doesn't have chosen option");
                    throw new WrongAnswerTypeException("Answer for single choice question doesn't have chosen option",
                            QuestionType.SINGLE_CHOICE);
                }
                if(option.isCorrect()){
                    points += questionPoints;
                }
            }
        }
        return points;
    }

    public double calculatePointsInOpenedQuestions(List<Answer> answers) throws WrongAnswerTypeException {
        double points = 0.0;
        for(Answer answer: answers){
            String openAnswer = answer.getOpenAnswer();
            if(openAnswer == null) {
                log.error("Answer for open question doesn't have open answer");
                throw new WrongAnswerTypeException("Answer for open question doesn't have open answer",
                        QuestionType.OPENED);
            }
            String correctAnswer = answer.getQuestion().getAnswerForOpenedQuestion();
            if(correctAnswer != null) {
                if(openAnswer.equals(correctAnswer)) {
                    points += answer.getQuestion().getPoints();
                }
            }
        }
        return points;
    }
}
