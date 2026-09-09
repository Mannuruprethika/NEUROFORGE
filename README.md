# 🚀 NeuroForge

## Enterprise Software Development Life Cycle (SDLC) Management Platform

NeuroForge is an enterprise-level Software Development Life Cycle (SDLC) management platform designed to manage and track the complete software development process from requirements gathering to deployment.

The project combines a **React + Vite frontend** with a **Java + Spring Boot backend** and provides a centralized platform for managing projects, requirements, user stories, sprints, tasks, bugs, builds, test cases, repositories, CI/CD pipelines, and deployments.

---

# 📌 Project Overview

NeuroForge aims to provide a single platform for managing different stages of the software development lifecycle.

Instead of using multiple tools for requirements, tasks, testing, bugs, builds, repositories, pipelines, and deployments, NeuroForge brings these activities together into one integrated system.

### Main SDLC Flow

```text
Requirements
     ↓
User Stories
     ↓
Sprint Planning
     ↓
Tasks
     ↓
Development
     ↓
Build
     ↓
Testing
     ↓
Bug Tracking
     ↓
CI/CD Pipeline
     ↓
Deployment
✨ Key Features

NeuroForge provides modules for:

🔐 User Authentication
👤 User Management
🛡️ Role Management
📁 Project Management
📝 Requirement Management
📖 User Story Management
🏃 Sprint Management
✅ Task Management
🐞 Bug Tracking
🔨 Build Management
🧪 Test Case Management
📦 Repository Management
🔄 CI/CD Pipeline Management
🚀 Deployment Management
🏗️ Project Architecture

NeuroForge follows a frontend-backend architecture.

                    NeuroForge
                        │
             ┌──────────┴──────────┐
             │                     │
             ▼                     ▼
        FRONTEND                BACKEND
       React + Vite          Java + Spring Boot
             │                     │
             │    REST APIs        │
             └─────────┬───────────┘
                       │
                       ▼
                    Database
📂 Repository Structure
NEUROFORGE/
│
├── NEUROFORGE-FRONTEND/
│   │
│   ├── public/
│   │
│   ├── src/
│   │   ├── assets/
│   │   ├── pages/
│   │   │   └── Login.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   ├── vite.config.js
│   ├── .gitignore
│   └── README.md
│
│
├── NEUROFORGE-BACKEND/
│   │
│   ├── .mvn/
│   ├── docs/
│   │
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/
│   │   │   │   └── com/neuroforge/
│   │   │   │       │
│   │   │   │       ├── config/
│   │   │   │       ├── controller/
│   │   │   │       ├── dto/
│   │   │   │       ├── entity/
│   │   │   │       ├── repository/
│   │   │   │       └── service/
│   │   │   │
│   │   │   └── resources/
│   │   │       └── application.properties
│   │   │
│   │   └── test/
│   │
│   ├── pom.xml
│   ├── mvnw
│   ├── mvnw.cmd
│   ├── .gitignore
│   └── README.md
│
└── README.md
💻 Frontend
Technologies

The NeuroForge frontend is developed using:

React
JavaScript
Vite
HTML5
CSS3
REST APIs
npm
Frontend Responsibilities

The frontend provides the user interface for interacting with NeuroForge.

It handles:

User login
User interaction
Dashboard interfaces
SDLC module interfaces
Form handling
API communication
Displaying backend responses
Navigation between application modules
Frontend Architecture
User
 │
 ▼
React UI
 │
 ├── Pages
 │
 ├── Components
 │
 └── Services
       │
       ▼
    REST APIs
       │
       ▼
NeuroForge Backend
⚙️ Frontend Setup
Prerequisites

Install:

Node.js
npm
Git

Check Node.js:

node -v

Check npm:

npm -v
Install Frontend Dependencies

Clone the repository:

git clone https://github.com/Mannuruprethika/NEUROFORGE.git

Navigate to the frontend:

cd NEUROFORGE/NEUROFORGE-FRONTEND

Install dependencies:

npm install
Run Frontend

Start the development server:

npm run dev

The Vite development server will provide a local URL, normally similar to:

http://localhost:5173
Frontend Commands
Development
npm run dev
Build
npm run build
Preview
npm run preview
Lint
npm run lint
☕ Backend
Technologies

The NeuroForge backend is developed using:

Java
Spring Boot
Spring Web
Spring Data JPA
Spring Security
Maven
REST APIs
JSON
MySQL / Relational Database
🔧 Backend Responsibilities

The backend provides REST APIs and handles the application's business logic.

It manages:

Authentication
Users
Roles
Projects
Requirements
User Stories
Sprints
Tasks
Bugs
Builds
Test Cases
Repositories
CI/CD Pipelines
Deployments
Database operations
🏛️ Backend Architecture

The backend follows a layered architecture:

Frontend
   │
   ▼
Controller Layer
   │
   ▼
Service Layer
   │
   ▼
Repository Layer
   │
   ▼
Database
Controller Layer

Controllers receive HTTP requests and return responses.

Examples:

AuthController
UserController
ProjectController
RequirementController
UserStoryController
SprintController
TaskController
BugController
BuildController
TestcaseController
RepositoryController
PipelineController
DeploymentController
Service Layer

The service layer contains the application's business logic.

Examples:

UserService
ProjectService
RequirementService
UserStoryService
SprintService
TaskService
BugService
BuildService
DeploymentService
PipelineService
Repository Layer

Repositories handle database operations using Spring Data JPA.

Examples:

UserRepository
ProjectRepository
RequirementRepository
UserStoryRepository
SprintRepository
TaskRepository
BugRepository
BuildRepository
Entity Layer

Entities represent the application's main data models.

Examples:

User
Role
Project
Requirement
UserStory
Sprint
Task
Bug
Build
Testcase
Repository
Pipeline
Deployment
🔐 Authentication and Security

NeuroForge includes security-related components using Spring Security.

The backend contains:

Authentication controller
Login request DTO
Password generator
Password hashing utilities
Security configuration
Custom user details service

Sensitive information such as passwords, API keys, tokens, and database credentials should never be committed to the repository.

⚙️ Backend Setup
Prerequisites

Install:

Java JDK
Maven
MySQL or configured relational database
Git

Check Java:

java -version

Check Maven:

mvn -version
Configure Database

Database configuration is maintained in:

NEUROFORGE-BACKEND/src/main/resources/application.properties

Configure the required:

Database URL
Database username
Database password

Do not expose sensitive credentials publicly.

▶️ Run Backend

Navigate to the backend:

cd NEUROFORGE/NEUROFORGE-BACKEND

Build the project:

mvn clean install

Run the backend:

mvn spring-boot:run

On Windows, the Maven wrapper can also be used:

mvnw.cmd spring-boot:run

The Spring Boot application commonly runs on:

http://localhost:8080

The actual port depends on the application configuration.

🔗 Frontend + Backend Integration

The frontend communicates with the backend using REST APIs.

┌─────────────────────────────┐
│       React Frontend        │
│       Vite Development      │
│                             │
│      localhost:5173         │
└──────────────┬──────────────┘
               │
               │ REST API
               ▼
┌─────────────────────────────┐
│      Spring Boot Backend    │
│                             │
│       localhost:8080        │
└──────────────┬──────────────┘
               │
               ▼
┌─────────────────────────────┐
│          Database           │
└─────────────────────────────┘

Frontend API communication is handled through:

NEUROFORGE-FRONTEND/src/services/api.js
🧪 Testing

Backend tests are located under:

NEUROFORGE-BACKEND/src/test/

Run backend tests:

mvn test

Frontend linting can be performed using:

npm run lint
📚 Documentation

Project documentation is available in:

NEUROFORGE-BACKEND/docs/

The documentation includes project materials such as:

Software Requirements Specification
UML documentation
Project module documentation
Enterprise SDLC documentation
Project presentations
🔒 Git and Security

The repository ignores generated and unnecessary files such as:

node_modules/
dist/
target/
.idea/
.vscode/

Environment files containing sensitive information should not be committed.

Examples of information that should remain private:

Database passwords
API keys
Authentication secrets
JWT secrets
Access tokens
Private credentials
🚀 Development Workflow

A typical NeuroForge development workflow is:

1. Start Database
        ↓
2. Start Spring Boot Backend
        ↓
3. Start React Frontend
        ↓
4. Login
        ↓
5. Access SDLC Modules
        ↓
6. Frontend sends REST API request
        ↓
7. Backend processes request
        ↓
8. Database operation
        ↓
9. Backend returns response
        ↓
10. Frontend displays result
🔮 Future Enhancements

Planned or potential improvements include:

Complete JWT authentication
Role-based access control
Advanced dashboard
Project analytics
Requirement traceability
Sprint boards
Kanban task management
Advanced bug tracking
Automated testing
CI/CD integration
Git repository integration
Automated build execution
Automated deployment
Deployment monitoring
Notifications
Audit logging
Swagger/OpenAPI documentation
Responsive UI
Improved accessibility
👩‍💻 Author
Mannuru Prethika

Project: NeuroForge
Domain: Enterprise Software Development Life Cycle Management

📄 License

This project includes a license file in the repository.
