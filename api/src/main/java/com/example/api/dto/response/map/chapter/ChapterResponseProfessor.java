package com.example.api.dto.response.map.chapter;

import com.example.api.model.map.Chapter;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ChapterResponseProfessor extends ChapterResponse{
    private Boolean isBlocked;

    public ChapterResponseProfessor(Chapter chapter) {
        super(chapter);
        this.isBlocked = chapter.getIsBlocked();
    }
}
