package com.example.api.service.activity;

import com.example.api.dto.request.activity.task.edit.*;
import com.example.api.error.exception.EntityNotFoundException;
import com.example.api.error.exception.WrongUserTypeException;
import com.example.api.model.activity.task.*;
import com.example.api.model.user.User;
import com.example.api.repo.activity.task.FileTaskRepo;
import com.example.api.repo.activity.task.GraphTaskRepo;
import com.example.api.repo.activity.task.InfoRepo;
import com.example.api.repo.activity.task.SurveyRepo;
import com.example.api.repo.user.UserRepo;
import com.example.api.security.AuthenticationService;
import com.example.api.service.validator.UserValidator;
import com.example.api.service.validator.activity.ActivityValidator;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Collection;
import java.util.List;
import java.util.stream.Stream;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class ActivityService {
    private final AuthenticationService authService;
    private final UserRepo userRepo;
    private final UserValidator userValidator;
    private final GraphTaskRepo graphTaskRepo;
    private final FileTaskRepo fileTaskRepo;
    private final SurveyRepo surveyRepo;
    private final InfoRepo infoRepo;
    private final ActivityValidator activityValidator;

    public EditActivityForm getActivityEditInfo(Long activityID) throws WrongUserTypeException, EntityNotFoundException {
        String email = authService.getAuthentication().getName();
        User professor = userRepo.findUserByEmail(email);
        userValidator.validateProfessorAccount(professor, email);

        Activity activity = getActivity(activityID);
        activityValidator.validateActivityIsNotNull(activity, activityID);

        return toEditActivityForm(activity);
    }

    public void editActivity(EditActivityForm form) throws WrongUserTypeException, EntityNotFoundException {
        String email = authService.getAuthentication().getName();
        User professor = userRepo.findUserByEmail(email);
        userValidator.validateProfessorAccount(professor, email);

        Activity activity = getActivity(form.getActivityID());
        activityValidator.validateActivityIsNotNull(activity, form.getActivityID());
        return;
    }

    private Activity getActivity(Long id) {
        return getAllActivities().stream()
                .filter(activity -> activity.getId() == id)
                .findFirst()
                .orElse(null);
    }

    private List<? extends Activity> getAllActivities() {
        List<GraphTask> graphTasks = graphTaskRepo.findAll();
        List<FileTask> fileTasks = fileTaskRepo.findAll();
        List<Survey> surveys = surveyRepo.findAll();
        List<Info> infos = infoRepo.findAll();

        return Stream.of(graphTasks, fileTasks, surveys, infos)
                .flatMap(Collection::stream)
                .toList();
    }

    private EditActivityForm toEditActivityForm(Activity activity) {
        switch (activity.getActivityType()) {
            case EXPEDITION -> {
                return new EditGraphTaskForm((GraphTask) activity);
            }
            case TASK -> {
                return new EditFileTaskForm((FileTask) activity);
            }
            case SURVEY -> {
                return new EditSurveyForm((Survey) activity);
            }
            case INFO -> {
                return new EditInfoForm((Info) activity);
            }
            default -> {
                log.error("Cannot create EditActivityForm for given activity with type {}", activity.getActivityType());
                throw new IllegalArgumentException("Cannot create EditActivityForm for given activity with type" + activity.getActivityType());
            }
        }
    }
}
