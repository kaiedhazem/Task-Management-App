package com.example.TaskManagementApp.Services;
import org.springframework.stereotype.Service;

import com.example.TaskManagementApp.Entities.Task;
import com.example.TaskManagementApp.Repositories.TaskRepository;

import java.util.List;
import java.util.Optional;

@Service
public class TaskService {
	private final TaskRepository taskRepository;

    // Injection par constructeur
    public TaskService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    public Task saveOrUpdateTask(Task task) {
        return taskRepository.save(task);
    }

    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    public Optional<Task> getTaskById(Long id) {
        return taskRepository.findById(id);
    }

    public void deleteTaskById(Long id) {
        taskRepository.deleteById(id);
    }

}
