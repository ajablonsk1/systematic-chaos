package com.example.api.service.user;

import com.example.api.dto.request.user.RegisterUserForm;
import com.example.api.dto.response.user.BasicStudent;
import com.example.api.error.exception.EntityAlreadyInDatabaseException;
import com.example.api.error.exception.EntityNotFoundException;
import com.example.api.error.exception.WrongBodyParametersNumberException;
import com.example.api.model.group.Group;
import com.example.api.model.user.AccountType;
import com.example.api.model.user.User;
import com.example.api.repo.group.GroupRepo;
import com.example.api.repo.user.UserRepo;
import com.example.api.util.ExceptionMessage;
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
import java.util.stream.Collectors;

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

    public Long registerUser(RegisterUserForm form) throws EntityNotFoundException, EntityAlreadyInDatabaseException, WrongBodyParametersNumberException {
        String email = form.getEmail();
        log.info("Registering user {}", email);
        User dbUser = userRepo.findUserByEmail(email);
        if(dbUser != null) {
            log.error("User {} already exist in database", email);
            throw new EntityAlreadyInDatabaseException(ExceptionMessage.EMAIL_TAKEN);
        }
        User user = new User(form.getEmail(), form.getFirstName(), form.getLastName(), form.getAccountType());
        if(form.getAccountType() == AccountType.STUDENT){
            if(form.getHeroType() == null || form.getInvitationCode() == null) {
                log.error("Request body for registering student requires 6 body parameters");
                throw new WrongBodyParametersNumberException("Request body for registering student requires 6 body parameters",
                        List.of("firstName", "lastName", "email", "password", "heroType", "invitationCode"), 1);
            }
            String code = form.getInvitationCode();
            Group group = groupRepo.findGroupByInvitationCode(code);
            if(group == null) {
                log.error("Group with invitational code {} not found in database", code);
                throw new EntityNotFoundException(ExceptionMessage.GROUP_CODE_NOT_EXIST);
            }
            user.setGroup(group);
            user.setHeroType(form.getHeroType());
            Integer indexNumber = form.getIndexNumber();
            if(indexNumber == null) {
                log.error("User with index number {} already in database", indexNumber);
                throw new EntityAlreadyInDatabaseException(ExceptionMessage.INDEX_TAKEN);
            }
        } else {
            if(form.getHeroType() != null || form.getInvitationCode() != null){
                log.error("Request body for registering professor requires 4 body parameters");
                throw new WrongBodyParametersNumberException("Request body for registering professor requires 4 body parameters",
                        List.of("firstName", "lastName", "email", "password"), 1);
            }
        }
        user.setPassword(passwordEncoder.encode(form.getPassword()));
        userRepo.save(user);
        return user.getId();
    }

    public User getUser(String email) throws UsernameNotFoundException {
        log.info("Fetching user {}", email);
        User user = userRepo.findUserByEmail(email);
        if(user == null) {
            log.error("User {} not found in database", email);
            throw new UsernameNotFoundException("User" + email + " not found in database");
        }
        return userRepo.findUserByEmail(email);
    }

    public List<User> getUsers() {
        log.info("Fetching all users");
        return userRepo.findAll();
    }

    public Group getUserGroup(String email) throws EntityNotFoundException {
        log.info("Fetching group for user {}", email);
        User user = userRepo.findUserByEmail(email);
        if(user == null) {
            log.error("User {} not found in database", email);
            throw new EntityNotFoundException("User" + email + " not found in database");
        }
        return user.getGroup();
    }

    public List<BasicStudent> getAllStudentsWithGroup() {
        log.info("Fetching all students with group");
        List<User> students = userRepo.findAllByAccountTypeEquals(AccountType.STUDENT);
        return students.stream()
                .map(BasicStudent::new)
                .collect(Collectors.toList());
    }
}
