# URL Shortener Frontend

This is the frontend application for the URL Shortener project, built with React, Vite, and Tailwind CSS.

## Features

*   **User Authentication**: Sign up and log in functionality.
*   **URL Shortening**: Create short URLs from long ones.
*   **URL Management**: View a list of all your shortened URLs, copy them to the clipboard, and delete them.
*   **Dark/Light/System Theme**: Toggle between light, dark, and system-default themes.
*   **Responsive Design**: A clean, modern UI that works on various screen sizes.
*   **Toast Notifications**: User-friendly feedback for actions like creating or deleting URLs.

## Tech Stack

*   **Framework**: React (with Vite)
*   **Styling**: Tailwind CSS
*   **State Management**: React Context API
*   **Routing**: React Router DOM
*   **API Calls**: Axios
*   **Animations**: Framer Motion
*   **Notifications**: React Hot Toast

## Project Structure

```
frontend/
└── src/
    ├── assets/
    ├── components/
    │   ├── common/
    │   │   ├── BackButton.jsx
    │   │   ├── Button.jsx
    │   │   ├── Input.jsx
    │   │   ├── Loader.jsx
    │   │   └── Navbar.jsx
    │   └── url/
    │       ├── UrlCard.jsx
    │       └── UrlForm.jsx
    ├── context/
    │   ├── AuthContext.jsx
    │   └── ThemeContext.jsx
    ├── pages/
    │   ├── Auth/
    │   │   ├── Login.jsx
    │   │   └── Register.jsx
    │   ├── Dashboard.jsx
    │   ├── Home.jsx
    │   └── NotFound.jsx
    ├── routes/
    │   └── AppRoutes.jsx
    ├── services/
    │   ├── api.js
    │   ├── auth.service.js
    │   └── url.service.js
    ├── styles/
    │   └── index.css
    ├── utils/
    │   └── token.js
    ├── App.jsx
    └── main.jsx
```

## Getting Started

Follow these instructions to set up and run the frontend application locally.

### Prerequisites

*   Node.js (LTS version recommended)
*   pnpm (or npm/yarn)
*   A running instance of the backend server. Please refer to the `backend/README.md` for setup instructions.

### Installation

1.  **Navigate to the frontend directory**:
    ```bash
    cd frontend
    ```

2.  **Install dependencies**:
    It is recommended to use `pnpm` as specified in the `package.json`:
    ```bash
    pnpm install
    ```
    Alternatively, you can use `npm`:
    ```bash
    npm install
    ```

3.  **Create an environment file** (optional):
    Create a file named `.env` in the `frontend` directory. The application will connect to `http://localhost:8000` by default. If your backend is running on a different URL, specify it in this file:
    ```
    VITE_BACKEND_URL=http://your-backend-url:port
    ```

### Running the Application

To start the development server:

```bash
pnpm run dev
```
or
```bash
npm run dev
```

The application will typically be available at `http://localhost:5173`.
