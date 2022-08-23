package com.example.api.unit.service.activity.result;

import com.example.api.dto.request.activity.result.*;
import com.example.api.error.exception.*;
import com.example.api.model.activity.result.GraphTaskResult;
import com.example.api.model.activity.task.GraphTask;
import com.example.api.model.question.Answer;
import com.example.api.model.question.Question;
import com.example.api.model.user.AccountType;
import com.example.api.model.user.User;
import com.example.api.repo.activity.result.GraphTaskResultRepo;
import com.example.api.repo.activity.task.GraphTaskRepo;
import com.example.api.repo.question.AnswerRepo;
import com.example.api.repo.question.QuestionRepo;
import com.example.api.repo.user.UserRepo;
import com.example.api.security.AuthenticationService;
import com.example.api.service.activity.result.GraphTaskResultService;
import com.example.api.service.validator.ResultValidator;
import com.example.api.service.validator.UserValidator;
import com.example.api.util.calculator.PointsCalculator;
import com.example.api.util.calculator.TimeCalculator;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.mockito.Captor;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.core.Authentication;

import java.util.Calendar;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;

public class GraphTaskResultServiceTest {
    private GraphTaskResultService graphTaskResultService;
    @Mock private GraphTaskResultRepo graphTaskResultRepo;
    @Mock private GraphTaskRepo graphTaskRepo;
    @Mock private UserRepo userRepo;
    @Mock private QuestionRepo questionRepo;
    @Mock private AnswerRepo answerRepo;
    @Mock private ResultValidator answerFormValidator;
    @Mock private PointsCalculator pointsCalculator;
    @Mock private UserValidator userValidator;
    @Mock private TimeCalculator timeCalculator;
    @Mock private AuthenticationService authService;
    @Mock private Authentication authentication;
    GraphTaskResult result;
    GraphTask graphTask;
    @Captor ArgumentCaptor<User> userArgumentCaptor;
    @Captor ArgumentCaptor<GraphTask> graphTaskArgumentCaptor;
    @Captor ArgumentCaptor<GraphTaskResult> resultArgumentCaptor;
    @Captor ArgumentCaptor<Long> idArgumentCaptor;
    @Captor ArgumentCaptor<String> emailArgumentCaptor;
    @Captor ArgumentCaptor<Long> resultIdArgumentCaptor;
    @Captor ArgumentCaptor<AnswerForm> answerFormArgumentCaptor;
    @Captor ArgumentCaptor<Long> questionIdArgumentCaptor;

    @BeforeEach
    public void init() {
        MockitoAnnotations.openMocks(this);
        graphTaskResultService = new GraphTaskResultService(
                graphTaskResultRepo,
                graphTaskRepo,
                userRepo,
                questionRepo,
                answerRepo,
                pointsCalculator,
                answerFormValidator,
                userValidator,
                timeCalculator,
                authService
        );
        graphTask = new GraphTask();
        graphTask.setId(2L);
        result = new GraphTaskResult();
        result.setId(1L);
        result.setGraphTask(graphTask);
    }

    @Test
    public void getGraphTaskResult() throws WrongUserTypeException, EntityNotFoundException {
        // given
        User user = new User();
        user.setEmail("random@email.com");
        user.setAccountType(AccountType.STUDENT);
        given(authService.getAuthentication()).willReturn(authentication);
        given(authentication.getName()).willReturn("random@email.com");
        given(userRepo.findUserByEmail(user.getEmail())).willReturn(user);
        given(graphTaskRepo.findGraphTaskById(graphTask.getId())).willReturn(graphTask);

        // when
        graphTaskResultService.getGraphTaskResult(graphTask.getId());

        // then
        verify(graphTaskResultRepo).findGraphTaskResultByGraphTaskAndUser(
                graphTaskArgumentCaptor.capture(), userArgumentCaptor.capture());
        User capturedUser = userArgumentCaptor.getValue();
        GraphTask capturedGraphTask = graphTaskArgumentCaptor.getValue();

        assertThat(capturedUser).isEqualTo(user);
        assertThat(capturedGraphTask).isEqualTo(graphTask);
    }

