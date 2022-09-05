package com.example.api.util.visitor;

import com.example.api.dto.response.group.AccessDateResponse;
import com.example.api.dto.response.map.RequirementResponse;
import com.example.api.model.map.requirement.*;

import java.util.List;

public interface RequirementResponseVisitor {
    RequirementResponse<AccessDateResponse> getForDateRequirement(DateRequirement requirement);
    RequirementResponse<Double> getForPointsRequirement(PointsRequirement requirement);
    RequirementResponse<List<String>> getForGroupRequirement(GroupRequirement requirement);
    RequirementResponse<List<String>> getForStudentRequirement(StudentRequirement requirement);
    RequirementResponse<List<String>> getForActivitiesRequirement(ActivitiesRequirement requirement);
}
