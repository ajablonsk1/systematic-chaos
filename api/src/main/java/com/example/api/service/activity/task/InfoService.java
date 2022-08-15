package com.example.api.service.activity.task;

import com.example.api.dto.response.activity.task.InfoResponse;
import com.example.api.error.exception.EntityNotFoundException;
import com.example.api.model.activity.task.Info;
import com.example.api.model.util.Url;
import com.example.api.repo.activity.task.InfoRepo;
import com.example.api.service.validator.ActivityValidator;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class InfoService {
    private final InfoRepo infoRepo;
    private final ActivityValidator activityValidator;

    public Info saveInfo(Info info){
        return infoRepo.save(info);
    }

    public InfoResponse getInfo(Long id) throws EntityNotFoundException {
        log.info("Fetching info");
        Info info = infoRepo.findInfoById(id);
        activityValidator.validateActivityIsNotNull(info, id);
        List<String> urls = info.getImageUrls()
                .stream()
                .map(Url::getUrl)
                .toList();
        return new InfoResponse(info.getName(), info.getDescription(), urls);
    }
}
