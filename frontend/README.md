# Shortify Frontend

This directory contains the frontend for the Shortify URL shortener application. It is a modern, responsive single-page application (SPA) built with React, Vite, and Tailwind CSS.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Free Tier Feature](#free-tier-feature)
- [Device Tracking](#device-tracking)
- [API Integration](#api-integration)
- [Troubleshooting](#troubleshooting)

## Features

- **Free Tier**: Try 3 free URL shortens without signup or login required!
- **Device-Based Tracking**: Your free uses are tracked per device and persist forever.
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

### Free Tier Feature

Shortify offers a **free tier** that allows anyone to try the app without signing up:

- **3 Free URL Shortens**: Every device gets 3 free attempts
- **No Authentication**: Try before you commit to an account
- **Device Tracking**: Uses browser fingerprinting to identify devices
- **Persistent**: The counter persists even after browser restart, device restart, or server reboot
- **Smart Prompts**: After 3 uses, users are prompted to sign up/login for unlimited access

#### How Device Tracking Works:
1. The frontend generates a unique device ID based on browser fingerprinting + timestamp
2. This ID is stored in localStorage
3. When user makes free shortens, the count is incremented in localStorage
4. The count persists indefinitely unless user clears browser data
5. After signup/login, users get unlimited shortens

### Rate Limiting

The backend implements rate limiting to prevent abuse:
- **Login/Signup**: Limited to 5 attempts per 15 minutes per IP
- **URL Shortening**: Limited to 30 requests per minute per IP

If you exceed these limits, you will receive a `429 Too Many Requests` error with a toast notification. Wait for the rate limit window to reset before retrying.

### Environment Configuration

Make sure your `.env` file has the correct `VITE_BACKEND_URL`. This should match the URL where your backend server is running.

---

## Device Tracking

The frontend uses browser fingerprinting to create a unique device identifier:

**Device Fingerprinting Process**:
1. Collects browser properties (mimeTypes length, userAgent, plugins count, screen resolution)
2. Creates a hash from this data using Base64 encoding
3. Appends current timestamp for uniqueness
4. Stores in `localStorage` under key `device_id`

**Example Device ID Format**: `dmFyaW91c19kYXRhXzEyMzQ1Ng==_1705592400000`

**Key Functions** (in `src/utils/device.js`):
- `getOrCreateDeviceId()` - Gets existing or generates new device ID
- `getFreeUsesCount()` - Returns current free use count (0-3)
- `getRemainingFreeUses()` - Returns remaining attempts
- `incrementFreeUses()` - Increments counter after successful shorten
- `hasRemainingFreeUses()` - Checks if user can shorten more URLs

---

## API Integration

The frontend communicates with the backend via two main endpoints:

### Free Tier Endpoint
**POST** `/shorten-free`
- No authentication required
- Required: `url` (string), `deviceId` (string)
- Optional: `code` (custom short code)
- Response: `{ id, shortCode, targetURL }`

**Example**:
```javascript
const response = await createShortUrlFree({
  url: "https://example.com/very-long-url",
  deviceId: "unique-device-id"
});
```

### Authenticated Endpoint
**POST** `/shorten`
- Requires: `Authorization: Bearer <token>`
- Required: `url` (string)
- Optional: `code` (custom short code)
- Response: `{ id, shortCode, targetURL }`

**Example**:
```javascript
const response = await createShortUrl({
  url: "https://example.com/very-long-url",
  code: "myshortcode"
});
```

### Axios Interceptor

Authenticated requests automatically include JWT token from localStorage:
```javascript
api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

---

## Troubleshooting

### Free Tier Counter Not Working
- Check if localStorage is enabled in browser
- Clear browser cache and try again
- Check `localStorage.getItem('free_uses')` in console

### Copy Button Not Working
- Ensure you're using HTTPS in production
- Check browser console for permission errors
- Use fallback manual selection if clipboard API fails

### Backend Connection Issues
- Verify `VITE_BACKEND_URL` in `.env` is correct
- Ensure backend server is running on specified port
- Check browser Network tab for failed requests
- Clear browser cache and restart dev server

### Theme Not Persisting
- localStorage should store theme preference
- Check `localStorage.getItem('theme')` in console
- Theme preference is stored per browser/device