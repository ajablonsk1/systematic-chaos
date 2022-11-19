package com.example.api.unit.util.visitor;

import com.example.api.error.exception.EntityNotFoundException;
import com.example.api.error.exception.MissingAttributeException;
import com.example.api.error.exception.WrongUserTypeException;
import com.example.api.model.activity.result.*;
import com.example.api.model.activity.task.FileTask;
import com.example.api.model.activity.task.GraphTask;
import com.example.api.model.group.Group;
import com.example.api.model.user.AccountType;
import com.example.api.model.user.User;
import com.example.api.model.user.badge.*;
import com.example.api.service.activity.result.FileTaskResultService;
import com.example.api.service.activity.result.GraphTaskResultService;
import com.example.api.service.activity.result.TaskResultService;
import com.example.api.service.activity.result.ranking.RankingService;
import com.example.api.service.user.UserService;
import com.example.api.util.visitor.BadgeVisitor;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.doReturn;
import static org.mockito.Mockito.when;

public class BadgeVisitorTest {
    private BadgeVisitor badgeVisitor;

    @Mock private TaskResultService taskResultService;
    @Mock private GraphTaskResultService graphTaskResultService;
    @Mock private FileTaskResultService fileTaskResultService;
    @Mock private  UserService userService;
    @Mock private RankingService rankingService;

    private User user;
    private List<TaskResult> results;
    private GraphTaskResult graphTaskResult1;
    private GraphTaskResult graphTaskResult2;
    private FileTaskResult fileTaskResult1;
    private FileTaskResult fileTaskResult2;
    private SurveyResult surveyResult;
    private AdditionalPoints additionalPoints;

    @BeforeEach
    public void init() {
        MockitoAnnotations.openMocks(this);
        badgeVisitor = new BadgeVisitor(
                taskResultService,
                graphTaskResultService,
                fileTaskResultService,
                userService,
                rankingService
        );

        user = new User();
        user.setId(1L);
        user.setEmail("user@gmail.com");
        user.setPassword("password");
        user.setAccountType(AccountType.STUDENT);
        user.setPoints(10d);

        graphTaskResult1 = new GraphTaskResult();
        graphTaskResult2 = new GraphTaskResult();
        fileTaskResult1 = new FileTaskResult();
        fileTaskResult2 = new FileTaskResult();
        surveyResult = new SurveyResult();
        additionalPoints = new AdditionalPoints();

        graphTaskResult1.setUser(user);
        graphTaskResult2.setUser(user);
        fileTaskResult1.setUser(user);
        fileTaskResult2.setUser(user);
        surveyResult.setUser(user);
        additionalPoints.setUser(user);
        graphTaskResult1.setPointsReceived(100d);
        graphTaskResult2.setPointsReceived(20d);
        fileTaskResult1.setPointsReceived(80d);
        fileTaskResult2.setPointsReceived(30d);
        surveyResult.setPointsReceived(5d);
        additionalPoints.setPointsReceived(10d);
        surveyResult.setSendDateMillis(System.currentTimeMillis());

        results = List.of(
                graphTaskResult1,
                graphTaskResult2,
                fileTaskResult1,
                fileTaskResult2,
                surveyResult,
                additionalPoints
        );
    }

    @Test
    public void visitActivityNumberBadgeGranted() {
        //given
        when(userService.getCurrentUser()).thenReturn(user);
        doReturn(results).when(taskResultService).getAllResultsForStudent(user);
        ActivityNumberBadge activityNumberBadge = new ActivityNumberBadge(6);

        //when
        boolean isGranted = badgeVisitor.visitActivityNumberBadge(activityNumberBadge);

        //then
        assertThat(isGranted).isEqualTo(true);
    }

    @Test
    public void visitActivityNumberBadgeNotGranted() {
        //given
        when(userService.getCurrentUser()).thenReturn(user);
        doReturn(results).when(taskResultService).getAllResultsForStudent(user);
        ActivityNumberBadge activityNumberBadge = new ActivityNumberBadge(7);

        //when
        boolean isGranted = badgeVisitor.visitActivityNumberBadge(activityNumberBadge);

        //then
        assertThat(isGranted).isEqualTo(false);
    }

