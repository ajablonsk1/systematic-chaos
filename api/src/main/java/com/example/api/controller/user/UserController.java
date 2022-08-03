package com.example.api.controller.user;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.example.api.dto.request.user.RegisterUserForm;
import com.example.api.dto.request.user.SetStudentGroupForm;
import com.example.api.dto.response.user.BasicStudent;
import com.example.api.error.exception.*;
import com.example.api.model.group.Group;
import com.example.api.model.user.User;
import com.example.api.service.user.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static org.springframework.http.HttpHeaders.AUTHORIZATION;
import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@RestController
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @PostMapping("/user")
    public ResponseEntity<User> saveUser(@RequestBody User user) {
        return ResponseEntity.ok().body(userService.saveUser(user));
    }

    @PostMapping("/register")
    public ResponseEntity<Long> saveUser(@RequestBody RegisterUserForm form)
            throws EntityNotFoundException, EntityAlreadyInDatabaseException, WrongBodyParametersNumberException {
        return ResponseEntity.ok().body(userService.registerUser(form));
    }

    @GetMapping("/user")
    public ResponseEntity<User> getUser(@RequestParam String email) {
        return ResponseEntity.ok().body(userService.getUser(email));
    }

    @GetMapping("/user/current")
    public ResponseEntity<User> getCurrentUser() {
        return ResponseEntity.ok().body(userService.getCurrentUser());
    }

    @GetMapping("/user/group")
    public ResponseEntity<Group> getUserGroup() throws EntityNotFoundException {
        return ResponseEntity.ok().body(userService.getUserGroup());
    }

    @GetMapping("/users")
    public ResponseEntity<List<User>> getUsers() {
        return ResponseEntity.ok().body(userService.getUsers());
    }

    @GetMapping("/token/refresh")
    public void refreshToken(HttpServletRequest request, HttpServletResponse response)
            throws BadRequestHeadersException, IOException {
        String authorizationHeader = request.getHeader(AUTHORIZATION);
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            String refreshToken = authorizationHeader.substring("Bearer ".length());
            Algorithm algorithm = Algorithm.HMAC256("secret".getBytes());
            JWTVerifier verifier = JWT.require(algorithm).build();
            DecodedJWT decodedJWT = verifier.verify(refreshToken);
            String email = decodedJWT.getSubject();
            User user = userService.getUser(email);
            String accessToken = JWT.create()
                    .withSubject(user.getEmail())
                    .withExpiresAt(new Date(System.currentTimeMillis() + 30 * 60 * 1000))
                    .withIssuer(request.getRequestURI())
                    .withClaim("roles", List.of(user.getAccountType().getName()))
                    .sign(algorithm);
            Map<String, String> tokens = new HashMap<>();
            tokens.put("access_token", accessToken);
            tokens.put("refresh_token", refreshToken);
            response.setContentType(APPLICATION_JSON_VALUE);
            new ObjectMapper().writeValue(response.getOutputStream(), tokens);
        } else {
            throw new BadRequestHeadersException("Refresh token is missing or is invalid!");
        }
    }

    @GetMapping("/students-with-group/all")
    public ResponseEntity<List<BasicStudent>> getAllStudentsWithGroup() {
        return ResponseEntity.ok().body(userService.getAllStudentsWithGroup());
    }

    @PostMapping("/user/group/set")
    public ResponseEntity<Group> setUserGroup(
            @RequestBody SetStudentGroupForm setStudentGroupForm)
            throws EntityNotFoundException, WrongUserTypeException, StudentAlreadyAssignedToGroupException {
        return ResponseEntity.ok().body(userService.setStudentGroup(setStudentGroupForm));
    }

}
