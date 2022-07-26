package com.example.api.service.group;

import com.example.api.model.group.AccessDate;
import com.example.api.repo.group.AccessDateRepo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class AccessDateService {
    private final AccessDateRepo accessDateRepo;

    public AccessDate saveAccessDate(AccessDate accessDate){
        return accessDateRepo.save(accessDate);
    }
}