    @Test
    public void visitActivityScoreBadgeGranted() {
        //given
        when(userService.getCurrentUser()).thenReturn(user);
        results = new ArrayList<>(results);
        results.remove(surveyResult);
        results.remove(additionalPoints);

        GraphTask graphTask1 = new GraphTask();
        graphTask1.setMaxPoints(100d);
        GraphTask graphTask2 = new GraphTask();
        graphTask2.setMaxPoints(40d);
        FileTask fileTask1 = new FileTask();
        fileTask1.setMaxPoints(100d);
        FileTask fileTask2 = new FileTask();
        fileTask2.setMaxPoints(47.5);
        graphTaskResult1.setGraphTask(graphTask1);
        graphTaskResult2.setGraphTask(graphTask2);
        fileTaskResult1.setFileTask(fileTask1);
        fileTaskResult2.setFileTask(fileTask2);

        doReturn(results).when(taskResultService).getGraphAndFileResultsForStudent(user);
        ActivityScoreBadge activityScoreBadge = new ActivityScoreBadge(0.8, false);

        //when
        boolean isGranted = badgeVisitor.visitActivityScoreBadge(activityScoreBadge);

        //then
        assertThat(isGranted).isEqualTo(true);
    }

    @Test
    public void visitActivityScoreBadgeNotGranted() {
        //given
        when(userService.getCurrentUser()).thenReturn(user);
        results = new ArrayList<>(results);
        results.remove(surveyResult);
        results.remove(additionalPoints);

        GraphTask graphTask1 = new GraphTask();
        graphTask1.setMaxPoints(100d);
        GraphTask graphTask2 = new GraphTask();
        graphTask2.setMaxPoints(40d);
        FileTask fileTask1 = new FileTask();
        fileTask1.setMaxPoints(100d);
        FileTask fileTask2 = new FileTask();
        fileTask2.setMaxPoints(50d);
        graphTaskResult1.setGraphTask(graphTask1);
        graphTaskResult2.setGraphTask(graphTask2);
        fileTaskResult1.setFileTask(fileTask1);
        fileTaskResult2.setFileTask(fileTask2);

        doReturn(results).when(taskResultService).getGraphAndFileResultsForStudent(user);
        ActivityScoreBadge activityScoreBadge = new ActivityScoreBadge(0.8, false);

        //when
        boolean isGranted = badgeVisitor.visitActivityScoreBadge(activityScoreBadge);

        //then
        assertThat(isGranted).isEqualTo(false);
    }

    @Test
    public void visitConsistencyBadgeGranted() {
        //given
        when(userService.getCurrentUser()).thenReturn(user);

        Calendar calendar = Calendar.getInstance();
        calendar.set(2022, Calendar.OCTOBER, 1, 0, 0);
        graphTaskResult1.setSendDateMillis(calendar.getTimeInMillis());
        calendar.set(2022, Calendar.OCTOBER, 7, 23, 59);
        graphTaskResult2.setSendDateMillis(calendar.getTimeInMillis());
        calendar.set(2022, Calendar.OCTOBER, 13, 12, 59);
        fileTaskResult1.setSendDateMillis(calendar.getTimeInMillis());
        calendar.set(2022, Calendar.OCTOBER, 19, 1, 1);
        fileTaskResult2.setSendDateMillis(calendar.getTimeInMillis());
        calendar.set(2022, Calendar.OCTOBER, 25, 0,0);
        surveyResult.setSendDateMillis(calendar.getTimeInMillis());
        calendar.set(2022, Calendar.OCTOBER, 31, 0, 0);
        additionalPoints.setSendDateMillis(calendar.getTimeInMillis());

        doReturn(results).when(taskResultService).getAllResultsForStudent(user);
        ConsistencyBadge consistencyBadge = new ConsistencyBadge(6);

        //when
        boolean isGranted = badgeVisitor.visitConsistencyBadge(consistencyBadge);

        //then
        assertThat(isGranted).isEqualTo(true);
    }

