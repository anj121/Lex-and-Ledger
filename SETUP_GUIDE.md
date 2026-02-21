# Lex-Ledger Setup Guide

## 🚀 Unified Frontend & Backend Server

This project now runs both the frontend and backend from a single server. The backend API is located in `src/server/` and uses MongoDB Atlas as the database.

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or pnpm
- MongoDB Atlas account (already configured)

## 🔧 Installation

### 1. Install Dependencies

```bash
npm install
# or
pnpm install
```

This will install all frontend and backend dependencies.

### 2. Environment Configuration

The `.env` file has been created with your MongoDB Atlas connection. The configuration includes:

- **MongoDB URI**: `mongodb+srv://lexledger7_db_user:123456@lexandledger.vgpgs5m.mongodb.net/lex-ledger`
- **Server Port**: 5000
- **Frontend Dev Port**: 5173 (Vite default)

**⚠️ Security Note**: Change the JWT_SECRET and admin credentials in production!

## 🎯 Running the Application

### Development Mode

#### Option 1: Run Backend and Frontend Separately (Recommended for Development)

**Terminal 1 - Backend Server:**
```bash
npm run dev:server
```
This starts the backend API on `http://localhost:5000`

**Terminal 2 - Frontend Dev Server:**
```bash
npm run dev
```
This starts the Vite dev server on `http://localhost:5173`

#### Option 2: Run Both Concurrently
```bash
npm run dev:all
```
This runs both backend and frontend simultaneously.

### Production Mode

```bash
# Build the frontend
npm run build

# Start the production server
npm start
```

In production mode, the server serves both the API and the built frontend from port 5000.

## 📊 Database Setup

### Create Admin User

Before using the application, create an admin user:

```bash
npm run create-admin
```

This will create an admin user with credentials from your `.env` file:
- Username: `admin`
- Password: `admin123`

### Test Database Connection

```bash
npm run test-connection
```

This verifies your MongoDB Atlas connection is working correctly.

### Seed Sample Data (Optional)

```bash
npm run seed
```

This populates the database with sample services data.

## 🔐 MongoDB Atlas Configuration

Your MongoDB Atlas is already configured with:

- **Cluster**: lexandledger.vgpgs5m.mongodb.net
- **Database**: lex-ledger
- **User**: lexledger7_db_user

### Important MongoDB Atlas Settings

1. **Network Access**: Ensure your IP address is whitelisted in MongoDB Atlas
   - Go to Network Access in MongoDB Atlas
   - Add your current IP or use `0.0.0.0/0` for development (not recommended for production)

2. **Database User**: The user `lexledger7_db_user` should have read/write permissions

## 📁 Project Structure

```
Lex-Ledger/
├── src/
│   ├── server/              # Backend code
│   │   ├── config/          # Database configuration
│   │   ├── controllers/     # Route controllers
│   │   ├── middleware/      # Authentication middleware
│   │   ├── models/          # MongoDB models
│   │   ├── routes/          # API routes
│   │   ├── scripts/         # Utility scripts
│   │   └── index.js         # Main server file
│   ├── components/          # React components
│   ├── pages/              # React pages
│   ├── config/             # Frontend config
│   └── main.jsx            # React entry point
├── .env                    # Environment variables
├── package.json            # Dependencies and scripts
└── vite.config.js         # Vite configuration
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/login` - Admin login
- `GET /api/auth/me` - Get current admin
- `POST /api/auth/logout` - Logout

### Services
- `GET /api/services` - Get all services
- `GET /api/services/:id` - Get single service
- `POST /api/services` - Create service (Admin only)
- `PUT /api/services/:id` - Update service (Admin only)
- `DELETE /api/services/:id` - Delete service (Admin only)
- `GET /api/services/stats/overview` - Get statistics (Admin only)

### Data
- `GET /api/data/dashboard` - Dashboard stats (Admin only)
- `GET /api/data/services` - Advanced service filtering
- `GET /api/data/services/analytics` - Service analytics (Admin only)
- `GET /api/data/services/search` - Search services
- `GET /api/data/categories` - Get categories
- `POST /api/data/services/bulk` - Bulk operations (Admin only)

### Health Check
- `GET /api/health` - Server health check

## 🛠️ Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start Vite dev server (frontend only) |
| `npm run dev:server` | Start backend server with nodemon |
| `npm run dev:all` | Run both frontend and backend concurrently |
| `npm run build` | Build frontend for production |
| `npm start` | Start production server (serves API + built frontend) |
| `npm run create-admin` | Create admin user in database |
| `npm run seed` | Seed database with sample data |
| `npm run test-connection` | Test MongoDB connection |

## 🐛 Troubleshooting

### MongoDB Connection Issues

1. **Error: "MongoServerError: bad auth"**
   - Verify username and password in `.env`
   - Check database user permissions in MongoDB Atlas

2. **Error: "MongooseServerSelectionError"**
   - Check your internet connection
   - Verify IP is whitelisted in MongoDB Atlas Network Access
   - Ensure cluster URL is correct

3. **Error: "ECONNREFUSED"**
   - MongoDB Atlas cluster might be paused
   - Check cluster status in MongoDB Atlas dashboard

### Port Already in Use

If port 5000 is already in use:
```bash
# Change PORT in .env file
PORT=5001
```

### Module Import Errors

If you see module import errors, ensure all dependencies are installed:
```bash
rm -rf node_modules package-lock.json
npm install
```

## 🔒 Security Recommendations

1. **Change Default Credentials**: Update `ADMIN_USERNAME` and `ADMIN_PASSWORD` in `.env`
2. **Generate Strong JWT Secret**: Use a cryptographically secure random string
3. **Restrict MongoDB Access**: Whitelist only necessary IP addresses
4. **Use Environment Variables**: Never commit `.env` file to version control
5. **Enable HTTPS**: Use SSL/TLS certificates in production

## 📝 Next Steps

1. Install dependencies: `npm install`
2. Create admin user: `npm run create-admin`
3. Start development servers: `npm run dev:all`
4. Access frontend: `http://localhost:5173`
5. Access API: `http://localhost:5000/api`
6. Login with admin credentials

## 🌐 Production Deployment

For production deployment:

1. Set `NODE_ENV=production` in `.env`
2. Update `FRONTEND_URL` to your production domain
3. Build frontend: `npm run build`
4. Start server: `npm start`
5. Server will serve both API and frontend on the configured PORT

## 📞 Support

For issues or questions:
- Check MongoDB Atlas dashboard for database status
- Review server logs for error messages
- Ensure all environment variables are correctly set

---

**Happy Coding! 🚀**
