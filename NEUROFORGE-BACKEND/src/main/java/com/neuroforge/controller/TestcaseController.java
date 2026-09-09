package com.neuroforge.controller;

import com.neuroforge.entity.Testcase;
import com.neuroforge.service.TestcaseService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/testcases")
@CrossOrigin
public class TestcaseController {

    private final TestcaseService testcaseService;

    public TestcaseController(TestcaseService testcaseService) {
        this.testcaseService = testcaseService;
    }

    // GET all test cases
    @GetMapping
    public ResponseEntity<List<Testcase>> getAllTestcases() {
        return ResponseEntity.ok(testcaseService.getAllTestcases());
    }

    // GET test case by ID
    @GetMapping("/{id}")
    public ResponseEntity<Testcase> getTestcaseById(
            @PathVariable String id) {

        return testcaseService.getTestcaseById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // POST - create test case
    @PostMapping
    public ResponseEntity<Testcase> createTestcase(
            @RequestBody Testcase testcase) {

        Testcase savedTestcase =
                testcaseService.createTestcase(testcase);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(savedTestcase);
    }

    // PUT - update test case
    @PutMapping("/{id}")
    public ResponseEntity<Testcase> updateTestcase(
            @PathVariable String id,
            @RequestBody Testcase testcaseDetails) {

        return testcaseService
                .updateTestcase(id, testcaseDetails)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // DELETE - delete test case
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTestcase(
            @PathVariable String id) {

        if (testcaseService.deleteTestcase(id)) {
            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.notFound().build();
    }
}