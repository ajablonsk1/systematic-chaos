package com.example.api.service.activity.result;

import com.example.api.dto.response.activity.task.result.AdditionalPointsResponse;
import com.example.api.dto.response.activity.task.result.PointsResponse;
import com.example.api.dto.response.activity.task.result.TaskPointsStatisticsResponse;
import com.example.api.error.exception.WrongUserTypeException;
import com.example.api.model.activity.result.AdditionalPoints;
import com.example.api.model.user.User;
import com.example.api.repo.activity.result.AdditionalPointsRepo;
import com.example.api.repo.user.UserRepo;
import com.example.api.security.AuthenticationService;
import com.example.api.service.validator.UserValidator;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Collection;
import java.util.List;
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

    public List<?> getAllPointsList(String studentEmail) throws WrongUserTypeException {
        String professorEmail = authService.getAuthentication().getName();
        User professor = userRepo.findUserByEmail(professorEmail);
        userValidator.validateProfessorAccount(professor, professorEmail);

        User student = userRepo.findUserByEmail(studentEmail);
        userValidator.validateStudentAccount(student, studentEmail);
        log.info("Fetching student all points {} for professor {}", studentEmail, professorEmail);
        List<TaskPointsStatisticsResponse> taskPoints = taskResultService.getUserPointsStatistics(studentEmail);
        List<AdditionalPointsResponse> additionalPoints = additionalPointsService.getAdditionalPoints(studentEmail);

        return Stream.of(taskPoints, additionalPoints)
                .flatMap(Collection::stream)
                .sorted(((o1, o2) -> Long.compare(o2.getDateMillis(), o1.getDateMillis())))
                .toList();
    }
}
