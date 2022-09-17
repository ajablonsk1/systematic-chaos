package com.example.api.service.activity.task;

import com.example.api.dto.request.activity.task.create.CreateGraphTaskChapterForm;
import com.example.api.dto.request.activity.task.create.CreateGraphTaskForm;
import com.example.api.dto.request.activity.task.create.OptionForm;
import com.example.api.dto.request.activity.task.create.QuestionForm;
import com.example.api.error.exception.EntityNotFoundException;
import com.example.api.error.exception.RequestValidationException;
import com.example.api.model.activity.task.GraphTask;
import com.example.api.model.map.Chapter;
import com.example.api.model.question.Difficulty;
import com.example.api.model.question.Option;
import com.example.api.model.question.Question;
import com.example.api.model.question.QuestionType;
import com.example.api.model.user.User;
import com.example.api.repo.activity.task.GraphTaskRepo;
import com.example.api.repo.map.ChapterRepo;
import com.example.api.repo.question.OptionRepo;
import com.example.api.repo.question.QuestionRepo;
import com.example.api.repo.user.UserRepo;
import com.example.api.security.AuthenticationService;
import com.example.api.service.map.RequirementService;
import com.example.api.service.validator.ChapterValidator;
import com.example.api.service.validator.UserValidator;
import com.example.api.service.validator.activity.ActivityValidator;
import com.example.api.util.calculator.TimeParser;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class GraphTaskService {
    private final GraphTaskRepo graphTaskRepo;
    private final ActivityValidator activityValidator;
    private final AuthenticationService authService;
    private final UserRepo userRepo;
    private final OptionRepo optionRepo;
    private final QuestionRepo questionRepo;
    private final ChapterRepo chapterRepo;
    private final UserValidator userValidator;
    private final TimeParser timeParser;
    private final RequirementService requirementService;
    private final ChapterValidator chapterValidator;

    public GraphTask saveGraphTask(GraphTask graphTask) {
        return graphTaskRepo.save(graphTask);
    }

    public GraphTask getGraphTaskById(Long id) throws EntityNotFoundException {
        log.info("Fetching graph task with id {}", id);
        GraphTask graphTask = graphTaskRepo.findGraphTaskById(id);
        activityValidator.validateActivityIsNotNull(graphTask, id);
        return graphTaskRepo.findGraphTaskById(id);
    }

    public void createGraphTask(CreateGraphTaskChapterForm chapterForm) throws ParseException, RequestValidationException {
        log.info("Starting creation of new GraphTask");
        CreateGraphTaskForm form = chapterForm.getForm();
        Chapter chapter = chapterRepo.findChapterById(chapterForm.getChapterId());

        chapterValidator.validateChapterIsNotNull(chapter, chapterForm.getChapterId());
        activityValidator.validateCreateGraphTaskFormFields(form);
        activityValidator.validateActivityPosition(form, chapter);

        List<GraphTask> graphTasks = graphTaskRepo.findAll();
        activityValidator.validateGraphTaskTitleIsUnique(form.getTitle(), graphTasks);

        SimpleDateFormat expireDateFormat = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");
        SimpleDateFormat timeToSolveFormat = new SimpleDateFormat("HH:mm:ss");
        long expireDateMillis = timeParser.parseAndGetTimeMillisFromDate(expireDateFormat, form.getActivityExpireDate());
        long timeToSolveMillis = timeParser.parseAndGetTimeMillisFromHour(timeToSolveFormat, form.getTimeToSolve());

        String email = authService.getAuthentication().getName();
        User professor = userRepo.findUserByEmail(email);
        userValidator.validateProfessorAccount(professor, email);

        List<QuestionForm> questionForms = form.getQuestions();
        Map<Integer, Question> numToQuestion = new HashMap<>();
        for (QuestionForm questionForm: questionForms) {
            if(questionForm.getQuestionType() == null) {
                numToQuestion.put(questionForm.getQuestionNum(), new Question());
            } else {
                QuestionType type = activityValidator.getQuestionTypeFromString(questionForm.getQuestionType());
                Difficulty difficulty = activityValidator.getDifficultyFromString(questionForm.getDifficulty());
                switch (type) {
                    case OPENED -> numToQuestion.put(questionForm.getQuestionNum(),
                            new Question(
                                    type,
                                    questionForm.getContent(),
                                    questionForm.getHint(),
                                    difficulty,
                                    questionForm.getPoints(),
                                    questionForm.getAnswerForOpenedQuestion()));
                    case SINGLE_CHOICE, MULTIPLE_CHOICE -> {
                        Question question = new Question(
                                type,
                                questionForm.getContent(),
                                questionForm.getHint(),
                                difficulty,
                                questionForm.getPoints());
                        List<OptionForm> optionForms = questionForm.getAnswers();
                        List<Option> options = optionForms.stream()
                                .map(optionForm -> new Option(optionForm, question))
                                .toList();
                        options.forEach(option -> option.setQuestion(question));
                        optionRepo.saveAll(options);
                        question.setOptions(options);
                        numToQuestion.put(questionForm.getQuestionNum(), question);
                    }
                }
            }
        }
        List<Question> questions = new LinkedList<>();
        for (QuestionForm questionForm: questionForms) {
            Question question = numToQuestion.get(questionForm.getQuestionNum());
            List<Integer> nextQuestionsNum = questionForm.getNextQuestions();
            nextQuestionsNum.forEach(num -> {
                Question nextQuestion = numToQuestion.get(num);
                question.getNext().add(nextQuestion);
            });
            questions.add(question);
        }
        questionRepo.saveAll(questions);

        double maxPoints = calculateMaxPoints(questions.get(0), 0);

        GraphTask graphTask = new GraphTask(form,
                professor,
                questions,
                expireDateMillis,
                timeToSolveMillis,
                maxPoints);
        graphTask.setRequirements(requirementService.getDefaultRequirements());
        graphTaskRepo.save(graphTask);

        chapterValidator.validateChapterIsNotNull(chapter, chapterForm.getChapterId());
        chapter.getActivityMap().getGraphTasks().add(graphTask);
    }

    private double calculateMaxPoints(Question question, double maxPoints) {
        List<Question> nextQuestions = question.getNext();
        if (nextQuestions.isEmpty()) {
            return maxPoints;
        }
        List<Double> points = new LinkedList<>();
        for (Question nextQuestion: nextQuestions) {
            points.add(calculateMaxPoints(nextQuestion, maxPoints + nextQuestion.getPoints()));
        }
        return points.stream().max(Double::compareTo).get();
    }
}
