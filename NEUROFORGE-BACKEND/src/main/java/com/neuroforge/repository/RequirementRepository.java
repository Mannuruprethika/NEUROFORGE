package com.neuroforge.repository;

import com.neuroforge.entity.Requirement;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RequirementRepository extends JpaRepository<Requirement, String> {

    void deleteByProjectId(String projectId);
}