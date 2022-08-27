package com.example.api.service.activity.result.ranking;

import com.example.api.dto.response.ranking.RankingResponse;
import com.example.api.error.exception.EntityNotFoundException;
import com.example.api.error.exception.MissingAttributeException;
import com.example.api.error.exception.WrongUserTypeException;
import com.example.api.model.activity.result.FileTaskResult;
import com.example.api.model.activity.result.GraphTaskResult;
import com.example.api.model.activity.result.SurveyResult;
import com.example.api.model.activity.result.TaskResult;
import com.example.api.model.activity.task.*;
import com.example.api.model.user.AccountType;
import com.example.api.model.user.User;
import com.example.api.repo.activity.result.AdditionalPointsRepo;
import com.example.api.repo.activity.result.FileTaskResultRepo;
import com.example.api.repo.activity.result.GraphTaskResultRepo;
import com.example.api.repo.activity.result.SurveyResultRepo;
import com.example.api.repo.activity.task.FileTaskRepo;
import com.example.api.repo.activity.task.GraphTaskRepo;
import com.example.api.repo.activity.task.SurveyRepo;
import com.example.api.repo.user.UserRepo;
import com.example.api.security.AuthenticationService;
import com.example.api.service.user.UserService;
import com.example.api.service.validator.ActivityValidator;
import com.example.api.service.validator.GroupValidator;
import com.example.api.service.validator.UserValidator;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Comparator;
import java.util.List;
import java.util.Objects;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.stream.DoubleStream;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class RankingService {
    private final UserRepo userRepo;
    private final GraphTaskResultRepo graphTaskResultRepo;
    private final GraphTaskRepo graphTaskRepo;
    private final FileTaskResultRepo fileTaskResultRepo;
    private final FileTaskRepo fileTaskRepo;
    private final SurveyResultRepo surveyResultRepo;
    private final SurveyRepo surveyRepo;
    private final AdditionalPointsRepo additionalPointsRepo;
    private final AuthenticationService authService;
    private final UserValidator userValidator;
    private final GroupValidator groupValidator;
    private final UserService userService;
    private final ActivityValidator activityValidator;


    public List<RankingResponse> getRanking() {
        List<RankingResponse> rankingList = userRepo.findAllByAccountTypeEquals(AccountType.STUDENT)
                .stream()
                .map(this::studentToRankingEntry)
                .sorted(Comparator.comparingDouble(RankingResponse::getPoints).reversed())
                .toList();

        addPositionToRankingList(rankingList);
        return rankingList;
    }

    public List<RankingResponse> getRankingForLoggedStudentGroup() throws EntityNotFoundException {
        String groupName = userService.getUserGroup().getName();
        List<RankingResponse> rankingList = userRepo.findAllByAccountTypeEquals(AccountType.STUDENT)
                .stream()
                .filter(student -> Objects.equals(student.getGroup().getName(), groupName))
                .map(this::studentToRankingEntry)
                .sorted(Comparator.comparingDouble(RankingResponse::getPoints).reversed())
                .toList();

        addPositionToRankingList(rankingList);
        return rankingList;
    }

    public List<RankingResponse> getSearchedRanking(String search) {
        String searchLower = search.toLowerCase().replaceAll("\\s",""); // removing whitespaces
        List<RankingResponse> rankingList = userRepo.findAllByAccountTypeEquals(AccountType.STUDENT)
                .stream()
                .filter(student ->
                                student.getFirstName().concat(student.getLastName()).toLowerCase().replaceAll("\\s","").contains(searchLower) ||
                                student.getLastName().concat(student.getFirstName()).toLowerCase().replaceAll("\\s","").contains(searchLower) ||
                                student.getHeroType().getPolishTypeName().toLowerCase().contains(searchLower) ||
                                student.getGroup().getName().toLowerCase().contains(searchLower))
                .map(this::studentToRankingEntry)
                .sorted(Comparator.comparingDouble(RankingResponse::getPoints).reversed())
                .toList();

        addPositionToRankingList(rankingList);
        return rankingList;
    }

    public List<RankingResponse> getActivityRanking(Long activityID) throws WrongUserTypeException, EntityNotFoundException {
        String professorEmail = authService.getAuthentication().getName();
        User professor = userRepo.findUserByEmail(professorEmail);
        userValidator.validateProfessorAccount(professor, professorEmail);

        List<RankingResponse> rankingList =  userRepo.findAllByAccountTypeEquals(AccountType.STUDENT)
                        .stream()
                        .map(user -> studentAndPointsToRankingEntry(user, getStudentPointsForActivity(activityID, user)))
                        .toList();
        addPositionToRankingList(rankingList);
        return rankingList;
    }

    public List<RankingResponse> getActivityRankingSearch(Long activityID, String search) throws WrongUserTypeException, EntityNotFoundException {
        String searchLower = search.toLowerCase().replaceAll("\\s",""); // removing whitespaces
        List<RankingResponse> rankingList = getActivityRanking(activityID)
                .stream()
                .filter(student ->
                            student.getFirstName().concat(student.getLastName()).toLowerCase().replaceAll("\\s","").contains(searchLower) ||
                            student.getLastName().concat(student.getFirstName()).toLowerCase().replaceAll("\\s","").contains(searchLower) ||
                            student.getHeroType().getPolishTypeName().toLowerCase().contains(searchLower) ||
                            student.getGroupName().toLowerCase().contains(searchLower)
                )
                .sorted(((o1, o2) -> {
                    try {
                        return Double.compare(o2.getPoints(), o1.getPoints());
                    } catch (NullPointerException e) {
                        if (o1.getPoints() == null && o2.getPoints() == null) {
                            return 0;
                        } else if (o1.getPoints() == null) {
                            return Double.compare(o2.getPoints(), -1);
                        } else {
                            return Double.compare(-1, o1.getPoints());
                        }
                    }
                }))
                .toList();
        addPositionToRankingList(rankingList);
        return rankingList;

    }

    private Double getStudentPointsForActivity(Long activityID, User user) {
        GraphTask graphTask = graphTaskRepo.findGraphTaskById(activityID);
        if (graphTask != null) {
            GraphTaskResult result = graphTaskResultRepo.findGraphTaskResultByGraphTaskAndUser(graphTask, user);
            return result != null ? result.getPointsReceived() : null;
        }
        FileTask fileTask = fileTaskRepo.findFileTaskById(activityID);
        if (fileTask != null) {
            FileTaskResult result = fileTaskResultRepo.findFileTaskResultByFileTaskAndUser(fileTask, user);
            return result != null ? (result.isEvaluated() ? result.getPointsReceived() : null) : null;
        }
        Survey survey = surveyRepo.findSurveyById(activityID);
        if (survey != null) {
            SurveyResult result = surveyResultRepo.findSurveyResultBySurveyAndUser(survey, user);
            return result != null ? result.getPointsReceived() : null;
        }
        return null;
    }

    private void addPositionToRankingList(List<RankingResponse> rankingResponses){
        AtomicInteger position = new AtomicInteger(1);
        rankingResponses.forEach(item -> item.setPosition(position.getAndIncrement()));
    }

    public Integer getRankingPosition() throws WrongUserTypeException, UsernameNotFoundException {
        String email = authService.getAuthentication().getName();
        User student = userRepo.findUserByEmail(email);
        userValidator.validateStudentAccount(student, email);
        return getPositionFromRanking(getRanking(), email);
    }

    public Integer getGroupRankingPosition() throws WrongUserTypeException, MissingAttributeException, UsernameNotFoundException, EntityNotFoundException {
        String email = authService.getAuthentication().getName();
        User student = userRepo.findUserByEmail(email);
        userValidator.validateStudentAccount(student, email);
        groupValidator.validateUserGroupIsNotNull(student);

        return getPositionFromRanking(getRankingForLoggedStudentGroup(), email);
    }

    private Integer getPositionFromRanking(List<RankingResponse> ranking, String email) throws UsernameNotFoundException {
        return ranking
                .stream()
                .filter(rankingResponse -> rankingResponse.getEmail().equals(email))
                .findAny()
                .map(RankingResponse::getPosition)
                .orElseThrow(() -> new UsernameNotFoundException("User" + email + " not found in database"));
    }

    private RankingResponse studentToRankingEntry(User student) {
        RankingResponse rankingResponse = new RankingResponse(student);
        rankingResponse.setPoints(getStudentPoints(student));
        return rankingResponse;
    }

    private RankingResponse studentAndPointsToRankingEntry(User student, Double points) {
        RankingResponse rankingResponse = new RankingResponse(student);
        rankingResponse.setPoints(points);
        return rankingResponse;
    }

    private Double getGraphTaskPoints(User student) {
        return graphTaskResultRepo.findAllByUser(student)
                .stream()
                .mapToDouble(task -> {
                    try {
                        return task.getPointsReceived();
                    } catch (Exception e) {
                        log.info("GraphTaskResult with id {} not checked yet", task.getId());
                    }
                    return 0.0;
                })
                .sum();
    }

    private Double getFileTaskPoints(User student) {
        return fileTaskResultRepo.findAllByUser(student)
                .stream()
                .mapToDouble(task -> {
                    try {
                        return task.getPointsReceived();
                    } catch (Exception e) {
                        log.info("FileTaskResult with id {} not checked yet", task.getId());
                    }
                    return 0.0;
                }).sum();
    }

    private Double getAdditionalPoints(User student) {
        return additionalPointsRepo.findAllByUser(student)
                .stream()
                .mapToDouble(points -> {
                    try {
                        return points.getPointsReceived();
                    } catch (Exception e) {
                        log.info("AdditionalPoints with id {} has no points assigned", points.getId());
                    }
                    return 0.0;
                }).sum();
    }

    private Double getStudentPoints(User student) {
        Double graphTaskPoints = getGraphTaskPoints(student);
        Double fileTaskPoints = getFileTaskPoints(student);
        Double additionalPoints = getAdditionalPoints(student);
        return DoubleStream.of(graphTaskPoints, fileTaskPoints, additionalPoints).sum();
    }

    private List<? extends TaskResult> getResultForActivity(Activity activity) {
        if (activity instanceof GraphTask) {
            return graphTaskResultRepo.findAllByAndGraphTask((GraphTask) activity);
        }
        else if (activity instanceof FileTask) {
            return fileTaskResultRepo.findAllByFileTask((FileTask) activity);
        }
        else if (activity instanceof Survey) {
            return surveyResultRepo.findAllBySurvey((Survey) activity);
        }
        return List.of();
    }
}
