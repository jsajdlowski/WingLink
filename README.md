# Winglink Project

## About

Winglink is a collaborative project designed to provide a platform for managing flight bookings, and airport information. This application allows users to search for flights, book tickets, and manage their profiles.

## How to Run the Project

### Prerequisites

- Ensure you have the following installed on your machine:
  - **Node.js** (with npm)
  - **Docker** for running the database and the backend app in a container
  - **Java 21** (optional, for development of the backend app on the host machine)

### Running the Backend and database

**Option 1: Docker Compose**

Use this if you just need to start the backend and database.

1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Run the docker compose file, which starts both the database and backend
   ```bash
   docker compose up -d
   ```
   
**Option 2: Development**

Use this if you want to make changes to the backend app.

1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```

2. Run the PostgreSQL database using the docker compose file:
   ```bash
   docker compose up -d postgres
   ```
   Note: "-d" flag is optional

3. Run the backend app with Maven
    ```bash
   mvn spring-boot:run
    ```
   Note: on Windows it's "mvnw" instead of "mvn". Ensure you have your JAVA_HOME env variable pointing to a JDK 21 or newer.

### Running the Frontend

1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

### Accessing the Application

- Open your web browser and navigate to `http://localhost:5173` to access the frontend application.
