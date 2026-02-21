# 🚀 Lex-Ledger Quick Start Guide

## ✅ What's Been Done

Your project has been successfully restructured to run both frontend and backend from a single server!

### Changes Made:

1. ✅ **Backend moved to `src/server/`** - All backend code is now inside the frontend project
2. ✅ **ES Modules conversion** - All code converted from CommonJS to ES modules
3. ✅ **Unified server** - Single server serves both API and frontend
4. ✅ **MongoDB Atlas configured** - Connection string added to `.env`
5. ✅ **Dependencies installed** - All backend packages installed
6. ✅ **Scripts updated** - New npm scripts for running the unified server

## 📁 New Project Structure

```
Lex-Ledger/
├── src/
│   ├── server/              # 🆕 Backend code (moved from ../backend)
│   │   ├── config/          # Database configuration
│   │   ├── controllers/     # API controllers
│   │   ├── middleware/      # Authentication middleware
│   │   ├── models/          # MongoDB models (Admin, Service)
│   │   ├── routes/          # API routes (auth, services, data)
│   │   ├── scripts/         # Utility scripts
│   │   └── index.js         # 🆕 Main server file (unified)
│   ├── components/          # React components
│   ├── pages/              # React pages
│   └── config/             # Frontend config (updated API config)
├── .env                    # 🆕 Environment variables with MongoDB
├── package.json            # 🆕 Updated with backend dependencies
└── SETUP_GUIDE.md         # 🆕 Detailed setup instructions
```

## ⚠️ MongoDB Authentication Issue

The MongoDB connection is currently failing with **"bad auth : Authentication failed"**.

### To Fix:

1. **Go to MongoDB Atlas Dashboard**: https://cloud.mongodb.com/
2. **Verify/Reset Password** for user `lexledger7_db_user`
3. **Update `.env`** with the correct password
4. **Whitelist your IP** in Network Access
5. **Test connection**: `npm run test-connection`

📖 **See `MONGODB_SETUP.md` for detailed troubleshooting steps**

## 🎯 How to Run

### Option 1: Development Mode (Separate Servers)

**Terminal 1 - Backend API:**
```bash
cd /home/ulap301/Downloads/Lex-Ledger/Lex-Ledger
npm run dev:server
```
- Backend runs on: http://localhost:5000
- API available at: http://localhost:5000/api

**Terminal 2 - Frontend:**
```bash
cd /home/ulap301/Downloads/Lex-Ledger/Lex-Ledger
npm run dev
```
- Frontend runs on: http://localhost:5173

### Option 2: Development Mode (Concurrent)

```bash
cd /home/ulap301/Downloads/Lex-Ledger/Lex-Ledger
npm run dev:all
```
Runs both backend and frontend simultaneously!

### Option 3: Production Mode (Single Server)

```bash
cd /home/ulap301/Downloads/Lex-Ledger/Lex-Ledger

# Build frontend
npm run build

# Start unified server
npm start
```
- Everything runs on: http://localhost:5000
- API: http://localhost:5000/api
- Frontend: http://localhost:5000

## 📝 Available Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server (frontend only) |
| `npm run dev:server` | Start backend server with nodemon |
| `npm run dev:all` | Run both frontend & backend together |
| `npm run build` | Build frontend for production |
| `npm start` | Start production server |
| `npm run test-connection` | Test MongoDB connection |
| `npm run create-admin` | Create admin user |
| `npm run seed` | Seed sample data |

## 🔐 Once MongoDB is Connected

After fixing MongoDB authentication:

### 1. Create Admin User
```bash
npm run create-admin
```

Expected output:
```
🎉 Admin user created successfully!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Username: admin
Password: admin123
Email: admin@lexledger.com
Role: super-admin
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### 2. Start Development
```bash
# Terminal 1
npm run dev:server

# Terminal 2
npm run dev
```

### 3. Access Application
- **Frontend**: http://localhost:5173
- **API Health**: http://localhost:5000/api/health
- **Login**: Use admin/admin123

## 🔌 API Endpoints

### Public Endpoints
- `GET /api/health` - Health check
- `GET /api/services` - Get all services
- `GET /api/services/:id` - Get single service
- `GET /api/data/categories` - Get categories

### Authentication
- `POST /api/auth/login` - Admin login
- `GET /api/auth/me` - Get current admin (requires auth)
- `POST /api/auth/logout` - Logout (requires auth)

### Admin Only (requires JWT token)
- `POST /api/services` - Create service
- `PUT /api/services/:id` - Update service
- `DELETE /api/services/:id` - Delete service
- `GET /api/data/dashboard` - Dashboard stats
- `GET /api/data/services/analytics` - Analytics

## 🌐 Environment Variables

Your `.env` file contains:

```env
# Server
PORT=5000
NODE_ENV=development

# MongoDB Atlas
MONGODB_URI=mongodb+srv://lexledger7_db_user:123456@...

# JWT
JWT_SECRET=lex-ledger-super-secret-jwt-key...
JWT_EXPIRE=7d

# Admin
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123

# CORS
FRONTEND_URL=http://localhost:5173

# Frontend (Vite)
VITE_API_URL=http://localhost:5000/api
```

## 🔧 Troubleshooting

### Port Already in Use
```bash
# Change PORT in .env
PORT=5001
```

### Module Not Found
```bash
npm install
```

### MongoDB Connection Failed
See `MONGODB_SETUP.md` for detailed troubleshooting

### Can't Access API from Frontend
Check that:
1. Backend is running: `npm run dev:server`
2. CORS is configured correctly (already done)
3. API URL in frontend config is correct (already updated)

## 📚 Documentation Files

- **SETUP_GUIDE.md** - Complete setup instructions
- **MONGODB_SETUP.md** - MongoDB troubleshooting guide
- **QUICK_START.md** - This file (quick reference)

## 🎉 Next Steps

1. **Fix MongoDB authentication** (see MONGODB_SETUP.md)
2. **Create admin user**: `npm run create-admin`
3. **Start servers**: `npm run dev:all`
4. **Open browser**: http://localhost:5173
5. **Login** with admin credentials
6. **Start developing!**

---

**Need Help?**
- Check `MONGODB_SETUP.md` for database issues
- Check `SETUP_GUIDE.md` for detailed instructions
- Review server logs for error messages