    @Test
    public void getGraphTaskResultThrowEntityNotFoundException() {
        // given
        User user = new User();
        user.setEmail("random@email.com");
        user.setAccountType(AccountType.STUDENT);
        given(authService.getAuthentication()).willReturn(authentication);
        given(authentication.getName()).willReturn("random@email.com");
        given(userRepo.findUserByEmail(user.getEmail())).willReturn(user);

        // when
        // then
        assertThatThrownBy(() -> graphTaskResultService.getGraphTaskResult(graphTask.getId()))
                .isInstanceOf(EntityNotFoundException.class)
                .hasMessageContaining("Graph task with given id " + graphTask.getId() + " does not exist");
    }

    @Test
    public void saveGraphTaskResult() {
        // given
        GraphTaskResult result = new GraphTaskResult();

        // when
        graphTaskResultService.saveGraphTaskResult(result);

        // then
        verify(graphTaskResultRepo).save(resultArgumentCaptor.capture());
        GraphTaskResult capturedResult = resultArgumentCaptor.getValue();
        assertThat(capturedResult).isEqualTo(result);
    }

    @Test
    public void saveGraphTaskResultForm() throws EntityNotFoundException {
        // given
        User user = new User();
        user.setEmail("random@email.com");
        given(authService.getAuthentication()).willReturn(authentication);
        given(authentication.getName()).willReturn("random@email.com");
        given(graphTaskRepo.findGraphTaskById(graphTask.getId())).willReturn(graphTask);
        given(userRepo.findUserByEmail(user.getEmail())).willReturn(user);


        // when
        graphTaskResultService.saveGraphTaskResult(graphTask.getId());

        // then
        verify(graphTaskRepo).findGraphTaskById(idArgumentCaptor.capture());
        verify(userRepo).findUserByEmail(emailArgumentCaptor.capture());
        Long capturedId = idArgumentCaptor.getValue();
        String capturedEmail = emailArgumentCaptor.getValue();
        assertThat(capturedId).isEqualTo(graphTask.getId());
        assertThat(capturedEmail).isEqualTo(user.getEmail());
    }

    @Test
    public void saveGraphTaskResultFormThrowEntityNotFoundException() {
        // given
        User user = new User();
        user.setEmail("random@email.com");
        given(authService.getAuthentication()).willReturn(authentication);
        given(authentication.getName()).willReturn("random@email.com");
        // when
        // then
        assertThatThrownBy(() -> graphTaskResultService.saveGraphTaskResult(graphTask.getId()))
                .isInstanceOf(EntityNotFoundException.class)
                .hasMessageContaining("Graph task with given id " + graphTask.getId() + " does not exist");
    }

    @Test
    public void saveGraphTaskResultFormThrowEntityNotFoundException2() {
        // given
        User user = new User();
        user.setEmail("random@email.com");
        given(authService.getAuthentication()).willReturn(authentication);
        given(authentication.getName()).willReturn("random@email.com");
        given(graphTaskRepo.findGraphTaskById(graphTask.getId())).willReturn(graphTask);

        // when
        // then
        assertThatThrownBy(() -> graphTaskResultService.saveGraphTaskResult(graphTask.getId()))
                .isInstanceOf(EntityNotFoundException.class)
                .hasMessageContaining("User" + user.getEmail() + " not found in database");
    }

    @Test
    public void getPointsFromClosedQuestions() throws WrongAnswerTypeException, EntityNotFoundException {
        //given
        given(graphTaskResultRepo.findGraphTaskResultById(result.getId())).willReturn(result);

        // when
        graphTaskResultService.getPointsFromClosedQuestions(result.getId());

        // then
        verify(graphTaskResultRepo).findGraphTaskResultById(idArgumentCaptor.capture());
        Long capturedId = idArgumentCaptor.getValue();
        assertThat(capturedId).isEqualTo(result.getId());
    }

