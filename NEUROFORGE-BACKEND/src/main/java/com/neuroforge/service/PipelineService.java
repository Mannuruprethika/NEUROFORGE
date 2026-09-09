package com.neuroforge.service;

import com.neuroforge.entity.Pipeline;
import com.neuroforge.repository.PipelineRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PipelineService {

    private final PipelineRepository pipelineRepository;

    public PipelineService(PipelineRepository pipelineRepository) {
        this.pipelineRepository = pipelineRepository;
    }

    // GET all pipelines
    public List<Pipeline> getAllPipelines() {
        return pipelineRepository.findAll();
    }

    // GET pipeline by ID
    public Optional<Pipeline> getPipelineById(String id) {
        return pipelineRepository.findById(id);
    }

    // POST - create pipeline
    public Pipeline createPipeline(Pipeline pipeline) {
        return pipelineRepository.save(pipeline);
    }

    // PUT - update pipeline
    public Optional<Pipeline> updatePipeline(
            String id,
            Pipeline pipelineDetails) {

        return pipelineRepository.findById(id).map(pipeline -> {

            pipeline.setName(pipelineDetails.getName());
            pipeline.setTriggerType(pipelineDetails.getTriggerType());

            return pipelineRepository.save(pipeline);
        });
    }

    // DELETE - delete pipeline
    public boolean deletePipeline(String id) {

        if (pipelineRepository.existsById(id)) {
            pipelineRepository.deleteById(id);
            return true;
        }

        return false;
    }
}