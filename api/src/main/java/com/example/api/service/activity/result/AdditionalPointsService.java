package com.example.api.service.activity.result;

import com.example.api.dto.request.activity.result.AddAdditionalPointsForm;
import com.example.api.dto.response.activity.task.result.AdditionalPointsResponse;
import com.example.api.error.exception.WrongUserTypeException;
import com.example.api.model.activity.result.AdditionalPoints;
import com.example.api.model.user.User;
import com.example.api.repo.activity.result.AdditionalPointsRepo;
import com.example.api.repo.user.UserRepo;
import com.example.api.security.AuthenticationService;
import com.example.api.service.validator.UserValidator;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class AdditionalPointsService {
    private final AdditionalPointsRepo additionalPointsRepo;
    private final UserRepo userRepo;
    private final AuthenticationService authService;
    private final UserValidator userValidator;

    public void saveAdditionalPoints(AddAdditionalPointsForm form) throws WrongUserTypeException {
        log.info("Saving additional points for student with id {}", form.getStudentId());
        User user = userRepo.findUserById(form.getStudentId());
        userValidator.validateStudentAccount(user, form.getStudentId());
        String professorEmail = authService.getAuthentication().getName();
        AdditionalPoints additionalPoints = new AdditionalPoints(null,
                user,
                form.getPoints(),
                form.getDateInMillis(),
                professorEmail,
                "");
        if (form.getDescription() != null) {
            additionalPoints.setDescription(form.getDescription());
        }
        additionalPointsRepo.save(additionalPoints);
    }

    public List<AdditionalPointsResponse> getAdditionalPoints() {
        String email = authService.getAuthentication().getName();
        return getAdditionalPoints(email);
    }

    public List<AdditionalPointsResponse> getAdditionalPoints(String email) {
        User user = userRepo.findUserByEmail(email);
        log.info("Fetching additional points for user {}", email);
        List<AdditionalPoints> additionalPoints = additionalPointsRepo.findAllByUser(user);
        return additionalPoints.stream()
                .map(additionalPoint -> {
                    String professorEmail = additionalPoint.getProfessorEmail();
                    User professor = userRepo.findUserByEmail(professorEmail);
                    String professorName = professor.getFirstName() + " " + professor.getLastName();
                    return new AdditionalPointsResponse(additionalPoint.getSendDateMillis(),
                            professorName,
                            additionalPoint.getPointsReceived(),
                            additionalPoint.getDescription());
                })
                .sorted(((o1, o2) -> Long.compare(o2.getDateMillis(), o1.getDateMillis())))
                .toList();
    }
}
