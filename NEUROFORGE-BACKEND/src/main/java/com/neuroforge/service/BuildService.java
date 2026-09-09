package com.neuroforge.service;

import com.neuroforge.entity.Build;
import com.neuroforge.repository.BuildRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BuildService {

    private final BuildRepository buildRepository;

    public BuildService(BuildRepository buildRepository) {
        this.buildRepository = buildRepository;
    }

    // GET all builds
    public List<Build> getAllBuilds() {
        return buildRepository.findAll();
    }

    // GET build by ID
    public Optional<Build> getBuildById(String id) {
        return buildRepository.findById(id);
    }

    // POST - create build
    public Build createBuild(Build build) {
        return buildRepository.save(build);
    }

    // PUT - update build
    public Optional<Build> updateBuild(String id, Build buildDetails) {

        return buildRepository.findById(id).map(build -> {

            build.setPipelineId(buildDetails.getPipelineId());
            build.setStatus(buildDetails.getStatus());
            build.setStartTime(buildDetails.getStartTime());

            return buildRepository.save(build);
        });
    }

    // DELETE - delete build
    public boolean deleteBuild(String id) {

        if (buildRepository.existsById(id)) {
            buildRepository.deleteById(id);
            return true;
        }

        return false;
    }
}