package com.example.api.unit.service.activity.result;

import com.example.api.dto.request.activity.task.SaveFileToFileTaskResultForm;
import com.example.api.error.exception.EntityNotFoundException;
import com.example.api.error.exception.WrongUserTypeException;
import com.example.api.model.activity.result.FileTaskResult;
import com.example.api.model.activity.task.FileTask;
import com.example.api.model.user.AccountType;
import com.example.api.model.user.User;
import com.example.api.model.util.File;
import com.example.api.repo.activity.result.FileTaskResultRepo;
import com.example.api.repo.activity.task.FileTaskRepo;
import com.example.api.repo.user.UserRepo;
import com.example.api.repo.util.FileRepo;
import com.example.api.security.AuthenticationService;
import com.example.api.service.activity.result.FileTaskResultService;
import com.example.api.service.validator.UserValidator;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.mockito.Captor;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.security.core.Authentication;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

import java.io.IOException;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;

public class FileTaskResultServiceTest {
    private FileTaskResultService fileTaskResultService;
    @Mock private FileTaskResultRepo fileTaskResultRepo;
    @Mock private FileTaskRepo fileTaskRepo;
    @Mock private UserRepo userRepo;
    @Mock private FileRepo fileRepo;
    @Mock private UserValidator userValidator;
    @Mock private AuthenticationService authService;
    @Mock private Authentication authentication;
    FileTaskResult result;
    FileTask fileTask;
    @Captor  ArgumentCaptor<Long> idArgumentCaptor;
    @Captor ArgumentCaptor<String> stringArgumentCaptor;
    @Captor ArgumentCaptor<User> userArgumentCaptor;
    @Captor ArgumentCaptor<FileTask> fileTaskArgumentCaptor;
    @Captor ArgumentCaptor<FileTaskResult> fileTaskResultArgumentCaptor;

    @BeforeEach
    public void init() {
        MockitoAnnotations.openMocks(this);
        fileTaskResultService = new FileTaskResultService(
                fileTaskResultRepo,
                fileTaskRepo,
                userRepo,
                fileRepo,
                userValidator,
                authService
        );
        fileTask = new FileTask();
        result = new FileTaskResult();
        result.setFileTask(fileTask);
    }

    @Test
    public void saveFileTaskResult() {
        //given
        //when
        fileTaskResultService.saveFileTaskResult(result);
        //then
        verify(fileTaskResultRepo).save(fileTaskResultArgumentCaptor.capture());
        FileTaskResult capturedResult = fileTaskResultArgumentCaptor.getValue();
        assertThat(capturedResult).isEqualTo(result);
    }

    @Test
    public void saveFileToFileTaskResultWhenFileIsNull() throws WrongUserTypeException, EntityNotFoundException, IOException {
        //given
        User user = new User();
        user.setEmail("random@email.com");
        user.setAccountType(AccountType.STUDENT);
        SaveFileToFileTaskResultForm form = new SaveFileToFileTaskResultForm(
                fileTask.getId(),
                "",
                new MockMultipartFile("randomName", new byte[1024]),
                null
        );
        given(authService.getAuthentication()).willReturn(authentication);
        given(authentication.getName()).willReturn("random@email.com");
        given(fileTaskRepo.findFileTaskById(fileTask.getId())).willReturn(fileTask);
        given(userRepo.findUserByEmail(user.getEmail())).willReturn(user);
        given(fileTaskResultRepo.findFileTaskResultByFileTaskAndUser(fileTask, user)).willReturn(result);

        //when
        fileTaskResultService.saveFileToFileTaskResult(form);

        //then
        verify(fileTaskRepo).findFileTaskById(idArgumentCaptor.capture());
        verify(userRepo).findUserByEmail(stringArgumentCaptor.capture());
        verify(fileTaskResultRepo).findFileTaskResultByFileTaskAndUser(fileTaskArgumentCaptor.capture(),
                userArgumentCaptor.capture());
        Long capturedId = idArgumentCaptor.getValue();
        String capturedEmail = stringArgumentCaptor.getValue();
        User capturedUser = userArgumentCaptor.getValue();
        FileTask capturedFileTask = fileTaskArgumentCaptor.getValue();
        assertThat(capturedId).isEqualTo(fileTask.getId());
        assertThat(capturedEmail).isEqualTo(user.getEmail());
        assertThat(capturedUser).isEqualTo(user);
        assertThat(capturedFileTask).isEqualTo(fileTask);
    }

    @Test
    public void saveFileToFileTaskResultThrowEntityNotFoundException() {
        //given
        User user = new User();
        user.setEmail("random@email.com");
        SaveFileToFileTaskResultForm form = new SaveFileToFileTaskResultForm(
                fileTask.getId(),
                "",
                new MockMultipartFile("randomName", new byte[1024]),
                null
        );
        given(authService.getAuthentication()).willReturn(authentication);
        given(authentication.getName()).willReturn("random@email.com");

        //when
        //then
        assertThatThrownBy(() -> fileTaskResultService.saveFileToFileTaskResult(form))
                .isInstanceOf(EntityNotFoundException.class)
                .hasMessageContaining("File task with given id " + fileTask.getId() + " does not exist");
    }

