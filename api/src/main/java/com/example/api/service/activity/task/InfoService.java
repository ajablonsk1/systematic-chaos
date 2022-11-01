package com.example.api.service.activity.task;

import com.example.api.dto.request.activity.task.create.CreateInfoChapterForm;
import com.example.api.dto.request.activity.task.create.CreateInfoForm;
import com.example.api.dto.request.activity.task.edit.EditInfoForm;
import com.example.api.dto.response.activity.task.InfoResponse;
import com.example.api.error.exception.EntityNotFoundException;
import com.example.api.error.exception.RequestValidationException;
import com.example.api.model.activity.task.Info;
import com.example.api.model.map.Chapter;
import com.example.api.model.user.User;
import com.example.api.model.util.Url;
import com.example.api.repo.activity.task.InfoRepo;
import com.example.api.repo.map.ChapterRepo;
import com.example.api.repo.user.UserRepo;
import com.example.api.repo.util.UrlRepo;
import com.example.api.security.AuthenticationService;
import com.example.api.service.map.RequirementService;
import com.example.api.service.validator.ChapterValidator;
import com.example.api.service.validator.UserValidator;
import com.example.api.service.validator.activity.ActivityValidator;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.LinkedList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class InfoService {
    private final InfoRepo infoRepo;
    private final ChapterRepo chapterRepo;
    private final ActivityValidator activityValidator;
    private final AuthenticationService authService;
    private final UserRepo userRepo;
    private final UserValidator userValidator;
    private final UrlRepo urlRepo;
    private final RequirementService requirementService;
    private final ChapterValidator chapterValidator;

    public Info saveInfo(Info info){
        return infoRepo.save(info);
    }

    public InfoResponse getInfo(Long id) throws EntityNotFoundException {
        log.info("Fetching info");
        Info info = infoRepo.findInfoById(id);
        activityValidator.validateActivityIsNotNull(info, id);
        List<String> urls = info.getImageUrls()
                .stream()
                .map(Url::getUrl)
                .toList();
        return new InfoResponse(info.getTitle(), info.getDescription(), urls, info.getContent());
    }

    public void createInfo(CreateInfoChapterForm chapterForm) throws RequestValidationException {
        log.info("Starting the creation of info");
        CreateInfoForm form = chapterForm.getForm();
        Chapter chapter = chapterRepo.findChapterById(chapterForm.getChapterId());

        chapterValidator.validateChapterIsNotNull(chapter, chapterForm.getChapterId());
        activityValidator.validateCreateInfoForm(form);
        activityValidator.validateActivityPosition(form, chapter);

        String email = authService.getAuthentication().getName();
        User professor = userRepo.findUserByEmail(email);
        userValidator.validateProfessorAccount(professor, email);

        List<Url> imageUrls = form.getImageUrls()
                .stream()
                .map(url -> new Url(null, url))
                .toList();
        urlRepo.saveAll(imageUrls);

        Info info = new Info(
                form,
                professor,
                imageUrls
        );
        info.setRequirements(requirementService.getDefaultRequirements(true));
        infoRepo.save(info);
        chapter.getActivityMap().getInfos().add(info);
    }

    public List<Info> getStudentInfos() {
        return infoRepo.findAll()
                .stream()
                .filter(info -> !info.getIsBlocked())
                .toList();
    }

    public void editInfo(Info info, EditInfoForm form) {
        CreateInfoForm infoForm = (CreateInfoForm) form.getActivityBody();
        info.setContent(infoForm.getInfoContent());
        editImageUrls(info, infoForm.getImageUrls());
    }

    private void editImageUrls(Info info, List<String> newUrlsString) {
        List<Url> remainingUrls = info.getImageUrls()
                .stream()
                .filter(oldUrl -> newUrlsString.stream().anyMatch(newUrl -> oldUrl.getUrl().equals(newUrl)))
                .toList();
        List<Url> newUrls = newUrlsString
                .stream()
                .filter(newUrlString -> remainingUrls.stream().noneMatch(remainingUrl -> remainingUrl.getUrl().equals(newUrlString)))
                .map(newUrlString -> {
                    Url newUrl = new Url();
                    newUrl.setUrl(newUrlString);
                    return newUrl;
                })
                .toList();
        urlRepo.saveAll(newUrls);
        List<Url> updatedUrls = new LinkedList<>();
        updatedUrls.addAll(remainingUrls);
        updatedUrls.addAll(newUrls);
        info.setImageUrls(updatedUrls);

    }


}
