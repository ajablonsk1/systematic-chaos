package com.example.api.service.activity.task;

import com.example.api.dto.request.activity.task.create.CreateSurveyChapterForm;
import com.example.api.dto.request.activity.task.create.CreateSurveyForm;
import com.example.api.dto.request.activity.task.edit.EditSurveyForm;
import com.example.api.dto.response.activity.result.SurveyResultInfoResponse;
import com.example.api.dto.response.activity.task.SurveyInfoResponse;
import com.example.api.error.exception.EntityNotFoundException;
import com.example.api.error.exception.RequestValidationException;
import com.example.api.error.exception.WrongUserTypeException;
import com.example.api.model.activity.result.SurveyResult;
import com.example.api.model.activity.task.Survey;
import com.example.api.model.map.Chapter;
import com.example.api.model.user.User;
import com.example.api.repo.activity.result.SurveyResultRepo;
import com.example.api.repo.activity.task.SurveyRepo;
import com.example.api.repo.map.ChapterRepo;
import com.example.api.repo.user.UserRepo;
import com.example.api.security.AuthenticationService;
import com.example.api.service.map.RequirementService;
import com.example.api.service.validator.ChapterValidator;
import com.example.api.service.validator.UserValidator;
import com.example.api.service.validator.activity.ActivityValidator;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class SurveyService {
    private final SurveyRepo surveyRepo;
    private final UserRepo userRepo;
    private final ChapterRepo chapterRepo;
    private final ActivityValidator activityValidator;
    private final UserValidator userValidator;
    private final AuthenticationService authService;
    private final RequirementService requirementService;
    private final ChapterValidator chapterValidator;
    private final SurveyResultRepo surveyResultRepo;

    public Survey saveSurvey(Survey survey){
        return surveyRepo.save(survey);
    }

    public SurveyInfoResponse getSurveyInfo(Long id) throws EntityNotFoundException, WrongUserTypeException {
        String email = authService.getAuthentication().getName();
        User student = userRepo.findUserByEmail(email);
        userValidator.validateStudentAccount(student, email);
        Survey survey = surveyRepo.findSurveyById(id);
        activityValidator.validateActivityIsNotNull(survey, id);
        log.info("Fetching survey info");

        SurveyInfoResponse response = new SurveyInfoResponse(survey);
        SurveyResult feedback = surveyResultRepo.findSurveyResultBySurveyAndUser(survey, student);
        if (feedback != null) {
            response.setFeedback(new SurveyResultInfoResponse(feedback));
        }

        return response;
    }

    public void createSurvey(CreateSurveyChapterForm chapterForm) throws RequestValidationException {
        log.info("Starting the creation of survey");
        CreateSurveyForm form = chapterForm.getForm();
        Chapter chapter = chapterRepo.findChapterById(chapterForm.getChapterId());

        chapterValidator.validateChapterIsNotNull(chapter, chapterForm.getChapterId());
        activityValidator.validateCreateSurveyForm(form);
        activityValidator.validateActivityPosition(form, chapter);

        String email = authService.getAuthentication().getName();
        User professor = userRepo.findUserByEmail(email);
        userValidator.validateProfessorAccount(professor, email);

        Survey survey = new Survey(
                form,
                professor
        );
        survey.setRequirements(requirementService.getDefaultRequirements());
        surveyRepo.save(survey);
        chapter.getActivityMap().getSurveys().add(survey);
    }

    public List<Survey> getStudentSurvey(User student) {
        return surveyRepo.findAll()
                .stream()
                .filter(survey -> !requirementService.areRequirementsDefault(survey.getRequirements()))
                .toList();
    }

    public void editSurvey(Survey survey, EditSurveyForm form) {
        CreateSurveyForm surveyForm = (CreateSurveyForm) form.getActivityBody();
        survey.setPoints(surveyForm.getPoints());
    }
}
