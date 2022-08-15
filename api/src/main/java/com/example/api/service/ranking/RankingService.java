package com.example.api.service.ranking;

import com.example.api.dto.response.ranking.RankingEntry;
import com.example.api.model.user.AccountType;
import com.example.api.model.user.User;
import com.example.api.repo.activity.result.FileTaskResultRepo;
import com.example.api.repo.activity.result.GraphTaskResultRepo;
import com.example.api.repo.user.UserRepo;
import com.example.api.service.activity.feedback.ProfessorFeedbackService;
import com.example.api.service.activity.result.GraphTaskResultService;
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
    private final GraphTaskResultService graphTaskResultService;
    private final ProfessorFeedbackService professorFeedbackService;

    public List<RankingEntry> getRanking() {
        return userRepo.findAllByAccountTypeEquals(AccountType.STUDENT)
                .stream()
                .map(this::studentToRankingEntry)
                .sorted(Comparator.comparingDouble(RankingEntry::getPoints).reversed())
                .collect(Collectors.toList());
    }

    public List<RankingEntry> getRankingForGroup(String groupName) {
        return userRepo.findAllByAccountTypeEquals(AccountType.STUDENT)
                .stream()
                .filter(student -> Objects.equals(student.getGroup().getName(), groupName))
                .map(this::studentToRankingEntry)
                .sorted(Comparator.comparingDouble(RankingEntry::getPoints).reversed())
                .collect(Collectors.toList());
    }

    public List<RankingEntry> getSearchedRanking(String search) {
        String searchLower = search.toLowerCase();
        return userRepo.findAllByAccountTypeEquals(AccountType.STUDENT)
                .stream()
                .filter(student ->
                                student.getFirstName().toLowerCase().contains(searchLower) ||
                                student.getLastName().toLowerCase().contains(searchLower) ||
                                student.getHeroType().toString().toLowerCase().contains(searchLower) ||
                                student.getGroup().getName().toLowerCase().contains(searchLower))
                .map(this::studentToRankingEntry)
                .sorted(Comparator.comparingDouble(RankingEntry::getPoints).reversed())
                .collect(Collectors.toList());
    }

    private RankingEntry studentToRankingEntry(User student) {
        RankingEntry rankingEntry = new RankingEntry(student);
        rankingEntry.setPoints(getStudentPoints(student));
        return rankingEntry;
    }

    private Double getGraphTaskPoints(User student) {
        return graphTaskResultRepo.findAllByUser(student)
                .stream()
                .mapToDouble(task -> {
                    try {
                        return graphTaskResultService.getAndSetAllPoints(task.getId());
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
                        return professorFeedbackService.getProfessorFeedbackForFileTaskResult(task.getId()).getPoints();
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
