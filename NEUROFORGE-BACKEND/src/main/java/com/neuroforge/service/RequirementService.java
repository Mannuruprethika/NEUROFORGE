package com.neuroforge.service;

import com.neuroforge.entity.Requirement;
import com.neuroforge.repository.RequirementRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class RequirementService {

    private final RequirementRepository requirementRepository;

    public RequirementService(RequirementRepository requirementRepository) {
        this.requirementRepository = requirementRepository;
    }

    // Get all requirements
    public List<Requirement> getAllRequirements() {
        return requirementRepository.findAll();
    }

    // Get requirement by ID
    public Requirement getRequirementById(String id) {

        return requirementRepository.findById(id)
                .orElseThrow(() ->
                        new ResponseStatusException(
                                HttpStatus.NOT_FOUND,
                                "Requirement not found with id: " + id
                        )
                );
    }

    // Create requirement
    public Requirement createRequirement(Requirement requirement) {
        return requirementRepository.save(requirement);
    }

    // Update requirement
    public Requirement updateRequirement(
            String id,
            Requirement requirementDetails) {

        Requirement requirement = getRequirementById(id);

        requirement.setProjectId(requirementDetails.getProjectId());
        requirement.setDescription(requirementDetails.getDescription());
        requirement.setPriority(requirementDetails.getPriority());
        requirement.setStatus(requirementDetails.getStatus());

        return requirementRepository.save(requirement);
    }

    // Delete requirement
    public void deleteRequirement(String id) {

        Requirement requirement = getRequirementById(id);

        requirementRepository.delete(requirement);
    }

    // Delete all requirements of a project
    public void deleteByProjectId(String projectId) {

        requirementRepository.deleteByProjectId(projectId);
    }
}