package com.neuroforge.service;

import com.neuroforge.entity.Bug;
import com.neuroforge.repository.BugRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BugService {

    private final BugRepository bugRepository;

    public BugService(BugRepository bugRepository) {
        this.bugRepository = bugRepository;
    }

    // GET all bugs
    public List<Bug> getAllBugs() {
        return bugRepository.findAll();
    }

    // GET bug by ID
    public Optional<Bug> getBugById(String id) {
        return bugRepository.findById(id);
    }

    // POST - create bug
    public Bug createBug(Bug bug) {
        return bugRepository.save(bug);
    }

    // PUT - update bug
    public Optional<Bug> updateBug(String id, Bug bugDetails) {

        return bugRepository.findById(id).map(bug -> {

            bug.setTestcaseId(bugDetails.getTestcaseId());
            bug.setAssigneeId(bugDetails.getAssigneeId());
            bug.setSeverity(bugDetails.getSeverity());
            bug.setStatus(bugDetails.getStatus());

            return bugRepository.save(bug);
        });
    }

    // DELETE - delete bug
    public boolean deleteBug(String id) {

        if (bugRepository.existsById(id)) {
            bugRepository.deleteById(id);
            return true;
        }

        return false;
    }
}