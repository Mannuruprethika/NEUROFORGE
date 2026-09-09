package com.neuroforge.repository;

import com.neuroforge.entity.Pipeline;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PipelineRepository extends JpaRepository<Pipeline, String> {
}