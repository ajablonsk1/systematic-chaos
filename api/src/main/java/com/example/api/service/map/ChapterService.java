package com.example.api.service.map;

import com.example.api.dto.request.activity.task.requirement.RequirementForm;
import com.example.api.dto.request.map.ChapterForm;
import com.example.api.dto.request.map.ChapterRequirementForm;
import com.example.api.dto.request.map.EditChapterForm;
import com.example.api.dto.response.map.RequirementDTO;
import com.example.api.dto.response.map.RequirementResponse;
import com.example.api.dto.response.map.chapter.ChapterInfoResponse;
import com.example.api.dto.response.map.chapter.ChapterResponse;
import com.example.api.dto.response.map.chapter.ChapterResponseProfessor;
import com.example.api.dto.response.map.chapter.ChapterResponseStudent;
import com.example.api.dto.response.map.task.MapTask;
import com.example.api.error.exception.EntityNotFoundException;
import com.example.api.error.exception.RequestValidationException;
import com.example.api.error.exception.WrongUserTypeException;
import com.example.api.model.activity.task.Activity;
import com.example.api.model.map.ActivityMap;
import com.example.api.model.map.Chapter;
import com.example.api.model.map.requirement.Requirement;
import com.example.api.model.user.AccountType;
import com.example.api.model.user.User;
import com.example.api.model.util.File;
import com.example.api.repo.map.ChapterRepo;
import com.example.api.repo.user.UserRepo;
import com.example.api.repo.util.FileRepo;
import com.example.api.security.AuthenticationService;
import com.example.api.service.validator.ChapterValidator;
import com.example.api.service.validator.UserValidator;
import com.example.api.service.validator.activity.ActivityValidator;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class ChapterService {
    private final ChapterRepo chapterRepo;
    private final ActivityMapService activityMapService;
    private final FileRepo fileRepo;
    private final ActivityValidator activityValidator;
    private final ChapterValidator chapterValidator;
    private final AuthenticationService authService;
    private final UserValidator userValidator;
    private final UserRepo userRepo;
    private final RequirementService requirementService;

    public List<? extends ChapterResponse> getAllChapters() {
        log.info("Fetching all chapters");
        List<Chapter> chapters = chapterRepo.findAll();

        String email = authService.getAuthentication().getName();
        User user = userRepo.findUserByEmail(email);
        AccountType accountType = user.getAccountType();

        if (accountType == AccountType.STUDENT) {
            return chapters.stream()
                    .filter(chapter -> !chapter.getIsBlocked())
                    .map(chapter ->
                            new ChapterResponseStudent(
                                    chapter,
                                    requirementService.areRequirementsFulfilled(chapter.getRequirements())
                            )
                    )
                    .sorted(Comparator.comparingLong(ChapterResponse::getId))
                    .toList();
        } else {
            return chapters.stream()
                    .map(ChapterResponseProfessor::new)
                    .sorted(Comparator.comparingLong(ChapterResponse::getId))
                    .toList();
        }
    }

    public ChapterInfoResponse getChapterInfo(Long id) throws EntityNotFoundException {
        log.info("Fetching info for chapter with id {}", id);
        Chapter chapter = chapterRepo.findChapterById(id);
        chapterValidator.validateChapterIsNotNull(chapter, id);

        String email = authService.getAuthentication().getName();
        User user = userRepo.findUserByEmail(email);

        List<? extends MapTask> allTasks;
        if (user.getAccountType() == AccountType.STUDENT){
            allTasks = activityMapService.getMapTasksForStudent(chapter.getActivityMap(), user);
        } else {
            allTasks = activityMapService.getMapTasksForProfessor(chapter.getActivityMap(), user);
        }

        return new ChapterInfoResponse(chapter, allTasks);
    }

    public void createChapter(ChapterForm form) throws RequestValidationException {
        log.info("Creating new chapter");
        File image = fileRepo.findFileById(form.getImageId());
        activityValidator.validateFileIsNotNull(image, form.getImageId());
        chapterValidator.validateChapterCreation(form);
        ActivityMap activityMap = new ActivityMap(form.getSizeX(), form.getSizeY(), image);
        activityMapService.saveActivityMap(activityMap);
        Chapter chapter = new Chapter(form.getName(), activityMap, form.getPosX(), form.getPosY());
        chapter.setRequirements(requirementService.getDefaultRequirements(false));
        List<Chapter> allChapters = chapterRepo.findAll();
        chapterRepo.save(chapter);
        if (!allChapters.isEmpty()) {
            allChapters.forEach(chapter_ -> {
                if (chapter_.getNextChapter() == null) {
                    chapter_.setNextChapter(chapter);
                }
             });
        }
    }

    public Chapter getChapterWithActivity(Activity activity) {
        return chapterRepo.findAll()
                .stream()
                .filter(chapter -> chapter.getActivityMap().hasActivity(activity))
                .findAny()
                .orElse(null);
    }

    public void deleteChapter(Long chapterID) throws WrongUserTypeException, EntityNotFoundException {
        String email = authService.getAuthentication().getName();
        User professor = userRepo.findUserByEmail(email);
        userValidator.validateProfessorAccount(professor, email);

        Chapter chapter = chapterRepo.findChapterById(chapterID);
        chapterValidator.validateChapterIsNotNull(chapter, chapterID);

        Optional<Chapter> prevChapter = chapterRepo.findAll().stream().filter(ch -> chapter.equals(ch.getNextChapter()))
                .findAny();
        prevChapter.ifPresent(value -> value.setNextChapter(chapter.getNextChapter()));
        chapterRepo.deleteChapterById(chapterID);
    }

    public void editChapter(EditChapterForm editChapterForm) throws RequestValidationException {
        // user validation
        String email = authService.getAuthentication().getName();
        User professor = userRepo.findUserByEmail(email);
        userValidator.validateProfessorAccount(professor, email);

        ChapterForm chapterForm = editChapterForm.getEditionForm();

        // chapter validation for given editChapterForm
        Chapter chapter = chapterRepo.findChapterById(editChapterForm.getChapterId());
        chapterValidator.validateChapterIsNotNull(chapter, editChapterForm.getChapterId());
        chapterValidator.validatePositionTaken(chapterForm, chapter);
        chapterValidator.validateChapterEdition(chapterForm, chapter);
        chapterValidator.validateImageExists(chapterForm.getImageId());

        // edit basic chapter data
        chapter.setName(chapterForm.getName());
        chapter.setPosX(chapterForm.getPosX());
        chapter.setPosY(chapterForm.getPosY());

        // edit chapter activity map
        ActivityMap chapterMap = chapter.getActivityMap();
        chapterMap.setMapSizeX(chapterForm.getSizeX());
        chapterMap.setMapSizeY(chapterForm.getSizeY());
        chapterMap.setImage(fileRepo.findFileById(chapterForm.getImageId()));

        chapter.setActivityMap(chapterMap);
    }

    public RequirementResponse getRequirementsForChapter(Long chapterId) throws EntityNotFoundException {
        Chapter chapter = chapterRepo.findChapterById(chapterId);
        chapterValidator.validateChapterIsNotNull(chapter, chapterId);

        List<? extends RequirementDTO<?>> requirements = chapter.getRequirements()
                .stream()
                .map(Requirement::getResponse)
                .sorted(Comparator.comparingLong(RequirementDTO::getId))
                .toList();
        return new RequirementResponse(chapter.getIsBlocked(), requirements);
    }

    public void updateRequirementForChapter(ChapterRequirementForm form) throws RequestValidationException {
        Chapter chapter = chapterRepo.findChapterById(form.getChapterId());
        Boolean isBlocked = form.getIsBlocked();
        if(isBlocked != null) {
            chapter.setIsBlocked(isBlocked);
        }
        List<RequirementForm> requirementForms = form.getRequirements();
        requirementService.updateRequirements(requirementForms);
    }
}
