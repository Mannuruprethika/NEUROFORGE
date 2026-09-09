package com.neuroforge.service;

import com.neuroforge.entity.Project;
import com.neuroforge.repository.ProjectRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class ProjectService {

    private final ProjectRepository projectRepository;

    public ProjectService(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    // Get all projects
    public List<Project> getAllProjects() {
        return projectRepository.findAll();
    }

    // Get project by ID
    public Project getProjectById(String id) {

        return projectRepository.findById(id)
                .orElseThrow(() ->
                        new ResponseStatusException(
                                HttpStatus.NOT_FOUND,
                                "Project not found with id: " + id
                        )
                );
    }

    // Create project
    public Project createProject(Project project) {
        return projectRepository.save(project);
    }

    // Update project
    public Project updateProject(
            String id,
            Project projectDetails) {

        Project project = getProjectById(id);

        project.setName(projectDetails.getName());
        project.setStatus(projectDetails.getStatus());
        project.setStartDate(projectDetails.getStartDate());
        project.setEndDate(projectDetails.getEndDate());
        project.setOwner(projectDetails.getOwner());

        return projectRepository.save(project);
    }

    // Delete project
    public void deleteProject(String id) {

        Project project = getProjectById(id);

        projectRepository.delete(project);
    }
}