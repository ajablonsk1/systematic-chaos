package com.example.api.dto.request.user.badge;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class BadgeAddForm extends BadgeForm{
    private BadgeType type;
}
