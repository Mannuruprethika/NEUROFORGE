package com.neuroforge.repository;

import com.neuroforge.entity.Bug;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BugRepository extends JpaRepository<Bug, String> {
}