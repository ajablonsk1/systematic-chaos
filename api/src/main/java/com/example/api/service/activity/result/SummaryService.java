package com.example.api.service.activity.result;

import com.example.api.dto.response.activity.task.result.summary.AverageGrade;
import com.example.api.dto.response.activity.task.result.summary.AverageGradeForChapter;
import com.example.api.dto.response.activity.task.result.summary.NotAssessedActivity;
import com.example.api.dto.response.activity.task.result.summary.SummaryResponse;
import com.example.api.dto.response.activity.task.result.summary.util.AverageGradeForChapterCreator;
import com.example.api.error.exception.WrongUserTypeException;
import com.example.api.model.activity.result.FileTaskResult;
import com.example.api.model.activity.result.GraphTaskResult;
import com.example.api.model.activity.result.SurveyResult;
import com.example.api.model.activity.result.TaskResult;
import com.example.api.model.activity.task.Activity;
import com.example.api.model.activity.task.FileTask;
import com.example.api.model.activity.task.GraphTask;
import com.example.api.model.activity.task.Survey;
import com.example.api.model.group.Group;
import com.example.api.model.map.Chapter;
import com.example.api.model.user.User;
import com.example.api.repo.activity.result.FileTaskResultRepo;
import com.example.api.repo.activity.result.GraphTaskResultRepo;
import com.example.api.repo.activity.result.SurveyResultRepo;
import com.example.api.repo.activity.task.FileTaskRepo;
import com.example.api.repo.activity.task.GraphTaskRepo;
import com.example.api.repo.activity.task.SurveyRepo;
import com.example.api.repo.map.ChapterRepo;
import com.example.api.repo.user.UserRepo;
import com.example.api.security.AuthenticationService;
import com.example.api.service.validator.UserValidator;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.stream.Stream;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class SummaryService {
    private AuthenticationService authService;
    private UserRepo userRepo;
    private UserValidator userValidator;
    private GraphTaskRepo graphTaskRepo;
    private GraphTaskResultRepo graphTaskResultRepo;
    private FileTaskRepo fileTaskRepo;
    private FileTaskResultRepo fileTaskResultRepo;
    private SurveyRepo surveyRepo;
    private SurveyResultRepo surveyResultRepo;
    private ChapterRepo chapterRepo;

    public SummaryResponse getSummary() throws WrongUserTypeException {
        String professorEmail = authService.getAuthentication().getName();
        User professor = userRepo.findUserByEmail(professorEmail);
        userValidator.validateProfessorAccount(professor, professorEmail);

        List<NotAssessedActivity> notAssessedActivitiesTable = getNotAssessedActivitiesTable(professor);

        return null;
    }

    /////////////////////////////
    // avgGradesList
    /////////////////////////////
    private List<AverageGrade> getAvgGradesList(User professor) {
        return chapterRepo.findAll()
                .stream()
                .map(this::toAverageGrade)
                .toList();
    }

    private AverageGrade toAverageGrade(Chapter chapter) {
        AverageGrade averageGrade = new AverageGrade(chapter);
        averageGrade.setAvgGradesForChapter(getAvgGradesForChapter(chapter));
        return averageGrade;
    }

    private List<AverageGradeForChapter> getAvgGradesForChapter(Chapter chapter) {
        HashMap<Group, AverageGradeForChapterCreator> avgGradesForChapter = new HashMap<>();
        getAllChapterActivitiesResult(chapter)
                .forEach(taskResult -> addToAvgGradesForChapter(avgGradesForChapter, taskResult));

        return null;
    }

    private void addToAvgGradesForChapter(HashMap<Group, AverageGradeForChapterCreator> avgGradesForChapter, TaskResult taskResult) {
        Group group = taskResult.getUser().getGroup();
        if (avgGradesForChapter.containsKey(taskResult.getUser().getGroup())) {
            // avgGradesForChapter.get(group).add(taskResult.getPointsReceived() / taskResult.)
        }
    }


    /////////////////////////////
    // notAssessedActivitiesTable
    /////////////////////////////
    private List<NotAssessedActivity> getNotAssessedActivitiesTable(User professor) {
        return getAllProfessorActivities(professor)
                .stream()
                .map(this::toNotAssessedActivity)
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
                .filter(activity -> activity.getProfessor().equals(professor))
                .toList();
    }

    private List<? extends Activity> getAllChapterActivities(Chapter chapter) { // without Info
        return getAllActivities()
                .stream()
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

    private List<? extends TaskResult> getAllChapterActivitiesResult(Chapter chapter) {
        return getAllChapterActivities(chapter)
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

}
