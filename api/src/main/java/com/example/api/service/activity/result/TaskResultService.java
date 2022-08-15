package com.example.api.service.activity.result;

import com.example.api.dto.response.activity.task.result.TaskPointsStatisticsResponse;
import com.example.api.error.exception.WrongUserTypeException;
import com.example.api.model.user.AccountType;
import com.example.api.model.user.User;
import com.example.api.repo.activity.result.FileTaskResultRepo;
import com.example.api.repo.activity.result.GraphTaskResultRepo;
import com.example.api.repo.activity.result.SurveyResultRepo;
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

@Service
@RequiredArgsConstructor
@Slf4j
public class TaskResultService {
    private final UserRepo userRepo;
    private final GraphTaskResultRepo graphTaskResultRepo;
    private final FileTaskResultRepo fileTaskResultRepo;
    private final SurveyResultRepo surveyResultRepo;
    private final CSVConverter csvConverter;
    private final AuthenticationService authService;
    private final UserValidator userValidator;

    public ByteArrayResource getCSVFile(List<Long> ids) throws IOException {
        log.info("Fetching csv files for students");
        List<User> students = userRepo.findAll()
                .stream()
                .filter(user -> ids.contains(user.getId()))
                .filter(user -> user.getAccountType() == AccountType.STUDENT)
                .toList();
        Map<User, List<CSVTaskResult>> userToResultMap = new HashMap<>();
        students.forEach(student -> {
            List<CSVTaskResult> graphTaskResults = graphTaskResultRepo.findAll()
                    .stream()
                    .filter(result -> Objects.equals(result.getUser().getId(), student.getId()))
                    .map(CSVTaskResult::new)
                    .toList();
            List<CSVTaskResult> fileTaskResults = fileTaskResultRepo.findAll()
                    .stream()
                    .filter(result -> Objects.equals(result.getUser().getId(), student.getId()))
                    .map(CSVTaskResult::new)
                    .toList();
            List<CSVTaskResult> csvTaskResults = Stream.of(graphTaskResults, fileTaskResults)
                    .flatMap(List::stream)
                    .toList();
            userToResultMap.put(student, csvTaskResults);
        });
        return new ByteArrayResource(csvConverter.convertToByteArray(userToResultMap));
    }

    public List<TaskPointsStatisticsResponse> getUserPointsStatistics() throws WrongUserTypeException {
        String email = authService.getAuthentication().getName();
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
}
