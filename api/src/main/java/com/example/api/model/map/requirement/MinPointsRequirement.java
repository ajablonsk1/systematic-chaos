package com.example.api.model.map.requirement;

import com.example.api.dto.response.map.RequirementDTO;
import com.example.api.error.exception.RequestValidationException;
import com.example.api.util.visitor.RequirementFulfilledVisitor;
import com.example.api.util.visitor.RequirementValueVisitor;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class MinPointsRequirement extends Requirement {
    private Double minPoints;

    public MinPointsRequirement(String name, Boolean isSelected, Double minPoints) {
        super(name, isSelected);
        this.minPoints = minPoints;
    }

    @Override
    public boolean isFulfilled(RequirementFulfilledVisitor visitor) {
        return visitor.visitMinPointsRequirement(this);
    }

    @Override
    public void setValue(RequirementValueVisitor visitor, String value) throws RequestValidationException {
        visitor.visitMinPointsRequirement(this, value);
    }

    @Override
    public RequirementDTO<Double> getResponse() {
        return new RequirementDTO<>(
                getId(),
                getName(),
                minPoints,
                RequirementValueType.NUMBER,
                getSelected()
        );
    }
}
