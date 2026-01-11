# URL Shortener - Full Stack Project

This is a full-stack URL shortener application built with a React frontend and a Node.js/Express backend. It allows users to sign up, log in, and manage their own shortened URLs.

## Features

*   **User Authentication**: Secure sign up and login functionality using JWT.
*   **URL Shortening**: Create custom or randomly generated short URLs from long ones.
*   **URL Management**: A dashboard to view, copy, and delete your shortened URLs.
*   **Theme Control**: Toggle between light, dark, and system-default themes.
*   **Responsive Design**: A clean, modern UI optimized for all screen sizes.
*   **API Endpoints**: A well-defined backend API for managing users and URLs.
*   **Toast Notifications**: User-friendly feedback for application events.

## Tech Stack

### Frontend
*   **Framework**: React (with Vite)
*   **Styling**: Tailwind CSS
*   **State Management**: React Context API
*   **Routing**: React Router DOM
*   **API Calls**: Axios
*   **Animations**: Framer Motion
*   **Notifications**: React Hot Toast

### Backend
*   **Framework**: Node.js, Express.js
*   **Database**: PostgreSQL
*   **ORM**: Drizzle ORM
*   **Containerization**: Docker (for database)
*   **Authentication**: JSON Web Tokens (JWT)
*   **Validation**: Zod

## Project Structure

```
.
├── backend/     # Node.js, Express, Drizzle ORM
└── frontend/    # React, Vite, Tailwind CSS
```

## Getting Started

Follow these steps to set up and run the entire application locally.

### Prerequisites

*   Node.js (LTS version recommended)
*   pnpm (or npm/yarn)
*   Docker and Docker Compose

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
