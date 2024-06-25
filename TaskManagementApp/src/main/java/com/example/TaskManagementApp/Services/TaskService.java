package com.example.TaskManagementApp.Services;
import org.springframework.stereotype.Service;

import com.example.TaskManagementApp.Entities.Task;
import com.example.TaskManagementApp.Repositories.TaskRepository;

import java.util.List;
import java.util.Optional;

@Service
public class TaskService {
	private final TaskRepository taskRepository;

    // Injection by constructor
    public TaskService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }
    // create or update task
    public Task saveOrUpdateTask(Task task) {
        return taskRepository.save(task);
    }
    // get all tasks
    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }
    // get a specific task by ID
    public Optional<Task> getTaskById(Long id) {
        return taskRepository.findById(id);
    }
    // delete task by ID
    public void deleteTaskById(Long id) {
        taskRepository.deleteById(id);
    }

}