    @Test
    public void getPointsFromClosedQuestionsThrowEntityNotFoundException() {
        // when
        // then
        assertThatThrownBy(() -> graphTaskResultService.getPointsFromClosedQuestions(result.getId()))
                .isInstanceOf(EntityNotFoundException.class)
                .hasMessageContaining("Graph task result with given id " + result.getId() + " does not exist");
    }

    @Test
    public void getPointsFromOpenedQuestions() throws WrongAnswerTypeException, EntityNotFoundException {
        //given
        given(graphTaskResultRepo.findGraphTaskResultById(result.getId())).willReturn(result);

        // when
        graphTaskResultService.getPointsFromOpenedQuestions(result.getId());

        // then
        verify(graphTaskResultRepo).findGraphTaskResultById(idArgumentCaptor.capture());
        Long capturedId = idArgumentCaptor.getValue();
        assertThat(capturedId).isEqualTo(result.getId());
    }

    @Test
    public void getPointsFromOpenedQuestionsThrowEntityNotFoundException() {
        // given
        // when
        // then
        assertThatThrownBy(() -> graphTaskResultService.getPointsFromOpenedQuestions(result.getId()))
                .isInstanceOf(EntityNotFoundException.class)
                .hasMessageContaining("Graph task result with given id " + result.getId() + " does not exist");
    }

    @Test
    public void getAndSetAllPoints() throws WrongAnswerTypeException, EntityNotFoundException {
        //given
        given(graphTaskResultRepo.findGraphTaskResultById(result.getId())).willReturn(result);

        // when
        graphTaskResultService.getAndSetAllPoints(result.getId());

        // then
        verify(graphTaskResultRepo).findGraphTaskResultById(idArgumentCaptor.capture());
        Long capturedId = idArgumentCaptor.getValue();
        assertThat(capturedId).isEqualTo(result.getId());
    }

    @Test
    public void getAndSetAllPointsThrowEntityNotFoundException() {
        //given
        // when
        // then
        assertThatThrownBy(() -> graphTaskResultService.getAndSetAllPoints(result.getId()))
                .isInstanceOf(EntityNotFoundException.class)
                .hasMessageContaining("Graph task result with given id " + result.getId() + " does not exist");
    }

    @Test
    public void getMaxAvailablePoints() throws EntityNotFoundException {
        //given
        given(graphTaskResultRepo.findGraphTaskResultById(result.getId())).willReturn(result);

        // when
        graphTaskResultService.getMaxAvailablePoints(result.getId());

        // then
        verify(graphTaskResultRepo).findGraphTaskResultById(idArgumentCaptor.capture());
        Long capturedId = idArgumentCaptor.getValue();
        assertThat(capturedId).isEqualTo(result.getId());
    }

    @Test
    public void getMaxAvailablePointsThrowEntityNotFoundException() {
        //given
        // when
        // then
        assertThatThrownBy(() -> graphTaskResultService.getMaxAvailablePoints(result.getId()))
                .isInstanceOf(EntityNotFoundException.class)
                .hasMessageContaining("Graph task result with given id " + result.getId() + " does not exist");
    }

    @Test
    public void getMaxClosedPoints() throws EntityNotFoundException {
        //given
        given(graphTaskResultRepo.findGraphTaskResultById(result.getId())).willReturn(result);

        // when
        graphTaskResultService.getMaxClosedPoints(result.getId());

        // then
        verify(graphTaskResultRepo).findGraphTaskResultById(idArgumentCaptor.capture());
        Long capturedId = idArgumentCaptor.getValue();
        assertThat(capturedId).isEqualTo(result.getId());
    }

    @Test
    public void getMaxClosedPointsThrowEntityNotFoundException() {
        //given
        // when
        // then
        assertThatThrownBy(() -> graphTaskResultService.getMaxClosedPoints(result.getId()))
                .isInstanceOf(EntityNotFoundException.class)
                .hasMessageContaining("Graph task result with given id " + result.getId() + " does not exist");
    }

    @Test
    public void getMaxOpenedPoints() throws EntityNotFoundException {
        //given
        given(graphTaskResultRepo.findGraphTaskResultById(result.getId())).willReturn(result);

        // when
        graphTaskResultService.getMaxOpenedPoints(result.getId());

        // then
        verify(graphTaskResultRepo).findGraphTaskResultById(idArgumentCaptor.capture());
        Long capturedId = idArgumentCaptor.getValue();
        assertThat(capturedId).isEqualTo(result.getId());
    }

