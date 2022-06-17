package com.example.api.config;

import com.example.api.model.activity.task.FileTask;
import com.example.api.model.activity.task.GraphTask;
import com.example.api.model.group.AccessDate;
import com.example.api.model.group.Group;
import com.example.api.model.question.Difficulty;
import com.example.api.model.question.Option;
import com.example.api.model.question.Question;
import com.example.api.model.question.QuestionType;
import com.example.api.model.user.AccountType;
import com.example.api.model.user.User;
import com.example.api.repo.activity.result.GraphTaskResultRepo;
import com.example.api.repo.activity.task.FileTaskRepo;
import com.example.api.repo.activity.task.GraphTaskRepo;
import com.example.api.repo.group.AccessDateRepo;
import com.example.api.repo.group.GroupRepo;
import com.example.api.repo.question.AnswerRepo;
import com.example.api.repo.question.OptionRepo;
import com.example.api.repo.question.QuestionRepo;
import com.example.api.service.activity.feedback.ProfessorFeedbackService;
import com.example.api.service.activity.feedback.UserFeedbackService;
import com.example.api.service.activity.result.GraphTaskResultService;
import com.example.api.service.activity.task.GraphTaskService;
import com.example.api.service.group.GroupService;
import com.example.api.service.map.ActivityMapService;
import com.example.api.service.question.QuestionService;
import com.example.api.service.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.LinkedList;
import java.util.List;

@Configuration
@RequiredArgsConstructor
public class DatabaseConfig {
    private final GraphTaskRepo graphTaskRepo;
    private final GraphTaskResultRepo graphTaskResultRepo;
    private final GroupRepo groupRepo;
    private final OptionRepo optionRepo;
    private final QuestionRepo questionRepo;
    private final AnswerRepo answerRepo;
    private final AccessDateRepo accessDateRepo;
    private final FileTaskRepo fileTaskRepo;

