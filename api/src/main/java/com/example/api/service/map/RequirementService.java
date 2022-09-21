package com.example.api.service.map;

import com.example.api.model.activity.result.FileTaskResult;
import com.example.api.model.activity.result.GraphTaskResult;
import com.example.api.model.activity.task.FileTask;
import com.example.api.model.activity.task.GraphTask;
import com.example.api.model.map.requirement.Requirement;
import com.example.api.model.map.requirement.RequirementType;
import com.example.api.model.user.User;
import com.example.api.repo.activity.result.FileTaskResultRepo;
import com.example.api.repo.activity.result.GraphTaskResultRepo;
import com.example.api.repo.map.RequirementRepo;
import com.example.api.repo.user.UserRepo;
import com.example.api.security.AuthenticationService;
import com.example.api.util.MessageManager;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class RequirementService {
    private final RequirementRepo requirementRepo;
    private final UserRepo userRepo;
    private final GraphTaskResultRepo graphTaskResultRepo;
    private final FileTaskResultRepo fileTaskResultRepo;
    private final AuthenticationService authService;

    public Requirement saveRequirement(Requirement requirement) {
        return requirementRepo.save(requirement);
    }

    public List<Requirement> getDefaultRequirements() {
        Requirement requirement1 = new Requirement(
                MessageManager.DATE_FROM_REQ_NAME,
                RequirementType.DATE_FROM,
                false
        );
        Requirement requirement2 = new Requirement(
                MessageManager.DATE_TO_REQ_NAME,
                RequirementType.DATE_TO,
                false
        );
        Requirement requirement3 = new Requirement(
                MessageManager.MIN_POINTS_REQ_NAME,
                RequirementType.MIN_POINTS,
                false
        );
        Requirement requirement4 = new Requirement(
                MessageManager.GROUPS_REQ_NAME,
                RequirementType.GROUPS,
                false
        );
        Requirement requirement5 = new Requirement(
                MessageManager.STUDENTS_REQ_NAME,
                RequirementType.STUDENTS,
                false
        );
        Requirement requirement6 = new Requirement(
                MessageManager.GRAPH_TASKS_REQ_NAME,
                RequirementType.GRAPH_TASKS,
                false
        );
        Requirement requirement7 = new Requirement(
                MessageManager.FILE_TASKS_REQ_NAME,
                RequirementType.FILE_TASKS,
                false
        );
        List<Requirement> requirements = List.of(
                requirement1,
                requirement2,
                requirement3,
                requirement4,
                requirement5,
                requirement6,
                requirement7
        );
        requirementRepo.saveAll(requirements);
        return requirements;
    }

    public boolean areRequirementsFulfilled(User student, List<Requirement> requirements) {
        List<GraphTask> graphTasks = graphTaskResultRepo.findAllByUser(student)
                .stream()
                .map(GraphTaskResult::getGraphTask)
                .toList();
        List<FileTask> fileTasks = fileTaskResultRepo.findAllByUser(student)
                .stream()
                .map(FileTaskResult::getFileTask)
                .toList();
        for (Requirement requirement: requirements) {
            if (!requirement.isFulfilled(student, graphTasks, fileTasks)) {
                return false;
            }
        }
        return true;
    }

    public boolean areRequirementsDefault(List<Requirement> requirements) {
        return requirements.stream().allMatch(Requirement::getIsDefault);
    }
}
