package com.example.api.service.activity.result;

import com.example.api.model.user.AccountType;
import com.example.api.model.user.User;
import com.example.api.repo.activity.result.FileTaskResultRepo;
import com.example.api.repo.activity.result.GraphTaskResultRepo;
import com.example.api.repo.user.UserRepo;
import com.example.api.util.csv.CSVConverter;
import com.example.api.util.csv.CSVTaskResult;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Stream;

@Service
@RequiredArgsConstructor
@Slf4j
public class TaskResultService {
    private final UserRepo userRepo;
    private final GraphTaskResultRepo graphTaskResultRepo;
    private final FileTaskResultRepo fileTaskResultRepo;
    private final CSVConverter csvConverter;

    public ByteArrayResource getCSVFile(List<Long> ids) throws IOException {
        log.info("Fetching csv files for students");
        List<User> students = userRepo.findAll()
                .stream()
                .filter(user -> ids.contains(user.getId()))
                .filter(user -> user.getAccountType() == AccountType.STUDENT)
                .toList();
        Map<User, List<CSVTaskResult>> userToResultMap = new HashMap<>();
        students.forEach(student -> {
            List<CSVTaskResult> graphTaskResults = graphTaskResultRepo.findAll()
                    .stream()
                    .filter(result -> Objects.equals(result.getUser().getId(), student.getId()))
                    .map(CSVTaskResult::new)
                    .toList();
            List<CSVTaskResult> fileTaskResults = fileTaskResultRepo.findAll()
                    .stream()
                    .filter(result -> Objects.equals(result.getUser().getId(), student.getId()))
                    .map(CSVTaskResult::new)
                    .toList();
            List<CSVTaskResult> csvTaskResults = Stream.of(graphTaskResults, fileTaskResults)
                    .flatMap(List::stream)
                    .toList();
            userToResultMap.put(student, csvTaskResults);
        });
        return new ByteArrayResource(csvConverter.convertToByteArray(userToResultMap));
    }
}
