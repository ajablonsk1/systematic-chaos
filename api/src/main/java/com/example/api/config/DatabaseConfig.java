package com.example.api.config;

import com.example.api.model.activity.feedback.ProfessorFeedback;
import com.example.api.model.activity.result.GraphTaskResult;
import com.example.api.model.activity.task.GraphTask;
import com.example.api.model.group.Group;
import com.example.api.model.question.*;
import com.example.api.model.user.AccountType;
import com.example.api.model.user.User;
import com.example.api.repo.activity.result.GraphTaskResultRepo;
import com.example.api.repo.activity.task.GraphTaskRepo;
import com.example.api.repo.group.GroupRepo;
import com.example.api.repo.question.AnswerRepo;
import com.example.api.repo.question.OptionRepo;
import com.example.api.repo.question.QuestionRepo;
import com.example.api.service.activity.feedback.ProfessorFeedbackService;
import com.example.api.service.activity.feedback.UserFeedbackService;
import com.example.api.service.activity.feedback.form.SaveProfessorFeedbackForm;
import com.example.api.service.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

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

    @Bean
    public CommandLineRunner commandLineRunner(UserService userService, ProfessorFeedbackService professorFeedbackService,
                                               UserFeedbackService userFeedbackService){
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

            Option option = new Option(null, "cos", true, null);
            Option option1 = new Option(null, "cos", false, null);
            Option option2 = new Option(null, "cos", false, null);
            Option option3 = new Option(null, "cos", false, null);


            Option option4 = new Option(null, "cos", true, null);
            Option option5 = new Option(null, "cos", false, null);
            Option option6 = new Option(null, "cos", false, null);
            Option option7 = new Option(null, "cos", true, null);

            Question question = new Question(null, QuestionType.SINGLE_CHOICE, "cokolwiek", "cokolwiek",
                    Difficulty.EASY, List.of(option, option1, option2, option3), 4.0, List.of(), null);
            Question question1 = new Question(null, QuestionType.MULTIPLE_CHOICE, "cokolwiek", "cokolwiek",
                    Difficulty.EASY, List.of(option4, option5, option6, option7), 4.0, List.of(), null);
            Question question2 = new Question(null, QuestionType.OPENED, "cokolwiek", "cokolwiek",
                    Difficulty.EASY, List.of(option4, option5, option6, option7), 4.0, List.of(), "XD");

            optionRepo.saveAll(List.of(option, option1, option2, option3, option4, option5, option6, option7));
            questionRepo.saveAll(List.of(question1, question2, question));

            option.setQuestion(question);
            option1.setQuestion(question);
            option2.setQuestion(question);
            option3.setQuestion(question);
            option4.setQuestion(question1);
            option5.setQuestion(question1);
            option6.setQuestion(question1);
            option7.setQuestion(question1);

            optionRepo.saveAll(List.of(option, option1, option2, option3, option4, option5, option6, option7));

            GraphTask graphTask = new GraphTask();
            graphTask.setQuestions(List.of(question1, question, question2));

            graphTaskRepo.save(graphTask);

            GraphTaskResult result = new GraphTaskResult();
            result.setGraphTask(graphTask);

            graphTaskResultRepo.save(result);


            Answer answer = new Answer(null, question1);
            answer.setOptions(List.of(option4, option5, option7));

            Answer answer1 = new Answer(null, option, question);
            Answer answer2 = new Answer(null, "XD", question2);
            result.setAnswers((List.of(answer, answer1, answer2)));

            answerRepo.saveAll(List.of(answer, answer2, answer1));
            graphTaskResultRepo.save(result);


            /// group

            Group group = new Group();
            group.setInvitationCode("1111");
            groupRepo.save(group);

        };
    }
}
