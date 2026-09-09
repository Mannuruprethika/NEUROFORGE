package com.neuroforge.controller;

import com.neuroforge.entity.Deployment;
import com.neuroforge.service.DeploymentService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/deployments")
@CrossOrigin
public class DeploymentController {

    private final DeploymentService deploymentService;

    public DeploymentController(DeploymentService deploymentService) {
        this.deploymentService = deploymentService;
    }

    // GET all deployments
    @GetMapping
    public ResponseEntity<List<Deployment>> getAllDeployments() {
        return ResponseEntity.ok(deploymentService.getAllDeployments());
    }

    // GET deployment by ID
    @GetMapping("/{id}")
    public ResponseEntity<Deployment> getDeploymentById(
            @PathVariable String id) {

        return deploymentService.getDeploymentById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // POST - create deployment
    @PostMapping
    public ResponseEntity<Deployment> createDeployment(
            @RequestBody Deployment deployment) {

        Deployment savedDeployment =
                deploymentService.createDeployment(deployment);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(savedDeployment);
    }

    // PUT - update deployment
    @PutMapping("/{id}")
    public ResponseEntity<Deployment> updateDeployment(
            @PathVariable String id,
            @RequestBody Deployment deploymentDetails) {

        return deploymentService
                .updateDeployment(id, deploymentDetails)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // DELETE - delete deployment
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDeployment(
            @PathVariable String id) {

        if (deploymentService.deleteDeployment(id)) {
            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.notFound().build();
    }
}