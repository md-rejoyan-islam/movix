<p align="center">
  <img src="public/movix-logo.svg" alt="Movix Logo" width="200" />
</p>

<h1 align="center">Movix - Movie Discovery Platform</h1>

<p align="center">
  <strong>Discover, explore, and track your favorite movies and TV shows</strong>
</p>

<p align="center">
  <a href="https://movix-cinema.vercel.app">
    <img src="https://img.shields.io/badge/demo-live-green?style=for-the-badge" alt="Live Demo" />
  </a>
  <a href="https://github.com/md-rejoyan-islam/movix/blob/main/LICENSE">
    <img src="https://img.shields.io/badge/license-MIT-blue?style=for-the-badge" alt="License" />
  </a>
  <a href="https://deepscan.io/dashboard#view=project&tid=27701&pid=30098&bid=964491">
    <img src="https://deepscan.io/api/teams/27701/projects/30098/branches/964491/badge/grade.svg" alt="DeepScan grade" />
  </a>
</p>

<p align="center">
  <a href="#-features">Features</a> •
  <a href="#-tech-stack">Tech Stack</a> •
  <a href="#-getting-started">Getting Started</a> •
  <a href="#-screenshots">Screenshots</a> •
  <a href="#-project-structure">Structure</a> •
  <a href="#-contributing">Contributing</a>
</p>

---

## ✨ Features

### 🎬 Content Discovery

- **Trending Content** - Stay updated with what's hot right now
- **Popular Movies & TV Shows** - Discover fan favorites
- **Top Rated** - Explore critically acclaimed titles
- **Advanced Search** - Find content with real-time suggestions
- **Genre Filtering** - Browse by your favorite genres

### 👤 User Experience

- **User Authentication** - Secure JWT-based login with refresh tokens
- **Personal Wishlist** - Save movies and shows to watch later
- **Movie Comparison** - Compare up to 3 titles side by side
- **Responsive Design** - Seamless experience on any device

### 🎨 UI/UX

- **Dynamic Hero Banners** - Beautiful backdrop images from trending content
- **Smooth Animations** - Polished micro-interactions with Framer Motion
- **Dark Theme** - Easy on the eyes with a modern dark interface
- **Skeleton Loading** - Smooth loading states for better UX

---

## 🛠 Tech Stack

<table>
<tr>
<td align="center" width="96">
  <img src="https://skillicons.dev/icons?i=nextjs" width="48" height="48" alt="Next.js" />
  <br>Next.js 16
</td>
<td align="center" width="96">
  <img src="https://skillicons.dev/icons?i=ts" width="48" height="48" alt="TypeScript" />
  <br>TypeScript
</td>
<td align="center" width="96">
  <img src="https://skillicons.dev/icons?i=redux" width="48" height="48" alt="Redux" />
  <br>Redux Toolkit
</td>
<td align="center" width="96">
  <img src="https://skillicons.dev/icons?i=tailwind" width="48" height="48" alt="Tailwind" />
  <br>Tailwind CSS
</td>
<td align="center" width="96">
  <img src="https://cdn.worldvectorlogo.com/logos/framer-motion.svg" width="48" height="48" alt="Framer" />
  <br>Framer Motion
</td>
</tr>
</table>

