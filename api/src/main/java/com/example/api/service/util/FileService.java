package com.example.api.service.util;

import com.example.api.model.util.File;
import com.example.api.model.util.Image;
import com.example.api.model.util.ImageType;
import com.example.api.repo.util.FileRepo;
import com.example.api.repo.util.ImageRepo;
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
    private final ImageRepo imageRepo;

    public List<Image> getImagesForChapter() {
        return imageRepo.findAll()
                .stream()
                .filter(image -> image.getType() == ImageType.CHAPTER)
                .toList();
    }
}
