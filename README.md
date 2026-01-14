<p align="center">
  <img src="client/public/movix-logo.svg" alt="Movix Logo" width="200" />
</p>

<h1 align="center">🎬 Movix - Full Stack Movie Discovery Platform</h1>

<p align="center">
  <strong>A modern, responsive movie and TV show discovery platform built with Next.js and NestJS</strong>
</p>

<p align="center">
  <a href="https://movix.rejoyan.me">
    <img src="https://img.shields.io/badge/🌐_Live_Demo-Visit_Site-blue?style=for-the-badge" alt="Live Demo" />
  </a>
  <a href="https://github.com/md-rejoyan-islam/movix/blob/main/LICENSE">
    <img src="https://img.shields.io/badge/📄_License-MIT-green?style=for-the-badge" alt="License" />
  </a>
  <a href="#docker">
    <img src="https://img.shields.io/badge/🐳_Docker-Ready-2496ed?style=for-the-badge&logo=docker" alt="Docker" />
  </a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Frontend-Next.js_16-000000?style=flat-square&logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/Backend-NestJS_11-ea2845?style=flat-square&logo=nestjs" alt="NestJS" />
  <img src="https://img.shields.io/badge/Database-MongoDB-47a248?style=flat-square&logo=mongodb" alt="MongoDB" />
  <img src="https://img.shields.io/badge/Language-TypeScript-3178c6?style=flat-square&logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Auth-JWT-000000?style=flat-square&logo=jsonwebtokens" alt="JWT" />
  <img src="https://img.shields.io/badge/Styling-TailwindCSS-06b6d4?style=flat-square&logo=tailwindcss" alt="Tailwind CSS" />
</p>

---

## 🌟 Features

### 🎭 Core Features

- **🔍 Advanced Search** - Search movies and TV shows with real-time suggestions
- **🎯 Smart Filtering** - Filter by genre, year, rating, and popularity
- **❤️ Wishlist Management** - Save and organize your favorite content
- **⚖️ Compare Movies** - Side-by-side comparison of movies and TV shows
- **🌟 Personalized Ratings** - Rate and review content
- **🔐 Secure Authentication** - JWT-based user authentication with refresh tokens

### 🎨 User Experience

- **📱 Responsive Design** - Seamless experience across all devices
- **🌙 Modern UI/UX** - Clean, intuitive interface with beautiful animations
- **⚡ Fast Performance** - Optimized for speed with Next.js 16 and Turbopack
- **🔄 Real-time Updates** - Live data synchronization
- **💫 Interactive Elements** - Smooth transitions and hover effects

### 🔧 Technical Features

- **🏗️ Modular Architecture** - Clean separation of concerns
- **🔒 Security First** - CORS protection, input validation, secure headers
- **📊 Health Monitoring** - Built-in health checks and monitoring
- **🐳 Container Ready** - Single-container Docker deployment
- **📚 API Documentation** - Comprehensive Swagger documentation

---

## 🏗️ Architecture

```
movix/
├── 📁 client/          # Next.js Frontend (Port: 3000)
│   ├── 📁 app/         # App Router pages
│   ├── 📁 components/  # Reusable UI components
│   ├── 📁 lib/         # RTK Query, utilities, types
│   └── 📄 README.md    # Frontend documentation
├── 📁 server/          # NestJS Backend (Port: 5050)
│   ├── 📁 src/         # API controllers, services, modules
│   ├── 📁 docs/        # API documentation
│   └── 📄 README.md    # Backend documentation
├── 🐳 Dockerfile       # Single container setup
├── 🐳 docker-compose.yml
└── 🚀 start.sh         # Container startup script
```

### 📡 API Integration

- **🎬 TMDB API** - Real-time movie and TV show data
- **🔗 RESTful Endpoints** - Clean, standardized API design
- **📋 Swagger Documentation** - Interactive API explorer at `/api/docs`

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+ and **pnpm** 8+
- **MongoDB** 6.0+ (Atlas recommended)
- **Docker** & **Docker Compose** (for containerized deployment)

### 🔧 Environment Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/md-rejoyan-islam/movix.git
   cd movix
   ```

2. **Configure environment variables**

   ```bash
   # Server environment (.env)
   cp server/.env.example server/.env

   # Client environment (.env.local)
   cp client/.env.example client/.env.local
   ```

3. **Install dependencies**

   ```bash
   # Server dependencies
   cd server && pnpm install

   # Client dependencies
   cd ../client && pnpm install
   ```

### 🏃‍♂️ Development Mode

**Option 1: Run Separately**

```bash
# Terminal 1 - Start server (Port: 5050)
cd server && pnpm run start:dev

# Terminal 2 - Start client (Port: 3000)
cd client && pnpm run dev
```

**Option 2: Run with pnpm workspace**

```bash
# From root directory
pnpm run dev
```

---

## 🐳 Docker Deployment

### Single Container Setup

Our streamlined Docker configuration runs both frontend and backend in a single container for easy deployment.

```bash
# Build and start
docker-compose up -d --build

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

