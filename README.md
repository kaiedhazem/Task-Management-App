# Task Management App

This repository contains a Task Management application built with Spring Boot for the backend and ReactJS for the frontend.

 ![image](https://github.com/kaiedhazem/Task-Management-App/assets/59137622/4daaa0a8-3bea-4883-9840-7f2896d8fb8d)

## Features

- **Task Management**: Allows users to manage tasks with title, description, and status.
- **CRUD Operations**: Supports Create, Read, Update, and Delete operations for tasks.
- **Completion Status**: Users can mark tasks as completed or update their completion status.
- **Documentation**: Integrated Swagger API for interactive API documentation.
- **Database**: Uses H2 database for local development.
- **Docker**: Includes Dockerfiles for both backend and frontend for easy deployment.

 
## Technologies Used

- **Backend**: Spring Boot, H2 Database, Swagger
- **Frontend**: ReactJS

## Setup Instructions

### Backend Setup

1. Clone the repository: git clone https://github.com/kaiedhazem/Task-Management-App.git

2. Navigate to the backend folder: cd Task-Management-App
   
3. Build the project: mvn clean install
   
4.  **Run with Java:** java -jar target/task-management-app.jar
   
This will start the backend server at `http://localhost:8080`.

5. **Run with Docker:**

Build Docker image: docker build -t task-management-app-backend .

Run Docker container: docker run -p 8080:8080 task-management-app-backend

This will start the backend server using Docker.

6. Access Swagger API documentation: http://localhost:8080/swagger-ui.html

Use Swagger to explore and test the APIs.

### Frontend Setup

1. Navigate to the frontend folder: cd front-ui

2. Install dependencies: npm install

3. Start the development server: npm start

This will start the frontend server at `http://localhost:3000`
   
4. **Build Docker image:** docker build -t task-management-app-frontend .

5. **Run Docker container:** docker run -p 3000:3000 task-management-app-frontend

This will start the frontend server at `http://localhost:3000`.


### Additional Notes

- Make sure Docker is installed to run the frontend and backend Docker containers.
- Adjust port numbers and configurations as necessary based on your environment.

## Author : [Hazem Kaied](https://github.com/kaiedhazem)

















