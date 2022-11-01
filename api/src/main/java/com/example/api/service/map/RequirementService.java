package com.example.api.service.map;

import com.example.api.dto.request.activity.task.requirement.RequirementForm;
import com.example.api.error.exception.RequestValidationException;
import com.example.api.model.map.requirement.*;
import com.example.api.repo.map.RequirementRepo;
import com.example.api.service.validator.MapValidator;
import com.example.api.util.MessageManager;
import com.example.api.util.visitor.RequirementFulfilledVisitor;
import com.example.api.util.visitor.RequirementValueVisitor;
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
    private final RequirementFulfilledVisitor requirementFulfilledVisitor;
    private final RequirementValueVisitor requirementValueVisitor;
    private final MapValidator mapValidator;

    public Requirement saveRequirement(Requirement requirement) {
        return requirementRepo.save(requirement);
    }

    public List<Requirement> getDefaultRequirements(boolean forActivity) {
        Requirement dateFromRequirement = new DateFromRequirement(
                forActivity ? MessageManager.DATE_FROM_REQ_NAME : MessageManager.DATE_FROM_REQ_NAME_CHAPTER,
                false,
                null
        );
        Requirement dateToRequirement = new DateToRequirement(
                forActivity ? MessageManager.DATE_TO_REQ_NAME : MessageManager.DATE_TO_REQ_NAME_CHAPTER,
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
                forActivity ? MessageManager.GROUPS_REQ_NAME : MessageManager.GROUPS_REQ_NAME_CHAPTER,
                false,
                new LinkedList<>()
        );
        Requirement minPointsRequirement = new MinPointsRequirement(
                MessageManager.MIN_POINTS_REQ_NAME,
                false,
                null
        );
        Requirement studentsRequirements = new StudentsRequirements(
                forActivity ? MessageManager.STUDENTS_REQ_NAME : MessageManager.STUDENTS_REQ_NAME_CHAPTER,
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

    public boolean areRequirementsFulfilled(List<Requirement> requirements) {
        return requirements.stream()
                .allMatch(requirement -> requirement.isFulfilled(requirementFulfilledVisitor));
    }

    public void updateRequirements(List<RequirementForm> forms) throws RequestValidationException {
        for (RequirementForm requirementForm: forms) {
            Requirement requirement = requirementRepo.findRequirementById(requirementForm.getId());
            mapValidator.validateRequirementIsNotNull(requirement, requirementForm.getId());

            requirement.setSelected(requirementForm.getSelected());
            requirement.setValue(requirementValueVisitor, requirementForm.getValue());
        }
    }
}
