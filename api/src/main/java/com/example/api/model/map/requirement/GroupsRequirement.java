package com.example.api.model.map.requirement;

import com.example.api.dto.response.map.RequirementDTO;
import com.example.api.error.exception.RequestValidationException;
import com.example.api.model.group.Group;
import com.example.api.util.visitor.RequirementFulfilledVisitor;
import com.example.api.util.visitor.RequirementValueVisitor;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.ManyToMany;
import java.util.LinkedList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class GroupsRequirement extends Requirement {
    @ManyToMany
    private List<Group> allowedGroups = new LinkedList<>();

    public GroupsRequirement(String name, Boolean isSelected, List<Group> allowedGroups) {
        super(name, isSelected);
        this.allowedGroups = allowedGroups;
    }

    @Override
    public boolean isFulfilled(RequirementFulfilledVisitor visitor) {
        return visitor.visitGroupsRequirement(this);
    }

    @Override
    public void setValue(RequirementValueVisitor visitor, String value) throws RequestValidationException {
        visitor.visitGroupsTasksRequirement(this, value);
    }

    @Override
    public RequirementDTO<List<String>> getResponse() {
        List<String> groupNames = allowedGroups.stream()
                .map(Group::getName)
                .toList();
        return new RequirementDTO<>(
                getId(),
                getName(),
                groupNames,
                RequirementValueType.MULTI_SELECT,
                getSelected()
        );
    }
}
