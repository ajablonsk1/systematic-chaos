package com.example.api.service.validator;

import com.example.api.dto.request.user.rank.AddRankForm;
import com.example.api.dto.request.user.rank.EditRankForm;
import com.example.api.error.exception.EntityNotFoundException;
import com.example.api.error.exception.ExceptionMessage;
import com.example.api.error.exception.RequestValidationException;
import com.example.api.model.user.Rank;
import com.example.api.repo.user.RankRepo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Objects;

@Component
@Slf4j
@Transactional
@RequiredArgsConstructor
public class RankValidator {
    private final RankRepo rankRepo;

    public void validateRankIsNotNull(Rank rank, Long id) throws EntityNotFoundException {
        if (rank == null) {
            log.error("Rank with id {} does not exist!", id);
            throw new EntityNotFoundException("Rank with id " + id + " does not exist!");
        }
    }

    public void validateEditRankForm(EditRankForm form, Rank rank, Long id) throws RequestValidationException {
        validateRankIsNotNull(rank, id);
        validateAddRankForm(form);
    }

    public void validateAddRankForm(AddRankForm form) throws RequestValidationException {
        if (form.getName().length() > 30) {
            log.error("Rank name cannot have more than 30 characters!");
            throw new RequestValidationException(ExceptionMessage.RANK_NAME_TOO_LONG);
        }
        List<Rank> ranks = rankRepo.findAll()
                .stream()
                .filter(rank -> rank.getHeroType() == form.getType())
                .toList();
        if (ranks.stream().anyMatch(rank -> Objects.equals(rank.getMinPoints(), form.getMinPoints()))) {
            log.error("Two ranks cannot have the same minPoint");
            throw new RequestValidationException(ExceptionMessage.SAME_RANK_MIN_POINTS);
        }
    }
}
