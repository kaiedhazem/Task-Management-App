package com.example.TaskManagementApp.Controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.TaskManagementApp.Entities.Task;
import com.example.TaskManagementApp.Services.TaskService;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/tasks")
public class TaskController {
	 private final TaskService taskService;

	    // Injection par constructeur
	    public TaskController(TaskService taskService) {
	        this.taskService = taskService;
	    }

	    @PostMapping
	    public ResponseEntity<Task> createTask(@RequestBody Task task) {
	        Task createdTask = taskService.saveOrUpdateTask(task);
	        return new ResponseEntity<>(createdTask, HttpStatus.CREATED);
	    }

	    @GetMapping
	    public ResponseEntity<List<Task>> getAllTasks() {
	        List<Task> tasks = taskService.getAllTasks();
	        return new ResponseEntity<>(tasks, HttpStatus.OK);
	    }

	    @GetMapping("/{id}")
	    public ResponseEntity<Task> getTaskById(@PathVariable Long id) {
	        Optional<Task> task = taskService.getTaskById(id);
	        return task.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
	                   .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
	    }

	    @PutMapping("/{id}")
	    public ResponseEntity<Task> updateTask(@PathVariable Long id, @RequestBody Task taskDetails) {
	        Optional<Task> existingTaskOptional = taskService.getTaskById(id);
	        if (existingTaskOptional.isPresent()) {
	            Task existingTask = existingTaskOptional.get();
	            existingTask.setTitle(taskDetails.getTitle());
	            existingTask.setDescription(taskDetails.getDescription());
	            existingTask.setCompleted(taskDetails.isCompleted());
	            Task updatedTask = taskService.saveOrUpdateTask(existingTask);
	            return new ResponseEntity<>(updatedTask, HttpStatus.OK);
	        } else {
	            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	        }
	    }

	    @DeleteMapping("/{id}")
	    public ResponseEntity<Void> deleteTask(@PathVariable Long id) {
	        Optional<Task> task = taskService.getTaskById(id);
	        if (task.isPresent()) {
	            taskService.deleteTaskById(id);
	            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	        } else {
	            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	        }
	    }
}
