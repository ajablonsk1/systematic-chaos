package com.example.api.service.activity.result;

import com.example.api.dto.response.activity.task.result.summary.*;
import com.example.api.dto.response.activity.task.result.summary.util.AverageGradeForChapterCreator;
import com.example.api.dto.response.activity.task.result.summary.util.ScoreCreator;
import com.example.api.error.exception.WrongUserTypeException;
import com.example.api.model.activity.result.FileTaskResult;
import com.example.api.model.activity.result.GraphTaskResult;
import com.example.api.model.activity.result.SurveyResult;
import com.example.api.model.activity.result.TaskResult;
import com.example.api.model.activity.task.*;
import com.example.api.model.group.Group;
import com.example.api.model.map.Chapter;
import com.example.api.model.user.User;
import com.example.api.repo.activity.result.FileTaskResultRepo;
import com.example.api.repo.activity.result.GraphTaskResultRepo;
import com.example.api.repo.activity.result.SurveyResultRepo;
import com.example.api.repo.activity.task.FileTaskRepo;
import com.example.api.repo.activity.task.GraphTaskRepo;
import com.example.api.repo.activity.task.SurveyRepo;
import com.example.api.repo.group.GroupRepo;
import com.example.api.repo.map.ChapterRepo;
import com.example.api.repo.user.UserRepo;
import com.example.api.security.AuthenticationService;
import com.example.api.service.validator.UserValidator;
import com.example.api.util.csv.PointsToGradeMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Collection;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicReference;
import java.util.stream.DoubleStream;
import java.util.stream.Stream;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class SummaryService {
    private final AuthenticationService authService;
    private final UserRepo userRepo;
    private final UserValidator userValidator;
    private final GroupRepo groupRepo;
    private final GraphTaskRepo graphTaskRepo;
    private final GraphTaskResultRepo graphTaskResultRepo;
    private final FileTaskRepo fileTaskRepo;
    private final FileTaskResultRepo fileTaskResultRepo;
    private final SurveyRepo surveyRepo;
    private final SurveyResultRepo surveyResultRepo;
    private final ChapterRepo chapterRepo;
    private final PointsToGradeMapper pointsToGradeMapper;

    public SummaryResponse getSummary() throws WrongUserTypeException {
        String professorEmail = authService.getAuthentication().getName();
        User professor = userRepo.findUserByEmail(professorEmail);
        userValidator.validateProfessorAccount(professor, professorEmail);
        log.info("Fetching summary for professor {}", professorEmail);

        List<AverageGrade> avgGradesList = getAvgGradesList(professor);
        List<AverageActivityScore> avgActivitiesScore = getAvgActivitiesScore(professor);
        List<NotAssessedActivity> notAssessedActivitiesTable = getNotAssessedActivitiesTable(professor);

        Double avgGrade = getAvgGrade(avgGradesList);
        String bestScoreActivityName = getBestScoreActivityName(avgActivitiesScore);
        String worstScoreActivityName = getWorstScoreActivityName(avgActivitiesScore);

        Integer assessedActivitiesCounter = getAssessedActivitiesCounter(professor, notAssessedActivitiesTable);
        Integer notAssessedActivityCounter = getNotAssessedActivitiesCounter(notAssessedActivitiesTable);
        Integer waitingAnswersNumber = getWaitingAnswersNumber(notAssessedActivitiesTable);

        SummaryResponse summaryResponse = new SummaryResponse();
        summaryResponse.setAvgGrade(avgGrade);
        summaryResponse.setBestScoreActivityName(bestScoreActivityName);
        summaryResponse.setWorstScoreActivityName(worstScoreActivityName);
        summaryResponse.setAssessedActivityCounter(assessedActivitiesCounter);
        summaryResponse.setNotAssessedActivityCounter(notAssessedActivityCounter);
        summaryResponse.setWaitingAnswersNumber(waitingAnswersNumber);
        summaryResponse.setAvgGradesList(avgGradesList);
        summaryResponse.setAvgActivitiesScore(avgActivitiesScore);
        summaryResponse.setNotAssessedActivitiesTable(notAssessedActivitiesTable);
        return summaryResponse;

    }

    public DoubleStream flatMapAvgGradesList(List<AverageGrade> avgGradesList) {
        return avgGradesList
                .stream()
                .map(AverageGrade::getAvgGradesForChapter)
                .flatMap(Collection::stream)
                .mapToDouble(AverageGradeForChapter::getAvgGrade);
    }

    public Double getAvgGrade(List<AverageGrade> avgGradesList) {
        if (avgGradesList.size() == 0) return null;
        Double grade = flatMapAvgGradesList(avgGradesList)
                .average().getAsDouble();
        return round(grade);
    }

    public List<ActivityScore> flatMapAvgActivitiesScore(List<AverageActivityScore> avgActivitiesScore) {
        return avgActivitiesScore
                .stream()
                .map(AverageActivityScore::getActivitiesScore)
                .flatMap(Collection::stream)
                .toList();
    }

    public String getBestScoreActivityName(List<AverageActivityScore> avgActivitiesScore) {
        Optional<ActivityScore> result = flatMapAvgActivitiesScore(avgActivitiesScore)
                .stream()
                .filter(Objects::nonNull)
                .reduce(((activityScore1, activityScore2) ->
                        activityScore1.getAvgScore() > activityScore2.getAvgScore() ? activityScore1 : activityScore2
                ));
        if (result.isEmpty()) return null;
        return result.get().getActivityName();
    }

    public String getWorstScoreActivityName(List<AverageActivityScore> avgActivitiesScore) {
        Optional<ActivityScore> result = flatMapAvgActivitiesScore(avgActivitiesScore)
                .stream()
                .filter(Objects::nonNull)
                .reduce(((activityScore1, activityScore2) ->
                        activityScore1.getAvgScore() < activityScore2.getAvgScore() ? activityScore1 : activityScore2
                ));
        if (result.isEmpty()) return null;
        return result.get().getActivityName();
    }

    public Integer getAssessedActivitiesCounter(User professor, List<NotAssessedActivity> notAssessedActivitiesTable) {
        return getAllProfessorActivities(professor).size() - notAssessedActivitiesTable.size();
    }


    public Integer getNotAssessedActivitiesCounter(List<NotAssessedActivity> notAssessedActivitiesTable) {
        return notAssessedActivitiesTable.size();
    }

    public Integer getWaitingAnswersNumber(List<NotAssessedActivity> notAssessedActivitiesTable) {
        if (notAssessedActivitiesTable.size() == 0) return 0;
        return notAssessedActivitiesTable
                .stream()
                .mapToInt(NotAssessedActivity::getWaitingAnswersNumber)
                .sum();
    }

    /////////////////////////////
    // avgGradesList
    /////////////////////////////
    private List<AverageGrade> getAvgGradesList(User professor) {
        return chapterRepo.findAll()
                .stream()
                .map(chapter -> toAverageGrade(chapter, professor))
                .toList();
    }

    private AverageGrade toAverageGrade(Chapter chapter, User professor) {
        AverageGrade averageGrade = new AverageGrade(chapter);
        averageGrade.setAvgGradesForChapter(getAvgGradesForChapter(chapter, professor));
        return averageGrade;
    }

    private List<AverageGradeForChapter> getAvgGradesForChapter(Chapter chapter, User professor) {
        return groupRepo.findAll()
                .stream()
                .map(group -> toAvgGradeForChapter(chapter, group, professor))
                .toList();
    }

    private AverageGradeForChapter toAvgGradeForChapter(Chapter chapter, Group group, User professor) {
        AverageGradeForChapterCreator averageGradeForChapterCreator = new AverageGradeForChapterCreator(group);
        AtomicReference<AverageGradeForChapterCreator> avgGradeForChapterCreator =
                new AtomicReference<AverageGradeForChapterCreator>(averageGradeForChapterCreator);
        getAllProfessorChapterActivitiesResult(chapter, professor)
                .stream()
                .filter(this::isActivityEvaluated)
                .filter(taskResult -> taskResult.getUser().getGroup().equals(group))
                .forEach(taskResult -> avgGradeForChapterCreator.get().add(pointsToGradeMapper.getGrade(taskResult)));
        return avgGradeForChapterCreator.get().create(); // it will return entities with no results from group
    }

    /////////////////////////////
    // avgActivitiesScore
    /////////////////////////////
    private List<AverageActivityScore> getAvgActivitiesScore(User professor) {
        return chapterRepo.findAll()
                .stream()
                .map(chapter -> toAvgActivityScore(chapter, professor))
                .toList();
    }

    private AverageActivityScore toAvgActivityScore(Chapter chapter, User professor) {
        AverageActivityScore avgActivityScore = new AverageActivityScore();
        avgActivityScore.setChapterName(chapter.getName());
        avgActivityScore.setActivitiesScore(getActivitiesScore(chapter, professor));
        return avgActivityScore;
    }

    private List<ActivityScore> getActivitiesScore(Chapter chapter, User professor) {
        return getAllProfessorChapterActivities(chapter, professor)
                .stream()
                .map(this::toActivityScore)
                .filter(Objects::nonNull)
                .toList();
    }

    private ActivityScore toActivityScore(Activity activity) {
        ActivityScore activityScore = new ActivityScore();
        activityScore.setActivityName(activity.getTitle());
        activityScore.setScores(getScores(activity));

        if (activityScore.getScores().size() == 0) return null;

        Double avgScore = activityScore.getScores()
                .stream()
                .mapToDouble(Score::getScore)
                .average().getAsDouble();

        activityScore.setAvgScore(round(avgScore));
        return activityScore;
    }

    private List<Score> getScores(Activity activity) {
        return groupRepo.findAll()
                .stream()
                .map(group -> toScore(activity, group))
                .filter(Objects::nonNull)
                .toList();
    }

    private Score toScore(Activity activity, Group group) {
        ScoreCreator scoreCreator = new ScoreCreator(group.getName(), getMaxPoints(activity));
        AtomicReference<ScoreCreator> scoreRef = new AtomicReference<>(scoreCreator);
        getAllResultsForActivity(activity)
                .stream()
                .filter(this::isActivityEvaluated)
                .filter(taskResult -> taskResult.getUser().getGroup().equals(group))
                .forEach(taskResult -> scoreRef.get().add(taskResult));
        return scoreRef.get().getNumberOfScores() > 0 ? scoreRef.get().create() : null;
    }



    /////////////////////////////
    // notAssessedActivitiesTable
    /////////////////////////////
    private List<NotAssessedActivity> getNotAssessedActivitiesTable(User professor) {
        return getAllProfessorActivities(professor)
                .stream()
                .map(this::toNotAssessedActivity)
                .filter(notAssessedActivity -> notAssessedActivity.getWaitingAnswersNumber() > 0) // only activities with left answers
                .toList();

    }

    private NotAssessedActivity toNotAssessedActivity(Activity activity) {
        NotAssessedActivity notAssessedActivity = new NotAssessedActivity(activity);
        if (activity instanceof GraphTask) {
            graphTaskResultRepo.findAllByGraphTask((GraphTask) activity)
                    .forEach(notAssessedActivity::add);
        }
        else if (activity instanceof FileTask) {
            fileTaskResultRepo.findAllByFileTask((FileTask) activity)
                    .forEach(notAssessedActivity::add);
        }
        else if (activity instanceof Survey) {
            surveyResultRepo.findAllBySurvey((Survey) activity)
                    .forEach(notAssessedActivity::add);
        }
        return notAssessedActivity;
    }


    /////////////////////////////
    // help methods
    /////////////////////////////
    private List<? extends Activity> getAllActivities() { // without Info
        List<GraphTask> graphTasks = graphTaskRepo.findAll();
        List<FileTask> fileTasks = fileTaskRepo.findAll();
        List<Survey> surveys = surveyRepo.findAll();


        return Stream.of(graphTasks, fileTasks, surveys)
                .flatMap(Collection::stream)
                .toList();
    }

    private List<? extends Activity> getAllProfessorActivities(User professor) { // without Info
        return getAllActivities()
                .stream()
                .filter(activity -> isProfessorActivity(activity, professor))
                .toList();
    }

    private List<? extends Activity> getAllChapterActivities(Chapter chapter) { // without Info
        return getAllActivities()
                .stream()
                .filter(activity -> isActivityInChapter(activity, chapter))
                .toList();
    }

    private List<? extends Activity> getAllProfessorChapterActivities(Chapter chapter, User professor) { // without Info
        return getAllActivities()
                .stream()
                .filter(activity -> isActivityInChapter(activity, chapter))
                .filter(activity -> isActivityInChapter(activity, chapter))
                .toList();
    }

    private List<? extends TaskResult> getAllResultsForActivity(Activity activity) {
        if (activity instanceof GraphTask) {
            return graphTaskResultRepo.findAllByGraphTask((GraphTask) activity);
        }
        else if (activity instanceof FileTask) {
            return fileTaskResultRepo.findAllByFileTask((FileTask) activity);
        }
        return surveyResultRepo.findAllBySurvey((Survey) activity);
    }

    private List<? extends TaskResult> getAllProfessorChapterActivitiesResult(Chapter chapter, User professor) {
        return getAllProfessorChapterActivities(chapter, professor)
                .stream()
                .map(this::getAllResultsForActivity)
                .flatMap(Collection::stream)
                .toList();
    }

    private boolean isActivityInChapter(Activity activity, Chapter chapter) {
        if (activity instanceof GraphTask) {
            return chapter.getActivityMap().getGraphTasks().contains((GraphTask) activity);
        }
        else if (activity instanceof FileTask) {
            return chapter.getActivityMap().getFileTasks().contains((FileTask) activity);
        }
        else if (activity instanceof Survey) {
            return chapter.getActivityMap().getSurveys().contains((Survey) activity);
        }
        return false;
    }

    private boolean isActivityEvaluated(TaskResult taskResult) {
        if (taskResult instanceof GraphTaskResult) {
            return ((GraphTaskResult) taskResult).getPointsReceived() != null;
        }
        else if (taskResult instanceof FileTaskResult) {
            return ((FileTaskResult) taskResult).isEvaluated();
        }
        else if (taskResult instanceof SurveyResult) {
            return ((SurveyResult) taskResult).getPointsReceived() != null;
        }
        return false;
    }

    public Double getMaxPoints(Activity activity) {
        if (activity instanceof Task) {
            return ((Task) activity).getMaxPoints();
        }
        else if (activity instanceof Survey) {
            return ((Survey) activity).getPoints();
        }
        return null;
    }

    private boolean isProfessorActivity(Activity activity, User professor) {
        return activity.getProfessor() == null || activity.getProfessor().equals(professor); // assumption that when activity has no professor it means it is everyones

    }

    private Double round(Double score) {
        return Math.round(score * 10.0) / 10.0;
    }

}
