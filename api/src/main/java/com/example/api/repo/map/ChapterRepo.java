package com.example.api.repo.map;

import com.example.api.model.activity.task.Activity;
import com.example.api.model.map.Chapter;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChapterRepo extends JpaRepository<Chapter, Long> {
    Chapter findChapterById(Long id);
    Long deleteChapterById(Long id);
    Chapter findChapterByActivityMapContaining(Activity activity);
}
