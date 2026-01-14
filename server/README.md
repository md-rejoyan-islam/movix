<p align="center">
  <img src="https://nestjs.com/img/logo-small.svg" width="120" alt="NestJS Logo" />
</p>

<h1 align="center">Movix API Server</h1>

<p align="center">
  <strong>Production-ready RESTful API for the Movix Movie Discovery Platform</strong>
</p>

<p align="center">
  <a href="https://nestjs.com/">
    <img src="https://img.shields.io/badge/NestJS-v11-ea2845?style=for-the-badge&logo=nestjs" alt="NestJS" />
  </a>
  <a href="https://www.typescriptlang.org/">
    <img src="https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript" alt="TypeScript" />
  </a>
  <a href="https://www.mongodb.com/">
    <img src="https://img.shields.io/badge/MongoDB-6.0-green?style=for-the-badge&logo=mongodb" alt="MongoDB" />
  </a>
  <a href="https://github.com/md-rejoyan-islam/movix/blob/main/LICENSE">
    <img src="https://img.shields.io/badge/license-MIT-blue?style=for-the-badge" alt="License" />
  </a>
</p>

<p align="center">
  <a href="#-features">Features</a> •
  <a href="#-tech-stack">Tech Stack</a> •
  <a href="#-getting-started">Getting Started</a> •
  <a href="#-api-documentation">API Docs</a> •
  <a href="#-project-structure">Structure</a> •
  <a href="#-deployment">Deployment</a>
</p>

---

## ✨ Features

### 🔐 Authentication & Security

- **JWT Authentication** - Access & refresh token strategy
- **Token Rotation** - Secure refresh token handling
- **Password Hashing** - bcrypt with configurable rounds
- **Password Reset** - Time-limited reset tokens
- **Request Validation** - Input sanitization on all endpoints

### 👤 User Management

- **User Registration** - With email validation
- **Profile Management** - Update personal information
- **Account Deactivation** - Soft delete support
- **Login Tracking** - Last login timestamp

### 📋 Wishlist System

- **CRUD Operations** - Full wishlist management
- **Existence Check** - Quick lookup for items
- **Bulk Operations** - Clear entire wishlist

### 📚 API Documentation

- **OpenAPI 3.0** - Complete specification
- **Swagger UI** - Interactive documentation at `/api-docs`
- **Request/Response Examples** - For all endpoints

### 🛡️ Production Ready

- **Error Handling** - Global exception filters
- **Request Logging** - Comprehensive logging interceptor
- **CORS Configuration** - Secure cross-origin setup
- **Environment Config** - Modular configuration management

---

## 🛠 Tech Stack

<table>
<tr>
<td align="center" width="96">
  <img src="https://skillicons.dev/icons?i=nestjs" width="48" height="48" alt="NestJS" />
  <br>NestJS
</td>
<td align="center" width="96">
  <img src="https://skillicons.dev/icons?i=ts" width="48" height="48" alt="TypeScript" />
  <br>TypeScript
</td>
<td align="center" width="96">
  <img src="https://skillicons.dev/icons?i=mongodb" width="48" height="48" alt="MongoDB" />
  <br>MongoDB
</td>
<td align="center" width="96">
  <img src="https://jwt.io/img/pic_logo.svg" width="48" height="48" alt="JWT" />
  <br>JWT
</td>
<td align="center" width="96">
  <img src="https://avatars.githubusercontent.com/u/16343502?v=4" width="48" height="48" alt="Mongoose" />
  <br>Mongoose
</td>
</tr>
</table>

| Category           | Technologies                        |
| ------------------ | ----------------------------------- |
| **Framework**      | NestJS v11                          |
| **Language**       | TypeScript 5.x                      |
| **Database**       | MongoDB with Mongoose ODM           |
| **Authentication** | JWT (Access + Refresh Tokens)       |
| **Validation**     | class-validator & class-transformer |
| **Documentation**  | OpenAPI 3.0 / Swagger               |
| **Security**       | bcrypt, helmet, cors                |
| **Testing**        | Jest                                |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18.0 or higher
- **pnpm** (recommended) or npm
- **MongoDB** database (local or Atlas)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/md-rejoyan-islam/movix.git
   cd movix/server
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Configure environment variables**

   ```bash
   cp .env.example .env
   ```

   Update `.env` with your configuration:

   ```env
   # ===========================================
   # Movix API Server Environment Configuration
   # ===========================================

   # Application
   NODE_ENV=development
   PORT=5050
   FRONTEND_URL=http://localhost:3000
   API_PREFIX=api
   API_VERSION=v1

   # Database
   MONGODB_URI=mongodb://localhost:27017/movix

   # JWT Authentication
   JWT_ACCESS_SECRET=your-super-secret-access-key-min-32-chars
   JWT_REFRESH_SECRET=your-super-secret-refresh-key-min-32-chars
   JWT_ACCESS_EXPIRATION=15m
   JWT_REFRESH_EXPIRATION=7d

   # Security
   BCRYPT_ROUNDS=10
   ```

