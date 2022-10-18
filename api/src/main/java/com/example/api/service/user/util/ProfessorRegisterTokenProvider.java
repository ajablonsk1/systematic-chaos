package com.example.api.service.user.util;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.Random;

@Service
@Slf4j
@RequiredArgsConstructor
public class ProfessorRegisterTokenProvider {
    private final static int SIGN_FROM = '0';
    private final static int SIGN_TO = 'z';
    private final static int TOKEN_LENGTH = 64;
    private final static int REFRESH_TIME_IN_MINUTES = 30;
    private final ProfessorRegisterToken professorRegisterToken;

    @Scheduled(fixedRate = REFRESH_TIME_IN_MINUTES * 60 * 1_000)
    @Async
    public void updateProfessorRegisterToken() {
        professorRegisterToken.setToken(generateToken());
        log.info("ProfessorRegisterToken has been changed to {}", professorRegisterToken.getToken());
    }

    private String generateToken() {
        Random random = new Random();

        return random.ints(SIGN_FROM, SIGN_TO + 1)
                .filter(i -> (i <= '9' || i >= 'A') && (i <= 'Z' || i >= 'a'))
                .limit(TOKEN_LENGTH)
                .collect(StringBuilder::new, StringBuilder::appendCodePoint, StringBuilder::append)
                .toString();
    }
}
