package com.example.api.model.map.requirement;

import com.example.api.dto.response.map.RequirementResponse;
import com.example.api.model.activity.task.FileTask;
import com.example.api.model.activity.task.GraphTask;
import com.example.api.util.visitor.RequirementResponseVisitor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.OneToMany;
import java.util.LinkedList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@Entity
public class ActivitiesRequirement extends Requirement{
    @OneToMany
    private List<GraphTask> finishedGraphTasks = new LinkedList<>();;

    @OneToMany
    private List<FileTask> finishedFileTasks = new LinkedList<>();;

    @Override
    public RequirementResponse<?> getRequirementResponse(RequirementResponseVisitor visitor) {
        return visitor.getForActivitiesRequirement(this);
    }
}