    @Test
    public void saveFileToFileTaskResultWhenResultIsNull() throws WrongUserTypeException, EntityNotFoundException, IOException {
        //given
        User user = new User();
        user.setEmail("random@email.com");
        user.setAccountType(AccountType.STUDENT);
        SaveFileToFileTaskResultForm form = new SaveFileToFileTaskResultForm(
                fileTask.getId(),
                "",
                new MockMultipartFile("randomName", new byte[1024]),
                null
        );
        given(authService.getAuthentication()).willReturn(authentication);
        given(authentication.getName()).willReturn("random@email.com");
        given(fileTaskRepo.findFileTaskById(fileTask.getId())).willReturn(fileTask);
        given(userRepo.findUserByEmail(user.getEmail())).willReturn(user);
        given(fileTaskResultRepo.findFileTaskResultByFileTaskAndUser(fileTask, user)).willReturn(null);

        //when
        fileTaskResultService.saveFileToFileTaskResult(form);

        //then
        verify(fileTaskRepo, times(2)).findFileTaskById(idArgumentCaptor.capture());
        verify(userRepo, times(2)).findUserByEmail(stringArgumentCaptor.capture());
        Long capturedId = idArgumentCaptor.getValue();
        String capturedEmail = stringArgumentCaptor.getValue();
        assertThat(capturedId).isEqualTo(fileTask.getId());
        assertThat(capturedEmail).isEqualTo(user.getEmail());
    }

    @Test
    public void saveFileToFileTaskResultWhenOpenAnswerIsNull() throws WrongUserTypeException, EntityNotFoundException, IOException {
        //given
        User user = new User();
        user.setEmail("random@email.com");
        user.setAccountType(AccountType.STUDENT);
        SaveFileToFileTaskResultForm form = new SaveFileToFileTaskResultForm(
                fileTask.getId(),
                null,
                new MockMultipartFile("randomName", new byte[1024]),
                ""
        );
        given(authService.getAuthentication()).willReturn(authentication);
        given(authentication.getName()).willReturn("random@email.com");
        given(fileTaskRepo.findFileTaskById(fileTask.getId())).willReturn(fileTask);
        given(userRepo.findUserByEmail(user.getEmail())).willReturn(user);
        given(fileTaskResultRepo.findFileTaskResultByFileTaskAndUser(fileTask, user)).willReturn(result);

        //when
        fileTaskResultService.saveFileToFileTaskResult(form);

        //then
        verify(fileTaskRepo).findFileTaskById(idArgumentCaptor.capture());
        verify(userRepo).findUserByEmail(stringArgumentCaptor.capture());
        verify(fileTaskResultRepo).findFileTaskResultByFileTaskAndUser(fileTaskArgumentCaptor.capture(),
                userArgumentCaptor.capture());
        Long capturedId = idArgumentCaptor.getValue();
        String capturedEmail = stringArgumentCaptor.getValue();
        User capturedUser = userArgumentCaptor.getValue();
        FileTask capturedFileTask = fileTaskArgumentCaptor.getValue();
        assertThat(capturedId).isEqualTo(fileTask.getId());
        assertThat(capturedEmail).isEqualTo(user.getEmail());
        assertThat(capturedUser).isEqualTo(user);
        assertThat(capturedFileTask).isEqualTo(fileTask);
    }

    @Test
    public void deleteFileFromFileTask() throws WrongUserTypeException, EntityNotFoundException {
        //given
        User user = new User();
        user.setEmail("random@email.com");
        user.setAccountType(AccountType.STUDENT);
        given(authService.getAuthentication()).willReturn(authentication);
        given(authentication.getName()).willReturn("random@email.com");
        given(fileTaskRepo.findFileTaskById(fileTask.getId())).willReturn(fileTask);
        given(userRepo.findUserByEmail(user.getEmail())).willReturn(user);
        given(fileTaskResultRepo.findFileTaskResultByFileTaskAndUser(fileTask, user)).willReturn(result);
        result.getFiles().add(new File());

        //when
        fileTaskResultService.deleteFileFromFileTask(fileTask.getId(), 0);

        //then
        verify(fileTaskRepo).findFileTaskById(idArgumentCaptor.capture());
        verify(userRepo).findUserByEmail(stringArgumentCaptor.capture());
        verify(fileTaskResultRepo).findFileTaskResultByFileTaskAndUser(fileTaskArgumentCaptor.capture(),
                userArgumentCaptor.capture());
        Long capturedId = idArgumentCaptor.getValue();
        String capturedEmail = stringArgumentCaptor.getValue();
        User capturedUser = userArgumentCaptor.getValue();
        FileTask capturedFileTask = fileTaskArgumentCaptor.getValue();
        assertThat(capturedId).isEqualTo(fileTask.getId());
        assertThat(capturedEmail).isEqualTo(user.getEmail());
        assertThat(capturedUser).isEqualTo(user);
        assertThat(capturedFileTask).isEqualTo(fileTask);
    }

    @Test
    public void getFileById() throws EntityNotFoundException {
        //given
        File file = new File();
        file.setFile(new byte[1024]);
        given(fileRepo.findFileById(file.getId())).willReturn(file);

        //when
        fileTaskResultService.getFileById(file.getId());

        //then
        verify(fileRepo).findFileById(idArgumentCaptor.capture());
        Long capturedId = idArgumentCaptor.getValue();
        assertThat(capturedId).isEqualTo(file.getId());
    }

    @Test
    public void getFileByIdThrowEntityNotFoundException() {
        //given
        File file = new File();

        //when
        //then
        assertThatThrownBy(() -> fileTaskResultService.getFileById(file.getId()))
                .isInstanceOf(EntityNotFoundException.class)
                .hasMessageContaining("File with given id " + file.getId() + " does not exist");
    }
}
