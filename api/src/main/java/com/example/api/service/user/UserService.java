package com.example.api.service.user;

import com.example.api.error.exception.EntityAlreadyInDatabaseException;
import com.example.api.error.exception.EntityNotFoundException;
import com.example.api.form.RegisterUserForm;
import com.example.api.model.group.Group;
import com.example.api.model.user.User;
import com.example.api.repo.group.GroupRepo;
import com.example.api.repo.user.UserRepo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Collection;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class UserService implements UserDetailsService {
    private final UserRepo userRepo;
    private final GroupRepo groupRepo;
    private final PasswordEncoder passwordEncoder;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepo.findUserByEmail(email);
        log.info(email);
        if(user == null) {
            log.error("User {} not found in database", email);
            throw new UsernameNotFoundException("User" + email + " not found in database");
        }
        log.info("User {} found in database", email);
        Collection<SimpleGrantedAuthority> authorities = List.of(new SimpleGrantedAuthority(user.getAccountType().getName()));
        return new org.springframework.security.core.userdetails.User(user.getEmail(), user.getPassword(), authorities);
    }

    public User saveUser(User user) {
        log.info("Saving user {} to the database", user.getEmail());
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepo.save(user);
    }

    public User registerUser(RegisterUserForm form) throws EntityNotFoundException, EntityAlreadyInDatabaseException {
        String email = form.getEmail();
        log.info("Registering user {}", email);
        User dbUser = userRepo.findUserByEmail(email);
        if(dbUser != null) {
            log.error("User {} already exist in database", email);
            throw new EntityAlreadyInDatabaseException("User " + email + " already exist in database");
        }
        String code = form.getInvitationCode();
        Group group = groupRepo.findGroupByInvitationCode(code);
        if(group == null) {
            log.error("Group with invitational code {} not found in database", code);
            throw new EntityNotFoundException("Group with invitational code" + code + " not found in database");
        }
        User user = new User(form.getEmail(), form.getFirstName(), form.getLastName(),
                form.getAccountType(), form.getHeroType());
        user.setPassword(passwordEncoder.encode(form.getPassword()));
        user.setGroup(group);
        return userRepo.save(user);
    }

    public User getUser(String email) throws EntityNotFoundException {
        log.info("Fetching user {}", email);
        User user = userRepo.findUserByEmail(email);
        if(user == null) {
            log.error("User {} not found in database", email);
            throw new EntityNotFoundException("User" + email + " not found in database");
        }
        return userRepo.findUserByEmail(email);
    }

    public List<User> getUsers() {
        log.info("Fetching all users");
        return userRepo.findAll();
    }
}
