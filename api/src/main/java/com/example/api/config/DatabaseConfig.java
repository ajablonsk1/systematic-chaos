package com.example.api.config;

import com.example.api.model.activity.result.AdditionalPoints;
import com.example.api.model.activity.result.FileTaskResult;
import com.example.api.model.activity.result.GraphTaskResult;
import com.example.api.model.activity.result.SurveyResult;
import com.example.api.model.activity.task.FileTask;
import com.example.api.model.activity.task.GraphTask;
import com.example.api.model.activity.task.Info;
import com.example.api.model.activity.task.Survey;
import com.example.api.model.group.AccessDate;
import com.example.api.model.group.Group;
import com.example.api.model.map.ActivityMap;
import com.example.api.model.map.Chapter;
import com.example.api.model.map.MustFulfil;
import com.example.api.model.map.Requirement;
import com.example.api.model.question.Difficulty;
import com.example.api.model.question.Option;
import com.example.api.model.question.Question;
import com.example.api.model.question.QuestionType;
import com.example.api.model.user.AccountType;
import com.example.api.model.user.HeroType;
import com.example.api.model.user.User;
import com.example.api.model.util.File;
import com.example.api.model.util.Url;
import com.example.api.repo.activity.result.AdditionalPointsRepo;
import com.example.api.repo.activity.result.SurveyResultRepo;
import com.example.api.repo.map.ChapterRepo;
import com.example.api.repo.util.FileRepo;
import com.example.api.repo.util.UrlRepo;
import com.example.api.service.activity.feedback.ProfessorFeedbackService;
import com.example.api.service.activity.feedback.UserFeedbackService;
import com.example.api.service.activity.result.FileTaskResultService;
import com.example.api.service.activity.result.GraphTaskResultService;
import com.example.api.service.activity.task.FileTaskService;
import com.example.api.service.activity.task.GraphTaskService;
import com.example.api.service.activity.task.InfoService;
import com.example.api.service.activity.task.SurveyService;
import com.example.api.service.group.AccessDateService;
import com.example.api.service.group.GroupService;
import com.example.api.service.map.ActivityMapService;
import com.example.api.service.map.RequirementService;
import com.example.api.service.question.OptionService;
import com.example.api.service.question.QuestionService;
import com.example.api.service.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Calendar;
import java.util.LinkedList;
import java.util.List;

@Configuration
@RequiredArgsConstructor
public class DatabaseConfig {
    private final UrlRepo urlRepo;
    private final ChapterRepo chapterRepo;
    private final AdditionalPointsRepo additionalPointsRepo;
    private final SurveyResultRepo surveyResultRepo;
    private final FileRepo fileRepo;

