package com.example.api.config;

import com.example.api.model.activity.result.FileTaskResult;
import com.example.api.model.activity.result.GraphTaskResult;
import com.example.api.model.activity.task.FileTask;
import com.example.api.model.activity.task.GraphTask;
import com.example.api.model.activity.task.Info;
import com.example.api.model.activity.task.Survey;
import com.example.api.model.group.AccessDate;
import com.example.api.model.group.Group;
import com.example.api.model.map.ActivityMap;
import com.example.api.model.map.MustFulfil;
import com.example.api.model.map.Requirement;
import com.example.api.model.question.Difficulty;
import com.example.api.model.question.Option;
import com.example.api.model.question.Question;
import com.example.api.model.question.QuestionType;
import com.example.api.model.user.AccountType;
import com.example.api.model.user.User;
import com.example.api.model.util.Url;
import com.example.api.repo.activity.result.GraphTaskResultRepo;
import com.example.api.repo.activity.task.FileTaskRepo;
import com.example.api.repo.activity.task.GraphTaskRepo;
import com.example.api.repo.activity.task.InfoRepo;
import com.example.api.repo.activity.task.SurveyRepo;
import com.example.api.repo.group.AccessDateRepo;
import com.example.api.repo.group.GroupRepo;
import com.example.api.repo.map.MapRepo;
import com.example.api.repo.map.RequirementRepo;
import com.example.api.repo.question.AnswerRepo;
import com.example.api.repo.question.OptionRepo;
import com.example.api.repo.question.QuestionRepo;
import com.example.api.repo.util.UrlRepo;
import com.example.api.service.activity.feedback.ProfessorFeedbackService;
import com.example.api.service.activity.feedback.UserFeedbackService;
import com.example.api.service.activity.result.FileTaskResultService;
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
    private final MapRepo mapRepo;
    private final InfoRepo infoRepo;
    private final UrlRepo urlRepo;
    private final RequirementRepo requirementRepo;
    private final SurveyRepo surveyRepo;

    @Bean
    public CommandLineRunner commandLineRunner(UserService userService, ProfessorFeedbackService professorFeedbackService,
                                               UserFeedbackService userFeedbackService, GraphTaskService graphTaskService,
                                               GraphTaskResultService graphTaskResultService, GroupService groupService,
                                               ActivityMapService activityMapService, QuestionService questionService,
                                               FileTaskResultService fileTaskResultService){
        return args -> {
            User student = new User();
            student.setEmail("student@gmail.com");
            student.setPassword("12345");
            student.setAccountType(AccountType.STUDENT);
//            userService.saveUser(student);


            User student1 = new User();
            student1.setEmail("student1@gmail.com");
            student1.setPassword("12345");
            student1.setAccountType(AccountType.STUDENT);
//            userService.saveUser(student1);


            User professor = new User();
            professor.setEmail("prowadzacy@gmail.com");
            professor.setPassword("12345");
            professor.setAccountType(AccountType.PROFESSOR);
            userService.saveUser(professor);

            // IT IS NOT DONE PROPER WAY, BUT API MISS A LOT OF SERVICES AND FOR TESTING PURPOSES IT WILL BE OK


            /// group

//            AccessDate accessDate1 = new AccessDate(null, LocalDateTime.parse("2020-04-23 18:25", DateTimeFormatter.ofPattern("uuuu-MM-dd HH:mm")),
//                    LocalDateTime.parse("2020-04-30 18:25", DateTimeFormatter.ofPattern("uuuu-MM-dd HH:mm")));
//            AccessDate accessDate2 = new AccessDate(null, LocalDateTime.parse("2020-04-23 18:25", DateTimeFormatter.ofPattern("uuuu-MM-dd HH:mm")),
//                    LocalDateTime.parse("2020-04-30 18:25", DateTimeFormatter.ofPattern("uuuu-MM-dd HH:mm")));
//            AccessDate accessDate3 = new AccessDate(null, LocalDateTime.parse("2020-03-10 18:25", DateTimeFormatter.ofPattern("uuuu-MM-dd HH:mm")),
//                    LocalDateTime.parse("2020-04-17 18:25", DateTimeFormatter.ofPattern("uuuu-MM-dd HH:mm")));

//            accessDateRepo.save(accessDate1);
//            accessDateRepo.save(accessDate2);
//            accessDateRepo.save(accessDate3);

            Group group1 = new Group();
            group1.setId(1L);
            group1.setInvitationCode("1234");
            group1.setName("all");
//            group1.setAccessDate(accessDate1);
            groupService.saveGroup(group1);

            Group group2 = new Group();
            group2.setId(2L);
            group2.setInvitationCode("1234");
            group2.setName("pn-1440-A");
//            group2.setAccessDate(accessDate2);
            group2.setUsers(List.of(student));
            groupService.saveGroup(group2);

            Group group3 = new Group();
            group3.setId(3L);
            group3.setInvitationCode("1234");
            group3.setName("pn-1440-B");
//            group3.setAccessDate(accessDate3);
            group3.setUsers(List.of(student1));
            groupService.saveGroup(group3);

//            User u1 = userService.getUser("student@gmail.com");
//            User u2 = userService.getUser("student1@gmail.com");
//            u1.setGroup(group2);
//            u2.setGroup(group3);
//            userService.saveUser(u1);
//            userService.saveUser(u2);

            student1.setGroup(group2);
            student.setGroup(group3);
            userService.saveUser(student);
            userService.saveUser(student1);


            //graph tasks


            Option option = new Option(null, "hub z routerem", true, null);
            Option option1 = new Option(null, "komputer z komputerem", false, null);
            Option option2 = new Option(null, "switch z routerem", true, null);
            Option option3 = new Option(null, "hub ze switchem", false, null);


            Option option4 = new Option(null, "Tak", true, null);
            Option option5 = new Option(null, "Nie", false, null);

            Question startQuestion = new Question();

            Question question1 = new Question(null, QuestionType.MULTIPLE_CHOICE, "Kt??re urz??dzenia mo??na po????czy?? ze sob?? skr??tk?? ???prost??????", "Kable",
                    Difficulty.EASY, List.of(option, option1, option2, option3), 10.0, new LinkedList<>(), null);
            Question question2 = new Question(null, QuestionType.SINGLE_CHOICE, "Czy ci??g znak??w 1001100101101010010110 to poprawnie zakodowany za pomoc?? kodu Manchester ci??g 10100111001?",
                    "Manchester", Difficulty.MEDIUM, List.of(option4, option5), 20.0, new LinkedList<>(), null);
            Question question3 = new Question(null, QuestionType.OPENED, "Je??li zawiniesz kabel kawa??kiem folii aluminiowej, jaki rodzaj skr??tki Ci to przypomina?",
                    "?", Difficulty.HARD, null, 30.0, new LinkedList<>(), "FTP");
            Question question4 = new Question(null, QuestionType.OPENED, "Jaki rodzaj powszechnie u??ywanego kabla by??by mo??liwy do u??ytku po u??yciu jak skakanka? Dlaczego ten?",
                    "Kable 2", Difficulty.MEDIUM, null, 20.0, new LinkedList<>(), "skr??tka");
            Question question5 = new Question(null, QuestionType.OPENED, "Zakoduj swoje imi?? i nazwisko za pomoc?? kodowania NRZI. ",
                    "Kable 2", Difficulty.HARD, null, 30.0, new LinkedList<>(), "Jan Kowalski");

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


            AccessDate ac1 = new AccessDate(null, LocalDateTime.parse("2022-05-23 12:20", DateTimeFormatter.ofPattern("uuuu-MM-dd HH:mm")), LocalDateTime.parse("2022-07-06 12:20", DateTimeFormatter.ofPattern("uuuu-MM-dd HH:mm")), List.of(group2));
            AccessDate ac2 = new AccessDate(null, LocalDateTime.parse("2022-05-23 12:20", DateTimeFormatter.ofPattern("uuuu-MM-dd HH:mm")), LocalDateTime.parse("2022-07-08 12:20", DateTimeFormatter.ofPattern("uuuu-MM-dd HH:mm")), List.of(group3));
            accessDateRepo.save(ac1);
            accessDateRepo.save(ac2);


            Requirement req = new Requirement();
            req.setMustFulfil(MustFulfil.NONE);
            req.setAccessDates(List.of(ac1, ac2));
            requirementRepo.save(req);

            GraphTask graphTask = new GraphTask();
            graphTask.setQuestions(List.of(startQuestion, question1, question2, question3,  question4, question5));
            graphTask.setName("D??ungla kabli");
            graphTask.setDescription("Przebij si?? przez g??szcz pyta?? zwi??zanych z ????czeniem urz??dze?? w lokalnej sieci i odkryj tajemnice ????czenia bulbulator??w ze sob??!");
            graphTask.setRequiredKnowledge("skr??tki, rodzaje ich ekranowania, ????czenie urz??dze?? r????nych warstw ze sob??");
            graphTask.setMaxPoints(30.0);
            graphTask.setMaxPoints100(60.0);
            graphTask.setTimeToSolveMillis(12 * 60 * 1000L);
            graphTask.setRequirement(req);
            graphTask.setPosX(5);
            graphTask.setPosY(4);
            graphTaskService.saveGraphTask(graphTask);




            Option optionTwo = new Option(null, "hub z routerem", true, null);
            Option optionTwo1 = new Option(null, "komputer z komputerem", false, null);
            Option optionTwo2 = new Option(null, "switch z routerem", true, null);
            Option optionTwo3 = new Option(null, "hub ze switchem", false, null);


            Option optionTwo4 = new Option(null, "Tak", true, null);
            Option optionTwo5 = new Option(null, "Nie", false, null);

            Question startQuestionTwo = new Question();

            Question questionTwo1 = new Question(null, QuestionType.MULTIPLE_CHOICE, "Kt??re urz??dzenia mo??na po????czy?? ze sob?? skr??tk?? ???prost??????", "Kable",
                    Difficulty.EASY, List.of(option, option1, option2, option3), 10.0, new LinkedList<>(), null);
            Question questionTwo2 = new Question(null, QuestionType.SINGLE_CHOICE, "Czy ci??g znak??w 1001100101101010010110 to poprawnie zakodowany za pomoc?? kodu Manchester ci??g 10100111001?",
                    "Manchester", Difficulty.MEDIUM, List.of(option4, option5), 20.0, new LinkedList<>(), null);
            Question questionTwo3 = new Question(null, QuestionType.OPENED, "Je??li zawiniesz kabel kawa??kiem folii aluminiowej, jaki rodzaj skr??tki Ci to przypomina?",
                    "?", Difficulty.HARD, null, 30.0, new LinkedList<>(), "FTP");
            Question questionTwo4 = new Question(null, QuestionType.OPENED, "Jaki rodzaj powszechnie u??ywanego kabla by??by mo??liwy do u??ytku po u??yciu jak skakanka? Dlaczego ten?",
                    "Kable 2", Difficulty.MEDIUM, null, 20.0, new LinkedList<>(), "skr??tka");
            Question questionTwo5 = new Question(null, QuestionType.OPENED, "Zakoduj swoje imi?? i nazwisko za pomoc?? kodowania NRZI. ",
                    "Kable 2", Difficulty.HARD, null, 30.0, new LinkedList<>(), "Jan Kowalski");

            questionService.saveQuestion(startQuestionTwo);
            questionService.saveQuestion(questionTwo1);
            questionService.saveQuestion(questionTwo2);
            questionService.saveQuestion(questionTwo3);
            questionService.saveQuestion(questionTwo4);
            questionService.saveQuestion(questionTwo5);

            startQuestionTwo.getNext().addAll(List.of(questionTwo1, questionTwo2, questionTwo3));
            questionTwo1.getNext().addAll(List.of(questionTwo2, questionTwo4));
            questionTwo3.getNext().addAll(List.of(questionTwo5));

            questionService.saveQuestion(startQuestionTwo);
            questionService.saveQuestion(questionTwo1);
            questionService.saveQuestion(questionTwo2);
            questionService.saveQuestion(questionTwo3);
            questionService.saveQuestion(questionTwo4);
            questionService.saveQuestion(questionTwo5);

            optionRepo.saveAll(List.of(optionTwo, optionTwo1, optionTwo2, optionTwo3, optionTwo4, optionTwo5));

            optionTwo.setQuestion(questionTwo1);
            optionTwo1.setQuestion(questionTwo1);
            optionTwo2.setQuestion(questionTwo1);
            optionTwo3.setQuestion(questionTwo1);
            optionTwo4.setQuestion(questionTwo2);
            optionTwo5.setQuestion(questionTwo2);

            optionRepo.saveAll(List.of(optionTwo, optionTwo1, optionTwo2, optionTwo3, optionTwo4, optionTwo5));

            GraphTask graphTaskTwo = new GraphTask();
            graphTaskTwo.setQuestions(List.of(startQuestionTwo, questionTwo1, questionTwo2, questionTwo3,  questionTwo4, questionTwo5));
            graphTaskTwo.setName("D??ungla kabli II");
            graphTaskTwo.setDescription("Przebij si?? przez g??szcz pyta?? zwi??zanych z ????czeniem urz??dze?? w lokalnej sieci i odkryj tajemnice ????czenia bulbulator??w ze sob??!");
            graphTaskTwo.setRequiredKnowledge("skr??tki, rodzaje ich ekranowania, ????czenie urz??dze?? r????nych warstw ze sob??");
            graphTaskTwo.setMaxPoints(30.0);
            graphTaskTwo.setMaxPoints100(60.0);
            graphTaskTwo.setTimeToSolveMillis(12 * 60 * 1000L);
            graphTaskTwo.setPosX(2);
            graphTaskTwo.setPosY(2);

            graphTaskService.saveGraphTask(graphTaskTwo);


            FileTask fileTask = new FileTask();
            fileTask.setPosX(3);
            fileTask.setPosY(3);
            fileTask.setName("Niszczator kabli");
            fileTask.setDescription("Jak z??ama??by?? kabel ??wiat??owodowy? Czym?");
            fileTask.setProfessor(professor);
            fileTask.setSolveDateMillis(System.currentTimeMillis() + 1_000_000);

            fileTaskRepo.save(fileTask);


            Info info1 = new Info();
            info1.setPosX(3);
            info1.setPosY(0);
            info1.setName("Skr??tki");
            info1.setDescription("Przewody internetowe da si?? podzieli?? tak??e pod wzgl??dem ich ekranowania.");
            Url url1 = new Url();
            Url url2 = new Url();
            url1.setUrl("https://upload.wikimedia.org/wikipedia/commons/c/cb/UTP_cable.jpg");
            url2.setUrl("https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/25_pair_color_code_chart.svg/800px-25_pair_color_code_chart.svg.png");
            urlRepo.save(url1);
            urlRepo.save(url2);
            info1.setImageUrls(List.of(url1, url2));
            info1.setName("Skr??tki");
            info1.setExperiance(10);
            info1.setProfessor(professor);
            infoRepo.save(info1);

            Survey survey = new Survey();
            survey.setName("Example map feedback");
            survey.setDescription("Pom???? nam polepszy?? kurs dziel??c si?? swoj?? opini??!");
            survey.setPosX(7);
            survey.setPosY(3);
            surveyRepo.save(survey);


            ActivityMap activityMap1 = new ActivityMap();
            activityMap1.setMapSizeX(8);
            activityMap1.setMapSizeY(5);
            activityMap1.setGraphTasks(List.of(graphTask, graphTaskTwo));
            activityMap1.setFileTasks(List.of(fileTask));
            activityMap1.setInfos(List.of(info1));
            activityMap1.setSurveys(List.of(survey));
            mapRepo.save(activityMap1);

            GraphTaskResult result = new GraphTaskResult();
            result.setGraphTask(graphTask);
            result.setUser(student);
            result.setPointsReceived(10.0);
            graphTaskResultService.saveGraphTaskResult(result);

            FileTaskResult fileResult = new FileTaskResult();
            fileResult.setFileTask(fileTask);
            fileResult.setUser(student1);
            fileResult.setEvaluated(false);
            fileResult.setSendDateMillis(System.currentTimeMillis());
            fileTaskResultService.saveFileTaskResult(fileResult);
        };
    }
}
