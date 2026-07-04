# actually.mi API

A mostly production-ready REST API for the actually.mi social platform, built with Node.js, Express, and TypeScript.

## Tech Stack

- **Runtime:** Node.js 24+ / Express 5
- **Language:** TypeScript
- **ORM:** Prisma 7 with PostgreSQL
- **Caching:** Redis (Upstash)
- **Auth:** JWT + bcrypt
- **Security:** Helmet, express-rate-limit, sanitize-html
- **Docs:** Swagger UI (OpenAPI 3.0)
- **Testing:** Jest, Supertest, jest-mock-extended (100% coverage)
- **Code Quality:** ESLint, Prettier, Husky, lint-staged

## Endpoints

| Method | Route          | Description                   | Auth |
| ------ | -------------- | ----------------------------- | ---- |
| POST   | /auth/register | Register a new user           | No   |
| POST   | /auth/login    | Login with email and password | No   |
| GET    | /auth/mi       | Get current user data         | Yes  |
| PUT    | /auth/mi       | Update current user data      | Yes  |

## Getting Started

### Prerequisites

- Node.js 24+
- PostgreSQL 18+
- Upstash account (for Redis caching in production)

### Install dependencies

```bash
npm install
```

### Environment variables

Create a `.env` file in the root with the following:

```
DATABASE_URL=postgresql://user:your_password@localhost:####/actually_mi
JWT_SECRET=your_secret_here
PORT=####
REDIS_URL="rediss://default:*****@distinct-quail-######.upstash.io:####"
```

### Run in development

```bash
npm run start:dev
```

### Build for production and run production instance

```bash
npm run start:prod
```

## Testing

### Run tests

```bash
npm run test
```

### Run tests with coverage

```bash
npm run test:coverage
```

### Run linting

```bash
npm run lint
```

## API Documentation

Swagger UI is available at `http://localhost:8080/api-docs` when running in development mode.
