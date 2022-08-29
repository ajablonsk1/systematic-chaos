package com.example.api.service.activity.result;

import com.example.api.dto.response.activity.task.result.AdditionalPointsListResponse;
import com.example.api.dto.response.activity.task.result.AdditionalPointsResponse;
import com.example.api.dto.response.activity.task.result.TaskPointsStatisticsResponse;
import com.example.api.dto.response.activity.task.result.TotalPointsResponse;
import com.example.api.error.exception.WrongUserTypeException;
import com.example.api.model.activity.result.FileTaskResult;
import com.example.api.model.user.User;
import com.example.api.repo.activity.result.AdditionalPointsRepo;
import com.example.api.repo.activity.result.FileTaskResultRepo;
import com.example.api.repo.activity.result.GraphTaskResultRepo;
import com.example.api.repo.activity.result.SurveyResultRepo;
import com.example.api.repo.user.UserRepo;
import com.example.api.security.AuthenticationService;
import com.example.api.service.validator.UserValidator;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Collection;
import java.util.List;
import java.util.concurrent.atomic.AtomicReference;
import java.util.stream.Stream;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class AllPointsService {
    private final UserRepo userRepo;
    private final AuthenticationService authService;
    private final UserValidator userValidator;
    private final TaskResultService taskResultService;
    private final AdditionalPointsService additionalPointsService;
    private final GraphTaskResultRepo graphTaskResultRepo;
    private final FileTaskResultRepo fileTaskResultRepo;
    private final SurveyResultRepo surveyResultRepo;
    private final AdditionalPointsRepo additionalPointsRepo;

    public List<?> getAllPointsListForProfessor(String studentEmail) throws WrongUserTypeException {
        String professorEmail = authService.getAuthentication().getName();
        User professor = userRepo.findUserByEmail(professorEmail);
        userValidator.validateProfessorAccount(professor, professorEmail);
        log.info("Fetching student all points {} for professor {}", studentEmail, professorEmail);

        return getAllPointsList(studentEmail);
    }

    public List<?> getAllPointsListForStudent() throws WrongUserTypeException {
        String studentEmail = authService.getAuthentication().getName();
        log.info("Fetching all points for student {}", studentEmail);
        return getAllPointsList(studentEmail);
    }

    public TotalPointsResponse getAllPointsTotal() throws WrongUserTypeException {
        String studentEmail = authService.getAuthentication().getName();
        User student = userRepo.findUserByEmail(studentEmail);
        userValidator.validateStudentAccount(student, studentEmail);

        log.info("Fetching student all points total {}", studentEmail);
        AtomicReference<Double> totalPointsReceived = new AtomicReference<>(0D);
        AtomicReference<Double> totalPointsToReceive = new AtomicReference<>(0D);
        graphTaskResultRepo.findAllByUser(student)
                .stream()
                .filter(graphTaskResult -> graphTaskResult.getPointsReceived() != null)
                .forEach(graphTaskResult -> {
                    totalPointsReceived.updateAndGet(v -> v + graphTaskResult.getPointsReceived());
                    totalPointsToReceive.updateAndGet(v -> v + graphTaskResult.getMaxPoints100());
                });
        fileTaskResultRepo.findAllByUser(student)
                .stream()
                .filter(FileTaskResult::isEvaluated)
                .forEach(fileTaskResult -> {
                    totalPointsReceived.updateAndGet(v -> v + fileTaskResult.getPointsReceived());
                    totalPointsToReceive.updateAndGet(v -> v + fileTaskResult.getFileTask().getMaxPoints());
                });
        surveyResultRepo.findAllByUser(student)
                .stream()
                .forEach(surveyTaskResult -> {
                    totalPointsReceived.updateAndGet(v -> v + surveyTaskResult.getPointsReceived());
                    totalPointsToReceive.updateAndGet(v -> v + surveyTaskResult.getPointsReceived());
                });
        additionalPointsRepo.findAllByUser(student)
                .stream()
                .forEach(additionalPoints -> {
                    totalPointsReceived.updateAndGet(v -> v + additionalPoints.getPointsReceived());
                });
        return new TotalPointsResponse(totalPointsReceived.get(), totalPointsToReceive.get());
    }

    private List<?> getAllPointsList(String studentEmail) throws WrongUserTypeException {
        User student = userRepo.findUserByEmail(studentEmail);
        userValidator.validateStudentAccount(student, studentEmail);

        List<TaskPointsStatisticsResponse> taskPoints = taskResultService.getUserPointsStatistics(studentEmail);
        List<AdditionalPointsResponse> additionalPoints = additionalPointsService.getAdditionalPoints(studentEmail);
        List<AdditionalPointsListResponse> additionalPointsList = additionalPoints
                .stream()
                .map(AdditionalPointsListResponse::new)
                .toList();

        return Stream.of(taskPoints, additionalPointsList)
                .flatMap(Collection::stream)
                .sorted(((o1, o2) -> Long.compare(o2.getDateMillis(), o1.getDateMillis())))
                .toList();
    }
}
