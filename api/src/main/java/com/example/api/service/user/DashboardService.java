package com.example.api.service.user;

import com.example.api.dto.response.ranking.RankingResponse;
import com.example.api.dto.response.user.dashboard.DashboardResponse;
import com.example.api.dto.response.user.dashboard.GeneralStats;
import com.example.api.dto.response.user.dashboard.HeroTypeStats;
import com.example.api.dto.response.user.dashboard.LastAddedActivity;
import com.example.api.error.exception.EntityNotFoundException;
import com.example.api.error.exception.WrongUserTypeException;
import com.example.api.model.activity.result.*;
import com.example.api.model.activity.task.FileTask;
import com.example.api.model.user.User;
import com.example.api.repo.activity.result.AdditionalPointsRepo;
import com.example.api.repo.activity.result.FileTaskResultRepo;
import com.example.api.repo.activity.result.GraphTaskResultRepo;
import com.example.api.repo.activity.result.SurveyResultRepo;
import com.example.api.repo.activity.task.FileTaskRepo;
import com.example.api.repo.activity.task.GraphTaskRepo;
import com.example.api.repo.activity.task.InfoRepo;
import com.example.api.repo.activity.task.SurveyRepo;
import com.example.api.repo.user.UserRepo;
import com.example.api.security.AuthenticationService;
import com.example.api.service.activity.result.ranking.RankingService;
import com.example.api.service.validator.UserValidator;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.OptionalDouble;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class DashboardService {
    private final UserRepo userRepo;
    private final AuthenticationService authService;
    private final UserValidator userValidator;
    private final RankingService rankingService;
    private final GraphTaskResultRepo graphTaskResultRepo;
    private final FileTaskResultRepo fileTaskResultRepo;
    private final SurveyResultRepo surveyResultRepo;
    private final AdditionalPointsRepo additionalPointsRepo;
    private final GraphTaskRepo graphTaskRepo;
    private final FileTaskRepo fileTaskRepo;
    private final SurveyRepo surveyRepo;
    private final InfoRepo infoRepo;

    public DashboardResponse getStudentDashboard() throws WrongUserTypeException, EntityNotFoundException {
        String studentEmail = authService.getAuthentication().getName();
        User student = userRepo.findUserByEmail(studentEmail);
        userValidator.validateStudentAccount(student, studentEmail);

        DashboardResponse response = new DashboardResponse();
        response.setHeroTypeStats(getHeroTypeStats(student));
        response.setGeneralStats(getGeneralStats(student));
        response.setLastAddedActivities(getLastAddedActivities(student));


        return response;
    }

    private HeroTypeStats getHeroTypeStats(User student) throws EntityNotFoundException {
        String heroType = student.getHeroType().getPolishTypeName();

        List<RankingResponse> ranking = rankingService.getRanking();
        RankingResponse rank = getRank(student, ranking);
        if (rank == null) {
            log.error("Student {} not found in ranking", student.getEmail());
            throw new EntityNotFoundException("Student " + student.getEmail() + " not found in ranking");
        }
        Integer rankPosition = rank.getPosition();
        Long rankLength = (long) ranking.size();
        Double betterPlayerPoints = rankPosition > 1 ? ranking.get(rankPosition - 1).getPoints() : null;
        Double worsePlayerPoints = rankPosition < rankLength ? ranking.get(rankPosition + 1).getPoints() : null;

        return new HeroTypeStats(heroType, rankPosition, rankLength, betterPlayerPoints, worsePlayerPoints);
    }

    private RankingResponse getRank(User student, List<RankingResponse> ranking) {
        return ranking
                .stream()
                .filter(rankingResponse -> rankingResponse.getEmail().equals(student.getEmail()))
                .findAny()
                .orElse(null);
    }

    private GeneralStats getGeneralStats(User student) {
        Double avgGraphTask = getAvgGraphTask(student);
        Double avgCombatTask = getAvgCombatTask(student);
        Long surveysNumber = getSurveysNumber(student);
        Double graphTaskPoints = getGraphTaskPoints(student);
        Double combatTaskPoints = getCombatTaskPoints(student);
        Double additionalPoints=  getAdditionalPoints(student);
        Double allPoints = graphTaskPoints + combatTaskPoints + additionalPoints;
        Double maxPoints = getMaxPoints(student);

        return new GeneralStats(
                avgGraphTask,
                avgCombatTask,
                surveysNumber,
                graphTaskPoints,
                combatTaskPoints,
                allPoints,
                maxPoints
        );
    }

    private Double getAvgGraphTask(User student) {
        OptionalDouble avg = graphTaskResultRepo.findAllByUser(student)
                .stream()
                .filter(GraphTaskResult::isEvaluated)
                .mapToDouble(result -> 100 * result.getPointsReceived() / result.getGraphTask().getMaxPoints())
                .average();
        return avg.isPresent() ? avg.getAsDouble() : null;
    }

    private Double getAvgCombatTask(User student) {
        OptionalDouble avg = fileTaskResultRepo.findAllByUser(student)
                .stream()
                .filter(FileTaskResult::isEvaluated)
                .mapToDouble(result -> 100 * result.getPointsReceived() / result.getFileTask().getMaxPoints())
                .average();
        return avg.isPresent() ? avg.getAsDouble() : null;
    }

    private Long getSurveysNumber(User student) {
        return (long) surveyResultRepo.findAllByUser(student)
                .size();
    }

    private Double getGraphTaskPoints(User student) {
        return getTaskPoints(graphTaskResultRepo.findAllByUser(student));
    }

    private Double getCombatTaskPoints(User student) {
        return getTaskPoints(fileTaskResultRepo.findAllByUser(student));
    }

    private Double getAdditionalPoints(User student) {
        return getTaskPoints(additionalPointsRepo.findAllByUser(student));
    }

    private Double getTaskPoints(List<? extends TaskResult> taskResults) {
        return taskResults
                .stream()
                .mapToDouble(TaskResult::getPointsReceived)
                .sum();
    }

    private Double getMaxPoints(User student) {
        Double maxPointsGraphTask = graphTaskResultRepo.findAllByUser(student)
                .stream()
                .filter(GraphTaskResult::isEvaluated)
                .mapToDouble(result -> result.getGraphTask().getMaxPoints())
                .sum();
        Double maxPointsFileTask = fileTaskResultRepo.findAllByUser(student)
                .stream()
                .filter(FileTaskResult::isEvaluated)
                .mapToDouble(result -> result.getFileTask().getMaxPoints())
                .sum();
        Double maxPointsSurvey = surveyResultRepo.findAllByUser(student)
                .stream()
                .filter(SurveyResult::isEvaluated)
                .mapToDouble(result -> result.getSurvey().getMaxPoints())
                .sum();
        return maxPointsGraphTask + maxPointsFileTask + maxPointsSurvey;
    }

    private List<LastAddedActivity> getLastAddedActivities(User student) {
        return null;
    }
}
