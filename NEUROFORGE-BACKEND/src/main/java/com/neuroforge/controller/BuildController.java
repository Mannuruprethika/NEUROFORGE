package com.neuroforge.controller;

import com.neuroforge.entity.Build;
import com.neuroforge.service.BuildService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/builds")
@CrossOrigin
public class BuildController {

    private final BuildService buildService;

    public BuildController(BuildService buildService) {
        this.buildService = buildService;
    }

    // GET all builds
    @GetMapping
    public ResponseEntity<List<Build>> getAllBuilds() {
        return ResponseEntity.ok(buildService.getAllBuilds());
    }

    // GET build by ID
    @GetMapping("/{id}")
    public ResponseEntity<Build> getBuildById(
            @PathVariable String id) {

        return buildService.getBuildById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // POST - create build
    @PostMapping
    public ResponseEntity<Build> createBuild(
            @RequestBody Build build) {

        Build savedBuild = buildService.createBuild(build);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(savedBuild);
    }

    // PUT - update build
    @PutMapping("/{id}")
    public ResponseEntity<Build> updateBuild(
            @PathVariable String id,
            @RequestBody Build buildDetails) {

        return buildService.updateBuild(id, buildDetails)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // DELETE - delete build
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBuild(
            @PathVariable String id) {

        if (buildService.deleteBuild(id)) {
            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.notFound().build();
    }
}