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
import com.example.api.model.map.requirement.*;
import com.example.api.model.question.Difficulty;
import com.example.api.model.question.Option;
import com.example.api.model.question.Question;
import com.example.api.model.question.QuestionType;
import com.example.api.model.user.AccountType;
import com.example.api.model.user.HeroType;
import com.example.api.model.user.Rank;
import com.example.api.model.user.User;
import com.example.api.model.user.badge.*;
import com.example.api.model.util.File;
import com.example.api.model.util.Image;
import com.example.api.model.util.ImageType;
import com.example.api.model.util.Url;
import com.example.api.repo.activity.result.AdditionalPointsRepo;
import com.example.api.repo.activity.result.SurveyResultRepo;
import com.example.api.repo.map.ChapterRepo;
import com.example.api.repo.map.RequirementRepo;
import com.example.api.repo.user.BadgeRepo;
import com.example.api.repo.user.RankRepo;
import com.example.api.repo.user.UnlockedBadgeRepo;
import com.example.api.repo.user.UserRepo;
import com.example.api.repo.util.FileRepo;
import com.example.api.repo.util.UrlRepo;
import com.example.api.service.activity.feedback.ProfessorFeedbackService;
import com.example.api.service.activity.feedback.SurveyResultService;
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
import com.example.api.service.user.BadgeService;
import com.example.api.service.user.UserService;
import com.example.api.util.MessageManager;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.imageio.ImageIO;
import javax.transaction.Transactional;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.Calendar;
import java.util.LinkedList;
import java.util.List;

@Configuration
@RequiredArgsConstructor
@Transactional
public class DatabaseConfig {
    private final UrlRepo urlRepo;
    private final ChapterRepo chapterRepo;
    private final RankRepo rankRepo;
    private final AdditionalPointsRepo additionalPointsRepo;
    private final SurveyResultRepo surveyResultRepo;
    private final FileRepo fileRepo;
    private final UserRepo userRepo;
    private final BadgeRepo badgeRepo;
    private final UnlockedBadgeRepo unlockedBadgeRepo;
    private final RequirementRepo requirementRepo;

