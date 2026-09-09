package com.neuroforge.repository;

import com.neuroforge.entity.Build;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BuildRepository extends JpaRepository<Build, String> {
}