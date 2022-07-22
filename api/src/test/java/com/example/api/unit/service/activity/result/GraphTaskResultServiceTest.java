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
import com.example.api.service.activity.result.GraphTaskResultService;
import com.example.api.service.validator.AnswerFormValidator;
import com.example.api.service.validator.UserValidator;
import com.example.api.util.PointsCalculator;
import com.example.api.util.TimeCalculator;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;

@ExtendWith(MockitoExtension.class)
public class GraphTaskResultServiceTest {
    private GraphTaskResultService graphTaskResultService;
    @Mock private GraphTaskResultRepo graphTaskResultRepo;
    @Mock private GraphTaskRepo graphTaskRepo;
    @Mock private UserRepo userRepo;
    @Mock private QuestionRepo questionRepo;
    @Mock private AnswerRepo answerRepo;
    @Mock private AnswerFormValidator answerFormValidator;
    GraphTaskResult result;
    GraphTask graphTask;

    @BeforeEach
    public void init() {
        MockitoAnnotations.openMocks(this);
        graphTaskResultService = new GraphTaskResultService(
                graphTaskResultRepo,
                graphTaskRepo,
                userRepo,
                questionRepo,
                answerRepo,
                new PointsCalculator(),
                answerFormValidator,
                new UserValidator(),
                new TimeCalculator()
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
        given(userRepo.findUserByEmail(user.getEmail())).willReturn(user);
        given(graphTaskRepo.findGraphTaskById(graphTask.getId())).willReturn(graphTask);

        // when
        graphTaskResultService.getGraphTaskResult(graphTask.getId(), user.getEmail());

        // then
        ArgumentCaptor<User> userArgumentCaptor = ArgumentCaptor.forClass(User.class);
        ArgumentCaptor<GraphTask> graphTaskArgumentCaptor = ArgumentCaptor.forClass(GraphTask.class);
        verify(graphTaskResultRepo).findGraphTaskResultByGraphTaskAndUser(
                graphTaskArgumentCaptor.capture(), userArgumentCaptor.capture());
        User capturedUser = userArgumentCaptor.getValue();
        GraphTask capturedGraphTask = graphTaskArgumentCaptor.getValue();

        assertThat(capturedUser).isEqualTo(user);
        assertThat(capturedGraphTask).isEqualTo(graphTask);
    }

    @Test
    public void getGraphTaskResultThrowUsernameNotFound() {
        // given
        User user = new User();
        user.setEmail("random@email.com");

        // when
        // then
        assertThatThrownBy(() -> graphTaskResultService.getGraphTaskResult(graphTask.getId(), user.getEmail()))
                .isInstanceOf(UsernameNotFoundException.class)
                .hasMessageContaining("User" + user.getEmail() + " not found in database");
    }

    @Test
    public void getGraphTaskResultThrowWrongUserTypeException() {
        // given
        User user = new User();
        user.setEmail("random@email.com");

        // when
        // then
        assertThatThrownBy(() -> graphTaskResultService.getGraphTaskResult(graphTask.getId(), user.getEmail()))
                .isInstanceOf(UsernameNotFoundException.class)
                .hasMessageContaining("User" + user.getEmail() + " not found in database");
    }

    @Test
    public void getGraphTaskResultThrowEntityNotFoundException() {
        // given
        User user = new User();
        user.setEmail("random@email.com");
        user.setAccountType(AccountType.STUDENT);
        given(userRepo.findUserByEmail(user.getEmail())).willReturn(user);

        // when
        // then
        assertThatThrownBy(() -> graphTaskResultService.getGraphTaskResult(graphTask.getId(), user.getEmail()))
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
        ArgumentCaptor<GraphTaskResult> resultArgumentCaptor = ArgumentCaptor.forClass(GraphTaskResult.class);
        verify(graphTaskResultRepo).save(resultArgumentCaptor.capture());
        GraphTaskResult capturedResult = resultArgumentCaptor.getValue();
        assertThat(capturedResult).isEqualTo(result);
    }

    @Test
    public void saveGraphTaskResultForm() throws EntityNotFoundException {
        // given
        User user = new User();
        user.setEmail("random@email.com");
        SaveGraphTaskResultForm form = new SaveGraphTaskResultForm(
                graphTask.getId(),
                user.getEmail()
        );
        given(graphTaskRepo.findGraphTaskById(graphTask.getId())).willReturn(graphTask);
        given(userRepo.findUserByEmail(user.getEmail())).willReturn(user);


        // when
        graphTaskResultService.saveGraphTaskResult(form);

        // then
        ArgumentCaptor<Long> idArgumentCaptor = ArgumentCaptor.forClass(Long.class);
        ArgumentCaptor<String> emailArgumentCaptor = ArgumentCaptor.forClass(String.class);
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
        SaveGraphTaskResultForm form = new SaveGraphTaskResultForm(
                graphTask.getId(),
                user.getEmail()
        );

        // when
        // then
        assertThatThrownBy(() -> graphTaskResultService.saveGraphTaskResult(form))
                .isInstanceOf(EntityNotFoundException.class)
                .hasMessageContaining("Graph task with given id " + graphTask.getId() + " does not exist");
    }

    @Test
    public void saveGraphTaskResultFormThrowEntityNotFoundException2() {
        // given
        User user = new User();
        user.setEmail("random@email.com");
        SaveGraphTaskResultForm form = new SaveGraphTaskResultForm(
                graphTask.getId(),
                user.getEmail()
        );
        given(graphTaskRepo.findGraphTaskById(graphTask.getId())).willReturn(graphTask);

        // when
        // then
        assertThatThrownBy(() -> graphTaskResultService.saveGraphTaskResult(form))
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
        ArgumentCaptor<Long> idArgumentCaptor = ArgumentCaptor.forClass(Long.class);
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
        ArgumentCaptor<Long> idArgumentCaptor = ArgumentCaptor.forClass(Long.class);
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
        ArgumentCaptor<Long> idArgumentCaptor = ArgumentCaptor.forClass(Long.class);
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
        ArgumentCaptor<Long> idArgumentCaptor = ArgumentCaptor.forClass(Long.class);
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
        ArgumentCaptor<Long> idArgumentCaptor = ArgumentCaptor.forClass(Long.class);
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
        ArgumentCaptor<Long> idArgumentCaptor = ArgumentCaptor.forClass(Long.class);
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
        result.setStartTimeMillis(System.currentTimeMillis());
        graphTask.setTimeToSolveMillis(1_000_000L);
        given(graphTaskResultRepo.findGraphTaskResultById(result.getId())).willReturn(result);
        given(answerFormValidator.validateAndCreateAnswer(form.getAnswerForm())).willReturn(answer);
        given(questionRepo.findQuestionById(form.getQuestionId())).willReturn(question);

        //when
        graphTaskResultService.addAnswerToGraphTaskResult(form);

        // then
        ArgumentCaptor<Long> resultIdArgumentCaptor = ArgumentCaptor.forClass(Long.class);
        ArgumentCaptor<AnswerForm> answerFormArgumentCaptor = ArgumentCaptor.forClass(AnswerForm.class);
        ArgumentCaptor<Long> questionIdArgumentCaptor = ArgumentCaptor.forClass(Long.class);
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
        AnswerForm answerForm = new AnswerForm();
        answerForm.setOpenAnswer("random answer");
        AddAnswerToGraphTaskForm form = new AddAnswerToGraphTaskForm(
                result.getId(),
                1L,
                answerForm
        );
        result.setStartTimeMillis(System.currentTimeMillis());
        graphTask.setTimeToSolveMillis(1L);
        Thread.sleep(2L);
        given(graphTaskResultRepo.findGraphTaskResultById(result.getId())).willReturn(result);

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
    public void setTimeSpent() throws EntityNotFoundException {
        // given
        SetTimeSpentForm form = new SetTimeSpentForm(result.getId(), 120);
        given(graphTaskResultRepo.findGraphTaskResultById(result.getId())).willReturn(result);

        //when
        graphTaskResultService.setTimeSpent(form);

        // then
        ArgumentCaptor<Long> idArgumentCaptor = ArgumentCaptor.forClass(Long.class);
        verify(graphTaskResultRepo).findGraphTaskResultById(idArgumentCaptor.capture());
        Long capturedId = idArgumentCaptor.getValue();
        assertThat(capturedId).isEqualTo(result.getId());
    }

    @Test
    public void setTimeSpentThrowEntityNotFoundException() {
        // given
        SetTimeSpentForm form = new SetTimeSpentForm(result.getId(), 120);

        //when
        // then
        assertThatThrownBy(() -> graphTaskResultService.setTimeSpent(form))
                .isInstanceOf(EntityNotFoundException.class)
                .hasMessageContaining("Graph task result with given id " + result.getId() + " does not exist");
    }

    @Test
    public void setTimeStart() throws EntityNotFoundException {
        // given
        SetStartTimeForm form = new SetStartTimeForm(result.getId(), 120L);
        given(graphTaskResultRepo.findGraphTaskResultById(result.getId())).willReturn(result);

        //when
        graphTaskResultService.setStartTime(form);

        // then
        ArgumentCaptor<Long> idArgumentCaptor = ArgumentCaptor.forClass(Long.class);
        verify(graphTaskResultRepo).findGraphTaskResultById(idArgumentCaptor.capture());
        Long capturedId = idArgumentCaptor.getValue();
        assertThat(capturedId).isEqualTo(result.getId());
    }

    @Test
    public void setStartTimeThrowEntityNotFoundException() {
        // given
        SetStartTimeForm form = new SetStartTimeForm(result.getId(), 120L);

        //when
        // then
        assertThatThrownBy(() -> graphTaskResultService.setStartTime(form))
                .isInstanceOf(EntityNotFoundException.class)
                .hasMessageContaining("Graph task result with given id " + result.getId() + " does not exist");
    }

    @Test
    public void getTimeRemaining() throws EntityNotFoundException, EntityRequiredAttributeNullException {
        // given
        given(graphTaskResultRepo.findGraphTaskResultById(result.getId())).willReturn(result);
        result.setStartTimeMillis(System.currentTimeMillis());
        graphTask.setTimeToSolveMillis(1_000_000L);

        //when
        graphTaskResultService.getTimeRemaining(result.getId());

        // then
        ArgumentCaptor<Long> idArgumentCaptor = ArgumentCaptor.forClass(Long.class);
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
