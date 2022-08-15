package com.example.api.service.activity.result.ranking;

import com.example.api.dto.response.ranking.RankingResponse;
import com.example.api.model.user.AccountType;
import com.example.api.model.user.User;
import com.example.api.repo.activity.result.FileTaskResultRepo;
import com.example.api.repo.activity.result.GraphTaskResultRepo;
import com.example.api.repo.user.UserRepo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Comparator;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;
import java.util.stream.DoubleStream;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class RankingService {
    private final UserRepo userRepo;
    private final GraphTaskResultRepo graphTaskResultRepo;
    private final FileTaskResultRepo fileTaskResultRepo;

    public List<RankingResponse> getRanking() {
        return userRepo.findAllByAccountTypeEquals(AccountType.STUDENT)
                .stream()
                .map(this::studentToRankingEntry)
                .sorted(Comparator.comparingDouble(RankingResponse::getPoints).reversed())
                .collect(Collectors.toList());
    }

    public List<RankingResponse> getRankingForGroup(String groupName) {
        return userRepo.findAllByAccountTypeEquals(AccountType.STUDENT)
                .stream()
                .filter(student -> Objects.equals(student.getGroup().getName(), groupName))
                .map(this::studentToRankingEntry)
                .sorted(Comparator.comparingDouble(RankingResponse::getPoints).reversed())
                .collect(Collectors.toList());
    }

    public List<RankingResponse> getSearchedRanking(String search) {
        String searchLower = search.toLowerCase();
        return userRepo.findAllByAccountTypeEquals(AccountType.STUDENT)
                .stream()
                .filter(student ->
                                student.getFirstName().toLowerCase().contains(searchLower) ||
                                student.getLastName().toLowerCase().contains(searchLower) ||
                                student.getHeroType().toString().toLowerCase().contains(searchLower) ||
                                student.getGroup().getName().toLowerCase().contains(searchLower))
                .map(this::studentToRankingEntry)
                .sorted(Comparator.comparingDouble(RankingResponse::getPoints).reversed())
                .collect(Collectors.toList());
    }

    private RankingResponse studentToRankingEntry(User student) {
        RankingResponse rankingResponse = new RankingResponse(student);
        rankingResponse.setPoints(getStudentPoints(student));
        return rankingResponse;
    }

    private Double getGraphTaskPoints(User student) {
        return graphTaskResultRepo.findAllByUser(student)
                .stream()
                .mapToDouble(task -> {
                    try {
                        return task.getPointsReceived();
                    } catch (Exception e) {
                        log.info("GraphTaskResult with id {} not checked yet", task.getId());
                    }
                    return 0.0;
                })
                .sum();
    }

    private Double getFileTaskPoints(User student) {
        return fileTaskResultRepo.findAllByUser(student)
                .stream()
                .mapToDouble(task -> {
                    try {
                        return task.getPointsReceived();
                    } catch (Exception e) {
                        log.info("FileTaskResult with id {} not checked yet", task.getId());
                    }
                    return 0.0;
                }).sum();
    }

    private Double getStudentPoints(User student) {
        Double graphTaskPoints = getGraphTaskPoints(student);
        Double fileTaskPoints = getFileTaskPoints(student);
        return DoubleStream.of(graphTaskPoints, fileTaskPoints).sum();
    }

}
