package com.example.api.model.map.requirement;

import com.example.api.dto.response.map.RequirementDTO;
import com.example.api.error.exception.RequestValidationException;
import com.example.api.model.activity.task.FileTask;
import com.example.api.util.visitor.RequirementFulfilledVisitor;
import com.example.api.util.visitor.RequirementValueVisitor;
import lombok.AllArgsConstructor;
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
@AllArgsConstructor
@Entity
public class FileTasksRequirement extends Requirement {
    @OneToMany
    private List<FileTask> finishedFileTasks = new LinkedList<>();

    public FileTasksRequirement(String name, Boolean isSelected, List<FileTask> finishedFileTasks) {
        super(name, isSelected);
        this.finishedFileTasks = finishedFileTasks;
    }

    @Override
    public boolean isFulfilled(RequirementFulfilledVisitor visitor) {
        return visitor.visitFileTasksRequirement(this);
    }

    @Override
    public void setValue(RequirementValueVisitor visitor, String value) throws RequestValidationException {
        visitor.visitFileTasksRequirement(this, value);
    }

    @Override
    public RequirementDTO<List<String>> getResponse() {
        List<String> titles = finishedFileTasks.stream()
                .map(FileTask::getTitle)
                .toList();
        return new RequirementDTO<>(
                getId(),
                getName(),
                titles,
                RequirementValueType.MULTI_SELECT,
                getSelected()
        );
    }
}
