package com.example.api.service.validator;

import com.example.api.dto.request.user.rank.AddRankForm;
import com.example.api.dto.request.user.rank.EditRankForm;
import com.example.api.error.exception.EntityNotFoundException;
import com.example.api.error.exception.RequestValidationException;
import com.example.api.model.user.Rank;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import javax.transaction.Transactional;

@Component
@Slf4j
@Transactional
@RequiredArgsConstructor
public class RankValidator {

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
            throw new RequestValidationException("Rank name cannot have more than 30 characters!");
        }
    }
}
