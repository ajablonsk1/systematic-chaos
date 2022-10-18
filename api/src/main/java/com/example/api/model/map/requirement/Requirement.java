package com.example.api.model.map.requirement;

import com.example.api.dto.response.map.RequirementResponse;
import com.example.api.error.exception.RequestValidationException;
import com.example.api.model.activity.result.TaskResult;
import com.example.api.util.visitor.RequirementFulfilledVisitor;
import com.example.api.util.visitor.RequirementValueVisitor;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public abstract class Requirement {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private Boolean isSelected;

    public Requirement(String name, boolean isSelected) {
        this.name = name;
        this.isSelected = isSelected;
    }

    public abstract boolean isFulfilled(RequirementFulfilledVisitor visitor);
    public abstract void setValue(RequirementValueVisitor visitor, String value) throws RequestValidationException;
    public abstract RequirementResponse<?> getResponse();
    public boolean isLate(Long dateMillis) {
        return false;
    }

//    public boolean isFulfilled(User student, List<GraphTask> graphTasks, List<FileTask> fileTasks) {
//        if (isDefault) {
//            return false;
//        }
//        if (!isSelected) {
//            return true;
//        }
//        switch (type) {
//            case DATE_FROM -> {
//                return System.currentTimeMillis() > dateFrom;
//            }
//            case DATE_TO -> {
//                return System.currentTimeMillis() < dateTo;
//            }
//            case MIN_POINTS -> {
//                return student.getPoints() >= minPoints;
//            }
//            case GROUPS -> {
//                return allowedGroups.contains(student.getGroup());
//            }
//            case STUDENTS -> {
//                return allowedStudents.contains(student);
//            }
//            case GRAPH_TASKS -> {
//                return graphTasks.containsAll(finishedGraphTasks);
//            }
//            case FILE_TASKS -> {
//                return fileTasks.containsAll(finishedFileTasks);
//            }
//            default -> {
//                return false;
//            }
//        }
//    }
}
