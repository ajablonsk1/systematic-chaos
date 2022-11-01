package com.example.api.repo.activity.result;

import com.example.api.model.activity.result.AdditionalPoints;
import com.example.api.model.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AdditionalPointsRepo extends JpaRepository<AdditionalPoints, Long> {
    List<AdditionalPoints> findAllByUser(User user);
    void deleteAllByUser(User user);
}
