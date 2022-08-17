package com.example.api.dto.request.activity.task;

import com.example.api.dto.request.activity.result.ActivityTypeWithIdForm;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GetCSVForm {
    List<Long> studentIds;
    List<ActivityTypeWithIdForm> forms;
}
