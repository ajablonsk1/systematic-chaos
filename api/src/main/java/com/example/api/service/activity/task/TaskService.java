package com.example.api.service.activity.task;

import com.example.api.dto.request.activity.task.requirement.ActivityRequirementForm;
import com.example.api.dto.request.activity.task.requirement.RequirementForm;
import com.example.api.dto.response.activity.task.ActivitiesResponse;
import com.example.api.dto.response.activity.task.ActivityToEvaluateResponse;
import com.example.api.dto.response.activity.task.TaskToEvaluateResponse;
import com.example.api.dto.response.activity.task.util.FileResponse;
import com.example.api.dto.response.map.RequirementResponse;
import com.example.api.dto.response.map.task.ActivityType;
import com.example.api.error.exception.EntityNotFoundException;
import com.example.api.error.exception.MissingAttributeException;
import com.example.api.error.exception.RequestValidationException;
import com.example.api.error.exception.WrongUserTypeException;
import com.example.api.model.activity.result.FileTaskResult;
import com.example.api.model.activity.task.Activity;
import com.example.api.model.activity.task.FileTask;
import com.example.api.model.activity.task.GraphTask;
import com.example.api.model.group.Group;
import com.example.api.model.map.ActivityMap;
import com.example.api.model.map.Chapter;
import com.example.api.model.map.requirement.Requirement;
import com.example.api.model.map.requirement.RequirementValueType;
import com.example.api.model.user.User;
import com.example.api.repo.activity.result.FileTaskResultRepo;
import com.example.api.repo.activity.task.FileTaskRepo;
import com.example.api.repo.activity.task.GraphTaskRepo;
import com.example.api.repo.activity.task.InfoRepo;
import com.example.api.repo.activity.task.SurveyRepo;
import com.example.api.repo.group.AccessDateRepo;
import com.example.api.repo.group.GroupRepo;
import com.example.api.repo.map.ChapterRepo;
import com.example.api.repo.map.RequirementRepo;
import com.example.api.repo.user.UserRepo;
import com.example.api.security.AuthenticationService;
import com.example.api.service.validator.MapValidator;
import com.example.api.service.validator.UserValidator;
import com.example.api.service.validator.activity.ActivityValidator;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import javax.xml.bind.ValidationException;
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
    private final GroupRepo groupRepo;
    private final AccessDateRepo accessDateRepo;
    private final AuthenticationService authService;
    private final UserValidator userValidator;
    private final ActivityValidator taskValidator;
    private final MapValidator mapValidator;

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
        taskValidator.validateActivityIsNotNull(task, id);
        List<FileTaskResult> fileTaskResults = fileTaskResultRepo.findAll()
                .stream()
                .filter(result -> Objects.equals(result.getFileTask().getId(), task.getId()))
                .filter(result -> !result.isEvaluated())
                .toList();
        if(fileTaskResults.size() > 0) {
            FileTaskResult result = fileTaskResults.get(0);
            long num = fileTaskResults.size();
            boolean isLate = false;
            //TODO: investigate further
            if(result.getSendDateMillis() != null){
                isLate = result.getSendDateMillis() - result.getFileTask().getExpireDateMillis() > 0;
            }

            List<FileResponse> filesResponse = result.getFiles().stream().map(FileResponse::new).toList();

            return new TaskToEvaluateResponse(result.getUser().getEmail(), result.getId(), result.getUser().getFirstName(),
                    result.getUser().getLastName(), task.getTitle(), isLate, task.getDescription(),
                    result.getAnswer(), filesResponse, task.getMaxPoints(), id, num-1);
        }
        return null;
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

    public List<RequirementResponse<?>> getRequirementForActivity(Long id) throws EntityNotFoundException, MissingAttributeException {
        Activity activity = getActivity(id);
        List<Requirement> requirements = activity.getRequirements();
        requirements = requirements.stream()
                .sorted(Comparator.comparingInt(o -> o.getType().getType()))
                .toList();
        List<RequirementResponse<?>> requirementResponses = new LinkedList<>();
        for(Requirement requirement: requirements) {
            switch (requirement.getType()) {
                case DATE_FROM -> {
                    requirementResponses.add(new RequirementResponse<>(
                            requirement.getId(),
                            requirement.getName(),
                            requirement.getDateFrom(),
                            RequirementValueType.DATE,
                            requirement.isSelected()
                    ));
                }
                case DATE_TO -> {
                    requirementResponses.add(new RequirementResponse<>(
                            requirement.getId(),
                            requirement.getName(),
                            requirement.getDateTo(),
                            RequirementValueType.DATE,
                            requirement.isSelected()
                    ));
                }
                case MIN_POINTS -> {
                    requirementResponses.add(new RequirementResponse<>(
                            requirement.getId(),
                            requirement.getName(),
                            requirement.getMinPoints(),
                            RequirementValueType.NUMBER,
                            requirement.isSelected()
                    ));
                }
                case GROUPS -> {
                    List<String> groupNames = requirement.getAllowedGroups()
                            .stream()
                            .map(Group::getName)
                            .toList();
                    requirementResponses.add(new RequirementResponse<>(
                            requirement.getId(),
                            requirement.getName(),
                            groupNames,
                            RequirementValueType.MULTI_SELECT,
                            requirement.isSelected()
                    ));
                }
                case STUDENTS -> {
                    List<String> emails = requirement.getAllowedStudents()
                            .stream()
                            .map(User::getEmail)
                            .toList();
                    requirementResponses.add(new RequirementResponse<>(
                            requirement.getId(),
                            requirement.getName(),
                            emails,
                            RequirementValueType.MULTI_SELECT,
                            requirement.isSelected()
                    ));
                }
                case GRAPH_TASKS -> {
                    List<String> titles = requirement.getFinishedGraphTasks()
                            .stream()
                            .map(GraphTask::getTitle)
                            .toList();
                    requirementResponses.add(new RequirementResponse<>(
                            requirement.getId(),
                            requirement.getName(),
                            titles,
                            RequirementValueType.MULTI_SELECT,
                            requirement.isSelected()
                    ));
                }
                case FILE_TASKS -> {
                    List<String> titles = requirement.getFinishedFileTasks()
                            .stream()
                            .map(FileTask::getTitle)
                            .toList();
                    requirementResponses.add(new RequirementResponse<>(
                            requirement.getId(),
                            requirement.getName(),
                            titles,
                            RequirementValueType.MULTI_SELECT,
                            requirement.isSelected()
                    ));
                }
                default -> {
                    log.error("Requirement has to have its type");
                    throw new MissingAttributeException("Requirement has to have its type");
                }
            }
        }
        return requirementResponses;
    }


    public void addRequirementToActivity(ActivityRequirementForm form) throws RequestValidationException {
        List<RequirementForm> requirementForms = form.getRequirements();
        for (RequirementForm requirementForm: requirementForms) {
            Requirement requirement = requirementRepo.findRequirementById(requirementForm.getId());
            mapValidator.validateRequirementIsNotNull(requirement, requirementForm.getId());
            requirement.setSelected(requirementForm.getSelected());
            switch (requirement.getType()) {
                case DATE_FROM -> {
                    Long dateFrom = Long.valueOf(requirementForm.getValue());
                    requirement.setDateFrom(dateFrom);
                }
                case DATE_TO -> {
                    Long dateTo = Long.valueOf(requirementForm.getValue());
                    requirement.setDateTo(dateTo);
                }
                case MIN_POINTS -> {
                    Double minPoints = Double.valueOf(requirementForm.getValue());
                    requirement.setMinPoints(minPoints);
                }
                case GROUPS -> {
                    List<String> groupNames = Arrays.asList(requirementForm.getValue().split(";"));
                    List<Group> groups = groupRepo.findAll()
                            .stream()
                            .filter(group -> groupNames.contains(group.getName()))
                            .toList();
                    requirement.setAllowedGroups(groups);
                }
                case STUDENTS -> {
                    List<String> emails = Arrays.asList(requirementForm.getValue().split(";"));
                    List<User> students = userRepo.findAll()
                            .stream()
                            .filter(user -> emails.contains(user.getEmail()))
                            .toList();
                    requirement.setAllowedStudents(students);
                }
                case GRAPH_TASKS -> {
                    List<String> titles = Arrays.asList(requirementForm.getValue().split(";"));
                    List<GraphTask> graphTasks = graphTaskRepo.findAll()
                            .stream()
                            .filter(graphTask -> titles.contains(graphTask.getTitle()))
                            .toList();
                    requirement.setFinishedGraphTasks(graphTasks);
                }
                case FILE_TASKS -> {
                    List<String> titles = Arrays.asList(requirementForm.getValue().split(";"));
                    List<FileTask> fileTasks = fileTaskRepo.findAll()
                            .stream()
                            .filter(fileTask -> titles.contains(fileTask.getTitle()))
                            .toList();
                    requirement.setFinishedFileTasks(fileTasks);
                }
                default -> {
                    String errorMessage = "Requirement has to have type!";
                    log.error(errorMessage);
                    throw new RequestValidationException(errorMessage);
                }
            }
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
