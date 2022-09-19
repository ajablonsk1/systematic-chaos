package com.example.api.dto.response.activity.task.result.question;

import com.example.api.model.activity.result.ResultStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class QuestionInfoResponse {
    private ResultStatus status;
    private Long timeRemaining;
    private List<QuestionList> questions;
    private QuestionDetails questionDetails;
}