    @Bean
    public CommandLineRunner commandLineRunner(UserService userService, ProfessorFeedbackService professorFeedbackService,
                                               UserFeedbackService userFeedbackService, GraphTaskService graphTaskService,
                                               GraphTaskResultService graphTaskResultService, GroupService groupService,
                                               ActivityMapService activityMapService, QuestionService questionService,
                                               FileTaskResultService fileTaskResultService, OptionService optionService,
                                               AccessDateService accessDateService, RequirementService requirementService,
                                               FileTaskService fileTaskService, InfoService infoService,
                                               SurveyService surveyService){
        return args -> {


            // USERS & GROUPS

            User student = new User("jgorski@student.agh.edu.pl",
                    "Jerzy",
                    "Górski",
                    AccountType.STUDENT);
            student.setPassword("12345");
            student.setIndexNumber(123456);
            student.setHeroType(HeroType.PRIEST);

            User student1 = new User("smazur@student.agh.edu.pl",
                    "Szymon",
                    "Mazur",
                    AccountType.STUDENT);
            student1.setPassword("12345");
            student1.setIndexNumber(123457);
            student1.setHeroType(HeroType.PRIEST);

            User student2 = new User("murbanska@student.agh.edu.pl",
                    "Matylda",
                    "Urbańska",
                    AccountType.STUDENT);
            student2.setPassword("12345");
            student2.setIndexNumber(123458);
            student2.setHeroType(HeroType.PRIEST);

            User student3 = new User("pwasilewski@student.agh.edu.pl",
                    "Patryk",
                    "Wasilewski",
                    AccountType.STUDENT);
            student3.setPassword("12345");
            student3.setIndexNumber(123459);
            student3.setHeroType(HeroType.PRIEST);

            User student4 = new User("awojcik@student.agh.edu.pl",
                    "Amelia",
                    "Wójcik",
                    AccountType.STUDENT);
            student4.setPassword("12345");
            student4.setIndexNumber(223456);
            student4.setHeroType(HeroType.WARRIOR);

            User student5 = new User("kkruk@student.agh.edu.pl",
                    "Kornel",
                    "Kruk",
                    AccountType.STUDENT);
            student5.setPassword("12345");
            student5.setIndexNumber(323456);
            student5.setHeroType(HeroType.WARRIOR);

            User student6 = new User("mdabrowska@student.agh.edu.pl",
                    "Maria",
                    "Dąbrowska",
                    AccountType.STUDENT);
            student6.setPassword("12345");
            student6.setIndexNumber(423456);
            student6.setHeroType(HeroType.WARRIOR);

            User student7 = new User("aczajkowski@student.agh.edu.pl",
                    "Antoni",
                    "Czajkowski",
                    AccountType.STUDENT);
            student7.setPassword("12345");
            student7.setIndexNumber(523456);
            student7.setHeroType(HeroType.WIZARD);

            User student8 = new User("mnowak@student.agh.edu.pl",
                    "Magdalena",
                    "Nowak",
                    AccountType.STUDENT);
            student8.setPassword("12345");
            student8.setIndexNumber(623456);
            student8.setHeroType(HeroType.WIZARD);

            User student9 = new User("jlewandowska@student.agh.edu.pl",
                    "Julia",
                    "Lewandowska",
                    AccountType.STUDENT);
            student9.setPassword("12345");
            student9.setIndexNumber(723456);
            student9.setHeroType(HeroType.WIZARD);

            User student10 = new User("mwojcik@student.agh.edu.pl",
                    "Milena",
                    "Wójcik",
                    AccountType.STUDENT);
            student10.setPassword("12345");
            student10.setIndexNumber(823456);
            student10.setHeroType(HeroType.WIZARD);

            User student11 = new User("kpaluch@student.agh.edu.pl",
                    "Kacper",
                    "Paluch",
                    AccountType.STUDENT);
            student11.setPassword("12345");
            student11.setIndexNumber(923456);
            student11.setHeroType(HeroType.WIZARD);

            User student12 = new User("fzalewski@student.agh.edu.pl",
                    "Filip",
                    "Zalewski",
                    AccountType.STUDENT);
            student12.setPassword("12345");
            student12.setIndexNumber(133456);
            student12.setHeroType(HeroType.WIZARD);

            User student13 = new User("jmichalak@student.agh.edu.pl",
                    "Jan",
                    "Michalak",
                    AccountType.STUDENT);
            student13.setPassword("12345");
            student13.setIndexNumber(143456);
            student13.setHeroType(HeroType.WIZARD);

            User student14 = new User("kostrowska@student.agh.edu.pl",
                    "Karina",
                    "Ostrowska",
                    AccountType.STUDENT);
            student14.setPassword("12345");
            student14.setIndexNumber(153456);
            student14.setHeroType(HeroType.ROGUE);

            User student15 = new User("dkowalska@student.agh.edu.pl",
                    "Dominika",
                    "Kowalska",
                    AccountType.STUDENT);
            student15.setPassword("12345");
            student15.setIndexNumber(163456);
            student15.setHeroType(HeroType.ROGUE);

            User student16 = new User("manowak@student.agh.edu.pl",
                    "Małgorzata Anna",
                    "Kowalska",
                    AccountType.STUDENT);
            student16.setPassword("12345");
            student16.setIndexNumber(163457);
            student16.setHeroType(HeroType.ROGUE);

            User professor = new User("bmaj@agh.edu.pl",
                    "Bernard",
                    "Maj",
                    AccountType.PROFESSOR);
            professor.setPassword("12345");
            professor.setHeroType(HeroType.PRIEST);
            student.setIndexNumber(123456);

            User professor1 = new User("szielinski@agh.edu.pl",
                    "Sławomir",
                    "Zieliński",
                    AccountType.PROFESSOR);
            professor1.setPassword("12345");
            professor1.setHeroType(HeroType.PRIEST);
            student.setIndexNumber(123456);

            List<User> students1 = List.of(student, student1, student2, student3, student4, student5, student6, student7);
            List<User> students2 = List.of(student8, student9, student10, student11, student12, student13, student14, student15, student16);

            Group group = new Group();
            group.setInvitationCode("1111");
            group.setName("pn-1440-A");
            group.setUsers(students1);
            groupService.saveGroup(group);

            Group group1 = new Group();
            group1.setInvitationCode("2222");
            group1.setName("pn-1440-B");
            group.setUsers(students2);
            groupService.saveGroup(group1);

            for (User user: students1) {
                user.setGroup(group);
                userService.saveUser(user);
            }
            for (User user: students2) {
                user.setGroup(group1);
                userService.saveUser(user);
            }

            professor.setGroup(group);
            professor1.setGroup(group1);
            userService.saveUser(professor);
            userService.saveUser(professor1);


            // TASKS

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
                    "Kable 2", Difficulty.MEDIUM, null, 20.0, new LinkedList<>(), "skrętka");
            Question question5 = new Question(null, QuestionType.OPENED, "Zakoduj swoje imię i nazwisko za pomocą kodowania NRZI. ",
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

            optionService.saveAll(List.of(option, option1, option2, option3, option4, option5));

            option.setQuestion(question1);
            option1.setQuestion(question1);
            option2.setQuestion(question1);
            option3.setQuestion(question1);
            option4.setQuestion(question2);
            option5.setQuestion(question2);

            optionService.saveAll(List.of(option, option1, option2, option3, option4, option5));

            AccessDate ac1 = new AccessDate(null, LocalDateTime.parse("2022-05-23 12:20", DateTimeFormatter.ofPattern("uuuu-MM-dd HH:mm")), LocalDateTime.parse("2022-07-06 12:20", DateTimeFormatter.ofPattern("uuuu-MM-dd HH:mm")), List.of(group1));
            AccessDate ac2 = new AccessDate(null, LocalDateTime.parse("2022-05-23 12:20", DateTimeFormatter.ofPattern("uuuu-MM-dd HH:mm")), LocalDateTime.parse("2022-07-08 12:20", DateTimeFormatter.ofPattern("uuuu-MM-dd HH:mm")), List.of(group));
            accessDateService.saveAccessDate(ac1);
            accessDateService.saveAccessDate(ac2);

            Requirement req = new Requirement();
            req.setMustFulfil(MustFulfil.NONE);
            req.setAccessDates(List.of(ac1, ac2));
            requirementService.saveRequirement(req);

            GraphTask graphTask = new GraphTask();
            graphTask.setQuestions(List.of(startQuestion, question1, question2, question3,  question4, question5));
            graphTask.setTitle("Dżungla kabli");
            graphTask.setDescription("Przebij się przez gąszcz pytań związanych z łączeniem urządzeń w lokalnej sieci i odkryj tajemnice łączenia bulbulatorów ze sobą!");
            graphTask.setRequiredKnowledge("skrętki, rodzaje ich ekranowania, łączenie urządzeń różnych warstw ze sobą");
            graphTask.setMaxPoints(60.0);
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

            Question questionTwo1 = new Question(null, QuestionType.MULTIPLE_CHOICE, "Które urządzenia można połączyć ze sobą skrętką “prostą”?", "Kable",
                    Difficulty.EASY, List.of(option, option1, option2, option3), 10.0, new LinkedList<>(), null);
            Question questionTwo2 = new Question(null, QuestionType.SINGLE_CHOICE, "Czy ciąg znaków 1001100101101010010110 to poprawnie zakodowany za pomocą kodu Manchester ciąg 10100111001?",
                    "Manchester", Difficulty.MEDIUM, List.of(option4, option5), 20.0, new LinkedList<>(), null);
            Question questionTwo3 = new Question(null, QuestionType.OPENED, "Jeśli zawiniesz kabel kawałkiem folii aluminiowej, jaki rodzaj skrętki Ci to przypomina?",
                    "?", Difficulty.HARD, null, 30.0, new LinkedList<>(), "FTP");
            Question questionTwo4 = new Question(null, QuestionType.OPENED, "Jaki rodzaj powszechnie używanego kabla byłby możliwy do użytku po użyciu jak skakanka? Dlaczego ten?",
                    "Kable 2", Difficulty.MEDIUM, null, 20.0, new LinkedList<>(), "skrętka");
            Question questionTwo5 = new Question(null, QuestionType.OPENED, "Zakoduj swoje imię i nazwisko za pomocą kodowania NRZI. ",
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

            optionService.saveAll(List.of(optionTwo, optionTwo1, optionTwo2, optionTwo3, optionTwo4, optionTwo5));

            optionTwo.setQuestion(questionTwo1);
            optionTwo1.setQuestion(questionTwo1);
            optionTwo2.setQuestion(questionTwo1);
            optionTwo3.setQuestion(questionTwo1);
            optionTwo4.setQuestion(questionTwo2);
            optionTwo5.setQuestion(questionTwo2);

            optionService.saveAll(List.of(optionTwo, optionTwo1, optionTwo2, optionTwo3, optionTwo4, optionTwo5));

            GraphTask graphTaskTwo = new GraphTask();
            graphTaskTwo.setQuestions(List.of(startQuestionTwo, questionTwo1, questionTwo2, questionTwo3,  questionTwo4, questionTwo5));
            graphTaskTwo.setTitle("Dżungla kabli II");
            graphTaskTwo.setDescription("Przebij się przez gąszcz pytań związanych z łączeniem urządzeń w lokalnej sieci i odkryj tajemnice łączenia bulbulatorów ze sobą!");
            graphTaskTwo.setRequiredKnowledge("skrętki, rodzaje ich ekranowania, łączenie urządzeń różnych warstw ze sobą");
            graphTaskTwo.setMaxPoints(60.0);
            graphTaskTwo.setTimeToSolveMillis(12 * 60 * 1000L);
            graphTaskTwo.setPosX(2);
            graphTaskTwo.setPosY(2);

            graphTaskService.saveGraphTask(graphTaskTwo);

            FileTask fileTask = new FileTask();
            fileTask.setPosX(3);
            fileTask.setPosY(3);
            fileTask.setTitle("Niszczator kabli");
            fileTask.setDescription("Jak złamałbyś kabel światłowodowy? Czym?");
            fileTask.setProfessor(professor);
            fileTask.setMaxPoints(30.0);
            fileTask.setExpireDateMillis(System.currentTimeMillis() + 1_000_000);

            fileTaskService.saveFileTask(fileTask);

            Info info1 = new Info();
            info1.setPosX(3);
            info1.setPosY(0);
            info1.setTitle("Skrętki");
            info1.setDescription("Przewody internetowe da się podzielić także pod względem ich ekranowania.");
            Url url1 = new Url();
            Url url2 = new Url();
            url1.setUrl("https://upload.wikimedia.org/wikipedia/commons/c/cb/UTP_cable.jpg");
            url2.setUrl("https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/25_pair_color_code_chart.svg/800px-25_pair_color_code_chart.svg.png");
            urlRepo.save(url1);
            urlRepo.save(url2);
            info1.setImageUrls(List.of(url1, url2));
            info1.setTitle("Skrętki");
            info1.setExperience(10.0);
            info1.setProfessor(professor);
            infoService.saveInfo(info1);

            Survey survey = new Survey();
            survey.setTitle("Example map feedback");
            survey.setDescription("Pomóż nam polepszyć kurs dzieląc się swoją opinią!");
            survey.setPosX(7);
            survey.setPosY(3);
            survey.setPoints(10.0);
            surveyService.saveSurvey(survey);

            ActivityMap activityMap1 = new ActivityMap();
            activityMap1.setMapSizeX(8);
            activityMap1.setMapSizeY(5);
            activityMap1.setGraphTasks(List.of(graphTask, graphTaskTwo));
            activityMap1.setFileTasks(List.of(fileTask));
            activityMap1.setInfos(List.of(info1));
            activityMap1.setSurveys(List.of(survey));
            activityMapService.saveActivityMap(activityMap1);

            Calendar calendar = Calendar.getInstance();

            GraphTaskResult result1 = new GraphTaskResult();
            result1.setGraphTask(graphTask);
            result1.setUser(student);
            result1.setPointsReceived(12.0);
            result1.setTimeSpentSec(60 * 10);
            calendar.set(2022, Calendar.APRIL, 28);
            result1.setStartDateMillis(calendar.getTimeInMillis());
            result1.setSendDateMillis(calendar.getTimeInMillis() + result1.getTimeSpentSec() / 1000);
            graphTaskResultService.saveGraphTaskResult(result1);

            GraphTaskResult result2 = new GraphTaskResult();
            result2.setGraphTask(graphTaskTwo);
            result2.setUser(student1);
            result2.setPointsReceived(10.0);
            result2.setTimeSpentSec(60 * 10);
            calendar.set(2022, Calendar.APRIL, 13);
            result2.setStartDateMillis(calendar.getTimeInMillis());
            result2.setSendDateMillis(calendar.getTimeInMillis() + result2.getTimeSpentSec() / 1000);
            graphTaskResultService.saveGraphTaskResult(result2);

            GraphTaskResult result3 = new GraphTaskResult();
            result3.setGraphTask(graphTaskTwo);
            result3.setUser(student8);
            result3.setPointsReceived(11.0);
            result3.setTimeSpentSec(60 * 10);
            calendar.set(2022, Calendar.APRIL, 14);
            result3.setStartDateMillis(calendar.getTimeInMillis());
            result3.setSendDateMillis(calendar.getTimeInMillis() + result2.getTimeSpentSec() / 1000);
            graphTaskResultService.saveGraphTaskResult(result3);

            FileTaskResult fileResult = new FileTaskResult();
            fileResult.setId(1L);
            fileResult.setFileTask(fileTask);
            fileResult.setUser(student);
            fileResult.setEvaluated(false);
            fileResult.setAnswer("Lorem ipsum");
            calendar.set(2022, Calendar.JUNE, 11);
            fileResult.setSendDateMillis(calendar.getTimeInMillis());
            fileTaskResultService.saveFileTaskResult(fileResult);

            Chapter chapter = new Chapter();
            chapter.setName("Rozdział 1");
            chapter.setActivityMap(activityMap1);

            chapterRepo.save(chapter);

            AdditionalPoints additionalPoints = new AdditionalPoints();
            additionalPoints.setId(1L);
            additionalPoints.setUser(student);
            additionalPoints.setPointsReceived(100D);
            additionalPoints.setProfessorEmail(professor.getEmail());
            additionalPoints.setDescription("Good job");
            calendar.set(2022, Calendar.JUNE, 15);
            additionalPoints.setSendDateMillis(calendar.getTimeInMillis());
            additionalPointsRepo.save(additionalPoints);

            SurveyResult surveyResult1 = new SurveyResult();
            surveyResult1.setSurvey(survey);
            surveyResult1.setId(1L);
            surveyResult1.setUser(student);
            surveyResult1.setPointsReceived(1D);
            calendar.set(2022, Calendar.JUNE, 16);
            surveyResult1.setSendDateMillis(calendar.getTimeInMillis());
            surveyResultRepo.save(surveyResult1);

            SurveyResult surveyResult2 = new SurveyResult();
            surveyResult2.setSurvey(survey);
            surveyResult2.setId(2L);
            surveyResult2.setUser(student1);
            surveyResult2.setPointsReceived(3D);
            calendar.set(2022, Calendar.JUNE, 18);
            surveyResult2.setSendDateMillis(calendar.getTimeInMillis());
            surveyResultRepo.save(surveyResult2);

            SurveyResult surveyResult3 = new SurveyResult();
            surveyResult3.setSurvey(survey);
            surveyResult3.setId(3L);
            surveyResult3.setUser(student10);
            surveyResult3.setPointsReceived(5D);
            calendar.set(2022, Calendar.JUNE, 19);
            surveyResult3.setSendDateMillis(calendar.getTimeInMillis());
            surveyResultRepo.save(surveyResult3);

            File file = new File();
            fileRepo.save(file);
        };
    }
}
