package com.neuroforge.controller;

import com.neuroforge.entity.Requirement;
import com.neuroforge.service.RequirementService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/requirements")
@CrossOrigin(origins = "*")
public class RequirementController {

    private final RequirementService requirementService;

    public RequirementController(RequirementService requirementService) {
        this.requirementService = requirementService;
    }

    // Get all requirements
    @GetMapping
    public ResponseEntity<List<Requirement>> getAllRequirements() {

        return ResponseEntity.ok(
                requirementService.getAllRequirements()
        );
    }

    // Get requirement by ID
    @GetMapping("/{id}")
    public ResponseEntity<Requirement> getRequirementById(
            @PathVariable String id) {

        return ResponseEntity.ok(
                requirementService.getRequirementById(id)
        );
    }

    // Create requirement
    @PostMapping
    public ResponseEntity<Requirement> createRequirement(
            @RequestBody Requirement requirement) {

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(
                        requirementService.createRequirement(requirement)
                );
    }

    // Update requirement
    @PutMapping("/{id}")
    public ResponseEntity<Requirement> updateRequirement(
            @PathVariable String id,
            @RequestBody Requirement requirement) {

        return ResponseEntity.ok(
                requirementService.updateRequirement(
                        id,
                        requirement
                )
        );
    }

    // Delete requirement
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteRequirement(
            @PathVariable String id) {

        requirementService.deleteRequirement(id);

        return ResponseEntity.ok(
                "Requirement deleted successfully"
        );
    }
}