package com.example.api.service.util;

import com.example.api.model.util.File;
import com.example.api.repo.util.FileRepo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class FileService {
    private final FileRepo fileRepo;

    public List<File> getImagesForChapter() {
        return fileRepo.findAll()
                .stream()
                .filter(file -> file.getName() != null)
                .filter(file -> file.getName().startsWith("Chapter image"))
                .toList();
    }
}
