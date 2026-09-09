package com.neuroforge.repository;

import com.neuroforge.entity.Testcase;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TestcaseRepository extends JpaRepository<Testcase, String> {
}