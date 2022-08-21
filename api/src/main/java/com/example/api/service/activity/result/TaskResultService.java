package com.example.api.service.activity.result;

import com.example.api.dto.request.activity.result.ActivityTypeWithIdForm;
import com.example.api.dto.request.activity.task.GetCSVForm;
import com.example.api.dto.response.activity.task.result.TaskPointsStatisticsResponse;
import com.example.api.error.exception.WrongUserTypeException;
import com.example.api.model.activity.feedback.Feedback;
import com.example.api.model.activity.feedback.ProfessorFeedback;
import com.example.api.model.activity.result.FileTaskResult;
import com.example.api.model.activity.result.GraphTaskResult;
import com.example.api.model.activity.result.SurveyResult;
import com.example.api.model.activity.task.FileTask;
import com.example.api.model.activity.task.GraphTask;
import com.example.api.model.activity.task.Survey;
import com.example.api.model.activity.task.Task;
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
import com.example.api.service.validator.UserValidator;
import com.example.api.util.csv.CSVConverter;
import com.example.api.util.csv.CSVTaskResult;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.*;
import java.util.stream.Stream;

import javax.transaction.Transactional;

import static com.example.api.dto.response.map.task.ActivityType.EXPEDITION;

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
                .map(TaskPointsStatisticsResponse::new)
                .toList();
        List<TaskPointsStatisticsResponse> fileTaskResults = fileTaskResultRepo.findAllByUser(user)
                .stream()
                .map(TaskPointsStatisticsResponse::new)
                .toList();;
        List<TaskPointsStatisticsResponse> surveyResults = surveyResultRepo.findAllByUser(user)
                .stream()
                .map(TaskPointsStatisticsResponse::new)
                .toList();
        return Stream.of(graphTaskStatistics, fileTaskResults, surveyResults)
                .flatMap(Collection::stream)
                .sorted(((o1, o2) -> Long.compare(o2.getDateMillis(), o1.getDateMillis())))
                .toList();
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
                    firstRow.addAll(List.of("Zadanie:" + graphTask.getName() + " (Punkty)", "Zadanie:" + graphTask.getName() + " (Informacja zwrotna)"));
                    formToGraphTaskMap.put(graphTask.getId(), graphTask);
                }
                case TASK -> {
                    FileTask fileTask = fileTaskRepo.findFileTaskById(form.getId());
                    firstRow.addAll(List.of("Zadanie:" + fileTask.getName() + " (Punkty)", "Zadanie:" + fileTask.getName() + " (Informacja zwrotna)"));
                    formToFileTaskMap.put(fileTask.getId(), fileTask);
                }
                case SURVEY -> {
                    Survey survey = surveyRepo.findSurveyById(form.getId());
                    firstRow.addAll(List.of("Zadanie:" + survey.getName() + " (Punkty)", "Zadanie:" + survey.getName() + " (Informacja zwrotna)"));
                    formToSurveyMap.put(survey.getId(), survey);
                }
            }
        });
    }

}
