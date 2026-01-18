# Shortify Backend

This directory contains the backend for the Shortify URL shortener application. It is built with Node.js and Express and provides a RESTful API for user authentication and URL management.

## Features

- **User Authentication**: Secure signup and login with JWT.
- **URL Management**: Create, retrieve, and delete shortened URLs.
- **Redirection**: Handles redirection from short URLs to their original target.
- **Rate Limiting**: Built-in protection against abuse with configurable rate limits.
- **Database**: Uses PostgreSQL with Drizzle ORM for database management.

## Technologies Used

- **Framework**: Node.js, Express.js
- **Database**: PostgreSQL
- **ORM**: Drizzle ORM
- **Authentication**: JSON Web Tokens (JWT)
- **Validation**: Zod
- **Rate Limiting**: `express-rate-limit`
- **ID Generation**: `nanoid`

## API Endpoints

All endpoints are accessible under the `/` prefix.

### Authentication

- `POST /user/signup`: Creates a new user account.
  - **Request Body**:
    ```json
    {
      "firstname": "John",
      "lastname": "Doe",
      "email": "john.doe@example.com",
      "password": "yourpassword"
    }
    ```
  - **Response**:
    ```json
    {
      "data": {
        "userId": "some-uuid"
      }
    }
    ```

- `POST /user/login`: Authenticates a user and returns a JWT.
  - **Request Body**:
    ```json
    {
      "email": "john.doe@example.com",
      "password": "yourpassword"
    }
    ```
  - **Response**:
    ```json
    {
      "token": "your-jwt"
    }
    ```

### URL Management

- `POST /shorten`: Creates a new short URL.
  - **Headers**: `Authorization: Bearer <your-jwt>`
  - **Request Body**:
    ```json
    {
      "url": "https://example.com/a-very-long-url",
      "code": "custom-code" // Optional
    }
    ```
  - **Response**:
    ```json
    {
      "id": "some-uuid",
      "shortCode": "custom-code",
      "targetURL": "https://example.com/a-very-long-url"
    }
    ```

- `GET /codes`: Retrieves all short codes for the authenticated user.
  - **Headers**: `Authorization: Bearer <your-jwt>`
  - **Response**:
    ```json
    {
      "codes": [
        {
          "id": "some-uuid",
          "shortCode": "custom-code",
          "targetURL": "https://example.com/a-very-long-url",
          "userId": "user-uuid"
        }
      ]
    }
    ```

- `DELETE /:id`: Deletes a short URL by its ID.
  - **Headers**: `Authorization: Bearer <your-jwt>`
  - **Response**:
    ```json
    {
      "deleted": true
    }
    ```

- `GET /:shortCode`: Redirects to the original URL.

## Rate Limiting

The API implements a three-tier rate limiting strategy to prevent abuse:

- **Global Limiter**: 100 requests per 15 minutes per IP (all routes)
- **Authentication Limiter**: 5 requests per 15 minutes per IP (`/user` routes - signup, login)
- **URL Limiter**: 30 requests per 1 minute per IP (URL shortening endpoints)

When a rate limit is exceeded, the API returns a `429 Too Many Requests` response with the following headers:
- `RateLimit-Limit`: Maximum requests allowed
- `RateLimit-Remaining`: Remaining requests in the current window
- `RateLimit-Reset`: Time when the rate limit resets (Unix timestamp)

## Getting Started

### Prerequisites

- Node.js
- pnpm
- PostgreSQL

### Installation

1.  **Clone the repository** and navigate to the `backend` directory.
2.  **Install dependencies**:
    ```bash
    pnpm install
    ```
3.  **Set up environment variables**: Create a `.env` file and add the following:
    ```
    PORT=8000
    DATABASE_URL="postgresql://postgres:admin@localhost:5432/postgres"
    JWT_SECRET=your-super-secret-key
    ```
4.  **Start the database**:
    ```bash
    docker-compose up -d
    ```
5.  **Apply database migrations**:
    ```bash
    pnpm db:push
    ```

### Available Commands

- **Start the development server**:
  ```bash
  pnpm run dev
  ```
- **Manage the database**:
  - `docker-compose up -d`: Start the database.
  - `docker-compose down`: Stop the database.
  - `pnpm db:push`: Apply migrations.
  - `pnpm db:studio`: Open the database studio.

The server will be available at `http://localhost:8000`.

## Database Schema

The database schema is defined with Drizzle ORM and consists of two main tables:

### `users`

| Column      | Type      | Constraints |
|-------------|-----------|-------------|
| `id`        | `uuid`    | Primary Key |
| `firstname` | `varchar` |             |
| `lastname`  | `varchar` |             |
| `email`     | `varchar` | Unique      |
| `password`  | `varchar` |             |
| `salt`      | `varchar` |             |

### `urls`

| Column      | Type      | Constraints               |
|-------------|-----------|---------------------------|
| `id`        | `uuid`    | Primary Key               |
| `shortCode` | `varchar` | Unique                    |
| `targetURL` | `varchar` |                           |
| `userId`    | `uuid`    | Foreign Key to `users.id` |