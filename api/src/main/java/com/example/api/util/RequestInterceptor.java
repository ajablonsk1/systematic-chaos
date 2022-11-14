package com.example.api.util;
import com.example.api.model.user.User;
import com.example.api.repo.user.UserRepo;
import com.example.api.security.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.AsyncHandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.FileWriter;
import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Locale;

@Component
@RequiredArgsConstructor
public class RequestInterceptor implements AsyncHandlerInterceptor {
    private final AuthenticationService authService;
    public static final String REQUEST_LOGGING_FILE_PATH = "./src/main/resources/logs/requests.log";

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) {
        return true;
    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws IOException {
        String email = authService.getAuthentication().getName();
        try (FileWriter fw = new FileWriter(REQUEST_LOGGING_FILE_PATH, true)) {
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss", Locale.GERMANY);
            LocalDateTime now = LocalDateTime.now();
            String appendedString = "[" +
                    formatter.format(now) +
                    "] " +
                    email +
                    ": " +
                    request.getMethod() +
                    " " +
                    request.getContextPath() +
                    request.getServletPath() +
                    "\n";
            fw.write(appendedString);
        }
    }
}