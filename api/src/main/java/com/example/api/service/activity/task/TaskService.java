package com.example.api.service.activity.task;

import com.example.api.dto.request.activity.task.requirement.ActivityRequirementForm;
import com.example.api.dto.request.activity.task.requirement.RequirementForm;
import com.example.api.dto.response.activity.task.ActivitiesResponse;
import com.example.api.dto.response.activity.task.ActivityToEvaluateResponse;
import com.example.api.dto.response.activity.task.TaskToEvaluateResponse;
import com.example.api.dto.response.activity.task.util.FileResponse;
import com.example.api.dto.response.map.RequirementResponse;
import com.example.api.dto.response.map.task.ActivityType;
import com.example.api.error.exception.*;
import com.example.api.model.activity.result.FileTaskResult;
import com.example.api.model.activity.task.Activity;
import com.example.api.model.activity.task.FileTask;
import com.example.api.model.map.ActivityMap;
import com.example.api.model.map.Chapter;
import com.example.api.model.map.requirement.Requirement;
import com.example.api.model.user.User;
import com.example.api.repo.activity.result.FileTaskResultRepo;
import com.example.api.repo.activity.task.FileTaskRepo;
import com.example.api.repo.activity.task.GraphTaskRepo;
import com.example.api.repo.activity.task.InfoRepo;
import com.example.api.repo.activity.task.SurveyRepo;
import com.example.api.repo.map.ChapterRepo;
import com.example.api.repo.map.RequirementRepo;
import com.example.api.repo.user.UserRepo;
import com.example.api.security.AuthenticationService;
import com.example.api.service.validator.MapValidator;
import com.example.api.service.validator.UserValidator;
import com.example.api.service.validator.activity.ActivityValidator;
import com.example.api.util.visitor.RequirementValueVisitor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.*;
import java.util.stream.Stream;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class TaskService {
    private final FileTaskRepo fileTaskRepo;
    private final GraphTaskRepo graphTaskRepo;
    private final SurveyRepo surveyRepo;
    private final InfoRepo infoRepo;
    private final FileTaskResultRepo fileTaskResultRepo;
    private final UserRepo userRepo;
    private final ChapterRepo chapterRepo;
    private final RequirementRepo requirementRepo;
    private final AuthenticationService authService;
    private final UserValidator userValidator;
    private final ActivityValidator activityValidator;
    private final MapValidator mapValidator;
    private final RequirementValueVisitor requirementValueVisitor;

    public List<ActivityToEvaluateResponse> getAllActivitiesToEvaluate()
            throws WrongUserTypeException, UsernameNotFoundException {
        String email = authService.getAuthentication().getName();
        log.info("Fetching all activities that are needed to be evaluated for professor {}", email);
        User professor = userRepo.findUserByEmail(email);
        userValidator.validateProfessorAccount(professor, email);
        List<ActivityToEvaluateResponse> response = new LinkedList<>();
        List<FileTask> fileTasks = fileTaskRepo.findAll()
                .stream()
                .filter(fileTask -> fileTask.getProfessor().getEmail().equals(email))
                .toList();
        List<FileTaskResult> fileTaskResults = fileTaskResultRepo.findAll();
        for (FileTask task : fileTasks) {
            long num = fileTaskResults.stream()
                    .filter(result -> Objects.equals(result.getFileTask().getId(), task.getId()))
                    .filter(result -> !result.isEvaluated())
                    .count();
            response.add(new ActivityToEvaluateResponse(task.getId(), num));
        }
        return response;
    }

    public TaskToEvaluateResponse getFirstAnswerToEvaluate(Long id) throws EntityNotFoundException {
        log.info("Fetching first activity that is needed to be evaluated for file task with id {}", id);
        FileTask task = fileTaskRepo.findFileTaskById(id);
        activityValidator.validateActivityIsNotNull(task, id);
        List<FileTaskResult> fileTaskResults = fileTaskResultRepo.findAll()
                .stream()
                .filter(result -> Objects.equals(result.getFileTask().getId(), task.getId()))
                .filter(result -> !result.isEvaluated())
                .toList();
        if (fileTaskResults.size() == 0) return null;
        FileTaskResult result = fileTaskResults.get(0);
        long num = fileTaskResults.size();
        boolean isLate = false;
        Long sendDateMillis = result.getSendDateMillis();
        if(sendDateMillis != null){
            isLate = task.getRequirements()
                    .stream()
                    .anyMatch(requirement -> requirement.isLate(sendDateMillis));
        }

        List<FileResponse> filesResponse = result.getFiles().stream().map(FileResponse::new).toList();

        return new TaskToEvaluateResponse(result.getUser().getEmail(), result.getId(), result.getUser().getFirstName(),
                result.getUser().getLastName(), task.getTitle(), isLate, task.getDescription(),
                result.getAnswer(), filesResponse, task.getMaxPoints(), id, num-1);
    }

    public List<ActivitiesResponse> getAllActivities() {
        log.info("Fetching all activities");
        List<Chapter> chapters = chapterRepo.findAll();
        List<List<ActivitiesResponse>> activitiesResponses = new LinkedList<>();
        chapters.forEach(chapter -> {
            ActivityMap activityMap = chapter.getActivityMap();
            List<ActivitiesResponse> graphTasks = activityMap.getGraphTasks()
                    .stream()
                    .map(graphTask -> new ActivitiesResponse(graphTask.getId(), graphTask.getTitle(), chapter.getName(), ActivityType.EXPEDITION))
                    .toList();
            List<ActivitiesResponse> fileTasks = activityMap.getFileTasks()
                    .stream()
                    .map(fileTask -> new ActivitiesResponse(fileTask.getId(), fileTask.getTitle(), chapter.getName(), ActivityType.TASK))
                    .toList();
            List<ActivitiesResponse> surveys = activityMap.getSurveys()
                    .stream()
                    .map(survey -> new ActivitiesResponse(survey.getId(), survey.getTitle(), chapter.getName(), ActivityType.SURVEY))
                    .toList();
            List<ActivitiesResponse> responses = Stream.of(graphTasks, fileTasks, surveys)
                    .flatMap(Collection::stream)
                    .toList();
            activitiesResponses.add(responses);
        });
        return activitiesResponses.stream()
                .flatMap(Collection::stream)
                .toList();
    }

    public List<? extends RequirementResponse<?>> getRequirementsForActivity(Long id) throws EntityNotFoundException, MissingAttributeException {
        Activity activity = getActivity(id);
        return activity.getRequirements()
                .stream()
                .map(Requirement::getResponse)
                .toList();
    }


    public void addRequirementToActivity(ActivityRequirementForm form) throws RequestValidationException {
        List<RequirementForm> requirementForms = form.getRequirements();
        for (RequirementForm requirementForm: requirementForms) {
            Requirement requirement = requirementRepo.findRequirementById(requirementForm.getId());
            mapValidator.validateRequirementIsNotNull(requirement, requirementForm.getId());

            requirement.setIsSelected(requirementForm.getIsSelected());
            requirement.setValue(requirementValueVisitor, requirementForm.getValue());
        }
    }

    public Activity getActivity(Long id) throws EntityNotFoundException {
        if (graphTaskRepo.existsById(id)) {
            return graphTaskRepo.findGraphTaskById(id);
        } else if (fileTaskRepo.existsById(id)){
            return fileTaskRepo.findFileTaskById(id);
        } else if (surveyRepo.existsById(id)) {
            return surveyRepo.findSurveyById(id);
        } else if (infoRepo.existsById(id)) {
            return infoRepo.findInfoById(id);
        } else {
            log.error("Activity with id {} not found in database", id);
            throw new EntityNotFoundException("Activity with id " + id + " not found in database");
        }
    }
}
