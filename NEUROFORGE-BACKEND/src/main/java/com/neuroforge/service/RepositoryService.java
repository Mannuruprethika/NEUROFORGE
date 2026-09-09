package com.neuroforge.service;

import com.neuroforge.entity.Repository;
import com.neuroforge.repository.RepositoryRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class RepositoryService {

    private final RepositoryRepository repositoryRepository;

    public RepositoryService(RepositoryRepository repositoryRepository) {
        this.repositoryRepository = repositoryRepository;
    }

    // Get all repositories
    public List<Repository> getAllRepositories() {
        return repositoryRepository.findAll();
    }

    // Get repository by ID
    public Repository getRepositoryById(String id) {

        return repositoryRepository.findById(id)
                .orElseThrow(() ->
                        new ResponseStatusException(
                                HttpStatus.NOT_FOUND,
                                "Repository not found with id: " + id
                        )
                );
    }

    // Create repository
    public Repository createRepository(Repository repository) {
        return repositoryRepository.save(repository);
    }

    // Update repository
    public Repository updateRepository(
            String id,
            Repository repositoryDetails) {

        Repository repository = getRepositoryById(id);

        repository.setProjectId(repositoryDetails.getProjectId());
        repository.setName(repositoryDetails.getName());
        repository.setUrl(repositoryDetails.getUrl());

        return repositoryRepository.save(repository);
    }

    // Delete repository
    public void deleteRepository(String id) {

        Repository repository = getRepositoryById(id);

        repositoryRepository.delete(repository);
    }
}