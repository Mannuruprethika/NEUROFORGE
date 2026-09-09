package com.neuroforge.controller;

import com.neuroforge.entity.Sprint;
import com.neuroforge.service.SprintService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/sprints")
@CrossOrigin
public class SprintController {

    private final SprintService sprintService;

    public SprintController(SprintService sprintService) {
        this.sprintService = sprintService;
    }

    // GET all sprints
    @GetMapping
    public ResponseEntity<List<Sprint>> getAllSprints() {
        return ResponseEntity.ok(sprintService.getAllSprints());
    }

    // GET sprint by ID
    @GetMapping("/{id}")
    public ResponseEntity<Sprint> getSprintById(
            @PathVariable String id) {

        return sprintService.getSprintById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // POST - create sprint
    @PostMapping
    public ResponseEntity<Sprint> createSprint(
            @RequestBody Sprint sprint) {

        Sprint savedSprint = sprintService.createSprint(sprint);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(savedSprint);
    }

    // PUT - update sprint
    @PutMapping("/{id}")
    public ResponseEntity<Sprint> updateSprint(
            @PathVariable String id,
            @RequestBody Sprint sprintDetails) {

        return sprintService.updateSprint(id, sprintDetails)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // DELETE - delete sprint
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSprint(
            @PathVariable String id) {

        if (sprintService.deleteSprint(id)) {
            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.notFound().build();
    }
}