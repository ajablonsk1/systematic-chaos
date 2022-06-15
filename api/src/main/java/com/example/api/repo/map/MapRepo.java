package com.example.api.repo.map;

import com.example.api.model.map.ActivityMap;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MapRepo extends JpaRepository<ActivityMap, Long> {
    ActivityMap findActivityMapById(Long id);
}
