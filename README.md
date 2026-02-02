# Chatting App

> **⚠️ UNDER ACTIVE DEVELOPMENT** - This project is currently in development phase. Features are incomplete, APIs may change, and breaking changes should be expected.

A real-time chat application built with a modern tech stack, featuring web and mobile clients with Socket.IO for live messaging.

## Architecture Overview

This is a monorepo containing three main components:

```
├── backend/          # REST API + WebSocket server
├── frontend/         # React Native mobile app (Expo)
└── web/             # React web client
```

### Tech Stack

**Backend**
- Runtime: [Bun](https://bun.sh) (v1.3.8+)
- Framework: Express.js 5.x
- Database: MongoDB (via Mongoose)
- Real-time: Socket.IO 4.x
- Authentication: Clerk
- Language: TypeScript

**Mobile App (Frontend)**
- Framework: React Native + Expo SDK 54
- Navigation: Expo Router 6.x
- UI: React Native Paper / Custom components
- State: React Hooks
- Language: TypeScript

**Web Client**
- Framework: React 19
- Build Tool: Vite 7.x
- Authentication: Clerk React
- Language: TypeScript/JavaScript

## Prerequisites

Before you start, ensure you have:

- **Bun** v1.3.8 or higher ([Installation guide](https://bun.sh))
- **Node.js** v18+ (for Expo CLI)
- **MongoDB** instance (local or cloud like MongoDB Atlas)
- **Clerk** account for authentication ([Sign up](https://clerk.com))
- **Expo CLI** (for mobile development)

For mobile development:
- iOS: macOS with Xcode
- Android: Android Studio with Android SDK

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Haris-Khan-pro/Chatting-App
cd Chatting-App-main
```

### 2. Environment Setup

Each component requires environment variables. Create `.env` files in the respective directories:

#### Backend (`backend/.env`)

```env
# Server
PORT=3000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/chatting-app

# Clerk Authentication
CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

# Socket.IO (optional)
CORS_ORIGIN=http://localhost:3001,http://localhost:8081
```

#### Web Client (`web/.env`)

```env
VITE_API_URL=http://localhost:3000
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
```

#### Mobile App (`frontend/.env`)

```env
EXPO_PUBLIC_API_URL=http://localhost:3000
EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
```

### 3. Install Dependencies

**Backend:**
```bash
cd backend
bun install
```

**Web Client:**
```bash
cd web
bun install
```

**Mobile App:**
```bash
cd frontend
bun install
# or: npm install
```

### 4. Start Development Servers

You'll need **three separate terminal windows/tabs**:

**Terminal 1 - Backend API:**
```bash
cd backend
bun run dev
# Server will start on http://localhost:3000
```

**Terminal 2 - Web Client:**
```bash
cd web
bun run dev
# Vite dev server will start on http://localhost:5173
```

**Terminal 3 - Mobile App:**
```bash
cd frontend
bun start
# Expo will start - scan QR code with Expo Go app
```

## Project Structure

### Backend

```
backend/
├── src/
│   ├── config/           # Database and config setup
│   ├── controllers/      # Request handlers
│   ├── middleware/       # Auth, error handling
│   ├── models/          # Mongoose schemas (User, Chat, Message)
│   ├── routes/          # API route definitions
│   ├── scripts/         # Seed scripts
│   └── utils/           # Socket.IO setup, helpers
├── types/               # TypeScript type definitions
└── index.ts            # Application entry point
```

### API Endpoints (Current)

**Base URL:** `http://localhost:3000/api`

```
GET    /health              # Health check
POST   /api/auth/*          # Authentication routes
GET    /api/chats           # List user chats
POST   /api/chats           # Create new chat
GET    /api/messages/:id    # Get chat messages
POST   /api/messages        # Send message
GET    /api/users           # User management
```

**WebSocket Events:**
- `connection` - Client connects
- `disconnect` - Client disconnects
- `message` - Send/receive messages
- `typing` - Typing indicators
- (More events TBD)

### Mobile App

```
frontend/
├── app/
│   ├── (tabs)/          # Tab-based navigation
│   ├── _layout.tsx      # Root layout
│   └── modal.tsx        # Modal screens
├── components/          # Reusable UI components
├── constants/          # Theme, config constants
├── hooks/              # Custom React hooks
└── assets/             # Images, icons, fonts
```

### Web Client

```
web/
├── src/
│   ├── App.jsx         # Main app component
│   ├── main.jsx        # Entry point
│   └── assets/         # Static assets
├── public/             # Public assets
└── index.html          # HTML template
```

## Development Status

### ✅ Implemented
- [x] Basic Express server setup
- [x] MongoDB integration with Mongoose
- [x] Clerk authentication middleware
- [x] User, Chat, and Message models
- [x] Basic API route structure
- [x] Socket.IO integration
- [x] Error handling middleware
- [x] Health check endpoint
- [x] Expo mobile app scaffold
- [x] Vite web client scaffold

### 🚧 In Progress
- [ ] Socket.IO event handlers (incomplete)
- [ ] Database seeding scripts (empty)
- [ ] Message CRUD operations
- [ ] Chat CRUD operations
- [ ] Real-time message delivery
- [ ] Mobile UI components
- [ ] Web UI components

### 📋 Planned Features
- [ ] User online/offline status
- [ ] Typing indicators
- [ ] Message read receipts
- [ ] File/image uploads
- [ ] Group chats
- [ ] Push notifications
- [ ] Message search
- [ ] User profiles
- [ ] Dark mode
- [ ] E2E encryption (maybe)

## Common Issues

### Backend won't start
- Check if MongoDB is running: `mongosh` or check MongoDB Atlas connection
- Verify Clerk keys are set in `.env`
- Ensure port 3000 is not in use: `lsof -i :3000`

### Mobile app can't connect to backend
- Use your machine's local IP instead of `localhost` in `EXPO_PUBLIC_API_URL`
- Find your IP: `ifconfig` (Mac/Linux) or `ipconfig` (Windows)
- Ensure phone and computer are on the same network
- Update to: `EXPO_PUBLIC_API_URL=http://192.168.x.x:3000`

### CORS errors on web client
- Add your web client URL to backend's CORS configuration
- Check `CORS_ORIGIN` in backend `.env`

### TypeScript errors
- Run `bun install` or `npm install` again
- Check TypeScript version: should be ^5.x
- Clear cache: `rm -rf node_modules && bun install`

## Scripts Reference

### Backend
```bash
bun run dev      # Start with hot reload
bun run start    # Production start
bun run build    # Install dependencies
```

### Web
```bash
bun run dev      # Start Vite dev server
bun run build    # Production build
bun run preview  # Preview production build
bun run lint     # Run ESLint
```

### Mobile
```bash
bun start              # Start Expo
bun run android        # Start on Android
bun run ios            # Start on iOS
bun run web            # Start web version
bun run lint           # Run ESLint
bun run reset-project  # Reset to template
```

## Testing

**Current status:** No tests implemented yet.

Planned testing stack:
- Backend: Vitest + Supertest
- Frontend/Web: Jest + React Testing Library
- E2E: Detox (mobile), Playwright (web)

## Contributing

Since this is under active development:

1. Expect breaking changes
2. Check existing issues before starting work
3. Focus on core features first
4. Write clear commit messages
5. Test your changes locally

### Commit Message Format
```
feat: add user profile endpoint
fix: resolve socket connection timeout
docs: update API documentation
refactor: simplify auth middleware
```

## Deployment

**Not production-ready yet.** Deployment guides will be added once core features are stable.

Planned deployment targets:
- Backend: Railway, Render, or DigitalOcean
- Web: Vercel or Netlify
- Mobile: Expo EAS Build → App Store / Play Store

## Performance Notes

Current performance is not optimized. Known issues:
- No pagination on message lists
- No caching strategy
- No rate limiting
- No query optimization
- Socket connections not pooled

## Security Considerations

⚠️ **Important:** This is a development version. Do NOT use in production without:
- [ ] Rate limiting
- [ ] Input validation on all endpoints
- [ ] SQL injection prevention (using Mongoose helps)
- [ ] XSS protection
- [ ] CSRF tokens
- [ ] Proper error messages (no stack traces in prod)
- [ ] Security headers (helmet.js)
- [ ] Environment variable validation

## License

[MIT License - MIT, Apache 2.0, etc.]

## Contact & Support

- **Issues:** [GitHub Issues](https://github.com/Haris-Khan-pro/Chatting-App/issues)
- **Email:** hariskhan01.gsm@gmail.com

---
