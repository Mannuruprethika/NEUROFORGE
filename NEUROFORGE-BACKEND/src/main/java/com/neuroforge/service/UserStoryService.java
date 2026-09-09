package com.neuroforge.service;

import com.neuroforge.entity.UserStory;
import com.neuroforge.repository.UserStoryRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserStoryService {

    private final UserStoryRepository userStoryRepository;

    public UserStoryService(UserStoryRepository userStoryRepository) {
        this.userStoryRepository = userStoryRepository;
    }

    // GET all user stories
    public List<UserStory> getAllUserStories() {
        return userStoryRepository.findAll();
    }

    // GET user story by ID
    public Optional<UserStory> getUserStoryById(String id) {
        return userStoryRepository.findById(id);
    }

    // POST - create user story
    public UserStory createUserStory(UserStory userStory) {
        return userStoryRepository.save(userStory);
    }

    // PUT - update user story
    public Optional<UserStory> updateUserStory(
            String id,
            UserStory userStoryDetails) {

        return userStoryRepository.findById(id).map(userStory -> {

            userStory.setRequirementId(userStoryDetails.getRequirementId());
            userStory.setTitle(userStoryDetails.getTitle());
            userStory.setStoryPoints(userStoryDetails.getStoryPoints());

            return userStoryRepository.save(userStory);
        });
    }

    // DELETE - delete user story
    public boolean deleteUserStory(String id) {

        if (userStoryRepository.existsById(id)) {
            userStoryRepository.deleteById(id);
            return true;
        }

        return false;
    }
}