package com.example.api.service.validator;

import com.example.api.dto.request.activity.result.AnswerForm;
import com.example.api.error.exception.WrongBodyParametersNumberException;
import com.example.api.model.question.Answer;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Slf4j
@Component
public class AnswerFormValidator {

    public Answer validateAndCreateAnswer(AnswerForm form) throws WrongBodyParametersNumberException {
        List<Object> answerParamList = new ArrayList<>();
        answerParamList.add(form.getOptions());
        answerParamList.add(form.getOption());
        answerParamList.add(form.getOpenAnswer());
        long paramsNotNullCount = answerParamList.stream()
                .filter(Objects::nonNull)
                .count();
        if(paramsNotNullCount != 1) {
            log.error("Wrong number of AnswerForm parameters. One parameter should be provided.");
            throw new WrongBodyParametersNumberException("Wrong number of AnswerForm parameters. One parameter should be provided.",
                    List.of("openAnswer", "options", "option"), 2);
        }
        Answer answer = new Answer();
        if (answerParamList.get(0) != null) {
            answer.setOptions(form.getOptions());
        } else if(answerParamList.get(1) != null) {
            answer.setOption(form.getOption());
        } else if(answerParamList.get(2) != null) {
            answer.setOpenAnswer(form.getOpenAnswer());
        }
        return answer;
    }
}
