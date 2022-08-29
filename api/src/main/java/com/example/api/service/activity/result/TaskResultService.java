package com.example.api.service.activity.result;

import com.example.api.dto.request.activity.result.ActivityTypeWithIdForm;
import com.example.api.dto.request.activity.task.GetCSVForm;
import com.example.api.dto.response.activity.task.result.ActivityStatisticsResponse;
import com.example.api.dto.response.activity.task.result.TaskPointsStatisticsResponse;
import com.example.api.error.exception.EntityNotFoundException;
import com.example.api.error.exception.WrongUserTypeException;
import com.example.api.model.activity.feedback.Feedback;
import com.example.api.model.activity.result.FileTaskResult;
import com.example.api.model.activity.result.GraphTaskResult;
import com.example.api.model.activity.result.SurveyResult;
import com.example.api.model.activity.result.TaskResult;
import com.example.api.model.activity.task.*;
import com.example.api.model.group.Group;
import com.example.api.model.user.AccountType;
import com.example.api.model.user.User;
import com.example.api.repo.activity.feedback.ProfessorFeedbackRepo;
import com.example.api.repo.activity.result.FileTaskResultRepo;
import com.example.api.repo.activity.result.GraphTaskResultRepo;
import com.example.api.repo.activity.result.SurveyResultRepo;
import com.example.api.repo.activity.task.FileTaskRepo;
import com.example.api.repo.activity.task.GraphTaskRepo;
import com.example.api.repo.activity.task.SurveyRepo;
import com.example.api.repo.user.UserRepo;
import com.example.api.security.AuthenticationService;
import com.example.api.service.activity.result.util.GroupActivityStatisticsCreator;
import com.example.api.service.activity.result.util.ScaleActivityStatisticsCreator;
import com.example.api.service.validator.UserValidator;
import com.example.api.service.validator.activity.ActivityValidator;
import com.example.api.util.csv.CSVConverter;
import com.example.api.util.csv.CSVTaskResult;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.io.IOException;
import java.util.*;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.concurrent.atomic.AtomicReference;
import java.util.stream.Stream;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class TaskResultService {
    private final UserRepo userRepo;
    private final GraphTaskResultRepo graphTaskResultRepo;
    private final GraphTaskRepo graphTaskRepo;
    private final FileTaskResultRepo fileTaskResultRepo;
    private final FileTaskRepo fileTaskRepo;
    private final SurveyResultRepo surveyResultRepo;
    private final SurveyRepo surveyRepo;
    private final CSVConverter csvConverter;
    private final AuthenticationService authService;
    private final UserValidator userValidator;
    private final ProfessorFeedbackRepo professorFeedbackRepo;
    private final ActivityValidator activityValidator;

    public ByteArrayResource getCSVFile(GetCSVForm csvForm) throws IOException {
        log.info("Fetching csv files for students");
        List<Long> studentIds = csvForm.getStudentIds();
        List<ActivityTypeWithIdForm> forms = csvForm.getForms();
        List<User> students = userRepo.findAll()
                .stream()
                .filter(user -> studentIds.contains(user.getId()))
                .filter(user -> user.getAccountType() == AccountType.STUDENT)
                .toList();
        Map<User, List<CSVTaskResult>> userToResultMap = new HashMap<>();
        List<String> firstRow = new LinkedList<>(List.of("Imię", "Nazwisko", "NumerID", "Instytucja", "Wydział", "E-mail"));
        Map<Long, GraphTask> formToGraphTaskMap = new HashMap<>();
        Map<Long, FileTask> formToFileTaskMap = new HashMap<>();
        Map<Long, Survey> formToSurveyMap = new HashMap<>();
        fillFirstRowAndAddTasksToMap(forms, formToGraphTaskMap, formToFileTaskMap, formToSurveyMap, firstRow);
        students.forEach(student -> {
            List<CSVTaskResult> csvTaskResults = new LinkedList<>();
            forms.forEach(form -> {
                switch (form.getType()){
                    case EXPEDITION -> {
                        GraphTask graphTask = formToGraphTaskMap.get(form.getId());
                        GraphTaskResult graphTaskResult = graphTaskResultRepo.findGraphTaskResultByGraphTaskAndUser(graphTask, student);
                        csvTaskResults.add(new CSVTaskResult(graphTaskResult));
                    }
                    case TASK -> {
                        FileTask fileTask = formToFileTaskMap.get(form.getId());
                        FileTaskResult fileTaskResult = fileTaskResultRepo.findFileTaskResultByFileTaskAndUser(fileTask, student);
                        Feedback feedback = professorFeedbackRepo.findProfessorFeedbackByFileTaskResult(fileTaskResult);
                        csvTaskResults.add(new CSVTaskResult(fileTaskResult, feedback));
                    }
                    case SURVEY -> {
                        Survey survey = formToSurveyMap.get(form.getId());
                        SurveyResult surveyResult = surveyResultRepo.findSurveyResultBySurveyAndUser(survey, student);
                        csvTaskResults.add(new CSVTaskResult(surveyResult));
                    }
                }
            });
            userToResultMap.put(student, csvTaskResults);
        });
        return new ByteArrayResource(csvConverter.convertToByteArray(userToResultMap, firstRow));
    }

    public List<TaskPointsStatisticsResponse> getUserPointsStatistics() throws WrongUserTypeException {
        String email = authService.getAuthentication().getName();
        return getUserPointsStatistics(email);
    }

    public List<TaskPointsStatisticsResponse> getUserPointsStatistics(String email) throws WrongUserTypeException {
        User user = userRepo.findUserByEmail(email);
        userValidator.validateStudentAccount(user, email);
        List<TaskPointsStatisticsResponse> graphTaskStatistics = graphTaskResultRepo.findAllByUser(user)
                .stream()
                .filter(graphTaskResult -> graphTaskResult.getSendDateMillis() != null)
                .map(TaskPointsStatisticsResponse::new)
                .toList();
        List<TaskPointsStatisticsResponse> fileTaskResults = fileTaskResultRepo.findAllByUser(user)
                .stream()
                .filter(FileTaskResult::isEvaluated)
                .map(TaskPointsStatisticsResponse::new)
                .toList();
        List<TaskPointsStatisticsResponse> surveyResults = surveyResultRepo.findAllByUser(user)
                .stream()
                .map(TaskPointsStatisticsResponse::new)
                .toList();
        return Stream.of(graphTaskStatistics, fileTaskResults, surveyResults)
                .flatMap(Collection::stream)
                .sorted(((o1, o2) -> Long.compare(o2.getDateMillis(), o1.getDateMillis())))
                .toList();
    }

    public ActivityStatisticsResponse getActivityStatistics(Long activityID) throws WrongUserTypeException, EntityNotFoundException {
        String professorEmail = authService.getAuthentication().getName();
        User professor = userRepo.findUserByEmail(professorEmail);
        userValidator.validateProfessorAccount(professor, professorEmail);

        Activity activity = getActivity(activityID);
        activityValidator.validateActivityIsNotNull(activity, activityID);
        return getActivityStatisticsForActivity(activity);
    }

    private void fillFirstRowAndAddTasksToMap(List<ActivityTypeWithIdForm> forms,
                                              Map<Long, GraphTask> formToGraphTaskMap,
                                              Map<Long, FileTask> formToFileTaskMap,
                                              Map<Long, Survey> formToSurveyMap,
                                              List<String> firstRow) {
        forms.forEach(form -> {
            switch (form.getType()){
                case EXPEDITION -> {
                    GraphTask graphTask = graphTaskRepo.findGraphTaskById(form.getId());
                    firstRow.addAll(List.of("Zadanie:" + graphTask.getTitle() + " (Punkty)", "Zadanie:" + graphTask.getTitle() + " (Informacja zwrotna)"));
                    formToGraphTaskMap.put(graphTask.getId(), graphTask);
                }
                case TASK -> {
                    FileTask fileTask = fileTaskRepo.findFileTaskById(form.getId());
                    firstRow.addAll(List.of("Zadanie:" + fileTask.getTitle() + " (Punkty)", "Zadanie:" + fileTask.getTitle() + " (Informacja zwrotna)"));
                    formToFileTaskMap.put(fileTask.getId(), fileTask);
                }
                case SURVEY -> {
                    Survey survey = surveyRepo.findSurveyById(form.getId());
                    firstRow.addAll(List.of("Zadanie:" + survey.getTitle() + " (Punkty)", "Zadanie:" + survey.getTitle() + " (Informacja zwrotna)"));
                    formToSurveyMap.put(survey.getId(), survey);
                }
            }
        });
    }

    private Activity getActivity(Long activityID) {
        GraphTask graphTask = graphTaskRepo.findGraphTaskById(activityID);
        if (graphTask != null) {
            return graphTask;
        }
        FileTask fileTask = fileTaskRepo.findFileTaskById(activityID);
        if (fileTask != null) {
            return fileTask;
        }
        return surveyRepo.findSurveyById(activityID);
    }

    private List<? extends TaskResult> getResultsForTask(Task task) {
        if (task instanceof GraphTask) {
            return graphTaskResultRepo.findAllByAndGraphTask((GraphTask) task)
                    .stream()
                    .filter(result -> result.getPointsReceived() !=null)
                    .toList();
        }
        else if (task instanceof FileTask) {
            return fileTaskResultRepo.findAllByFileTask((FileTask) task)
                    .stream()
                    .filter(FileTaskResult::isEvaluated)
                    .toList();
        }
        return List.of();
    }

    private ActivityStatisticsResponse getActivityStatisticsForActivity(Activity activity) {
        ActivityStatisticsResponse response = new ActivityStatisticsResponse();
        boolean activityIsSurvey = activity instanceof Survey;
        if (activityIsSurvey) {
            response.setActivity100(((Survey) activity).getPoints());
        }
        else {
            response.setActivity100(((Task) activity).getMaxPoints());
        }

        AtomicInteger answersNumber = new AtomicInteger(0);
        AtomicReference<Double> sumPoints = new AtomicReference<>(0D);
        AtomicReference<Double> bestScore = new AtomicReference<>(null);
        AtomicReference<Double> worstScore = new AtomicReference<>(null);
        AtomicReference<HashMap<Group, GroupActivityStatisticsCreator>> avgScoreCreators =
                new AtomicReference<>(new HashMap<>());
        AtomicReference<ScaleActivityStatisticsCreator> scaleScores =
                new AtomicReference<>(new ScaleActivityStatisticsCreator(activity));

        List<? extends TaskResult> results = getActivityResults(activity);
        results.forEach(
                result -> {
                    answersNumber.incrementAndGet();
                    sumPoints.set(sumPoints.get() + result.getPointsReceived());
                    if (bestScore.get() == null) bestScore.set(result.getPointsReceived());
                    else bestScore.set(Math.max(bestScore.get(), result.getPointsReceived()));
                    if (worstScore.get() == null) worstScore.set(result.getPointsReceived());
                    else worstScore.set(Math.min(worstScore.get(), result.getPointsReceived()));

                    GroupActivityStatisticsCreator creator = avgScoreCreators.get().get(result.getUser().getGroup());
                    if (creator == null) avgScoreCreators.get().put(result.getUser().getGroup(), new GroupActivityStatisticsCreator(activity, result));
                    else creator.add(result);

                    scaleScores.get().add(result);
                });
        response.setAnswersNumber(answersNumber.get());
        if (answersNumber.get() > 0) {
            response.setAvgPoints(sumPoints.get() / answersNumber.get());
            if (!activityIsSurvey) {
                response.setAvgPercentageResult(100 * sumPoints.get() / (((Task) activity).getMaxPoints()* answersNumber.get()));
            }
        }
        response.setBestScore(bestScore.get());
        response.setWorstScore(worstScore.get());
        response.setAvgScores(avgScoreCreators.get().values()
                .stream()
                .map(GroupActivityStatisticsCreator::create)
                .toList()
        );
        response.setScaleScores(scaleScores.get().create());
        return response;

    }

    private List<? extends TaskResult> getActivityResults(Activity activity) {
        if (activity instanceof Survey) {
            return surveyResultRepo.findAllBySurvey((Survey) activity);
        }
        return getResultsForTask((Task) activity);
    }
}
