# Authify-Project

## Project Description

This project demonstrates how to build a secure and responsive full stack **authentication application** using modern web technologies. The frontend is built with **React 19**, and the backend uses **Spring Boot** with a **MySQL** database.

It covers real-world authentication features like user registration, login, form validation, and protected routes using JWT (JSON Web Tokens). This is a practical example of how to connect a React frontend to a Spring Boot backend using REST APIs.

### What You'll Learn

- Creating a RESTful API with Spring Boot
- Handling user authentication using JWT
- Managing user input and validation with React forms
- Calling backend APIs securely using Axios
- Routing and protecting pages with React Router
- Structuring full stack apps using best practices

---

## Installation

### Prerequisites

- Node.js and Bun
- Java 17+
- Maven or Gradle
- MySQL database

---

### 1. Clone the Repository

```bash
git clone https://github.com/username/project-name.git

### Frontend Setup (React 19)
```bash
cd authify-porject/authify-frontend
bun install
bun run dev

### Backend Setup (Spring Boot)
```bash
spring.datasource.url=jdbc:mysql://localhost:3306/auth_db
spring.datasource.username=root
spring.datasource.password=yourpassword
jwt.secret=your_jwt_secret

### Features
Full stack architecture: React frontend + Spring Boot backend

User registration and login

JWT-based authentication and route protection

REST API integration with Axios

Form validation (both client-side and server-side)

Secure password hashing with BCrypt

Role-based access (optional enhancement)

Responsive design for mobile and desktop

### Technologies Used
#### Frontend

React 19

React Router DOM

Axios

Bun (package manager)

HTML5, CSS3 & Bootstrap

#### Backend

Java 17

Spring Boot

Spring Security

JWT (JSON Web Tokens)

MySQL

JPA (Hibernate)