    @Test
    public void visitConsistencyBadgeNorGranted() {
        //given
        when(userService.getCurrentUser()).thenReturn(user);

        Calendar calendar = Calendar.getInstance();
        calendar.set(2022, Calendar.OCTOBER, 1, 0, 0);
        graphTaskResult1.setSendDateMillis(calendar.getTimeInMillis());
        calendar.set(2022, Calendar.OCTOBER, 7, 23, 59);
        graphTaskResult2.setSendDateMillis(calendar.getTimeInMillis());
        calendar.set(2022, Calendar.OCTOBER, 13, 12, 59);
        fileTaskResult1.setSendDateMillis(calendar.getTimeInMillis());
        calendar.set(2022, Calendar.OCTOBER, 20, 13, 0);
        fileTaskResult2.setSendDateMillis(calendar.getTimeInMillis());
        calendar.set(2022, Calendar.OCTOBER, 25, 0,0);
        surveyResult.setSendDateMillis(calendar.getTimeInMillis());
        calendar.set(2022, Calendar.OCTOBER, 31, 0, 0);
        additionalPoints.setSendDateMillis(calendar.getTimeInMillis());

        doReturn(results).when(taskResultService).getAllResultsForStudent(user);
        ConsistencyBadge consistencyBadge = new ConsistencyBadge(6);

        //when
        boolean isGranted = badgeVisitor.visitConsistencyBadge(consistencyBadge);

        //then
        assertThat(isGranted).isEqualTo(false);
    }

    @Test
    public void visitGraphTaskNumberBadgeGranted() {
        //given
        when(userService.getCurrentUser()).thenReturn(user);

        results = List.of(graphTaskResult1, graphTaskResult2);

        doReturn(results).when(graphTaskResultService).getAllGraphTaskResultsForStudent(user);
        GraphTaskNumberBadge graphTaskNumberBadge = new GraphTaskNumberBadge(2);

        //when
        boolean isGranted = badgeVisitor.visitGraphTaskNumberBadge(graphTaskNumberBadge);

        //then
        assertThat(isGranted).isEqualTo(true);
    }

    @Test
    public void visitGraphTaskNumberBadgeNotGranted() {
        //given
        when(userService.getCurrentUser()).thenReturn(user);

        results = List.of(graphTaskResult1, graphTaskResult2);

        doReturn(results).when(graphTaskResultService).getAllGraphTaskResultsForStudent(user);
        GraphTaskNumberBadge graphTaskNumberBadge = new GraphTaskNumberBadge(3);

        //when
        boolean isGranted = badgeVisitor.visitGraphTaskNumberBadge(graphTaskNumberBadge);

        //then
        assertThat(isGranted).isEqualTo(false);
    }

    @Test
    public void visitFileTaskNumberBadgeGranted() {
        //given
        when(userService.getCurrentUser()).thenReturn(user);

        results = List.of(fileTaskResult1, fileTaskResult2);

        doReturn(results).when(fileTaskResultService).getAllFileTaskResultsForStudent(user);
        FileTaskNumberBadge fileTaskNumberBadge = new FileTaskNumberBadge(2);

        //when
        boolean isGranted = badgeVisitor.visitFileTaskNumberBadge(fileTaskNumberBadge);

        //then
        assertThat(isGranted).isEqualTo(true);
    }

    @Test
    public void visitFileTaskNumberBadgeNotGranted() {
        //given
        when(userService.getCurrentUser()).thenReturn(user);

        results = List.of(fileTaskResult1, fileTaskResult2);

        doReturn(results).when(fileTaskResultService).getAllFileTaskResultsForStudent(user);
        FileTaskNumberBadge fileTaskNumberBadge = new FileTaskNumberBadge(4);

        //when
        boolean isGranted = badgeVisitor.visitFileTaskNumberBadge(fileTaskNumberBadge);

        //then
        assertThat(isGranted).isEqualTo(false);
    }

    @Test
    public void visitTopScoreTaskNumberBadgeResultsLessThanFive() throws WrongUserTypeException, EntityNotFoundException, MissingAttributeException {
        //given
        when(userService.getCurrentUser()).thenReturn(user);
        results = new ArrayList<>(results);
        results.remove(surveyResult);
        results.remove(additionalPoints);

        doReturn(results).when(taskResultService).getGraphAndFileResultsForStudent(user);
        TopScoreBadge topScoreBadge = new TopScoreBadge(0.2, false);

        //when
        boolean isGranted = badgeVisitor.visitTopScoreBadge(topScoreBadge);

        //then
        assertThat(isGranted).isEqualTo(false);
    }

