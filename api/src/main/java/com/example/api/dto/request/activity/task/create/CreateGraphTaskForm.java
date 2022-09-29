package com.example.api.dto.request.activity.task.create;

import com.example.api.model.activity.task.GraphTask;
import com.example.api.model.question.Question;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CreateGraphTaskForm extends CreateActivityForm{
    @Schema(required = true) private String requiredKnowledge;
    @Schema(required = true) private List<QuestionForm> questions;
    @Schema(required = true) private String timeToSolve;

    public CreateGraphTaskForm(String title,
                               String description,
                               Integer posX,
                               Integer posY,
                               String requiredKnowledge,
                               List<QuestionForm> questions,
                               String timeToSolve) {
        super(title, description, posX, posY);
        this.requiredKnowledge = requiredKnowledge;
        this.questions = questions;
        this.timeToSolve = timeToSolve;
    }

    public CreateGraphTaskForm(GraphTask graphTask) {
        super(graphTask);
        this.requiredKnowledge = graphTask.getRequiredKnowledge();

        HashMap<Long, Integer> mapping = getIdToQuestionNumberMapping(graphTask.getQuestions());
        this.questions = graphTask.getQuestions().stream().map(q->new QuestionForm(q, mapping)).toList();
        SimpleDateFormat timeToSolveFormat = new SimpleDateFormat("HH:mm:ss");
        this.setTimeToSolve(timeToSolveFormat.format(new Date(graphTask.getTimeToSolveMillis())));
    }

    private HashMap<Long, Integer> getIdToQuestionNumberMapping(List<Question> questions) {
        HashMap<Long, Integer> mapping = new HashMap<>();
        for (Question q: questions) {
            DFSGraph(q, mapping);
        }
        return mapping;
    }

    private void DFSGraph(Question question, HashMap<Long, Integer> mapping) {
        if (mapping.containsKey(question.getId())) return;
        mapping.put(question.getId(), mapping.size());
        for (Question q: question.getNext()) {
            DFSGraph(q, mapping);
        }
    }
}
