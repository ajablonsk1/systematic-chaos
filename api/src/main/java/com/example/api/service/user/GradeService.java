package com.example.api.service.user;

import com.example.api.dto.response.user.BasicUser;
import com.example.api.dto.response.user.grade.GradeResponse;
import com.example.api.error.exception.WrongUserTypeException;
import com.example.api.model.activity.result.*;
import com.example.api.model.user.AccountType;
import com.example.api.model.user.User;
import com.example.api.repo.activity.result.AdditionalPointsRepo;
import com.example.api.repo.user.UserRepo;
import com.example.api.security.AuthenticationService;
import com.example.api.service.activity.feedback.SurveyResultService;
import com.example.api.service.activity.result.FileTaskResultService;
import com.example.api.service.activity.result.GraphTaskResultService;
import com.example.api.service.validator.UserValidator;
import com.example.api.util.csv.PointsToGradeMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Collection;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Stream;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class GradeService {
    private final UserRepo userRepo;
    private final UserValidator userValidator;
    private final AuthenticationService authService;
    private final GraphTaskResultService graphTaskResultService;
    private final FileTaskResultService fileTaskResultService;
    private final SurveyResultService surveyResultService;
    private final AdditionalPointsRepo additionalPointsRepo;

    public List<GradeResponse> getAllGrades() throws WrongUserTypeException {
        String email = authService.getAuthentication().getName();
        User professor = userRepo.findUserByEmail(email);
        userValidator.validateProfessorAccount(professor, email);

        return userRepo.findAllByAccountTypeEquals(AccountType.STUDENT)
                .stream()
                .map(this::getStudentFinalGrade)
                .sorted(Comparator.comparing(entry -> entry.getStudent().getLastName().toLowerCase() + entry.getStudent().getFirstName().toLowerCase()))
                .toList();
    }

    private GradeResponse getStudentFinalGrade(User student) {
        List<GraphTaskResult> graphTaskResults = graphTaskResultService.getAllGraphTaskResultsForStudent(student);
        List<FileTaskResult> fileTaskResults = fileTaskResultService.getAllFileTaskResultsForStudent(student);
        List<SurveyResult> surveyResults = surveyResultService.getAllSurveyResultsForStudent(student);
        List<AdditionalPoints> additionalPointsList = additionalPointsRepo.findAllByUser(student);

        Double pointsReceived = Stream.of(graphTaskResults, fileTaskResults, surveyResults)
                .flatMap(Collection::stream)
                .filter(TaskResult::isEvaluated)
                .mapToDouble(TaskResult::getPointsReceived)
                .sum();

        Double additionalPoints = additionalPointsList.stream()
                .mapToDouble(AdditionalPoints::getPointsReceived)
                .sum();

        Double pointsPossibleToGet = Stream.of(graphTaskResults, fileTaskResults, surveyResults)
                .flatMap(Collection::stream)
                .filter(TaskResult::isEvaluated)
                .mapToDouble(this::getMaxPointsFromTaskResult)
                .sum();

        pointsReceived = pointsReceived + additionalPoints;
        PointsToGradeMapper pointsToGradeMapper = new PointsToGradeMapper();
        Double finalGrade = pointsToGradeMapper.getGrade(pointsReceived, pointsPossibleToGet);
        return new GradeResponse(new BasicUser(student), finalGrade);
    }

    private Double getMaxPointsFromTaskResult(TaskResult taskResult) {
        switch (taskResult.getActivity().getActivityType()) {
            case TASK -> {
                return ((FileTaskResult) taskResult).getFileTask().getMaxPoints();
            }
            case EXPEDITION -> {
                return ((GraphTaskResult) taskResult).getGraphTask().getMaxPoints();
            }
            case SURVEY -> {
                return ((SurveyResult) taskResult).getSurvey().getMaxPoints();
            }
        }
        return 0.0;
    }
}
