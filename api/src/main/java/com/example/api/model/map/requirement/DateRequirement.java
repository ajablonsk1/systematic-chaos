package com.example.api.model.map.requirement;

import com.example.api.dto.response.map.RequirementResponse;
import com.example.api.model.group.AccessDate;
import com.example.api.util.visitor.RequirementResponseVisitor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.OneToOne;

@Getter
@Setter
@NoArgsConstructor
@Entity
public class DateRequirement extends Requirement{
    @OneToOne
    private AccessDate accessDate;

    @Override
    public RequirementResponse<?> getRequirementResponse(RequirementResponseVisitor visitor) {
        return visitor.getForDateRequirement(this);
    }
}
