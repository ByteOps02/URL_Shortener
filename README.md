# Shortify - A Full-Stack URL Shortener

Shortify is a modern, full-stack URL shortener application built with a React frontend and a Node.js/Express backend. It provides a seamless experience for users to create, manage, and share shortened URLs. With a clean, responsive interface and powerful features, Shortify is designed to be both user-friendly and highly functional.

## Key Features

- **User Authentication**: Secure user registration and login using JWT-based authentication.
- **URL Shortening**: Generate custom or random short URLs from long ones.
- **URL Management**: Create, retrieve, and delete shortened URLs.
- **Redirection**: Handles redirection from short URLs to their original target.
- **Dashboard**: A personalized dashboard to view, copy, and delete your shortened URLs.
- **Theme Control**: Switch between light, dark, and system-default themes for a comfortable user experience.
- **Responsive Design**: A sleek and modern UI that looks great on all screen sizes.
- **API Endpoints**: A well-structured backend API for managing users and URLs.
- **Toast Notifications**: Instant, user-friendly feedback for all actions.
- **Database**: Uses PostgreSQL with Drizzle ORM for database management.

## Tech Stack

| Category          | Technology                                       |
| ----------------- | ------------------------------------------------ |
| **Frontend**      | React, Vite, Tailwind CSS, React Router, Axios   |
| **Backend**       | Node.js, Express.js, PostgreSQL, Drizzle ORM     |
| **Authentication**| JSON Web Tokens (JWT)                            |
| **Containerization**| Docker                                           |

### Backend Technologies
- **Framework**: Node.js, Express.js
- **Database**: PostgreSQL
- **ORM**: Drizzle ORM
- **Authentication**: JSON Web Tokens (JWT)
- **Validation**: Zod
- **ID Generation**: `nanoid`

## Project Structure

The project is organized into two main directories:

- **`/frontend`**: Contains the React application, including all components, pages, services, and styles.
- **`/backend`**: Contains the Node.js server, including API routes, database models, and authentication logic.

## Getting Started

To get the application up and running locally, follow these steps:

### Prerequisites

- Node.js (LTS version)
- pnpm (or npm/yarn)
- Docker and Docker Compose

---

### Step 1: Clone the Repository

Clone this project to your local machine:
```bash
git clone <your-repository-url>
cd <repository-folder>
```

---

### Step 2: Backend Setup

First, set up and start the backend server.

1.  **Navigate to the backend directory**:
    ```bash
    cd backend
    ```

2.  **Create Environment File**:
    Create a `.env` file in the `backend` directory and add the following variables.
    ```
    # Port for the backend server
    PORT=8000

    # Connection string for your PostgreSQL database
    DATABASE_URL="postgresql://postgres:admin@localhost:5432/postgres"

    # A strong, secret key for signing JWTs
    JWT_SECRET=your-super-secret-key
    ```

3.  **Start the Database**:
    Run the following command from the `backend` directory to start a PostgreSQL instance using Docker.
    ```bash
    docker-compose up -d
    ```

4.  **Install Dependencies**:
    ```bash
    pnpm install
    ```

5.  **Run Database Migrations**:
    Apply the database schema to your PostgreSQL instance.
    ```bash
    pnpm db:push
    ```

6.  **Start the Backend Server**:
    ```bash
    pnpm run dev
    ```
    The backend server will start on **`http://localhost:8000`**. Keep this terminal running.

---

### Step 3: Frontend Setup

In a new terminal, set up and start the frontend application.

1.  **Navigate to the frontend directory**:
    From the project root, run:
    ```bash
    cd frontend
    ```

2.  **Install Dependencies**:
    ```bash
    pnpm install
    ```

3.  **Start the Frontend Server**:
    ```bash
    pnpm run dev
    ```
    The frontend development server will start, typically on **`http://localhost:5173`**.

---

### Step 4: Access the Application

Open your web browser and navigate to the frontend URL (e.g., `http://localhost:5173`). You should now be able to register, log in, and use the URL shortener application.