    @Test
    public void visitTopScoreTaskNumberBadgeResultsGroupIsGranted() throws WrongUserTypeException, EntityNotFoundException, MissingAttributeException {
        //given
        when(userService.getCurrentUser()).thenReturn(user);
        results = new ArrayList<>(results);
        results.remove(surveyResult);
        results.remove(additionalPoints);
        GraphTaskResult graphTaskResult = new GraphTaskResult();
        graphTaskResult.setUser(user);
        graphTaskResult.setPointsReceived(20d);
        results.add(graphTaskResult);

        Group group = new Group();
        group.setUsers(List.of(new User(), new User(), new User(), new User(), new User()));
        group.getUsers().forEach(user1 -> user1.setAccountType(AccountType.STUDENT));

        doReturn(results).when(taskResultService).getGraphAndFileResultsForStudent(user);
        when(userService.getUserGroup()).thenReturn(group);
        when(rankingService.getGroupRankingPosition()).thenReturn(2);

        TopScoreBadge topScoreBadge = new TopScoreBadge(0.5, true);

        //when
        boolean isGranted = badgeVisitor.visitTopScoreBadge(topScoreBadge);

        //then
        assertThat(isGranted).isEqualTo(true);
    }

    @Test
    public void visitTopScoreTaskNumberBadgeResultsGroupIsGrantedFirstPlace() throws WrongUserTypeException, EntityNotFoundException, MissingAttributeException {
        //given
        when(userService.getCurrentUser()).thenReturn(user);
        results = new ArrayList<>(results);
        results.remove(surveyResult);
        results.remove(additionalPoints);
        GraphTaskResult graphTaskResult = new GraphTaskResult();
        graphTaskResult.setUser(user);
        graphTaskResult.setPointsReceived(20d);
        results.add(graphTaskResult);

        Group group = new Group();
        group.setUsers(List.of(new User(), new User(), new User(), new User(), new User()));
        group.getUsers().forEach(user1 -> user1.setAccountType(AccountType.STUDENT));

        doReturn(results).when(taskResultService).getGraphAndFileResultsForStudent(user);
        when(userService.getUserGroup()).thenReturn(group);
        when(rankingService.getGroupRankingPosition()).thenReturn(1);

        TopScoreBadge topScoreBadge = new TopScoreBadge(0.0, true);

        //when
        boolean isGranted = badgeVisitor.visitTopScoreBadge(topScoreBadge);

        //then
        assertThat(isGranted).isEqualTo(true);
    }

    @Test
    public void visitTopScoreTaskNumberBadgeResultsIsGranted() throws WrongUserTypeException, EntityNotFoundException, MissingAttributeException {
        //given
        when(userService.getCurrentUser()).thenReturn(user);
        results = new ArrayList<>(results);
        results.remove(surveyResult);
        results.remove(additionalPoints);
        GraphTaskResult graphTaskResult = new GraphTaskResult();
        graphTaskResult.setUser(user);
        graphTaskResult.setPointsReceived(20d);
        results.add(graphTaskResult);

        List<User> users = List.of(new User(), new User(), new User(), new User(), new User());
        users.forEach(user1 -> user1.setAccountType(AccountType.STUDENT));

        doReturn(results).when(taskResultService).getGraphAndFileResultsForStudent(user);
        when(userService.getUsers()).thenReturn(users);
        when(rankingService.getRankingPosition()).thenReturn(2);

        TopScoreBadge topScoreBadge = new TopScoreBadge(0.5, false);

        //when
        boolean isGranted = badgeVisitor.visitTopScoreBadge(topScoreBadge);

        //then
        assertThat(isGranted).isEqualTo(true);
    }

    @Test
    public void visitTopScoreTaskNumberBadgeResultsIsGrantedFirstPlace() throws WrongUserTypeException, EntityNotFoundException, MissingAttributeException {
        //given
        when(userService.getCurrentUser()).thenReturn(user);
        results = new ArrayList<>(results);
        results.remove(surveyResult);
        results.remove(additionalPoints);
        GraphTaskResult graphTaskResult = new GraphTaskResult();
        graphTaskResult.setUser(user);
        graphTaskResult.setPointsReceived(20d);
        results.add(graphTaskResult);

        List<User> users = List.of(new User(), new User(), new User(), new User(), new User());
        users.forEach(user1 -> user1.setAccountType(AccountType.STUDENT));

        doReturn(results).when(taskResultService).getGraphAndFileResultsForStudent(user);
        when(userService.getUsers()).thenReturn(users);
        when(rankingService.getRankingPosition()).thenReturn(1);

        TopScoreBadge topScoreBadge = new TopScoreBadge(0.0, false);

        //when
        boolean isGranted = badgeVisitor.visitTopScoreBadge(topScoreBadge);

        //then
        assertThat(isGranted).isEqualTo(true);
    }
}
