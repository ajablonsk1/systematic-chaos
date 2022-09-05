package com.example.api.model.map.requirement;

import com.example.api.dto.response.map.RequirementResponse;
import com.example.api.model.group.Group;
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
public class GroupRequirement extends Requirement{
    @OneToMany
    private List<Group> groups = new LinkedList<>();

    @Override
    public RequirementResponse<?> getRequirementResponse(RequirementResponseVisitor visitor) {
        return visitor.getForGroupRequirement(this);
    }
}
