package com.example.api.repo.user;

import com.example.api.model.user.AccountType;
import com.example.api.model.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepo extends JpaRepository<User, Long> {
    User findUserByEmail(String email);
    List<User> findAllByAccountTypeEquals(AccountType accountType);
}
