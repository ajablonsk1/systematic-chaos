package com.example.api.dto.response.group;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AccessDateResponse {
    private final Long from;
    private final Long to;
}
