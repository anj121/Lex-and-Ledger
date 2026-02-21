# 🎯 Lex-Ledger - Unified Server Architecture

## ✨ Overview

Your Lex-Ledger application has been successfully restructured to run both **frontend (React + Vite)** and **backend (Express + MongoDB)** from a **single unified server**.

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Lex-Ledger Server                     │
│                   (Port 5000)                            │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  ┌──────────────────┐      ┌──────────────────┐       │
│  │   Backend API    │      │   Frontend SPA   │       │
│  │   (Express.js)   │      │   (React + Vite) │       │
│  │                  │      │                  │       │
│  │  /api/auth       │      │  /               │       │
│  │  /api/services   │      │  /about          │       │
│  │  /api/data       │      │  /services       │       │
│  │  /api/health     │      │  /admin          │       │
│  └──────────────────┘      └──────────────────┘       │
│           │                          │                  │
│           └──────────┬───────────────┘                 │
│                      │                                  │
│              ┌───────▼────────┐                        │
│              │  MongoDB Atlas  │                        │
│              │   (Database)    │                        │
│              └─────────────────┘                        │
└─────────────────────────────────────────────────────────┘
```

## 📦 What's Included

### Backend (`src/server/`)
- **Express.js** server with security middleware
- **MongoDB Atlas** integration with Mongoose
- **JWT authentication** for admin users
- **RESTful API** endpoints
- **Rate limiting** and CORS protection
- **Error handling** and logging

### Frontend (React + Vite)
- **React 19** with modern hooks
- **Vite** for fast development
- **TailwindCSS** for styling
- **Shadcn UI** components
- **React Router** for navigation
- **Axios** for API calls

### Database (MongoDB Atlas)
- **Cloud-hosted** MongoDB database
- **Admin** model for authentication
- **Service** model for legal services
- **Indexes** for performance

## 🚀 Running the Application

### Development Mode (Recommended)

Run backend and frontend separately for hot-reload:

```bash
# Terminal 1 - Backend
npm run dev:server

# Terminal 2 - Frontend  
npm run dev
```

Or run both together:

```bash
npm run dev:all
```

### Production Mode

Build and serve everything from one server:

```bash
npm run build
npm start
```

## 🔗 URLs

### Development
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000/api
- **Health Check**: http://localhost:5000/api/health

### Production
- **Everything**: http://localhost:5000
- **API**: http://localhost:5000/api
- **Frontend**: http://localhost:5000

## 📊 MongoDB Configuration

### Connection String
```
mongodb+srv://lexledger7_db_user:123456@lexandledger.vgpgs5m.mongodb.net/lex-ledger
```

### Database: `lex-ledger`
### Collections:
- `admins` - Admin users with authentication
- `services` - Legal services catalog

## ⚠️ Current Status

### ✅ Completed
- [x] Backend moved to `src/server/`
- [x] All code converted to ES modules
- [x] Unified server created
- [x] Dependencies installed
- [x] Environment configured
- [x] API routes set up
- [x] Authentication middleware
- [x] MongoDB models defined
- [x] Scripts converted

### ⚠️ Needs Attention
- [ ] **MongoDB Authentication** - Connection failing with "bad auth"
  - **Action Required**: Verify credentials in MongoDB Atlas
  - **See**: `MONGODB_SETUP.md` for troubleshooting

## 🔐 Default Credentials

### Admin User (after running `npm run create-admin`)
- **Username**: `admin`
- **Password**: `admin123`
- **Email**: `admin@lexledger.com`
- **Role**: `super-admin`

⚠️ **Change these in production!**

## 📁 Key Files

| File | Purpose |
|------|---------|
| `src/server/index.js` | Main server file (unified) |
| `src/server/config/database.js` | MongoDB connection |
| `src/server/models/Admin.js` | Admin user model |
| `src/server/models/Service.js` | Service model |
| `src/server/routes/*.js` | API route definitions |
| `src/server/controllers/*.js` | Business logic |
| `src/server/middleware/auth.js` | JWT authentication |
| `src/config/api.js` | Frontend API configuration |
| `.env` | Environment variables |

## 🛠️ Scripts Reference

```bash
# Development
npm run dev              # Vite dev server (frontend)
npm run dev:server       # Backend server with nodemon
npm run dev:all          # Both servers concurrently

# Production
npm run build            # Build frontend
npm start                # Start production server

# Database
npm run test-connection  # Test MongoDB connection
npm run create-admin     # Create admin user
npm run seed             # Seed sample data

# Code Quality
npm run lint             # Run ESLint
```

## 🔧 Configuration Files

### `.env` - Environment Variables
Contains all configuration including MongoDB URI, JWT secret, ports, etc.

### `package.json` - Dependencies & Scripts
Updated with backend dependencies and new scripts for unified server.

### `vite.config.js` - Frontend Build
Configured for React and production builds.

## 📖 Documentation

1. **QUICK_START.md** - Quick reference guide
2. **SETUP_GUIDE.md** - Detailed setup instructions
3. **MONGODB_SETUP.md** - MongoDB troubleshooting
4. **README_UNIFIED_SERVER.md** - This file (architecture overview)

## 🎯 Next Steps

### 1. Fix MongoDB Connection
```bash
# Follow instructions in MONGODB_SETUP.md
# Verify credentials in MongoDB Atlas
# Update .env with correct password
# Test connection
npm run test-connection
```

### 2. Create Admin User
```bash
npm run create-admin
```

### 3. Start Development
```bash
npm run dev:all
```

### 4. Access Application
Open http://localhost:5173 and login with admin credentials

## 🌟 Benefits of Unified Server

1. **Simplified Deployment** - One server to deploy
2. **No CORS Issues** - Same origin in production
3. **Easier Development** - Single codebase
4. **Better Performance** - Reduced latency
5. **Cost Effective** - One server to maintain

## 🔒 Security Features

- ✅ Helmet.js for security headers
- ✅ CORS protection
- ✅ Rate limiting
- ✅ JWT authentication
- ✅ Password hashing (bcrypt)
- ✅ Input validation
- ✅ Error handling

## 📈 API Endpoints Summary

### Public
- `GET /api/health` - Server health
- `GET /api/services` - List services
- `GET /api/services/:id` - Get service
- `GET /api/data/categories` - Get categories
- `GET /api/data/services/search` - Search services

### Protected (Admin Only)
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Current user
- `POST /api/services` - Create service
- `PUT /api/services/:id` - Update service
- `DELETE /api/services/:id` - Delete service
- `GET /api/data/dashboard` - Dashboard stats
- `POST /api/data/services/bulk` - Bulk operations

## 💡 Tips

1. **Always run `npm run test-connection`** before starting the server
2. **Use `npm run dev:all`** for the best development experience
3. **Check logs** if something doesn't work
4. **Whitelist your IP** in MongoDB Atlas Network Access
5. **Keep `.env` secure** and never commit it

## 🆘 Troubleshooting

### Server won't start
- Check if port 5000 is available
- Verify all dependencies are installed: `npm install`

### MongoDB connection fails
- See `MONGODB_SETUP.md`
- Verify credentials in MongoDB Atlas
- Check IP whitelist
- Ensure cluster is running

### Frontend can't reach API
- Verify backend is running: `npm run dev:server`
- Check `VITE_API_URL` in `.env`
- Check browser console for errors

---

**🎉 Your unified server is ready to go! Just fix the MongoDB authentication and you're all set!**
