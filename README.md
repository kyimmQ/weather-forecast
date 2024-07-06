# Description

Weather Forecast App

## Technology

Frontend: Reactjs, Ant Design

Backend: TypeScript, Nestjs, TypeORM

Databse: PostgreSQL

## How to run localy

### Prerequisites

Having docker and docker-compose already install on you machine

### Clone the project

Clone the project to your machine

### Create environment files for the application

Create 3 .env file: `.env`, `client/.env` and `server/.env`

#### `.env` file

In the root directory:

```bash
DB_DATABASE=
DB_USERNAME=
DB_PASSWORD=
```

- DB_DATABASE: The name of your database.
- DB_USERNAME: The username used to access your database.
- DB_PASSWORD: The password used to access your database.

#### `client/.env` file

```bash
REACT_APP_BACKEND_URL=
```

- REACT_APP_BACKEND_URL: The URL where your backend is hosted. This will allow your frontend to communicate with your backend.

#### `server/.env` file

```bash
WEATHER_API_KEY=
DB_HOST=db
DB_PORT=5432
DB_USERNAME=
DB_PASSWORD=
DB_DATABASE=
JWT_SECRET=
EMAIL_USER=
EMAIL_PASS=
BASE_URL=
```

- WEATHER_API_KEY: Your API key for accessing the WeatherAPI service.
- DB_PORT: The port number on which your database is running, typically 5432 for PostgreSQL.
- DB_HOST: The host address of your database, usually db if using Docker.
- DB_USERNAME: The username used to access your database.
- DB_PASSWORD: The password used to access your database.
- DB_DATABASE: The name of your database.
- JWT_SECRET: A secret key used for signing JSON Web Tokens.
- EMAIL_USER: The email address used for sending email notifications.
- EMAIL_PASS: The password for the email account used for sending notifications.
- BASE_URL: The base URL of your backend.

### Run the application

```bash
cd weather-forecast
docker-compose up
```
