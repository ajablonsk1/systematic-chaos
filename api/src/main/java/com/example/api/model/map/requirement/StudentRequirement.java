package com.example.api.model.map.requirement;

import com.example.api.dto.response.map.RequirementResponse;
import com.example.api.model.user.User;
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
public class StudentRequirement extends Requirement{
    @OneToMany
    List<User> students = new LinkedList<>();

    @Override
    public RequirementResponse<?> getRequirementResponse(RequirementResponseVisitor visitor) {
        return visitor.getForStudentRequirement(this);
    }
}
