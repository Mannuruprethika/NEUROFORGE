package com.neuroforge.controller;

import com.neuroforge.entity.Bug;
import com.neuroforge.service.BugService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bugs")
@CrossOrigin
public class BugController {

    private final BugService bugService;

    public BugController(BugService bugService) {
        this.bugService = bugService;
    }

    // GET all bugs
    @GetMapping
    public ResponseEntity<List<Bug>> getAllBugs() {
        return ResponseEntity.ok(bugService.getAllBugs());
    }

    // GET bug by ID
    @GetMapping("/{id}")
    public ResponseEntity<Bug> getBugById(@PathVariable String id) {

        return bugService.getBugById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // POST - create bug
    @PostMapping
    public ResponseEntity<Bug> createBug(@RequestBody Bug bug) {

        Bug savedBug = bugService.createBug(bug);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(savedBug);
    }

    // PUT - update bug
    @PutMapping("/{id}")
    public ResponseEntity<Bug> updateBug(
            @PathVariable String id,
            @RequestBody Bug bugDetails) {

        return bugService.updateBug(id, bugDetails)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // DELETE - delete bug
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBug(@PathVariable String id) {

        if (bugService.deleteBug(id)) {
            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.notFound().build();
    }
}