4. **Start the development server**

   ```bash
   pnpm run start:dev
   ```

   The API will be available at `http://localhost:5050/api/v1`

### Available Scripts

| Command            | Description                         |
| ------------------ | ----------------------------------- |
| `pnpm start`       | Start the application               |
| `pnpm start:dev`   | Start with hot-reload (development) |
| `pnpm start:debug` | Start in debug mode                 |
| `pnpm start:prod`  | Start in production mode            |
| `pnpm build`       | Build the application               |
| `pnpm lint`        | Lint the codebase                   |
| `pnpm format`      | Format code with Prettier           |
| `pnpm test`        | Run unit tests                      |
| `pnpm test:watch`  | Run tests in watch mode             |
| `pnpm test:cov`    | Run tests with coverage             |
| `pnpm test:e2e`    | Run end-to-end tests                |

---

## 📚 API Documentation

### Interactive Documentation

Once the server is running, access the Swagger UI:

🔗 **http://localhost:5050/api-docs**

### API Endpoints

#### 🔐 Authentication

| Method   | Endpoint                       | Description               | Auth |
| -------- | ------------------------------ | ------------------------- | ---- |
| `POST`   | `/api/v1/auth/register`        | Register a new user       | ❌   |
| `POST`   | `/api/v1/auth/login`           | Login user                | ❌   |
| `POST`   | `/api/v1/auth/refresh-token`   | Refresh access token      | 🔄   |
| `POST`   | `/api/v1/auth/forgot-password` | Request password reset    | ❌   |
| `POST`   | `/api/v1/auth/reset-password`  | Reset password with token | ❌   |
| `GET`    | `/api/v1/auth/profile`         | Get current user profile  | ✅   |
| `PATCH`  | `/api/v1/auth/profile`         | Update user profile       | ✅   |
| `DELETE` | `/api/v1/auth/account`         | Deactivate account        | ✅   |

#### 📋 Wishlist

| Method   | Endpoint                          | Description           | Auth |
| -------- | --------------------------------- | --------------------- | ---- |
| `GET`    | `/api/v1/wishlist`                | Get user's wishlist   | ✅   |
| `POST`   | `/api/v1/wishlist`                | Add item to wishlist  | ✅   |
| `GET`    | `/api/v1/wishlist/check/:movieId` | Check if item exists  | ✅   |
| `DELETE` | `/api/v1/wishlist/:movieId`       | Remove item           | ✅   |
| `DELETE` | `/api/v1/wishlist`                | Clear entire wishlist | ✅   |

### Request/Response Examples

<details>
<summary><strong>POST /api/v1/auth/register</strong></summary>

**Request:**

```json
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123!"
}
```

**Response (201):**

```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": "507f1f77bcf86cd799439011",
      "fullName": "John Doe",
      "email": "john@example.com",
      "isActive": true,
      "createdAt": "2024-01-15T10:30:00.000Z"
    }
  }
}
```

</details>

<details>
<summary><strong>POST /api/v1/auth/login</strong></summary>

**Request:**

```json
{
  "email": "john@example.com",
  "password": "SecurePass123!"
}
```

**Response (200):**

```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "507f1f77bcf86cd799439011",
      "fullName": "John Doe",
      "email": "john@example.com"
    },
    "accessToken": "eyJhbGciOiJIUzI1NiIs...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
  }
}
```

</details>

<details>
<summary><strong>POST /api/v1/wishlist</strong></summary>

**Request:**

```json
{
  "movieId": 550,
  "type": "movie",
  "title": "Fight Club",
  "poster_path": "/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg",
  "vote_average": 8.4,
  "release_date": "1999-10-15"
}
```

**Response (201):**

