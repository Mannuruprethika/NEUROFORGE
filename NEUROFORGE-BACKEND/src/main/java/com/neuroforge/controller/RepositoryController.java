package com.neuroforge.controller;

import com.neuroforge.entity.Repository;
import com.neuroforge.service.RepositoryService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/repositories")
@CrossOrigin(origins = "*")
public class RepositoryController {

    private final RepositoryService repositoryService;

    public RepositoryController(RepositoryService repositoryService) {
        this.repositoryService = repositoryService;
    }

    // Get all repositories
    @GetMapping
    public ResponseEntity<List<Repository>> getAllRepositories() {

        return ResponseEntity.ok(
                repositoryService.getAllRepositories()
        );
    }

    // Get repository by ID
    @GetMapping("/{id}")
    public ResponseEntity<Repository> getRepositoryById(
            @PathVariable String id) {

        return ResponseEntity.ok(
                repositoryService.getRepositoryById(id)
        );
    }

    // Create repository
    @PostMapping
    public ResponseEntity<Repository> createRepository(
            @RequestBody Repository repository) {

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(
                        repositoryService.createRepository(repository)
                );
    }

    // Update repository
    @PutMapping("/{id}")
    public ResponseEntity<Repository> updateRepository(
            @PathVariable String id,
            @RequestBody Repository repository) {

        return ResponseEntity.ok(
                repositoryService.updateRepository(
                        id,
                        repository
                )
        );
    }

    // Delete repository
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteRepository(
            @PathVariable String id) {

        repositoryService.deleteRepository(id);

        return ResponseEntity.ok(
                "Repository deleted successfully"
        );
    }
}