package com.example.api.dto.response.activity.task;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class GraphNode {
    private Long questionID;
    private String difficulty;
    private List<Long> nextQuestionsIDs;
}
