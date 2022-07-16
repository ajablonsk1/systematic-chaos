package com.example.api.service.group;

import com.example.api.dto.request.group.SaveGroupForm;
import com.example.api.dto.response.group.GroupCode;
import com.example.api.model.group.Group;
import com.example.api.repo.group.AccessDateRepo;
import com.example.api.repo.group.GroupRepo;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import java.util.List;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;


@ExtendWith(MockitoExtension.class)
@ExtendWith(SpringExtension.class)
public class GroupServiceTests {
    @Mock private GroupRepo groupRepo;
    @Mock private AccessDateRepo accessDateRepo;

    private GroupService groupService;
    private Group group1;
    private Group group2;

    @BeforeEach
    public void init() {
        MockitoAnnotations.openMocks(this);
        groupService = new GroupService(groupRepo, accessDateRepo);
        group1 = new Group();
        group2 = new Group();
        group1.setName("G1");
        group2.setName("G2");
        group1.setInvitationCode("Code1");
        group2.setInvitationCode("Code 2");
    }

    @Test
    public void saveGroupByFormTest() {
        // given
        SaveGroupForm saveGroupForm = new SaveGroupForm();
        saveGroupForm.setName(group1.getName());
        saveGroupForm.setInvitationCode(group1.getInvitationCode());
        when(groupRepo.save(any())).thenReturn(group1);

        //when
        Group result = groupService.saveGroup(saveGroupForm);

        //then
        Assertions.assertEquals(group1.getName(), result.getName());
    }

    @Test
    public void saveGroupTest() {
        // given
        when(groupRepo.save(any())).thenReturn(group1);

        //when
        Group result = groupService.saveGroup(group1);

        //then
        Assertions.assertEquals(group1.getName(), result.getName());
    }

    @Test
    public void getGroupCodeListTest() {
        // given
        when(groupRepo.findAll()).thenReturn(List.of(group1, group2));

        // when
        List<GroupCode> result = groupService.getInvitationCodeList();

        // then
        Assertions.assertEquals(result.size(), 2);
        Assertions.assertEquals(result, List.of(new GroupCode(group1), new GroupCode(group2)));

    }

    @Test
    public void getEmptyGroupCodeListTest() {
        // given
        when(groupRepo.findAll()).thenReturn(List.of());

        // when
        List<GroupCode> result = groupService.getInvitationCodeList();

        // then
        Assertions.assertEquals(result.size(), 0);
        Assertions.assertEquals(result, List.of());

    }
}
