package com.example.api.service.validator;

import com.example.api.dto.request.map.ChapterForm;
import com.example.api.error.exception.EntityNotFoundException;
import com.example.api.error.exception.ExceptionMessage;
import com.example.api.error.exception.RequestValidationException;
import com.example.api.model.map.ActivityMap;
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

    public void validateChapterIsNotNull(Chapter chapter, Long id) throws EntityNotFoundException {
        if(chapter == null) {
            log.error("Chapter with id {} not found in database", id);
            throw new EntityNotFoundException("Chapter with id" + id + " not found in database");
        }
    }

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

    public void validateChapterEdition(ChapterForm form, Chapter chapter) throws RequestValidationException{
        ActivityMap chapterMap = chapter.getActivityMap();

        Integer newSizeX = form.getSizeX();
        Integer newSizeY = form.getSizeY();

        if (chapterMap.getSurveys().stream().anyMatch(survey -> survey.getPosX() >= newSizeX || survey.getPosY() >= newSizeY)
                || chapterMap.getFileTasks().stream().anyMatch(fileTask -> fileTask.getPosX() >= newSizeX || fileTask.getPosY() >= newSizeY)
                || chapterMap.getGraphTasks().stream().anyMatch(graphTask -> graphTask.getPosX() >= newSizeX || graphTask.getPosY() >= newSizeY)
                || chapterMap.getInfos().stream().anyMatch(info -> info.getPosY() >= newSizeY || info.getPosX() >= newSizeX)){
            log.error("New chapter size is too small");
            throw new RequestValidationException(ExceptionMessage.CHAPTER_MAP_SIZE_TOO_SMALL);
        }
    }
}