**Container Details:**

- **Image**: `movix` (unified container)
- **Ports**: `3000` (frontend), `5050` (backend)
- **Health Checks**: Automatic health monitoring
- **Auto-restart**: Unless stopped manually

### Production Deployment

```bash
# Production build
docker-compose -f docker-compose.yml up -d --build

# With custom domain (Traefik)
# Update docker-compose.yml with your domain
docker-compose up -d --build
```

---

## 📚 Documentation

### 📖 Component Documentation

- **[Frontend Documentation](client/README.md)** - Next.js app, components, and features
- **[Backend Documentation](server/README.md)** - NestJS API, authentication, and database

### 🔗 API Documentation

- **Swagger UI**: http://localhost:5050/api/docs (when running)
- **Health Check**: http://localhost:5050/health
- **API Base**: http://localhost:5050/api/v1

### 🎯 Key Endpoints

```
GET  /api/v1/health           # Health check
POST /api/v1/auth/login       # User authentication
GET  /api/v1/auth/profile     # User profile
POST /api/v1/wishlist         # Add to wishlist
GET  /api/v1/wishlist         # Get user wishlist
```

---

## 🛠️ Development

### 📦 Package Management

- **Package Manager**: pnpm (workspace support)
- **Node Version**: 18+ LTS
- **TypeScript**: Strict mode enabled

### 🧪 Testing

```bash
# Server tests
cd server && pnpm test

# Client tests (if available)
cd client && pnpm test
```

### 🔍 Code Quality

```bash
# Lint server
cd server && pnpm lint

# Lint client
cd client && pnpm lint

# Format code
pnpm format
```

---

## 🌍 Environment Variables

### 🗄️ Server (.env)

```bash
# Database
MONGODB_URI=mongodb://localhost:27017/movix

# JWT Configuration
JWT_SECRET=your-super-secret-key
JWT_EXPIRES_IN=15m
REFRESH_TOKEN_SECRET=your-refresh-secret
REFRESH_TOKEN_EXPIRES_IN=7d

# API Configuration
PORT=5050
CORS_ORIGIN=http://localhost:3000

# External APIs
TMDB_API_KEY=your-tmdb-api-key
```

### 🎨 Client (.env.local)

```bash
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:5050/api/v1

# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME=Movix

# External APIs
NEXT_PUBLIC_TMDB_API_KEY=your-tmdb-api-key
NEXT_PUBLIC_TMDB_BASE_URL=https://api.themoviedb.org/3
```

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### 📋 Contribution Guidelines

- Follow TypeScript best practices
- Write tests for new features
- Update documentation as needed
- Follow conventional commit messages

---

## 🔒 Security

- **🔐 JWT Authentication** - Secure token-based authentication
- **🔄 Refresh Tokens** - Automatic token refresh mechanism
- **🛡️ Input Validation** - Comprehensive request validation
- **🚨 CORS Protection** - Configured cross-origin resource sharing
- **🔍 Security Headers** - Helmet.js security middleware

---

## 📈 Performance

- **⚡ Next.js 16** - Latest React framework with Turbopack
- **🗄️ MongoDB Indexing** - Optimized database queries
- **📦 Code Splitting** - Automatic bundle optimization
- **🖼️ Image Optimization** - Next.js Image component
- **⚠️ Error Boundaries** - Graceful error handling

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Md Rejoyan Islam**

- 🌐 **Portfolio**: [rejoyan.me](https://rejoyan.me)
- 📧 **Email**: md.rejoyanislam.2002@gmail.com
- 🐙 **GitHub**: [@md-rejoyan-islam](https://github.com/md-rejoyan-islam)
- 💼 **LinkedIn**: [rejoyan-islam](https://linkedin.com/in/rejoyan-islam)

---

## 🎉 Acknowledgments

- **🎬 TMDB** - Movie and TV show data
- **⚛️ React & Next.js Team** - Amazing frontend framework
- **🐈 NestJS Team** - Powerful backend framework
- **🍃 MongoDB** - Flexible database solution
- **🐳 Docker** - Containerization platform

---

<p align="center">
  <strong>⭐ Star this project if you find it helpful!</strong>
</p>

<p align="center">
  <a href="https://movix.rejoyan.me">
    🌐 Live Demo
  </a> •
  <a href="client/README.md">
    📖 Frontend Docs
  </a> •
  <a href="server/README.md">
    🔧 Backend Docs
  </a> •
  <a href="https://github.com/md-rejoyan-islam/movix/issues">
    🐛 Report Bug
  </a> •
  <a href="https://github.com/md-rejoyan-islam/movix/issues">
    💡 Request Feature
  </a>
</p>
