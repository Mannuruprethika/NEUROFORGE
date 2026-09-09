package com.neuroforge.service;

import com.neuroforge.entity.Deployment;
import com.neuroforge.repository.DeploymentRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DeploymentService {

    private final DeploymentRepository deploymentRepository;

    public DeploymentService(DeploymentRepository deploymentRepository) {
        this.deploymentRepository = deploymentRepository;
    }

    // GET all deployments
    public List<Deployment> getAllDeployments() {
        return deploymentRepository.findAll();
    }

    // GET deployment by ID
    public Optional<Deployment> getDeploymentById(String id) {
        return deploymentRepository.findById(id);
    }

    // POST - create deployment
    public Deployment createDeployment(Deployment deployment) {
        return deploymentRepository.save(deployment);
    }

    // PUT - update deployment
    public Optional<Deployment> updateDeployment(
            String id,
            Deployment deploymentDetails) {

        return deploymentRepository.findById(id).map(deployment -> {

            deployment.setBuildId(deploymentDetails.getBuildId());
            deployment.setEnvironment(deploymentDetails.getEnvironment());
            deployment.setVersion(deploymentDetails.getVersion());

            return deploymentRepository.save(deployment);
        });
    }

    // DELETE - delete deployment
    public boolean deleteDeployment(String id) {

        if (deploymentRepository.existsById(id)) {
            deploymentRepository.deleteById(id);
            return true;
        }

        return false;
    }
}