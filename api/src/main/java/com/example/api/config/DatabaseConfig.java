package com.example.api.config;

import com.example.api.model.user.Role;
import com.example.api.model.user.User;
import com.example.api.service.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@RequiredArgsConstructor
public class DatabaseConfig {
    private final UserService userService;

    @Bean
    public CommandLineRunner commandLineRunner(UserService userService){
        return args -> {
            User user = new User();
            user.setEmail("student@email.com");
            user.setPassword("1234");
            user.setRole(Role.STUDENT);
            userService.saveUser(user);
        };
    }
}
