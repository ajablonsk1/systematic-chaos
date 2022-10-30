package com.example.api.dto.request.activity.task;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GetCSVForm {
    List<Long> studentIds;
    List<Long> activityIds;
}
