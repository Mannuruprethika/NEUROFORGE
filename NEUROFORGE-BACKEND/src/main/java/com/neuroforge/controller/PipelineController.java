

package com.neuroforge.controller;

import com.neuroforge.entity.Pipeline;
import com.neuroforge.service.PipelineService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pipelines")
@CrossOrigin
public class PipelineController {

    private final PipelineService pipelineService;

    public PipelineController(PipelineService pipelineService) {
        this.pipelineService = pipelineService;
    }

    // GET all pipelines
    @GetMapping
    public ResponseEntity<List<Pipeline>> getAllPipelines() {
        return ResponseEntity.ok(pipelineService.getAllPipelines());
    }

    // GET pipeline by ID
    @GetMapping("/{id}")
    public ResponseEntity<Pipeline> getPipelineById(
            @PathVariable String id) {

        return pipelineService.getPipelineById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // POST - create pipeline
    @PostMapping
    public ResponseEntity<Pipeline> createPipeline(
            @RequestBody Pipeline pipeline) {

        Pipeline savedPipeline =
                pipelineService.createPipeline(pipeline);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(savedPipeline);
    }

    // PUT - update pipeline
    @PutMapping("/{id}")
    public ResponseEntity<Pipeline> updatePipeline(
            @PathVariable String id,
            @RequestBody Pipeline pipelineDetails) {

        return pipelineService
                .updatePipeline(id, pipelineDetails)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // DELETE - delete pipeline
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePipeline(
            @PathVariable String id) {

        if (pipelineService.deletePipeline(id)) {
            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.notFound().build();
    }
}