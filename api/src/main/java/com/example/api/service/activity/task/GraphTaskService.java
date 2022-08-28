package com.example.api.service.activity.task;

import com.example.api.dto.request.activity.task.create.CreateGraphTaskForm;
import com.example.api.dto.request.activity.task.create.OptionForm;
import com.example.api.dto.request.activity.task.create.QuestionForm;
import com.example.api.error.exception.EntityNotFoundException;
import com.example.api.error.exception.WrongUserTypeException;
import com.example.api.model.activity.task.GraphTask;
import com.example.api.model.question.Option;
import com.example.api.model.question.Question;
import com.example.api.model.user.User;
import com.example.api.repo.activity.task.GraphTaskRepo;
import com.example.api.repo.question.OptionRepo;
import com.example.api.repo.question.QuestionRepo;
import com.example.api.repo.user.UserRepo;
import com.example.api.security.AuthenticationService;
import com.example.api.service.validator.ActivityValidator;
import com.example.api.service.validator.UserValidator;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.concurrent.atomic.AtomicReference;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class GraphTaskService {
    private final GraphTaskRepo graphTaskRepo;
    private final ActivityValidator activityValidator;
    private final AuthenticationService authService;
    private final UserRepo userRepo;
    private final UserValidator userValidator;
    private final OptionRepo optionRepo;
    private final QuestionRepo questionRepo;

    public GraphTask saveGraphTask(GraphTask graphTask) {
        return graphTaskRepo.save(graphTask);
    }

    public GraphTask getGraphTaskById(Long id) throws EntityNotFoundException {
        log.info("Fetching graph task with id {}", id);
        GraphTask graphTask = graphTaskRepo.findGraphTaskById(id);
        activityValidator.validateActivityIsNotNull(graphTask, id);
        return graphTaskRepo.findGraphTaskById(id);
    }

    public void createGraphTask(CreateGraphTaskForm form) throws ParseException, WrongUserTypeException {
        log.info("Creating graph task");
        SimpleDateFormat expireDateFormat = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");
        SimpleDateFormat timeToSolveFormat = new SimpleDateFormat("HH:mm:ss");
        Date expireDate = expireDateFormat.parse(form.getActivityExpireDate());
        Date timeToSolve = timeToSolveFormat.parse(form.getTimeToSolve());
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(timeToSolve);
        long expireDateMillis = expireDate.getTime();
        long timeToSolveMillis = calendar.getTimeInMillis();
        String email = authService.getAuthentication().getName();
        User professor = userRepo.findUserByEmail(email);
        userValidator.validateProfessorAccount(professor, email);

        List<QuestionForm> questionForms = form.getQuestions();
        Map<Integer, Question> numToQuestion = new HashMap<>();
        List<Double> points = new LinkedList<>();
        questionForms.forEach(questionForm -> {
                    if(questionForm.getType() == null) {
                        numToQuestion.put(questionForm.getQuestionNum(), new Question());
                    } else {
                        points.add(questionForm.getPoints());
                        switch (questionForm.getType()) {
                            case OPENED -> {
                                numToQuestion.put(questionForm.getQuestionNum(), new Question(questionForm.getType(),
                                        questionForm.getContent(),
                                        questionForm.getHint(),
                                        questionForm.getDifficulty(),
                                        questionForm.getPoints(),
                                        questionForm.getAnswerForOpenedQuestion()));
                            }
                            case SINGLE_CHOICE, MULTIPLE_CHOICE -> {
                                Question question = new Question(questionForm.getType(),
                                        questionForm.getContent(),
                                        questionForm.getHint(),
                                        questionForm.getDifficulty(),
                                        questionForm.getPoints());
                                List<OptionForm> optionForms = questionForm.getAnswers();
                                List<Option> options = optionForms.stream()
                                        .map(optionForm -> new Option(optionForm, question))
                                        .toList();
                                optionRepo.saveAll(options);
                                question.setOptions(options);
                                numToQuestion.put(questionForm.getQuestionNum(), question);
                            }
                        }
                    }
                });
        List<Question> questions = new LinkedList<>();
        questionForms.forEach(questionForm -> {
            Question question = numToQuestion.get(questionForm.getQuestionNum());
            List<Integer> nextQuestionsNum = questionForm.getNextQuestions();
            nextQuestionsNum.forEach(num -> {
                Question nextQuestion = numToQuestion.get(num);
                question.getNext().add(nextQuestion);
            });
            questions.add(question);
        });
        questionRepo.saveAll(questions);
        GraphTask graphTask = new GraphTask(form,
                professor,
                questions,
                expireDateMillis,
                timeToSolveMillis,
                points.stream().mapToDouble(f -> f).sum());
        graphTaskRepo.save(graphTask);
    }
}
