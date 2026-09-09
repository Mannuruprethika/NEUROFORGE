package com.neuroforge.repository;

import com.neuroforge.entity.Repository;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RepositoryRepository extends JpaRepository<Repository, String> {
}