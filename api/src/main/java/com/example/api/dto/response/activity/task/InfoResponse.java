package com.example.api.dto.response.activity.task;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class InfoResponse {
    private String name;
    private String description;
    private List<String> imageUrls;
    private String content;
}
