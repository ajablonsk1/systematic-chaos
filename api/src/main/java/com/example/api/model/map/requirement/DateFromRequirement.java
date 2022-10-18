package com.example.api.model.map.requirement;

import com.example.api.dto.response.map.RequirementResponse;
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
public class DateFromRequirement extends Requirement{
    private Long dateFromMillis;

    public DateFromRequirement(String name, boolean isSelected, Long dateFromMillis) {
        super(name, isSelected);
        this.dateFromMillis = dateFromMillis;
    }

    @Override
    public boolean isFulfilled(RequirementFulfilledVisitor visitor) {
        return visitor.visitDateFromRequirement(this);
    }

    @Override
    public void setValue(RequirementValueVisitor visitor, String value) throws RequestValidationException {
        visitor.visitDateFromRequirement(this, value);
    }

    @Override
    public RequirementResponse<Long> getResponse() {
        return new RequirementResponse<>(
                getId(),
                getName(),
                dateFromMillis,
                RequirementValueType.DATE,
                getIsSelected()
        );
    }
}
