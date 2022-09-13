package com.example.api.service.validator;

import com.example.api.dto.request.activity.result.AnswerForm;
import com.example.api.model.question.Answer;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class ResultValidator {

    public Answer validateAndCreateAnswer(AnswerForm form) {
        Answer answer = new Answer();
        answer.setOptions(form.getOptions());
        answer.setOption(form.getOption());
        answer.setOpenAnswer(form.getOpenAnswer());
        return answer;
    }
}
