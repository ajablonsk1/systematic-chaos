package com.example.api.service.map;

import com.example.api.dto.response.map.ChapterInfoResponse;
import com.example.api.dto.response.map.ChapterResponse;
import com.example.api.dto.response.map.task.MapTask;
import com.example.api.model.map.Chapter;
import com.example.api.repo.map.ChapterRepo;
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

    public List<ChapterResponse> getAllChapters() {
        List<Chapter> chapters = chapterRepo.findAll();
        return chapters.stream().map(ChapterResponse::new).toList();
    }

    public ChapterInfoResponse getChapterInfo(Long id) {
        Chapter chapter = chapterRepo.findChapterById(id);
        List<MapTask> allTasks = activityMapService.getMapTasks(chapter.getActivityMap());
        return new ChapterInfoResponse(chapter, allTasks);
    }
}
