package com.neuroforge.service;

import com.neuroforge.entity.Testcase;
import com.neuroforge.repository.TestcaseRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TestcaseService {

    private final TestcaseRepository testcaseRepository;

    public TestcaseService(TestcaseRepository testcaseRepository) {
        this.testcaseRepository = testcaseRepository;
    }

    // GET all test cases
    public List<Testcase> getAllTestcases() {
        return testcaseRepository.findAll();
    }

    // GET test case by ID
    public Optional<Testcase> getTestcaseById(String id) {
        return testcaseRepository.findById(id);
    }

    // POST - create test case
    public Testcase createTestcase(Testcase testcase) {
        return testcaseRepository.save(testcase);
    }

    // PUT - update test case
    public Optional<Testcase> updateTestcase(
            String id,
            Testcase testcaseDetails) {

        return testcaseRepository.findById(id).map(testcase -> {

            testcase.setTitle(testcaseDetails.getTitle());
            testcase.setType(testcaseDetails.getType());
            testcase.setExpectedResult(testcaseDetails.getExpectedResult());

            return testcaseRepository.save(testcase);
        });
    }

    // DELETE - delete test case
    public boolean deleteTestcase(String id) {

        if (testcaseRepository.existsById(id)) {
            testcaseRepository.deleteById(id);
            return true;
        }

        return false;
    }
}