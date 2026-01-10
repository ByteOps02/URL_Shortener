# URL Shortener Backend

This is the backend for a URL shortener application. It allows users to create, manage, and use shortened URLs.

## Features

*   User authentication (signup and login) with JWT.
*   Create custom or random short URLs.
*   List all shortened URLs for a user.
*   Delete shortened URLs.
*   Redirect to the original URL from a short URL.

## Technologies Used

*   **Backend:** Node.js, Express.js
*   **Database:** PostgreSQL
*   **ORM:** Drizzle ORM
*   **Authentication:** JSON Web Tokens (JWT)
*   **Validation:** Zod
*   **ID Generation:** nanoid

## API Endpoints

All endpoints are prefixed with `/`.

### Authentication

*   `POST /user/signup`: Create a new user.
    *   **Request Body:**
        ```json
        {
          "firstname": "John",
          "lastname": "Doe",
          "email": "john.doe@example.com",
          "password": "yourpassword"
        }
        ```
    *   **Response:**
        ```json
        {
          "data": {
            "userId": "some-uuid"
          }
        }
        ```

*   `POST /user/login`: Authenticate a user and get a JWT.
    *   **Request Body:**
        ```json
        {
          "email": "john.doe@example.com",
          "password": "yourpassword"
        }
        ```
    *   **Response:**
        ```json
        {
          "token": "your-jwt"
        }
        ```

### URL Management

*   `POST /shorten`: Create a new short URL.
    *   **Headers:** `Authorization: Bearer <your-jwt>`
    *   **Request Body:**
        ```json
        {
          "url": "https://example.com/a-very-long-url",
          "code": "custom-code" // Optional
        }
        ```
    *   **Response:**
        ```json
        {
          "id": "some-uuid",
          "shortCode": "custom-code",
          "targetURL": "https://example.com/a-very-long-url"
        }
        ```

*   `GET /codes`: Get all short codes for the authenticated user.
    *   **Headers:** `Authorization: Bearer <your-jwt>`
    *   **Response:**
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

*   `DELETE /:id`: Delete a short URL by its ID.
    *   **Headers:** `Authorization: Bearer <your-jwt>`
    *   **Response:**
        ```json
        {
          "deleted": true
        }
        ```

*   `GET /:shortCode`: Redirect to the original URL.

## Getting Started

### Prerequisites

*   Node.js
*   pnpm
*   PostgreSQL

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/your-username/url-shortener.git
    cd url-shortener
    ```
2.  Install dependencies:
    ```bash
    pnpm install
    ```
3.  Set up your environment variables. Create a `.env` file in the root of the project and add the following:
    ```
    PORT=8000
    DATABASE_URL="postgresql://postgres:admin@localhost:5432/postgres"
    JWT_SECRET=your-super-secret-key
    ```
4.  Apply database migrations:
    ```bash
    pnpm db:push
    ```

### Running the Application

```bash
pnpm dev
```

The server will start on `http://localhost:8000`.

## Database Schema

The database schema is defined using Drizzle ORM.

### `users` Table

| Column      | Type      | Constraints |
|-------------|-----------|-------------|
| `id`        | `uuid`    | Primary Key |
| `firstname` | `varchar` |             |
| `lastname`  | `varchar` |             |
| `email`     | `varchar` | Unique      |
| `password`  | `varchar` |             |
| `salt`      | `varchar` |             |

### `urls` Table

| Column      | Type      | Constraints      |
|-------------|-----------|------------------|
| `id`        | `uuid`    | Primary Key      |
| `shortCode` | `varchar` | Unique           |
| `targetURL` | `varchar` |                  |
| `userId`    | `uuid`    | Foreign Key to `users.id` |

## License

This project is licensed under the ISC License.
