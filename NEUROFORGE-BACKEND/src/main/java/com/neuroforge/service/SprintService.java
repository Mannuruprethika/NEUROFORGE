package com.neuroforge.service;

import com.neuroforge.entity.Sprint;
import com.neuroforge.repository.SprintRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SprintService {

    private final SprintRepository sprintRepository;

    public SprintService(SprintRepository sprintRepository) {
        this.sprintRepository = sprintRepository;
    }

    // GET all sprints
    public List<Sprint> getAllSprints() {
        return sprintRepository.findAll();
    }

    // GET sprint by ID
    public Optional<Sprint> getSprintById(String id) {
        return sprintRepository.findById(id);
    }

    // POST - create sprint
    public Sprint createSprint(Sprint sprint) {
        return sprintRepository.save(sprint);
    }

    // PUT - update sprint
    public Optional<Sprint> updateSprint(
            String id,
            Sprint sprintDetails) {

        return sprintRepository.findById(id).map(sprint -> {

            sprint.setProjectId(sprintDetails.getProjectId());
            sprint.setName(sprintDetails.getName());
            sprint.setStartDate(sprintDetails.getStartDate());
            sprint.setEndDate(sprintDetails.getEndDate());

            return sprintRepository.save(sprint);
        });
    }

    // DELETE - delete sprint
    public boolean deleteSprint(String id) {

        if (sprintRepository.existsById(id)) {
            sprintRepository.deleteById(id);
            return true;
        }

        return false;
    }
}