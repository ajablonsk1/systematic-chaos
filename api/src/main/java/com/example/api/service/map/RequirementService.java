package com.example.api.service.map;

import com.example.api.model.activity.result.FileTaskResult;
import com.example.api.model.activity.result.GraphTaskResult;
import com.example.api.model.activity.task.FileTask;
import com.example.api.model.activity.task.GraphTask;
import com.example.api.model.map.requirement.*;
import com.example.api.model.user.User;
import com.example.api.repo.activity.result.FileTaskResultRepo;
import com.example.api.repo.activity.result.GraphTaskResultRepo;
import com.example.api.repo.map.RequirementRepo;
import com.example.api.repo.user.UserRepo;
import com.example.api.security.AuthenticationService;
import com.example.api.util.MessageManager;
import com.example.api.util.visitor.RequirementFulfilledVisitor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.LinkedList;
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
    private final RequirementFulfilledVisitor requirementFulfilledVisitor;

    public Requirement saveRequirement(Requirement requirement) {
        return requirementRepo.save(requirement);
    }

    public List<Requirement> getDefaultRequirements() {
        Requirement dateFromRequirement = new DateFromRequirement(
                MessageManager.DATE_FROM_REQ_NAME,
                false,
                null
        );
        Requirement dateToRequirement = new DateToRequirement(
                MessageManager.DATE_TO_REQ_NAME,
                false,
                null
        );
        Requirement fileTasksRequirement = new FileTasksRequirement(
                MessageManager.FILE_TASKS_REQ_NAME,
                false,
                new LinkedList<>()
        );
        Requirement graphTasksRequirement = new GraphTasksRequirement(
                MessageManager.GRAPH_TASKS_REQ_NAME,
                false,
                new LinkedList<>()
        );
        Requirement groupsRequirement = new GroupsRequirement(
                MessageManager.GROUPS_REQ_NAME,
                false,
                new LinkedList<>()
        );
        Requirement minPointsRequirement = new MinPointsRequirement(
                MessageManager.MIN_POINTS_REQ_NAME,
                false,
                null
        );
        Requirement studentsRequirements = new StudentsRequirements(
                MessageManager.STUDENTS_REQ_NAME,
                false,
                new LinkedList<>()
        );
        List<Requirement> requirements = List.of(
                dateFromRequirement,
                dateToRequirement,
                fileTasksRequirement,
                graphTasksRequirement,
                groupsRequirement,
                minPointsRequirement,
                studentsRequirements
        );
        requirementRepo.saveAll(requirements);
        return requirements;
    }

    public boolean areRequirementsFulfilled(List<Requirement> requirements) {
        return requirements.stream()
                .allMatch(requirement -> requirement.isFulfilled(requirementFulfilledVisitor));
    }
}