    @Test
    public void getMaxOpenedPointsThrowEntityNotFoundException() {
        //given
        // when
        // then
        assertThatThrownBy(() -> graphTaskResultService.getMaxOpenedPoints(result.getId()))
                .isInstanceOf(EntityNotFoundException.class)
                .hasMessageContaining("Graph task result with given id " + result.getId() + " does not exist");
    }

    @Test
    public void addAnswerToGraphTaskResult() throws WrongBodyParametersNumberException, EntityRequiredAttributeNullException, EntityNotFoundException {
        // given
        AnswerForm answerForm = new AnswerForm();
        answerForm.setOpenAnswer("random answer");
        AddAnswerToGraphTaskForm form = new AddAnswerToGraphTaskForm(
                result.getId(),
                1L,
                answerForm
        );
        Answer answer = new Answer();
        Question question = new Question();
        question.setId(1L);
        result.setStartDateMillis(System.currentTimeMillis());
        graphTask.setTimeToSolveMillis(1_000_000L);
        given(graphTaskResultRepo.findGraphTaskResultById(result.getId())).willReturn(result);
        given(answerFormValidator.validateAndCreateAnswer(form.getAnswerForm())).willReturn(answer);
        given(questionRepo.findQuestionById(form.getQuestionId())).willReturn(question);

        //when
        graphTaskResultService.addAnswerToGraphTaskResult(form);

        // then
        verify(graphTaskResultRepo, times(2)).findGraphTaskResultById(resultIdArgumentCaptor.capture());
        verify(answerFormValidator).validateAndCreateAnswer(answerFormArgumentCaptor.capture());
        verify(questionRepo).findQuestionById(questionIdArgumentCaptor.capture());
        Long capturedResultId = resultIdArgumentCaptor.getValue();
        AnswerForm capturedAnswerForm = answerFormArgumentCaptor.getValue();
        Long capturedQuestionId = questionIdArgumentCaptor.getValue();
        assertThat(capturedResultId).isEqualTo(result.getId());
        assertThat(capturedAnswerForm).isEqualTo(answerForm);
        assertThat(capturedQuestionId).isEqualTo(question.getId());
    }

    @Test
    public void addAnswerToGraphTaskResultTimeRemaining() throws WrongBodyParametersNumberException, EntityRequiredAttributeNullException, EntityNotFoundException, InterruptedException {
        // given
        Answer answer = new Answer();
        Calendar calendar = Calendar.getInstance();
        calendar.set(2022, Calendar.APRIL, 21);
        AnswerForm answerForm = new AnswerForm();
        answerForm.setOpenAnswer("random answer");
        AddAnswerToGraphTaskForm form = new AddAnswerToGraphTaskForm(
                result.getId(),
                1L,
                answerForm
        );
        result.setStartDateMillis(calendar.getTimeInMillis());
        graphTask.setTimeToSolveMillis(1_000L);
        given(graphTaskResultRepo.findGraphTaskResultById(form.getResultId())).willReturn(result);
        given(answerFormValidator.validateAndCreateAnswer(form.getAnswerForm())).willReturn(answer);
        given(timeCalculator.getTimeRemaining(result.getStartDateMillis(), graphTask.getTimeToSolveMillis()))
                .willReturn(graphTask.getTimeToSolveMillis() - (System.currentTimeMillis() -result.getStartDateMillis()));

        //when
        long timeRemaining = graphTaskResultService.addAnswerToGraphTaskResult(form);

        // then
        assertThat(timeRemaining).isLessThan(0);
    }

