package com.example.api.service.validator;

import com.example.api.dto.request.user.AddRankForm;
import com.example.api.error.exception.RequestValidationException;
import com.example.api.model.user.Rank;
import com.example.api.repo.user.RankRepo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.util.List;

@Component
@Slf4j
@Transactional
@RequiredArgsConstructor
public class RankValidator {
    private final RankRepo rankRepo;

    public void validateAddRankForm(AddRankForm form) throws RequestValidationException {
        if (form.getName().length() > 30) {
            log.error("Rank name cannot have more than 30 characters!");
            throw new RequestValidationException("Rank name cannot have more than 30 characters!");
        }
        double minPoints = form.getMinPoints();
        double maxPoints = form.getMaxPoints();
        if (minPoints >= maxPoints) {
            log.error("minPoints cannot be greater than or equal to maxPoints!");
            throw new RequestValidationException("minPoints cannot be greater than or equal to maxPoints!");
        }
        List<Rank> ranks = rankRepo.findAll()
                .stream()
                .filter(rank -> rank.getHeroType() == form.getType())
                .toList();
        for (Rank rank: ranks) {
            if (rank.getMinPoints() <= form.getMinPoints() && rank.getMaxPoints() >= form.getMaxPoints()) {
                log.error("Points interval overlaps with existing rank: {}", rank.getName());
                throw new RequestValidationException("Points interval overlaps with existing rank: " + rank.getName());
            }
        }
    }
}