    @Bean
    public CommandLineRunner commandLineRunner(UserService userService, ProfessorFeedbackService professorFeedbackService,
                                               SurveyResultService surveyResultService, GraphTaskService graphTaskService,
                                               GraphTaskResultService graphTaskResultService, GroupService groupService,
                                               ActivityMapService activityMapService, QuestionService questionService,
                                               FileTaskResultService fileTaskResultService, OptionService optionService,
                                               AccessDateService accessDateService, RequirementService requirementService,
                                               FileTaskService fileTaskService, InfoService infoService,
                                               SurveyService surveyService, BadgeService badgeService){
        return args -> {


            // USERS & GROUPS

            User student = new User("jgorski@student.agh.edu.pl",
                    "Jerzy",
                    "Górski",
                    AccountType.STUDENT);
            student.setPassword("12345");
            student.setIndexNumber(123456);
            student.setHeroType(HeroType.PRIEST);
            student.setPoints(0D);

            User student1 = new User("smazur@student.agh.edu.pl",
                    "Szymon",
                    "Mazur",
                    AccountType.STUDENT);
            student1.setPassword("12345");
            student1.setIndexNumber(123457);
            student1.setHeroType(HeroType.PRIEST);
            student1.setPoints(0D);

            User student2 = new User("murbanska@student.agh.edu.pl",
                    "Matylda",
                    "Urbańska",
                    AccountType.STUDENT);
            student2.setPassword("12345");
            student2.setIndexNumber(123458);
            student2.setHeroType(HeroType.PRIEST);
            student2.setPoints(0D);

            User student3 = new User("pwasilewski@student.agh.edu.pl",
                    "Patryk",
                    "Wasilewski",
                    AccountType.STUDENT);
            student3.setPassword("12345");
            student3.setIndexNumber(123459);
            student3.setHeroType(HeroType.PRIEST);
            student3.setPoints(0D);

            User student4 = new User("awojcik@student.agh.edu.pl",
                    "Amelia",
                    "Wójcik",
                    AccountType.STUDENT);
            student4.setPassword("12345");
            student4.setIndexNumber(223456);
            student4.setHeroType(HeroType.WARRIOR);
            student4.setPoints(0D);

            User student5 = new User("kkruk@student.agh.edu.pl",
                    "Kornel",
                    "Kruk",
                    AccountType.STUDENT);
            student5.setPassword("12345");
            student5.setIndexNumber(323456);
            student5.setHeroType(HeroType.WARRIOR);
            student5.setPoints(0D);

            User student6 = new User("mdabrowska@student.agh.edu.pl",
                    "Maria",
                    "Dąbrowska",
                    AccountType.STUDENT);
            student6.setPassword("12345");
            student6.setIndexNumber(423456);
            student6.setHeroType(HeroType.WARRIOR);
            student6.setPoints(0D);

            User student7 = new User("aczajkowski@student.agh.edu.pl",
                    "Antoni",
                    "Czajkowski",
                    AccountType.STUDENT);
            student7.setPassword("12345");
            student7.setIndexNumber(523456);
            student7.setHeroType(HeroType.WIZARD);
            student7.setPoints(0D);

            User student8 = new User("mnowak@student.agh.edu.pl",
                    "Magdalena",
                    "Nowak",
                    AccountType.STUDENT);
            student8.setPassword("12345");
            student8.setIndexNumber(623456);
            student8.setHeroType(HeroType.WIZARD);
            student8.setPoints(0D);

            User student9 = new User("jlewandowska@student.agh.edu.pl",
                    "Julia",
                    "Lewandowska",
                    AccountType.STUDENT);
            student9.setPassword("12345");
            student9.setIndexNumber(723456);
            student9.setHeroType(HeroType.WIZARD);
            student9.setPoints(0D);

            User student10 = new User("mwojcik@student.agh.edu.pl",
                    "Milena",
                    "Wójcik",
                    AccountType.STUDENT);
            student10.setPassword("12345");
            student10.setIndexNumber(823456);
            student10.setHeroType(HeroType.WIZARD);
            student10.setPoints(0D);

            User student11 = new User("kpaluch@student.agh.edu.pl",
                    "Kacper",
                    "Paluch",
                    AccountType.STUDENT);
            student11.setPassword("12345");
            student11.setIndexNumber(923456);
            student11.setHeroType(HeroType.WIZARD);
            student11.setPoints(0D);

            User student12 = new User("fzalewski@student.agh.edu.pl",
                    "Filip",
                    "Zalewski",
                    AccountType.STUDENT);
            student12.setPassword("12345");
            student12.setIndexNumber(133456);
            student12.setHeroType(HeroType.WIZARD);
            student12.setPoints(0D);

            User student13 = new User("jmichalak@student.agh.edu.pl",
                    "Jan",
                    "Michalak",
                    AccountType.STUDENT);
            student13.setPassword("12345");
            student13.setIndexNumber(143456);
            student13.setHeroType(HeroType.WIZARD);
            student13.setPoints(0D);

            User student14 = new User("kostrowska@student.agh.edu.pl",
                    "Karina",
                    "Ostrowska",
                    AccountType.STUDENT);
            student14.setPassword("12345");
            student14.setIndexNumber(153456);
            student14.setHeroType(HeroType.ROGUE);
            student14.setPoints(0D);

            User student15 = new User("dkowalska@student.agh.edu.pl",
                    "Dominika",
                    "Kowalska",
                    AccountType.STUDENT);
            student15.setPassword("12345");
            student15.setIndexNumber(163456);
            student15.setHeroType(HeroType.ROGUE);
            student15.setPoints(0D);

            User student16 = new User("manowak@student.agh.edu.pl",
                    "Małgorzata Anna",
                    "Kowalska",
                    AccountType.STUDENT);
            student16.setPassword("12345");
            student16.setIndexNumber(163457);
            student16.setHeroType(HeroType.ROGUE);
            student16.setPoints(0D);

            User professor = new User("bmaj@agh.edu.pl",
                    "Bernard",
                    "Maj",
                    AccountType.PROFESSOR);
            professor.setPassword("12345");
            professor.setHeroType(HeroType.PRIEST);

            User professor1 = new User("szielinski@agh.edu.pl",
                    "Sławomir",
                    "Zieliński",
                    AccountType.PROFESSOR);
            professor1.setPassword("12345");
            professor1.setHeroType(HeroType.PRIEST);

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

            AccessDate ac1 = new AccessDate(null, System.currentTimeMillis(), System.currentTimeMillis(), List.of(group1));
            AccessDate ac2 = new AccessDate(null, System.currentTimeMillis(), System.currentTimeMillis(), List.of(group));
            accessDateService.saveAccessDate(ac1);
            accessDateService.saveAccessDate(ac2);

            GraphTask graphTask = new GraphTask();
            graphTask.setIsBlocked(false);
            graphTask.setQuestions(List.of(startQuestion, question1, question2, question3,  question4, question5));
            graphTask.setTitle("Dżungla kabli");
            graphTask.setDescription("Przebij się przez gąszcz pytań związanych z łączeniem urządzeń w lokalnej sieci i odkryj tajemnice łączenia bulbulatorów ze sobą!");
            graphTask.setRequiredKnowledge("skrętki, rodzaje ich ekranowania, łączenie urządzeń różnych warstw ze sobą");
            graphTask.setMaxPoints(60.0);
            graphTask.setExperience(20D);
            graphTask.setTimeToSolveMillis(12 * 60 * 1000L);
            graphTask.setRequirements(createDefaultRequirements());
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

            List<Requirement> graphTaskTwoReq = requirementService.getDefaultRequirements(true);

            GraphTask graphTaskTwo = new GraphTask();
            graphTaskTwo.setIsBlocked(false);
            graphTaskTwo.setQuestions(List.of(startQuestionTwo, questionTwo1, questionTwo2, questionTwo3,  questionTwo4, questionTwo5));
            graphTaskTwo.setTitle("Dżungla kabli II");
            graphTaskTwo.setDescription("Przebij się przez gąszcz pytań związanych z łączeniem urządzeń w lokalnej sieci i odkryj tajemnice łączenia bulbulatorów ze sobą!");
            graphTaskTwo.setRequiredKnowledge("skrętki, rodzaje ich ekranowania, łączenie urządzeń różnych warstw ze sobą");
            graphTaskTwo.setMaxPoints(60.0);
            graphTaskTwo.setExperience(25D);
            graphTaskTwo.setTimeToSolveMillis(12 * 60 * 1000L);
            graphTaskTwo.setPosX(2);
            graphTaskTwo.setPosY(2);
            graphTaskTwo.setRequirements(graphTaskTwoReq);

            graphTaskService.saveGraphTask(graphTaskTwo);

            FileTask fileTask = new FileTask();
            fileTask.setIsBlocked(false);
            fileTask.setPosX(3);
            fileTask.setPosY(3);
            fileTask.setTitle("Niszczator kabli");
            fileTask.setDescription("Jak złamałbyś kabel światłowodowy? Czym?");
            fileTask.setProfessor(professor);
            fileTask.setMaxPoints(30.0);
            fileTask.setExperience(10D);
            fileTask.setRequirements(createDefaultRequirements());

            fileTaskService.saveFileTask(fileTask);

            Info info1 = new Info();
            info1.setIsBlocked(false);
            info1.setPosX(3);
            info1.setPosY(0);
            info1.setTitle("Skrętki");
            info1.setDescription("Przewody internetowe da się podzielić także pod względem ich ekranowania.");
            info1.setContent(MessageManager.LOREM_IPSUM);
            info1.setRequirements(createDefaultRequirements());

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
            survey.setIsBlocked(false);
            survey.setTitle("Example map feedback");
            survey.setDescription("Pomóż nam polepszyć kurs dzieląc się swoją opinią!");
            survey.setPosX(7);
            survey.setPosY(3);
            survey.setPoints(10.0);
            survey.setExperience(5D);
            survey.setRequirements(createDefaultRequirements());
            surveyService.saveSurvey(survey);

            byte[] chapterImageBytes = getByteArrayForFile("src/main/resources/images/chapter_image.png", "png");
            Image chapterImage = new Image("Chapter image 1", chapterImageBytes, ImageType.CHAPTER);
            fileRepo.save(chapterImage);

            ActivityMap activityMap1 = new ActivityMap();
            activityMap1.setMapSizeX(8);
            activityMap1.setMapSizeY(5);
            activityMap1.setGraphTasks(List.of(graphTask, graphTaskTwo));
            activityMap1.setFileTasks(List.of(fileTask));
            activityMap1.setInfos(List.of(info1));
            activityMap1.setSurveys(List.of(survey));
            activityMap1.setImage(chapterImage);
            activityMapService.saveActivityMap(activityMap1);

            Calendar calendar = Calendar.getInstance();

            GraphTaskResult result1 = new GraphTaskResult();
            result1.setGraphTask(graphTask);
            result1.setUser(student);
            result1.setMaxPoints100(30.0);
            result1.setPointsReceived(12.0);
            addReceivedPointsForUser(student, result1.getPointsReceived());
            result1.setTimeSpentSec(60 * 10);
            calendar.set(2022, Calendar.APRIL, 28);
            result1.setStartDateMillis(calendar.getTimeInMillis());
            result1.setSendDateMillis(calendar.getTimeInMillis() + result1.getTimeSpentSec() / 1000);
            graphTaskResultService.saveGraphTaskResult(result1);

            GraphTaskResult result2 = new GraphTaskResult();
            result2.setGraphTask(graphTaskTwo);
            result2.setUser(student1);
            result2.setMaxPoints100(10.0);
            result2.setPointsReceived(10.0);
            addReceivedPointsForUser(student1, result2.getPointsReceived());
            result2.setTimeSpentSec(60 * 10);
            calendar.set(2022, Calendar.APRIL, 13);
            result2.setStartDateMillis(calendar.getTimeInMillis());
            result2.setSendDateMillis(calendar.getTimeInMillis() + result2.getTimeSpentSec() / 1000);
            graphTaskResultService.saveGraphTaskResult(result2);

            GraphTaskResult result3 = new GraphTaskResult();
            result3.setGraphTask(graphTaskTwo);
            result3.setUser(student8);
            result3.setMaxPoints100(20.0);
            result3.setPointsReceived(11.0);
            addReceivedPointsForUser(student8, result3.getPointsReceived());
            result3.setTimeSpentSec(60 * 10);
            calendar.set(2022, Calendar.APRIL, 14);
            result3.setStartDateMillis(calendar.getTimeInMillis());
            result3.setSendDateMillis(calendar.getTimeInMillis() + result2.getTimeSpentSec() / 1000);
            graphTaskResultService.saveGraphTaskResult(result3);

            GraphTaskResult result4 = new GraphTaskResult();
            result4.setGraphTask(graphTaskTwo);
            result4.setUser(student9);
            result4.setPointsReceived(30.5);
            addReceivedPointsForUser(student9, result4.getPointsReceived());
            result4.setTimeSpentSec(60 * 10);
            calendar.set(2022, Calendar.APRIL, 14);
            result4.setStartDateMillis(calendar.getTimeInMillis());
            result4.setSendDateMillis(calendar.getTimeInMillis() + result2.getTimeSpentSec() / 1000);
            graphTaskResultService.saveGraphTaskResult(result4);

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
            chapter.setPosX(2);
            chapter.setPosY(2);
            chapter.setActivityMap(activityMap1);
            chapter.setRequirements(requirementService.getDefaultRequirements(false));
            chapter.setIsBlocked(true);
            chapterRepo.save(chapter);

            calendar.set(2022, Calendar.JUNE, 15);
            AdditionalPoints additionalPoints = new AdditionalPoints();
            additionalPoints.setId(1L);
            additionalPoints.setUser(student);
            additionalPoints.setPointsReceived(100D);
            additionalPoints.setSendDateMillis(calendar.getTimeInMillis());
            additionalPoints.setProfessorEmail(professor.getEmail());
            additionalPoints.setDescription("Good job");
            addReceivedPointsForUser(student, additionalPoints.getPointsReceived());
            additionalPointsRepo.save(additionalPoints);

            SurveyResult surveyResult1 = new SurveyResult();
            surveyResult1.setSurvey(survey);
            surveyResult1.setId(1L);
            surveyResult1.setUser(student);
            surveyResult1.setPointsReceived(survey.getMaxPoints());
            addReceivedPointsForUser(student, surveyResult1.getPointsReceived());
            calendar.set(2022, Calendar.JUNE, 16);
            surveyResult1.setSendDateMillis(calendar.getTimeInMillis());
            surveyResultRepo.save(surveyResult1);

            SurveyResult surveyResult2 = new SurveyResult();
            surveyResult2.setSurvey(survey);
            surveyResult2.setId(2L);
            surveyResult2.setUser(student1);
            surveyResult2.setPointsReceived(survey.getMaxPoints());
            addReceivedPointsForUser(student1, surveyResult2.getPointsReceived());
            calendar.set(2022, Calendar.JUNE, 18);
            surveyResult2.setSendDateMillis(calendar.getTimeInMillis());
            surveyResultRepo.save(surveyResult2);

            SurveyResult surveyResult3 = new SurveyResult();
            surveyResult3.setSurvey(survey);
            surveyResult3.setId(3L);
            surveyResult3.setUser(student10);
            surveyResult3.setPointsReceived(survey.getMaxPoints());
            addReceivedPointsForUser(student10, surveyResult3.getPointsReceived());
            calendar.set(2022, Calendar.JUNE, 19);
            surveyResult3.setSendDateMillis(calendar.getTimeInMillis());
            surveyResultRepo.save(surveyResult3);

            File file = new File();
            fileRepo.save(file);


            byte[] chapterImageBytes2 = getByteArrayForFile("src/main/resources/images/chapter_image2.png", "png");
            Image chapterImage2 = new Image("Chapter image 2", chapterImageBytes2, ImageType.CHAPTER);
            fileRepo.save(chapterImage2);

            byte[] chapterImageBytes3 = getByteArrayForFile("src/main/resources/images/chapter_image3.png", "png");
            Image chapterImage3 = new Image("Chapter image 3", chapterImageBytes3, ImageType.CHAPTER);
            fileRepo.save(chapterImage3);

            byte[] chapterImageBytes4 = getByteArrayForFile("src/main/resources/images/chapter_image4.png", "png");
            Image chapterImage4 = new Image("Chapter image 4", chapterImageBytes4, ImageType.CHAPTER);
            fileRepo.save(chapterImage4);

            byte[] chapterImageBytes5 = getByteArrayForFile("src/main/resources/images/chapter_image5.png", "png");
            Image chapterImage5 = new Image("Chapter image 5", chapterImageBytes5, ImageType.CHAPTER);
            fileRepo.save(chapterImage5);

            userRepo.saveAll(students1);
            userRepo.saveAll(students2);

            initAllRanks();
            initBadges();
        };
    }

