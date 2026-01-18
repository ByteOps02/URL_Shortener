# Shortify Frontend

This directory contains the frontend for the Shortify URL shortener application. It is a modern, responsive single-page application (SPA) built with React, Vite, and Tailwind CSS.

## Features

- **User Authentication**: Seamless sign-up and log-in experience.
- **URL Shortening**: An intuitive interface for creating short URLs.
- **Dashboard**: A comprehensive dashboard to manage all your shortened URLs.
- **Theme Switcher**: Toggle between light, dark, and system themes.
- **Responsive Design**: A clean, mobile-first design that adapts to any screen size.
- **Toast Notifications**: User-friendly feedback for important actions and errors.
- **Rate Limit Handling**: Graceful error handling for API rate limiting.

## Tech Stack

- **Framework**: React (with Vite)
- **Styling**: Tailwind CSS
- **State Management**: React Context API
- **Routing**: React Router DOM
- **API Calls**: Axios
- **Animations**: Framer Motion
- **Notifications**: React Hot Toast

## Project Structure

The `src` directory is organized as follows:

```
frontend/
└── src/
    ├── assets/
    ├── components/
    │   ├── common/
    │   └── url/
    ├── context/
    ├── pages/
    │   └── Auth/
    ├── routes/
    ├── services/
    ├── styles/
    ├── utils/
    ├── App.jsx
    └── main.jsx
```

- **`components`**: Reusable UI components.
- **`context`**: React context for state management (e.g., authentication, theme).
- **`pages`**: Top-level page components for different routes.
- **`routes`**: Application routing setup.
- **`services`**: Modules for interacting with the backend API.
- **`styles`**: Global styles and Tailwind CSS configuration.
- **`utils`**: Utility functions.

## Getting Started

To run the frontend application locally, follow these instructions.

### Prerequisites

- Node.js (LTS version)
- pnpm (or npm/yarn)
- A running instance of the backend server. See the [backend README](../backend/README.md) for instructions.

### Installation

1.  **Navigate to the frontend directory**:
    ```bash
    cd frontend
    ```

2.  **Install dependencies**:
    ```bash
    pnpm install
    ```

3.  **Create an environment file**:
    Create a `.env` file in the `frontend` directory and specify the backend URL:
    ```
    VITE_BACKEND_URL=http://localhost:8000
    ```
    If your backend is running on a different URL, update the value accordingly.

### Running the Application

To start the development server:

```bash
pnpm run dev
```

The application will be available at `http://localhost:5173`.

## Important Notes

### Rate Limiting

The backend implements rate limiting to prevent abuse:
- **Login/Signup**: Limited to 5 attempts per 15 minutes per IP
- **URL Shortening**: Limited to 30 requests per minute per IP

If you exceed these limits, you will receive a `429 Too Many Requests` error with a toast notification. Wait for the rate limit window to reset before retrying.

### Environment Configuration

Make sure your `.env` file has the correct `VITE_BACKEND_URL`. This should match the URL where your backend server is running.