package com.example.api.service.map;

import com.example.api.dto.request.map.ChapterForm;
import com.example.api.dto.response.map.ChapterInfoResponse;
import com.example.api.dto.response.map.ChapterResponse;
import com.example.api.dto.response.map.task.MapTask;
import com.example.api.error.exception.EntityNotFoundException;
import com.example.api.error.exception.RequestValidationException;
import com.example.api.model.activity.task.Activity;
import com.example.api.model.map.ActivityMap;
import com.example.api.model.map.Chapter;
import com.example.api.model.util.File;
import com.example.api.repo.map.ChapterRepo;
import com.example.api.repo.util.FileRepo;
import com.example.api.service.validator.ChapterValidator;
import com.example.api.service.validator.activity.ActivityValidator;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class ChapterService {
    private final ChapterRepo chapterRepo;
    private final ActivityMapService activityMapService;
    private final FileRepo fileRepo;
    private final ActivityValidator activityValidator;
    private final ChapterValidator chapterValidator;

    public List<ChapterResponse> getAllChapters() {
        log.info("Fetching all chapters");
        List<Chapter> chapters = chapterRepo.findAll();
        return chapters.stream().map(ChapterResponse::new).toList();
    }

    public ChapterInfoResponse getChapterInfo(Long id) throws EntityNotFoundException {
        log.info("Fetching info for chapter with id {}", id);
        Chapter chapter = chapterRepo.findChapterById(id);
        chapterValidator.validateChapterIsNotNull(chapter, id);
        List<MapTask> allTasks = activityMapService.getMapTasks(chapter.getActivityMap());
        return new ChapterInfoResponse(chapter, allTasks);
    }

    public void createChapter(ChapterForm form) throws RequestValidationException {
        log.info("Creating new chapter");
        File image = fileRepo.findFileById(form.getImageId());
        activityValidator.validateFileIsNotNull(image, form.getImageId());
        chapterValidator.validateChapterCreation(form);
        ActivityMap activityMap = new ActivityMap(form.getSizeX(), form.getSizeY(), image);
        activityMapService.saveActivityMap(activityMap);
        Chapter chapter = new Chapter(form.getName(), activityMap, form.getPosX(), form.getPosY());
        List<Chapter> allChapters = chapterRepo.findAll();
        chapterRepo.save(chapter);
        if (!allChapters.isEmpty()) {
            allChapters.forEach(chapter_ -> {
                if (chapter_.getNextChapter() == null) {
                    chapter_.setNextChapter(chapter);
                }
             });
        }
    }

    public Chapter getChapterWithActivity(Activity activity) {
        return chapterRepo.findAll()
                .stream()
                .filter(chapter -> chapter.getActivityMap().hasActivity(activity))
                .findAny()
                .orElse(null);
    }
}