    private List<Requirement> createDefaultRequirements() {
        DateFromRequirement dateFromRequirement = new DateFromRequirement(
                MessageManager.DATE_FROM_REQ_NAME,
                false,
                null
        );
        DateToRequirement dateToRequirement = new DateToRequirement(
                MessageManager.DATE_TO_REQ_NAME,
                false,
                null
        );
        FileTasksRequirement fileTasksRequirement = new FileTasksRequirement(
                MessageManager.FILE_TASKS_REQ_NAME,
                false,
                new LinkedList<>()
        );
        GraphTasksRequirement graphTasksRequirement = new GraphTasksRequirement(
                MessageManager.GRAPH_TASKS_REQ_NAME,
                false,
                new LinkedList<>()
        );
        GroupsRequirement groupsRequirement = new GroupsRequirement(
                MessageManager.GROUPS_REQ_NAME,
                false,
                new LinkedList<>()
        );
        MinPointsRequirement minPointsRequirement = new MinPointsRequirement(
                MessageManager.MIN_POINTS_REQ_NAME,
                false,
                null
        );
        StudentsRequirements studentsRequirements = new StudentsRequirements(
                MessageManager.STUDENTS_REQ_NAME,
                false,
                new LinkedList<>()
        );
        List<Requirement> requirements = List.of(
                dateFromRequirement,
                dateToRequirement,
                minPointsRequirement,
                groupsRequirement,
                studentsRequirements,
                graphTasksRequirement,
                fileTasksRequirement
        );

        requirementRepo.saveAll(requirements);
        return requirements;
    }