```json
{
  "success": true,
  "message": "Item added to wishlist",
  "data": {
    "movieId": 550,
    "type": "movie",
    "title": "Fight Club",
    "poster_path": "/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg",
    "vote_average": 8.4,
    "release_date": "1999-10-15",
    "addedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

</details>

---

## 📁 Project Structure

```
server/
├── src/
│   ├── auth/                     # Authentication module
│   │   ├── dto/                 # Data Transfer Objects
│   │   │   ├── register.dto.ts
│   │   │   ├── login.dto.ts
│   │   │   └── reset-password.dto.ts
│   │   ├── services/            # Auth services
│   │   │   └── jwt.service.ts
│   │   ├── auth.controller.ts   # Route handlers
│   │   ├── auth.service.ts      # Business logic
│   │   └── auth.module.ts       # Module definition
│   │
│   ├── common/                   # Shared resources
│   │   ├── constants/           # App constants
│   │   │   └── index.ts
│   │   ├── decorators/          # Custom decorators
│   │   │   └── current-user.decorator.ts
│   │   ├── filters/             # Exception filters
│   │   │   └── http-exception.filter.ts
│   │   ├── guards/              # Auth guards
│   │   │   └── jwt-auth.guard.ts
│   │   ├── interceptors/        # Request interceptors
│   │   │   └── logging.interceptor.ts
│   │   └── interfaces/          # TypeScript interfaces
│   │       └── jwt-payload.interface.ts
│   │
│   ├── config/                   # Configuration
│   │   ├── app.config.ts        # App configuration
│   │   ├── database.config.ts   # Database config
│   │   ├── jwt.config.ts        # JWT config
│   │   └── configuration.ts     # Config aggregator
│   │
│   ├── users/                    # Users module
│   │   ├── dto/
│   │   ├── schemas/
│   │   │   └── user.schema.ts
│   │   └── users.module.ts
│   │
│   ├── wishlist/                 # Wishlist module
│   │   ├── dto/
│   │   │   └── create-wishlist.dto.ts
│   │   ├── schemas/
│   │   │   └── wishlist.schema.ts
│   │   ├── wishlist.controller.ts
│   │   ├── wishlist.service.ts
│   │   └── wishlist.module.ts
│   │
│   ├── types/                    # Global types
│   ├── app.module.ts             # Root module
│   ├── app.controller.ts         # Health check
│   ├── app.service.ts            # App service
│   └── main.ts                   # Entry point
│
├── test/                         # E2E tests
│   ├── app.e2e-spec.ts
│   └── jest-e2e.json
│
├── .env.example                  # Environment template
├── nest-cli.json                 # NestJS CLI config
├── openapi.yaml                  # OpenAPI specification
├── package.json                  # Dependencies
├── tsconfig.json                 # TypeScript config
└── tsconfig.build.json           # Build config
```

---

## ⚙️ Environment Variables

| Variable                 | Description               | Required | Default       |
| ------------------------ | ------------------------- | -------- | ------------- |
| `NODE_ENV`               | Environment mode          | ❌       | `development` |
| `PORT`                   | Server port               | ❌       | `5050`        |
| `FRONTEND_URL`           | Frontend URL for CORS     | ✅       | -             |
| `MONGODB_URI`            | MongoDB connection string | ✅       | -             |
| `JWT_ACCESS_SECRET`      | Secret for access tokens  | ✅       | -             |
| `JWT_REFRESH_SECRET`     | Secret for refresh tokens | ✅       | -             |
| `JWT_ACCESS_EXPIRATION`  | Access token expiry       | ❌       | `15m`         |
| `JWT_REFRESH_EXPIRATION` | Refresh token expiry      | ❌       | `7d`          |
| `BCRYPT_ROUNDS`          | Password hashing rounds   | ❌       | `10`          |

---

## 🔒 Security Best Practices

| Feature              | Implementation                               |
| -------------------- | -------------------------------------------- |
| **Password Hashing** | bcrypt with configurable salt rounds         |
| **JWT Strategy**     | Short-lived access tokens (15m)              |
| **Token Refresh**    | Long-lived refresh tokens (7d) with rotation |
| **Input Validation** | class-validator on all DTOs                  |
| **CORS**             | Whitelist-based origin configuration         |
| **Environment**      | Sensitive data in environment variables      |
| **Error Handling**   | No sensitive data in error responses         |
| **Logging**          | Request/response logging with sanitization   |

---

## 🚢 Deployment

### Docker Deployment

```dockerfile
# Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install --frozen-lockfile

COPY . .
RUN pnpm build

EXPOSE 5050

CMD ["node", "dist/main"]
```

```bash
# Build and run
docker build -t movix-api .
docker run -p 5050:5050 --env-file .env movix-api
```

### Production Checklist

- [ ] Set `NODE_ENV=production`
- [ ] Use strong JWT secrets (min 32 characters)
- [ ] Configure proper CORS origins
- [ ] Set up MongoDB Atlas with proper security
- [ ] Enable SSL/TLS
- [ ] Set up monitoring and logging
- [ ] Configure rate limiting
- [ ] Set up backup strategy

---

## 🧪 Testing

```bash
# Unit tests
pnpm test

# Watch mode
pnpm test:watch

# Coverage report
pnpm test:cov

# E2E tests
pnpm test:e2e
```

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Commit Convention

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add user profile endpoint
fix: resolve token refresh issue
docs: update API documentation
refactor: optimize wishlist queries
test: add auth e2e tests
chore: update dependencies
```

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](../LICENSE) file for details.

---

## 👨‍💻 Author

<p align="center">
  <img src="https://github.com/md-rejoyan-islam.png" width="100" style="border-radius: 50%" alt="Author" />
</p>

<p align="center">
  <strong>Md Rejoyan Islam</strong>
  <br>
  <a href="mailto:mdrejoyanislam1@gmail.com">Email</a> •
  <a href="https://rejoyan.me">Portfolio</a> •
  <a href="https://github.com/md-rejoyan-islam">GitHub</a> •
  <a href="https://linkedin.com/in/md-rejoyan-islam">LinkedIn</a>
</p>

---

<p align="center">
  Made with ❤️ using NestJS
</p>

<p align="center">
  <a href="https://github.com/md-rejoyan-islam/movix/issues">Report Bug</a> •
  <a href="https://github.com/md-rejoyan-islam/movix/issues">Request Feature</a>
</p>
