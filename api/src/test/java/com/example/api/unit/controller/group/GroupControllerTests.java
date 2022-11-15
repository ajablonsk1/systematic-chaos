package com.example.api.unit.controller.group;

import com.example.api.controller.group.GroupController;
import com.example.api.model.group.Group;
import com.example.api.service.group.GroupService;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(GroupController.class)
public class GroupControllerTests {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private GroupController groupController;

    @MockBean
    private GroupService service;

    @MockBean
    private UserDetailsService userDetailsService;

    @MockBean
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    private ObjectWriter jsonWriter;
    private Group group1;
    private Group group2;

    @BeforeEach
    public void init() {
        MockitoAnnotations.openMocks(this);
        jsonWriter = new ObjectMapper().writer().withDefaultPrettyPrinter();
        group1 = new Group();
        group2 = new Group();
        group1.setName("G1");
        group2.setName("G2");
        group1.setInvitationCode("Code1");
        group2.setInvitationCode("Code 2");
    }

//    @Test
//    @Disabled
//    public void saveGroupTest() throws Exception {
//        when(service.saveGroup((Group) any())).thenReturn(group1);
//
//        mockMvc.perform(
//                    post("/group")
//                            .contentType(MediaType.APPLICATION_JSON)
//                            .content(jsonWriter.writeValueAsString(group1))
//                )
//                .andExpect(status().isOk())
//                // TODO: fix tests to return body
//                // .andExpect(content().string(containsString(group1.getName())))
//                // .andExpect(content().string(containsString(group1.getInvitationCode())))
//                .andReturn();
//    }
}