    private void initAllRanks() throws IOException {
        byte[] warriorImageBytes1 = getByteArrayForFile("src/main/resources/images/warrior1.png", "png");
        Image warriorImage1 = new Image("Warrior rank image 1", warriorImageBytes1, ImageType.RANK);
        fileRepo.save(warriorImage1);

        byte[] warriorImageBytes2 = getByteArrayForFile("src/main/resources/images/warrior.png", "png");
        Image warriorImage2 = new Image("Warrior rank image 2", warriorImageBytes2, ImageType.RANK);
        fileRepo.save(warriorImage2);

        byte[] warriorImageBytes3 = getByteArrayForFile("src/main/resources/images/swordsman.png", "png");
        Image warriorImage3 = new Image("Warrior rank image 3", warriorImageBytes3, ImageType.RANK);
        fileRepo.save(warriorImage3);

        byte[] warriorImageBytes4 = getByteArrayForFile("src/main/resources/images/knight.png", "png");
        Image warriorImage4 = new Image("Warrior rank image 4", warriorImageBytes4, ImageType.RANK);
        fileRepo.save(warriorImage4);

        byte[] warriorImageBytes5 = getByteArrayForFile("src/main/resources/images/knightHorse.png", "png");
        Image warriorImage5 = new Image("Warrior rank image 5", warriorImageBytes5, ImageType.RANK);
        fileRepo.save(warriorImage5);

        byte[] wizardImageBytes1 = getByteArrayForFile("src/main/resources/images/wizard1.png", "png");
        Image wizardImage1 = new Image("Wizard rank image 1", wizardImageBytes1, ImageType.RANK);
        fileRepo.save(wizardImage1);

        byte[] wizardImageBytes2 = getByteArrayForFile("src/main/resources/images/wizard2.png", "png");
        Image wizardImage2 = new Image("Wizard rank image 2", wizardImageBytes2, ImageType.RANK);
        fileRepo.save(wizardImage2);

        byte[] wizardImageBytes3 = getByteArrayForFile("src/main/resources/images/wizard3.png", "png");
        Image wizardImage3 = new Image("Wizard rank image 3", wizardImageBytes3, ImageType.RANK);
        fileRepo.save(wizardImage3);

        byte[] wizardImageBytes4 = getByteArrayForFile("src/main/resources/images/wizard4.png", "png");
        Image wizardImage4 = new Image("Wizard rank image 4", wizardImageBytes4, ImageType.RANK);
        fileRepo.save(wizardImage4);

        byte[] wizardImageBytes5 = getByteArrayForFile("src/main/resources/images/wizard5.png", "png");
        Image wizardImage5 = new Image("Wizard rank image 5", wizardImageBytes5, ImageType.RANK);
        fileRepo.save(wizardImage5);

        byte[] priestImageBytes1 = getByteArrayForFile("src/main/resources/images/priest1.png", "png");
        Image priestImage1 = new Image("Priest rank image 1", priestImageBytes1, ImageType.RANK);
        fileRepo.save(priestImage1);

        byte[] priestImageBytes2 = getByteArrayForFile("src/main/resources/images/priest2.png", "png");
        Image priestImage2 = new Image("Priest rank image 2", priestImageBytes2, ImageType.RANK);
        fileRepo.save(priestImage2);

        byte[] priestImageBytes3 = getByteArrayForFile("src/main/resources/images/priest3.png", "png");
        Image priestImage3 = new Image("Priest rank image 3", priestImageBytes3, ImageType.RANK);
        fileRepo.save(priestImage3);

        byte[] priestImageBytes4 = getByteArrayForFile("src/main/resources/images/priest4.png", "png");
        Image priestImage4 = new Image("Priest rank image 4", priestImageBytes4, ImageType.RANK);
        fileRepo.save(priestImage4);

        byte[] priestImageBytes5 = getByteArrayForFile("src/main/resources/images/priest5.png", "png");
        Image priestImage5 = new Image("Priest rank image 5", priestImageBytes5, ImageType.RANK);
        fileRepo.save(priestImage5);

        byte[] rogueImageBytes1 = getByteArrayForFile("src/main/resources/images/rogue1.png", "png");
        Image rogueImage1 = new Image("Rogue rank image 1", rogueImageBytes1, ImageType.RANK);
        fileRepo.save(rogueImage1);

        byte[] rogueImageBytes2 = getByteArrayForFile("src/main/resources/images/rogue2.png", "png");
        Image rogueImage2 = new Image("Rogue rank image 2", rogueImageBytes2, ImageType.RANK);
        fileRepo.save(rogueImage2);

        byte[] rogueImageBytes3 = getByteArrayForFile("src/main/resources/images/rogue3.png", "png");
        Image rogueImage3 = new Image("Rogue rank image 3", rogueImageBytes3, ImageType.RANK);
        fileRepo.save(rogueImage3);

        byte[] rogueImageBytes4 = getByteArrayForFile("src/main/resources/images/rogue4.png", "png");
        Image rogueImage4 = new Image("Rogue rank image 4", rogueImageBytes4, ImageType.RANK);
        fileRepo.save(rogueImage4);

        byte[] rogueImageBytes5 = getByteArrayForFile("src/main/resources/images/rogue5.png", "png");
        Image rogueImage5 = new Image("Rogue rank image 5", rogueImageBytes5, ImageType.RANK);
        fileRepo.save(rogueImage5);

        Rank warriorRank1 = new Rank(null, HeroType.WARRIOR, "Chłop", 0.0, warriorImage1);
        Rank warriorRank2 = new Rank(null, HeroType.WARRIOR, "Giermek", 100.0, warriorImage2);
        Rank warriorRank3 = new Rank(null, HeroType.WARRIOR, "Wojownik", 200.0, warriorImage3);
        Rank warriorRank4 = new Rank(null, HeroType.WARRIOR, "Rycerz", 300.0, warriorImage4);
        Rank warriorRank5 = new Rank(null, HeroType.WARRIOR, "Paladyn", 400.0, warriorImage5);

        Rank wizardRank1 = new Rank(null, HeroType.WIZARD, "Adept magii", 0.0, wizardImage1);
        Rank wizardRank2 = new Rank(null, HeroType.WIZARD, "Początkujący czarnoksiężnik", 100.0, wizardImage2);
        Rank wizardRank3 = new Rank(null, HeroType.WIZARD, "Czarnoksiężnik", 200.0, wizardImage3);
        Rank wizardRank4 = new Rank(null, HeroType.WIZARD, "Mistrz magii", 300.0,wizardImage4);
        Rank wizardRank5 = new Rank(null, HeroType.WIZARD, "Arcymistrz magii", 400.0, wizardImage5);

        Rank priestRank1 = new Rank(null, HeroType.PRIEST, "Duchowny", 0.0, priestImage1);
        Rank priestRank2 = new Rank(null, HeroType.PRIEST, "Mnich", 100.0, priestImage2);
        Rank priestRank3 = new Rank(null, HeroType.PRIEST, "Inkwizytor", 200.0, priestImage3);
        Rank priestRank4 = new Rank(null, HeroType.PRIEST, "Kapłan", 300.0, priestImage4);
        Rank priestRank5 = new Rank(null, HeroType.PRIEST, "Arcykapłan", 400.0, priestImage5);

        Rank rogueRank1 = new Rank(null, HeroType.ROGUE, "Złodziej", 0.0, rogueImage1);
        Rank rogueRank2 = new Rank(null, HeroType.ROGUE, "Zwiadowca", 100.0, rogueImage2);
        Rank rogueRank3 = new Rank(null, HeroType.ROGUE, "Zabójca", 200.0, rogueImage3);
        Rank rogueRank4 = new Rank(null, HeroType.ROGUE, "Skrytobójca", 300.0, rogueImage4);
        Rank rogueRank5 = new Rank(null, HeroType.ROGUE, "Przywódca bractwa", 400.0, rogueImage5);

        rankRepo.saveAll(List.of(warriorRank1, warriorRank2, warriorRank3, warriorRank4, warriorRank5));
        rankRepo.saveAll(List.of(wizardRank1, wizardRank2, wizardRank3, wizardRank4, wizardRank5));
        rankRepo.saveAll(List.of(priestRank1, priestRank2, priestRank3, priestRank4, priestRank5));
        rankRepo.saveAll(List.of(rogueRank1, rogueRank2, rogueRank3, rogueRank4, rogueRank5));
    }

