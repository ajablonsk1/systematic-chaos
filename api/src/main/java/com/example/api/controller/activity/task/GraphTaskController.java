package com.example.api.controller.activity.task;

import com.example.api.dto.request.activity.task.create.CreateGraphTaskChapterForm;
import com.example.api.dto.request.activity.task.create.CreateGraphTaskForm;
import com.example.api.dto.request.activity.task.create.OptionForm;
import com.example.api.dto.request.activity.task.create.QuestionForm;
import com.example.api.dto.response.activity.task.GraphNode;
import com.example.api.dto.response.activity.task.result.GraphTaskResponse;
import com.example.api.error.exception.EntityNotFoundException;
import com.example.api.error.exception.RequestValidationException;
import com.example.api.service.activity.task.GraphTaskService;
import com.example.api.util.message.MessageManager;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/task/graph")
@SecurityRequirement(name = "JWT_AUTH")
public class GraphTaskController {
    private final GraphTaskService graphTaskService;

    @GetMapping
    ResponseEntity<GraphTaskResponse> getGraphTaskById(@RequestParam Long id) throws EntityNotFoundException {
        return ResponseEntity.ok().body(graphTaskService.getGraphTaskById(id));
    }

    @GetMapping("/create")
    public ResponseEntity<CreateGraphTaskForm> getExampleGraphTaskForm() {
        List<OptionForm> optionForms1 = List.of(
                new OptionForm(MessageManager.ANS_1, true),
                new OptionForm(MessageManager.ANS_2, false),
                new OptionForm(MessageManager.ANS_3, false));
        List<OptionForm> optionForms2 = List.of(
                new OptionForm(MessageManager.ANS_4, true),
                new OptionForm(MessageManager.ANS_5, true),
                new OptionForm(MessageManager.ANS_6, true),
                new OptionForm(MessageManager.ANS_7, false));
        List<QuestionForm> questionForms = List.of(
                new QuestionForm(0, List.of(1, 2)),
                new QuestionForm(1, "OPENED", MessageManager.QUESTION_1,
                        MessageManager.HINT_1, "EASY", List.of(), 10.0, List.of(3), "1410"),
                new QuestionForm(2, "SINGLE_CHOICE", MessageManager.QUESTION_2,
                        MessageManager.HINT_2, "MEDIUM", optionForms1, 20.0, List.of(3), ""),
                new QuestionForm(3, "MULTIPLE_CHOICE", MessageManager.QUESTION_3,
                        MessageManager.HINT_3, "HARD", optionForms2, 30.0, List.of(), "")
        );
        CreateGraphTaskForm form = new CreateGraphTaskForm(
                MessageManager.TITLE,
                MessageManager.DESC,
                3,
                4,
                MessageManager.REQ_KNOWLEDGE,
                questionForms,
                "00:30:00"
        );
        return ResponseEntity.ok().body(form);
    }

    @PostMapping("/create")
    public ResponseEntity<?> createGraphTask(@RequestBody CreateGraphTaskChapterForm form)
            throws RequestValidationException, ParseException {
        graphTaskService.createGraphTask(form);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/map")
    public ResponseEntity<List<GraphNode>> getGraphMap(@RequestParam Long graphTaskID) throws EntityNotFoundException {
        return ResponseEntity.ok().body(graphTaskService.getGraphMap(graphTaskID));
    }
}
