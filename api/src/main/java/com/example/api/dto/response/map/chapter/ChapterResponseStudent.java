package com.example.api.dto.response.map.chapter;

import com.example.api.model.map.Chapter;
import lombok.*;

@Getter
@Setter
public class ChapterResponseStudent extends ChapterResponse{
    private Boolean isFulfilled;

    public ChapterResponseStudent(Chapter chapter, Boolean isFulfilled) {
        super(chapter);
        this.isFulfilled = isFulfilled;
    }
}