    private byte[] getByteArrayForFile(String path, String format) throws IOException {
        BufferedImage bufferedImage = ImageIO.read(new java.io.File(path));
        ByteArrayOutputStream output = new ByteArrayOutputStream();
        ImageIO.write(bufferedImage, "png", output);
        return output.toByteArray();
    }

    private void initBadges() throws IOException {
        Image activityMaster = new Image("Badge", getByteArrayForFile("src/main/resources/images/badge/activity_master.png", "png"), ImageType.BADGE);
        Image activityExperienced = new Image("Badge", getByteArrayForFile("src/main/resources/images/badge/activity_experienced.png", "png"), ImageType.BADGE);
        Image fileTaskExperienced = new Image("Badge", getByteArrayForFile("src/main/resources/images/badge/file_task_experienced.png", "png"), ImageType.BADGE);
        Image fileTaskFirstSteps = new Image("Badge", getByteArrayForFile("src/main/resources/images/badge/file_task_first_steps.png", "png"), ImageType.BADGE);
        Image fileTaskMaster = new Image("Badge", getByteArrayForFile("src/main/resources/images/badge/file_task_master.png", "png"), ImageType.BADGE);
        Image topFive = new Image("Badge", getByteArrayForFile("src/main/resources/images/badge/five.png", "png"), ImageType.BADGE);
        Image graphTaskExperienced = new Image("Badge", getByteArrayForFile("src/main/resources/images/badge/graph_task_experienced.png", "png"), ImageType.BADGE);
        Image graphTaskFirstSteps = new Image("Badge", getByteArrayForFile("src/main/resources/images/badge/graph_task_first_steps.png", "png"), ImageType.BADGE);
        Image graphTaskMaster = new Image("Badge", getByteArrayForFile("src/main/resources/images/badge/graph_task_master.png", "png"), ImageType.BADGE);
        Image groupLeader = new Image("Badge", getByteArrayForFile("src/main/resources/images/badge/group_leader.png", "png"), ImageType.BADGE);
        Image handshake = new Image("Badge", getByteArrayForFile("src/main/resources/images/badge/handshake.png", "png"), ImageType.BADGE);
        Image inTheMiddle = new Image("Badge", getByteArrayForFile("src/main/resources/images/badge/in_the_middle.png", "png"), ImageType.BADGE);
        Image itsTheBeginning = new Image("Badge", getByteArrayForFile("src/main/resources/images/badge/its_the_beginning.png", "png"), ImageType.BADGE);
        Image leader = new Image("Badge", getByteArrayForFile("src/main/resources/images/badge/leader.png", "png"), ImageType.BADGE);
        Image longA = new Image("Badge", getByteArrayForFile("src/main/resources/images/badge/long.png", "png"), ImageType.BADGE);
        Image lookingUp = new Image("Badge", getByteArrayForFile("src/main/resources/images/badge/looking_up.png", "png"), ImageType.BADGE);
        Image smileFromProfessor = new Image("Badge", getByteArrayForFile("src/main/resources/images/badge/smile.png", "png"), ImageType.BADGE);
        Image theEnd = new Image("Badge", getByteArrayForFile("src/main/resources/images/badge/the_end.png", "png"), ImageType.BADGE);
        Image topTwenty = new Image("Badge", getByteArrayForFile("src/main/resources/images/badge/twenty.png", "png"), ImageType.BADGE);

        fileRepo.saveAll(List.of(activityMaster, activityExperienced, fileTaskExperienced,fileTaskFirstSteps,
                fileTaskMaster,topFive,graphTaskExperienced,graphTaskFirstSteps,graphTaskMaster,groupLeader
                ,handshake,inTheMiddle,itsTheBeginning,leader,longA,lookingUp, smileFromProfessor, theEnd, topTwenty));

        Badge badge1 = new ConsistencyBadge(
                null,
                "To dopiero początek",
                "Wykonaj co najmniej jedną aktywność w przeciągu tygodnia od poprzedniej aktywności (7 dni) przez okres miesiąca",
                itsTheBeginning,
                4
        );

        Badge badge2 = new ConsistencyBadge(
                null,
                "Długo jeszcze?",
                "Wykonaj co najmniej jedną aktywność w przeciągu tygodnia od poprzedniej aktywności (7 dni) przez okres 3 miesięcy",
                longA,
                12
        );

        Badge badge3 = new ConsistencyBadge(
                null,
                "To już jest koniec, ale czy na pewno?",
                "Wykonaj co najmniej jedną aktywność w przeciągu tygodnia od poprzedniej aktywności (7 dni) przez okres 6 mięsięcy",
                theEnd,
                24
        );

        Badge badge4 = new TopScoreBadge(
                null,
                "Topowowa dwudziestka",
                "Bądź w 20% najepszych użytkowników (liczone po wykonaniu 5 ekspedycji lub zadań bojowych)",
                topTwenty,
                0.2,
                false
        );


        Badge badge5 = new TopScoreBadge(
                null,
                "Topowa piątka",
                "Bądź w 5% najepszych użytkowników (liczone po wykonaniu 5 ekspedycji lub zadań bojowych)",
                topFive,
                0.05,
                false
        );

        Badge badge6 = new TopScoreBadge(
                null,
                "Lider grupy",
                "Bądź najepszym użytkownikiem w swojej grupie (liczone po wykonaniu 5 ekspedycji lub zadań bojowych)",
                groupLeader,
                0.0,
                true
        );

        Badge badge7 = new TopScoreBadge(
                null,
                "Lider",
                "Bądź najepszym użytkownikiem (liczone po wykonaniu 5 ekspedycji lub zadań bojowych)",
                leader,
                0.0,
                false
        );


        Badge badge8 = new GraphTaskNumberBadge(
                null,
                "Pierwsze kroki w ekspedycji",
                "Wykonaj swoją pierwszą ekspedycję",
                graphTaskFirstSteps,
                1
        );

        Badge badge9 = new GraphTaskNumberBadge(
                null,
                "Doświadczony w ekspedycjach",
                "Wykonaj 10 ekspedycji",
                graphTaskExperienced,
                10
        );

        Badge badge10 = new GraphTaskNumberBadge(
                null,
                "Zaprawiony w ekspedycjach",
                "Wykonaj 50 ekspedycji",
                graphTaskMaster,
                50
        );

        Badge badge11 = new FileTaskNumberBadge(
                null,
                "Pierwsze kroki w zadaniu bojowym",
                "Wykonaj swoje pierwsze zadanie bojowe",
                fileTaskFirstSteps,
                1
        );

        Badge badge12 = new FileTaskNumberBadge(
                null,
                "Doświadczony w zadaniach bojowych",
                "Wykonaj 10 zadań bojowych",
                fileTaskExperienced,
                10
        );

        Badge badge13 = new FileTaskNumberBadge(
                null,
                "Zaprawiony w zadaniach bojowych",
                "Wykonaj 50 zadań bojowych",
                fileTaskMaster,
                50
        );

        Badge badge14 = new ActivityNumberBadge(
                null,
                "Doświadczony w aktywnościach",
                "Wykonaj 30 aktywności",
                activityExperienced,
                30
        );

        Badge badge15 = new ActivityNumberBadge(
                null,
                "Zaprawiony w aktywnościach",
                "Wykonaj 100 aktywności",
                activityMaster,
                100
        );

        Badge badge16 = new ActivityScoreBadge(
                null,
                "Marsz ku lepszemu",
                "Posiadaj ponad 60% ze wszystkich punktów z ekspedycji oraz zadań bojowych",
                lookingUp,
                0.6
        );

        Badge badge17 = new ActivityScoreBadge(
                null,
                "Uśmiech prowadzącego",
                "Posiadaj ponad 80% ze wszystkich punktów z ekspedycji oraz zadań bojowych",
                smileFromProfessor,
                0.8
        );

        Badge badge18 = new ActivityScoreBadge(
                null,
                "Uścisk dłoni prowadzącego",
                "Posiadaj ponad 95% ze wszystkich punktów z ekspedycji oraz zadań bojowych",
                handshake,
                0.95
        );

        Badge badge19 = new ActivityScoreBadge(
                null,
                "W sam środek tarczy",
                "Posiadaj 100% z ekspedycji lub zadania bojowego",
                inTheMiddle,
                1.0
        );

        badgeRepo.saveAll(List.of(badge1, badge2, badge3, badge4, badge5, badge6, badge7, badge8, badge9, badge10,
                badge11, badge12, badge13, badge14, badge15, badge16, badge17, badge18, badge19));
    }

    private void addReceivedPointsForUser(User student, Double points){
        student.setPoints(student.getPoints() + points);
    }
}
