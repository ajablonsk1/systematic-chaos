package com.example.api.model.map.requirement;

import com.example.api.dto.response.map.RequirementResponse;
import com.example.api.util.visitor.RequirementResponseVisitor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;

@Getter
@Setter
@NoArgsConstructor
@Entity
public class PointsRequirement extends Requirement{
    private Double minPoints;

    @Override
    public RequirementResponse<?> getRequirementResponse(RequirementResponseVisitor visitor) {
        return visitor.getForPointsRequirement(this);
    }
}
