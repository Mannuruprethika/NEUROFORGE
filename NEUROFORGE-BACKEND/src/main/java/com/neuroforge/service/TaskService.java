package com.neuroforge.service;

import com.neuroforge.entity.Task;
import com.neuroforge.repository.TaskRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TaskService {

    private final TaskRepository taskRepository;

    public TaskService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    // GET all tasks
    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    // GET task by ID
    public Optional<Task> getTaskById(String id) {
        return taskRepository.findById(id);
    }

    // POST - create task
    public Task createTask(Task task) {
        return taskRepository.save(task);
    }

    // PUT - update task
    public Optional<Task> updateTask(String id, Task taskDetails) {

        return taskRepository.findById(id).map(task -> {

            task.setSprintId(taskDetails.getSprintId());
            task.setUserStoryId(taskDetails.getUserStoryId());
            task.setAssigneeId(taskDetails.getAssigneeId());
            task.setStatus(taskDetails.getStatus());

            return taskRepository.save(task);
        });
    }

    // DELETE - delete task
    public boolean deleteTask(String id) {

        if (taskRepository.existsById(id)) {
            taskRepository.deleteById(id);
            return true;
        }

        return false;
    }
}