    @Test
    public void addAnswerToGraphTaskResultThrowEntityNotFoundException() throws WrongBodyParametersNumberException, EntityRequiredAttributeNullException, EntityNotFoundException, InterruptedException {
        // given
        AnswerForm answerForm = new AnswerForm();
        answerForm.setOpenAnswer("random answer");
        AddAnswerToGraphTaskForm form = new AddAnswerToGraphTaskForm(
                result.getId(),
                1L,
                answerForm
        );
        //when
        // then
        assertThatThrownBy(() -> graphTaskResultService.addAnswerToGraphTaskResult(form))
                .isInstanceOf(EntityNotFoundException.class)
                .hasMessageContaining("Graph task result with given id " + result.getId() + " does not exist");
    }

    @Test
    public void setSendDateMillis() throws EntityNotFoundException {
        // given
        SetSendDateMillisForm form = new SetSendDateMillisForm(result.getId(), 120L);
        given(graphTaskResultRepo.findGraphTaskResultById(result.getId())).willReturn(result);

        //when
        graphTaskResultService.setSendDateMillis(form);

        // then
        verify(graphTaskResultRepo).findGraphTaskResultById(idArgumentCaptor.capture());
        Long capturedId = idArgumentCaptor.getValue();
        assertThat(capturedId).isEqualTo(result.getId());
    }

    @Test
    public void setTimeSpentThrowEntityNotFoundException() {
        // given
        SetSendDateMillisForm form = new SetSendDateMillisForm(result.getId(), 120L);

        //when
        // then
        assertThatThrownBy(() -> graphTaskResultService.setSendDateMillis(form))
                .isInstanceOf(EntityNotFoundException.class)
                .hasMessageContaining("Graph task result with given id " + result.getId() + " does not exist");
    }

    @Test
    public void setTimeStart() throws EntityNotFoundException {
        // given
        SetStartDateMillisForm form = new SetStartDateMillisForm(result.getId(), 120L);
        given(graphTaskResultRepo.findGraphTaskResultById(result.getId())).willReturn(result);

        //when
        graphTaskResultService.setStartDateMillis(form);

        // then
        verify(graphTaskResultRepo).findGraphTaskResultById(idArgumentCaptor.capture());
        Long capturedId = idArgumentCaptor.getValue();
        assertThat(capturedId).isEqualTo(result.getId());
    }

    @Test
    public void setStartTimeThrowEntityNotFoundException() {
        // given
        SetStartDateMillisForm form = new SetStartDateMillisForm(result.getId(), 120L);

        //when
        // then
        assertThatThrownBy(() -> graphTaskResultService.setStartDateMillis(form))
                .isInstanceOf(EntityNotFoundException.class)
                .hasMessageContaining("Graph task result with given id " + result.getId() + " does not exist");
    }

    @Test
    public void getTimeRemaining() throws EntityNotFoundException, EntityRequiredAttributeNullException {
        // given
        given(graphTaskResultRepo.findGraphTaskResultById(result.getId())).willReturn(result);
        result.setStartDateMillis(System.currentTimeMillis());
        graphTask.setTimeToSolveMillis(1_000_000L);

        //when
        graphTaskResultService.getTimeRemaining(result.getId());

        // then
        verify(graphTaskResultRepo).findGraphTaskResultById(idArgumentCaptor.capture());
        Long capturedId = idArgumentCaptor.getValue();
        assertThat(capturedId).isEqualTo(result.getId());
    }

    @Test
    public void getTimeRemainingThrowEntityNotFoundException() {
        // given
        //when
        // then
        assertThatThrownBy(() -> graphTaskResultService.getTimeRemaining(result.getId()))
                .isInstanceOf(EntityNotFoundException.class)
                .hasMessageContaining("Graph task result with given id " + result.getId() + " does not exist");
    }

    @Test
    public void getTimeRemainingThrowEntityRequiredAttributeNullException() {
        // given
        given(graphTaskResultRepo.findGraphTaskResultById(result.getId())).willReturn(result);
        graphTask.setTimeToSolveMillis(1_000_000L);

        //when
        // then
        assertThatThrownBy(() -> graphTaskResultService.getTimeRemaining(result.getId()))
                .isInstanceOf(EntityRequiredAttributeNullException.class)
                .hasMessageContaining("Required attribute startTimeMillis is null for " +
                        "graph task result with id " + result.getId());
    }
}
