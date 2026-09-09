package com.neuroforge.controller;

import com.neuroforge.entity.UserStory;
import com.neuroforge.service.UserStoryService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/userstories")
@CrossOrigin
public class UserStoryController {

    private final UserStoryService userStoryService;

    public UserStoryController(UserStoryService userStoryService) {
        this.userStoryService = userStoryService;
    }

    // GET all user stories
    @GetMapping
    public ResponseEntity<List<UserStory>> getAllUserStories() {
        return ResponseEntity.ok(userStoryService.getAllUserStories());
    }

    // GET user story by ID
    @GetMapping("/{id}")
    public ResponseEntity<UserStory> getUserStoryById(
            @PathVariable String id) {

        return userStoryService.getUserStoryById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // POST - create user story
    @PostMapping
    public ResponseEntity<UserStory> createUserStory(
            @RequestBody UserStory userStory) {

        UserStory savedUserStory =
                userStoryService.createUserStory(userStory);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(savedUserStory);
    }

    // PUT - update user story
    @PutMapping("/{id}")
    public ResponseEntity<UserStory> updateUserStory(
            @PathVariable String id,
            @RequestBody UserStory userStoryDetails) {

        return userStoryService
                .updateUserStory(id, userStoryDetails)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // DELETE - delete user story
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUserStory(
            @PathVariable String id) {

        if (userStoryService.deleteUserStory(id)) {
            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.notFound().build();
    }
}