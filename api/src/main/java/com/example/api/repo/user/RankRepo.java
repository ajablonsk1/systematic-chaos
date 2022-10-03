package com.example.api.repo.user;

import com.example.api.model.user.Rank;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RankRepo extends JpaRepository<Rank, Long> {
}
