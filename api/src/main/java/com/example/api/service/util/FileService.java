package com.example.api.service.util;

import com.example.api.dto.response.util.ChapterImageResponse;
import com.example.api.error.exception.EntityNotFoundException;
import com.example.api.model.util.Image;
import com.example.api.model.util.ImageType;
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

    public List<ChapterImageResponse> getImagesForChapter() {
        log.info("Fetching all images for chapter");
        return imageRepo.findAll()
                .stream()
                .filter(image -> image.getType() == ImageType.CHAPTER)
                .map(image -> new ChapterImageResponse(image.getId(), image.getName(), image.getType()))
                .toList();
    }

    public Image getImage(Long id) throws EntityNotFoundException {
        log.info("Fetching image with id {}", id);
        Image image = imageRepo.findImageById(id);
        if (image == null) {
            log.error("Image with given id {} was not found", id);
            throw new EntityNotFoundException("Image with given id " + id + " was not found");
        }
        return image;
    }
}
