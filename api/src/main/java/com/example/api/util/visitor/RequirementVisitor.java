package com.example.api.util.visitor;

import com.example.api.model.map.requirement.*;

public interface RequirementVisitor {
    void doForDateRequirement(DateRequirement requirement);
    void doForPointsRequirement(PointsRequirement requirement);
    void doForGroupRequirement(GroupRequirement requirement);
    void doForStudentRequirement(StudentRequirement requirement);
    void doForActivitiesRequirement(ActivitiesRequirement requirement);
}
