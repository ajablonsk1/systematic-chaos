package com.example.api.repo.util;

import com.example.api.model.util.File;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FileRepo extends JpaRepository<File, Long> {
    File findFileById(Long id);
}
