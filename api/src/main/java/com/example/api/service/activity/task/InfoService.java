package com.example.api.service.activity.task;

import com.example.api.dto.response.task.InfoResponse;
import com.example.api.error.exception.EntityNotFoundException;
import com.example.api.model.activity.task.Info;
import com.example.api.model.util.Url;
import com.example.api.repo.activity.task.InfoRepo;
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

    public Info saveInfo(Info info){
        return infoRepo.save(info);
    }

    public InfoResponse getInfo(Long id) throws EntityNotFoundException {
        log.info("Fetching info");
        Info info = infoRepo.findInfoById(id);
        if(info == null) {
            log.error("Info with id {} not found in database", id);
            throw new EntityNotFoundException("Info with id" + id + " not found in database");
        }
        List<String> urls = info.getImageUrls()
                .stream()
                .map(Url::getUrl)
                .toList();
        return new InfoResponse(info.getName(), info.getDescription(), urls);
    }
}
