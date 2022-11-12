package com.example.api.service.user;

import com.example.api.dto.response.map.task.ActivityType;
import com.example.api.dto.response.ranking.RankingResponse;
import com.example.api.dto.response.user.dashboard.*;
import com.example.api.error.exception.EntityNotFoundException;
import com.example.api.error.exception.MissingAttributeException;
import com.example.api.error.exception.WrongUserTypeException;
import com.example.api.model.activity.result.FileTaskResult;
import com.example.api.model.activity.result.GraphTaskResult;
import com.example.api.model.activity.result.SurveyResult;
import com.example.api.model.activity.result.TaskResult;
import com.example.api.model.activity.task.*;
import com.example.api.model.map.Chapter;
import com.example.api.model.map.requirement.Requirement;
import com.example.api.model.user.Rank;
import com.example.api.model.user.User;
import com.example.api.repo.activity.result.AdditionalPointsRepo;
import com.example.api.repo.activity.result.FileTaskResultRepo;
import com.example.api.repo.activity.result.GraphTaskResultRepo;
import com.example.api.repo.activity.result.SurveyResultRepo;
import com.example.api.repo.user.UserRepo;
import com.example.api.security.AuthenticationService;
import com.example.api.service.activity.result.ranking.RankingService;
import com.example.api.service.activity.task.FileTaskService;
import com.example.api.service.activity.task.GraphTaskService;
import com.example.api.service.activity.task.InfoService;
import com.example.api.service.activity.task.SurveyService;
import com.example.api.service.map.ChapterService;
import com.example.api.service.validator.UserValidator;
import com.example.api.util.calculator.PointsCalculator;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Collection;
import java.util.List;
import java.util.Objects;
import java.util.OptionalDouble;
import java.util.stream.Stream;

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
    private final GraphTaskService graphTaskService;
    private final FileTaskService fileTaskService;
    private final SurveyService surveyService;
    private final InfoService infoService;
    private final ChapterService chapterService;
    private final RankService rankService;
    private final BadgeService badgeService;

    private final long MAX_LAST_ACTIVITIES_IN_DASHBOARD = 8;

    public DashboardResponse getStudentDashboard() throws WrongUserTypeException, EntityNotFoundException, MissingAttributeException {
        String studentEmail = authService.getAuthentication().getName();
        User student = userRepo.findUserByEmail(studentEmail);
        userValidator.validateStudentAccount(student, studentEmail);
        badgeService.checkAllBadges();

        return new DashboardResponse(
                getHeroTypeStats(student),
                getGeneralStats(student),
                getLastAddedActivities(),
                getHeroStats(student)
        );
    }

    private HeroTypeStats getHeroTypeStats(User student) throws EntityNotFoundException {
        String heroType = String.valueOf(student.getHeroType());

        List<RankingResponse> ranking = rankingService.getRanking();
        RankingResponse rank = getRank(student, ranking);
        if (rank == null) {
            log.error("Student {} not found in ranking", student.getEmail());
            throw new EntityNotFoundException("Student " + student.getEmail() + " not found in ranking");
        }
        Integer rankPosition = rank.getPosition();
        Long rankLength = (long) ranking.size();
        Double betterPlayerPoints = rankPosition > 1 ? ranking.get(rankPosition - 2).getPoints() : null;
        Double worsePlayerPoints = rankPosition < rankLength ? ranking.get(rankPosition).getPoints() : null;

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
        Double avgFileTask = getAvgFileTask(student);
        Long surveysNumber = getSurveysNumber(student);
        Double graphTaskPoints = getGraphTaskPoints(student);
        Double fileTaskPoints = getFileTaskPoints(student);
        Double additionalPoints =  getAdditionalPoints(student);
        Double surveyPoints = getSurveyPoints(student);
        Double allPoints = graphTaskPoints + fileTaskPoints + additionalPoints + surveyPoints;
        Double maxPoints = getMaxPoints(student);

        return new GeneralStats(
                avgGraphTask,
                avgFileTask,
                surveysNumber,
                graphTaskPoints,
                fileTaskPoints,
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
        return avg.isPresent() ? PointsCalculator.round(avg.getAsDouble(), 2) : null;
    }

    private Double getAvgFileTask(User student) {
        OptionalDouble avg = fileTaskResultRepo.findAllByUser(student)
                .stream()
                .filter(FileTaskResult::isEvaluated)
                .mapToDouble(result -> 100 * result.getPointsReceived() / result.getFileTask().getMaxPoints())
                .average();
        return avg.isPresent() ? PointsCalculator.round(avg.getAsDouble(), 2) : null;
    }

    private Long getSurveysNumber(User student) {
        return (long) surveyResultRepo.findAllByUser(student)
                .size();
    }

    private Double getGraphTaskPoints(User student) {
        return getTaskPoints(graphTaskResultRepo.findAllByUser(student));
    }

    private Double getFileTaskPoints(User student) {
        return getTaskPoints(fileTaskResultRepo.findAllByUser(student));
    }

    private Double getAdditionalPoints(User student) {
        return getTaskPoints(additionalPointsRepo.findAllByUser(student));
    }

    private Double getSurveyPoints(User student) {
        return getTaskPoints(surveyResultRepo.findAllByUser(student));
    }

    private Double getTaskPoints(List<? extends TaskResult> taskResults) {
        return taskResults
                .stream()
                .filter(TaskResult::isEvaluated)
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

    private List<LastAddedActivity> getLastAddedActivities() {
        List<GraphTask> graphTasks = graphTaskService.getStudentGraphTasks();
        List<FileTask> fileTasks = fileTaskService.getStudentFileTasks();
        List<Survey> surveys = surveyService.getStudentSurvey();
        List<Info> infos = infoService.getStudentInfos();

        return Stream.of(graphTasks, fileTasks, surveys, infos)
                .flatMap(Collection::stream)
                .sorted(((o1, o2) -> Long.compare(o2.getCreationTime(), o1.getCreationTime())))
                .limit(MAX_LAST_ACTIVITIES_IN_DASHBOARD)
                .map(this::toLastAddedActivity)
                .toList();
    }

    private LastAddedActivity toLastAddedActivity(Activity activity) {
        Chapter chapter = chapterService.getChapterWithActivity(activity);
        String chapterName = Objects.nonNull(chapter) ? chapter.getName() : null;
        String activityType = activity.getActivityType().toString();
        Double points = activity.getMaxPoints();
        if (activity.getActivityType().equals(ActivityType.INFO)) {
            points = 0D;
        }

        Requirement requirement = activity.getRequirements()
                .stream()
                .filter(req -> req.getSelected() && Objects.nonNull(req.getDateToMillis()))
                .findAny()
                .orElse(null);
        Long availableUntil = Objects.nonNull(requirement) ? requirement.getDateToMillis() : null;
        return new LastAddedActivity(chapterName, activityType, points, availableUntil);

    }

    private HeroStats getHeroStats(User student) {
        Double experiencePoints = student.getPoints();
        Double nextLvlPoints = getNexLvlPoints(student);

        Rank rank = rankService.getCurrentRank(student);
        String rankName = rank != null ? rank.getName() : null;
        Long badgesNumber = (long) student.getUnlockedBadges().size();
        Long completedActivities = getCompletedActivities(student);

        return new HeroStats(
                experiencePoints,
                nextLvlPoints,
                rankName,
                badgesNumber,
                completedActivities
        );
    }

    private Double getNexLvlPoints(User student) {
        List<Rank> sortedRanks = rankService.getSortedRanksForHeroType(student.getHeroType());
        for (int i=sortedRanks.size()-1; i >= 0; i--) {
            if (student.getPoints() > sortedRanks.get(i).getMinPoints()) {
                if (i == sortedRanks.size() - 1) return null;
                else return sortedRanks.get(i+1).getMinPoints();
            }
        }
        return null;
    }

    // Completed means answer was sent (not necessarily rated)
    private Long getCompletedActivities(User student) {
        Long graphTasksCompleted = graphTaskResultRepo.findAllByUser(student)
                .stream()
                .filter(result -> Objects.nonNull(result.getSendDateMillis()))
                .count();
        Long fileTasksCompleted = (long) fileTaskResultRepo.findAllByUser(student)
                .size();
        Long surveysCompleted = (long) surveyResultRepo.findAllByUser(student).size();
        return graphTasksCompleted + fileTasksCompleted + surveysCompleted;
    }
}
