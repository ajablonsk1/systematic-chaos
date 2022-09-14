package com.example.api.service.validator;

import com.example.api.dto.request.map.ChapterForm;
import com.example.api.error.exception.ExceptionMessage;
import com.example.api.error.exception.RequestValidationException;
import com.example.api.model.map.Chapter;
import com.example.api.repo.map.ChapterRepo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Objects;

@Component
@Slf4j
@RequiredArgsConstructor
public class ChapterValidator {
    private final ChapterRepo chapterRepo;

    public void validateChapterCreation(ChapterForm form) throws RequestValidationException {
        List<Chapter> chapters = chapterRepo.findAll();
        if (chapters.stream()
                .anyMatch(chapter ->
                                Objects.equals(chapter.getPosX(), form.getPosX()) &&
                                Objects.equals(chapter.getPosY(), form.getPosY()))) {
            log.error("Two chapters cannot be on the same position!");
            throw new RequestValidationException(ExceptionMessage.TWO_CHAPTERS_ON_THE_SAME_POSITION);
        }
    }
}
