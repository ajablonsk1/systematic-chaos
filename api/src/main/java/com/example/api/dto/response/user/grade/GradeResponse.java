package com.example.api.dto.response.user.grade;

import com.example.api.dto.response.user.BasicUser;
import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class GradeResponse {
    private BasicUser student;
    private Double grade;
}