    @Bean
    public CommandLineRunner commandLineRunner(UserService userService, ProfessorFeedbackService professorFeedbackService,
                                               UserFeedbackService userFeedbackService, GraphTaskService graphTaskService,
                                               GraphTaskResultService graphTaskResultService, GroupService groupService,
                                               ActivityMapService activityMapService, QuestionService questionService){
        return args -> {
            User student = new User();
            student.setEmail("student@gmail.com");
            student.setPassword("12345");
            student.setAccountType(AccountType.STUDENT);
            userService.saveUser(student);


            User student1 = new User();
            student1.setEmail("student1@gmail.com");
            student1.setPassword("12345");
            student1.setAccountType(AccountType.STUDENT);
            userService.saveUser(student1);


            User professor = new User();
            professor.setEmail("bmaj@gmail.com");
            professor.setPassword("12345");
            professor.setAccountType(AccountType.PROFESSOR);
            userService.saveUser(professor);

            // IT IS NOT DONE PROPER WAY, BUT API MISS A LOT OF SERVICES AND FOR TESTING PURPOSES IT WILL BE OK

            Option option = new Option(null, "hub z routerem", true, null);
            Option option1 = new Option(null, "komputer z komputerem", false, null);
            Option option2 = new Option(null, "switch z routerem", true, null);
            Option option3 = new Option(null, "hub ze switchem", false, null);


            Option option4 = new Option(null, "Tak", true, null);
            Option option5 = new Option(null, "Nie", false, null);

            Question startQuestion = new Question();

            Question question1 = new Question(null, QuestionType.MULTIPLE_CHOICE, "Które urządzenia można połączyć ze sobą skrętką “prostą”?", "Kable",
                    Difficulty.EASY, List.of(option, option1, option2, option3), 10.0, new LinkedList<>(), null);
            Question question2 = new Question(null, QuestionType.SINGLE_CHOICE, "Czy ciąg znaków 1001100101101010010110 to poprawnie zakodowany za pomocą kodu Manchester ciąg 10100111001?",
                    "Manchester", Difficulty.MEDIUM, List.of(option4, option5), 20.0, new LinkedList<>(), null);
            Question question3 = new Question(null, QuestionType.OPENED, "Jeśli zawiniesz kabel kawałkiem folii aluminiowej, jaki rodzaj skrętki Ci to przypomina?",
                    "?", Difficulty.HARD, null, 30.0, new LinkedList<>(), "FTP");
            Question question4 = new Question(null, QuestionType.OPENED, "Jaki rodzaj powszechnie używanego kabla byłby możliwy do użytku po użyciu jak skakanka? Dlaczego ten?",
                    "Kable 2", Difficulty.MEDIUM, null, 20.0, new LinkedList<>(), null);
            Question question5 = new Question(null, QuestionType.OPENED, "Zakoduj swoje imię i nazwisko za pomocą kodowania NRZI. ",
                    "Kable 2", Difficulty.HARD, null, 30.0, new LinkedList<>(), null);

            questionService.saveQuestion(startQuestion);
            questionService.saveQuestion(question1);
            questionService.saveQuestion(question2);
            questionService.saveQuestion(question3);
            questionService.saveQuestion(question4);
            questionService.saveQuestion(question5);

            startQuestion.getNext().addAll(List.of(question1, question2, question3));
            question1.getNext().addAll(List.of(question2, question4));
            question3.getNext().addAll(List.of(question5));

            questionService.saveQuestion(startQuestion);
            questionService.saveQuestion(question1);
            questionService.saveQuestion(question2);
            questionService.saveQuestion(question3);
            questionService.saveQuestion(question4);
            questionService.saveQuestion(question5);

            optionRepo.saveAll(List.of(option, option1, option2, option3, option4, option5));

            option.setQuestion(question1);
            option1.setQuestion(question1);
            option2.setQuestion(question1);
            option3.setQuestion(question1);
            option4.setQuestion(question2);
            option5.setQuestion(question2);

            optionRepo.saveAll(List.of(option, option1, option2, option3, option4, option5));

            GraphTask graphTask = new GraphTask();
            graphTask.setQuestions(List.of(startQuestion, question1, question2, question3,  question4, question5));
            graphTask.setName("Dżungla kabli");
            graphTask.setDescription("Przebij się przez gąszcz pytań związanych z łączeniem urządzeń w lokalnej sieci i odkryj tajemnice łączenia bulbulatorów ze sobą!");
            graphTask.setRequiredKnowledge("skrętki, rodzaje ich ekranowania, łączenie urządzeń różnych warstw ze sobą");
            graphTask.setMaxPoints(30.0);
            graphTask.setMaxPoints100(60.0);
            graphTask.setTimeToSolve(12 * 60);

            FileTask fileTask = new FileTask();
            fileTaskRepo.save(fileTask);


            graphTaskService.saveGraphTask(graphTask);

            /// group

            AccessDate accessDate1 = new AccessDate(null, LocalDateTime.parse("2020-04-23 18:25", DateTimeFormatter.ofPattern("uuuu-MM-dd HH:mm")),
                    LocalDateTime.parse("2020-04-30 18:25", DateTimeFormatter.ofPattern("uuuu-MM-dd HH:mm")));
            AccessDate accessDate2 = new AccessDate(null, LocalDateTime.parse("2020-04-23 18:25", DateTimeFormatter.ofPattern("uuuu-MM-dd HH:mm")),
                    LocalDateTime.parse("2020-04-30 18:25", DateTimeFormatter.ofPattern("uuuu-MM-dd HH:mm")));
            AccessDate accessDate3 = new AccessDate(null, LocalDateTime.parse("2020-03-10 18:25", DateTimeFormatter.ofPattern("uuuu-MM-dd HH:mm")),
                    LocalDateTime.parse("2020-04-17 18:25", DateTimeFormatter.ofPattern("uuuu-MM-dd HH:mm")));

            accessDateRepo.save(accessDate1);
            accessDateRepo.save(accessDate2);
            accessDateRepo.save(accessDate3);

            Group group1 = new Group();
            group1.setInvitationCode("1234");
            group1.setName("all");
            group1.setAccessDate(accessDate1);
            groupService.saveGroup(group1);

            Group group2 = new Group();
            group2.setInvitationCode("1234");
            group2.setName("pn-1440-A");
            group2.setAccessDate(accessDate2);
            groupService.saveGroup(group2);

            Group group3 = new Group();
            group3.setInvitationCode("1234");
            group3.setName("pn-1440-B");
            group3.setAccessDate(accessDate3);
            groupService.saveGroup(group3);

        };
    }
}
