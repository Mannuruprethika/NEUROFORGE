package com.neuroforge.repository;

import com.neuroforge.entity.UserStory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserStoryRepository extends JpaRepository<UserStory, String> {
}