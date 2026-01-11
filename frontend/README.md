# URL Shortener Frontend

This is the frontend application for the URL Shortener project, built with React, Vite, and Tailwind CSS.

## Features

*   **User Authentication**: Sign up, log in, and log out.
*   **URL Shortening**: Input a long URL and optionally provide a custom short code to generate a shortened URL.
*   **URL Management**: View a list of all your shortened URLs, copy them to the clipboard, open them, and delete them.
*   **Dark/Light Mode**: Toggle between dark and light themes, with preference persisted in local storage.
*   **Responsive Design**: Optimized for various screen sizes (mobile, tablet, desktop).
*   **Modern UI/UX**: Features smooth transitions, micro-interactions, and a clean, SaaS-style design using Framer Motion and Tailwind CSS.
*   **Toast Notifications**: Provides user feedback for actions and errors.

## Tech Stack

*   **Framework**: React (with Vite)
*   **Styling**: Tailwind CSS
*   **State Management**: React Context API
*   **Routing**: React Router DOM
*   **API Calls**: Axios
*   **Animations**: Framer Motion
*   **Icons**: Heroicons

## Project Structure

```
frontend/
├── public/
├── src/
│   ├── assets/
│   ├── components/           # Reusable UI components (e.g., Button, Input, ThemeToggleButton, ToastContainer)
│   │   └── ui/
│   ├── context/              # React Context providers (e.g., AuthContext, ThemeContext, ToastContext)
│   ├── hooks/                # Custom React hooks (e.g., useToast)
│   ├── lib/                  # Utility functions (e.g., cn for Tailwind class merging)
│   ├── pages/                # Application pages (e.g., Login, Signup, Dashboard)
│   ├── services/             # API service integration (e.g., api.ts)
│   ├── App.jsx               # Main application component
│   ├── main.jsx              # Entry point of the React app
│   ├── index.css             # Global Tailwind CSS imports
│   └── ...
├── .env                      # Environment variables
├── package.json              # Project dependencies and scripts
├── tailwind.config.js        # Tailwind CSS configuration
├── vite.config.js            # Vite configuration
└── ...
```

## Getting Started

Follow these instructions to set up and run the frontend application.

### Prerequisites

*   Node.js (LTS version recommended)
*   npm or pnpm (pnpm is used in `package.json` for lock file, but npm commands are provided for general use)
*   The backend server must be running (refer to the backend's README for instructions). Ensure the backend is running on `http://localhost:8000`.

### Installation

1.  **Navigate to the frontend directory**:
    ```bash
    cd frontend
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    # or if you use pnpm:
    # pnpm install
    ```

3.  **Create a `.env` file**:
    In the `frontend` directory, create a file named `.env` and add your backend API URL.
    ```
    VITE_BACKEND_URL=http://localhost:8000
    ```
    **Note**: The backend is expected to run on port `8000`. If your backend runs on a different port, update this variable accordingly.

### Running the Application

To start the development server:

```bash
npm run dev
# or if you use pnpm:
# pnpm run dev
```

This will usually start the application on `http://localhost:5173` (or another available port). Open this URL in your web browser.

### Building for Production

To build the application for production:

```bash
npm run build
# or if you use pnpm:
# pnpm run build
```

This will create a `dist` directory with the optimized production build.

## Accessibility

The application strives to adhere to accessibility best practices, including:
*   Semantic HTML for proper structure.
*   Keyboard navigation support for interactive elements.
*   Proper focus states for improved usability.

## Contributing

Please refer to the project's main `README.md` for general contribution guidelines.