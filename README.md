# Winglink Project

## About

Winglink is a collaborative project designed to provide a platform for managing flight bookings, and airport information. This application allows users to search for flights, book tickets, and manage their profiles.

## How to Run the Project

### Prerequisites

- Ensure you have the following installed on your machine:
  - **Java 21**
  - **Node.js** (with npm)
  - **Docker** for running the database in a container

### Running the Backend

1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Start the backend application, which will automatically run the PostgreSQL database using Docker Compose:
   ```bash
   mvn spring-boot:run
   ```

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
