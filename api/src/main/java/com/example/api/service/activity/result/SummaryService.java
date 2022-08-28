package com.example.api.service.activity.result;

import com.example.api.dto.response.activity.task.result.summary.SummaryResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class SummaryService {
    public SummaryResponse getSummary() {
        return null;
    }
}