| Category             | Technologies                      |
| -------------------- | --------------------------------- |
| **Framework**        | Next.js 16 with App Router        |
| **Language**         | TypeScript                        |
| **State Management** | Redux Toolkit + RTK Query         |
| **Styling**          | Tailwind CSS + shadcn/ui          |
| **Animations**       | Framer Motion                     |
| **Forms**            | React Hook Form + Zod             |
| **HTTP Client**      | RTK Query with auto token refresh |
| **Icons**            | Lucide React                      |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18.0 or higher
- **pnpm** package manager (recommended)
- **TMDB API Key** - [Get one here](https://www.themoviedb.org/documentation/api)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/md-rejoyan-islam/movix.git
   cd movix/client
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Configure environment variables**

   ```bash
   cp .env.sample .env.local
   ```

   Update `.env.local` with your configuration:

   ```env
   # Site Configuration
   NEXT_PUBLIC_SITE_URL=https://your-domain.com
   NEXT_PUBLIC_SITE_NAME=Movix

   # TMDB API
   NEXT_PUBLIC_IMAGE_BASE_URL=https://image.tmdb.org/t/p/w500
   NEXT_PUBLIC_ORIGINAL_IMAGE_BASE_URL=https://image.tmdb.org/t/p/original
   NEXT_PUBLIC_DEFAULT_IMAGE=/no-poster.webp
   NEXT_PUBLIC_API_KEY=Bearer your_tmdb_api_key

   # Backend API
   NEXT_PUBLIC_BACKEND_URL=http://localhost:5050/api/v1
   ```

4. **Start the development server**

   ```bash
   pnpm dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts

| Command       | Description                             |
| ------------- | --------------------------------------- |
| `pnpm dev`    | Start development server with Turbopack |
| `pnpm build`  | Build for production                    |
| `pnpm start`  | Start production server                 |
| `pnpm lint`   | Run ESLint                              |
| `pnpm format` | Format code with Prettier               |

---

## 📸 Screenshots

<p align="center">
  <img src="https://via.placeholder.com/800x450/04152d/da2f68?text=Home+Page" alt="Home Page" width="80%" />
  <br><em>Home Page - Trending, Popular & Top Rated Content</em>
</p>

<p align="center">
  <img src="https://via.placeholder.com/800x450/04152d/da2f68?text=Movie+Details" alt="Movie Details" width="80%" />
  <br><em>Movie Details - Full Information with Cast & Recommendations</em>
</p>

---

## 📁 Project Structure

```
client/
├── app/                          # Next.js App Router
│   ├── (routes)/                 # Route groups
│   │   ├── movies/              # Movies pages
│   │   ├── tv-shows/            # TV shows pages
│   │   ├── search/              # Search page
│   │   ├── compare/             # Compare page
│   │   ├── wishlist/            # Wishlist page
│   │   └── (auth)/              # Auth pages
│   ├── api/                      # API routes
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Home page
│   ├── loading.tsx              # Loading UI
│   ├── not-found.tsx            # 404 page
│   ├── robots.ts                # SEO robots
│   └── sitemap.ts               # SEO sitemap
│
├── components/                   # React components
│   ├── ui/                      # shadcn/ui components
│   ├── shared/                  # Header, Footer
│   ├── home/                    # Home page components
│   ├── movie-card/              # Movie card components
│   ├── details/                 # Detail page components
│   ├── compare/                 # Compare feature
│   ├── wishlist/                # Wishlist feature
│   └── loader/                  # Loading components
│
├── lib/                          # Utilities
│   ├── api/                     # API configuration
│   │   ├── config.ts           # Token management
│   │   └── types.ts            # API types
│   ├── features/                # Redux slices
│   │   ├── auth/               # Auth state & API
│   │   ├── movie/              # Movie API
│   │   └── compare/            # Compare state
│   ├── store.tsx               # Redux store
│   ├── helper.ts               # Helper functions
│   ├── seo.ts                  # SEO utilities
│   └── utils.ts                # General utilities
│
├── hooks/                        # Custom React hooks
├── providers/                    # Context providers
├── public/                       # Static assets
└── types/                        # TypeScript types
```

---

## 🌐 API Integration

This client connects to:

1. **Movix Backend API** - Authentication, wishlist, user management
2. **TMDB API** - Movie and TV show data

### Backend API Endpoints

| Feature      | Endpoints                                |
| ------------ | ---------------------------------------- |
| **Auth**     | Register, Login, Profile, Password Reset |
| **Wishlist** | CRUD operations for saved items          |

See the [server README](../server/README.md) for full API documentation.

---

## 🔐 Authentication Flow

```
User Login → Server validates → Returns JWT tokens (cookies)
    ↓
Access protected routes with access token
    ↓
Token expires → Auto refresh with refresh token
    ↓
Refresh fails → Redirect to login
```

**Token Storage:** HTTP-only cookies for security

---

## 📱 Responsive Design

Movix is fully responsive and optimized for:

- 📱 **Mobile** (320px+)
- 📱 **Tablet** (768px+)
- 💻 **Desktop** (1024px+)
- 🖥️ **Large Desktop** (1440px+)

---

## 🔍 SEO Optimization

- ✅ Dynamic meta tags for all pages
- ✅ OpenGraph & Twitter cards
- ✅ JSON-LD structured data
- ✅ Dynamic sitemap generation
- ✅ Robots.txt configuration
- ✅ Canonical URLs
- ✅ Image optimization with Next.js

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Commit Convention

We follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `style:` - Code style changes
- `refactor:` - Code refactoring
- `test:` - Test updates
- `chore:` - Maintenance tasks

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
  <a href="https://rejoyan.me">Portfolio</a> •
  <a href="https://github.com/md-rejoyan-islam">GitHub</a> •
  <a href="https://linkedin.com/in/md-rejoyan-islam">LinkedIn</a>
</p>

---

## 🙏 Acknowledgments

- [TMDB](https://www.themoviedb.org/) - For the comprehensive movie database API
- [Vercel](https://vercel.com/) - For hosting the live demo
- [shadcn/ui](https://ui.shadcn.com/) - For beautiful UI components
- The open-source community for amazing tools and libraries

---

<p align="center">
  Made with ❤️ by <a href="https://rejoyan.me">Md Rejoyan Islam</a>
</p>

<p align="center">
  <a href="https://movix-cinema.vercel.app">View Live Demo</a> •
  <a href="https://github.com/md-rejoyan-islam/movix/issues">Report Bug</a> •
  <a href="https://github.com/md-rejoyan-islam/movix/issues">Request Feature</a>
</p>
