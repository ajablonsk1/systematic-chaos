package com.example.api.service.question;

import com.example.api.model.question.Option;
import com.example.api.repo.question.OptionRepo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class OptionService {
    private final OptionRepo optionRepo;

    public Option saveOption(Option option) {
        return optionRepo.save(option);
    }

    public void saveAll(List<Option> options) {
        optionRepo.saveAll(options);
    }
}
