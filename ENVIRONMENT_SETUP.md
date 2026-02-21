# Environment Setup Guide

## Frontend Environment Variables

### 1. Create Environment File

Create a `.env` file in the root of your React project (`Lex-Ledger/`):

```bash
# Copy the example file
cp env.example .env
```

### 2. Configure Environment Variables

Edit the `.env` file with your configuration:

```env
# API Configuration
VITE_API_URL=http://localhost:5000/api

# App Configuration
VITE_APP_NAME=Lex-Ledger
VITE_APP_VERSION=1.0.0
```

### 3. Backend Environment Variables

Create a `.env` file in the backend directory (`backend/`):

```bash
cd backend
cp env.example .env
```

Edit the backend `.env` file:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/lex-ledger

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRE=7d

# Admin Configuration
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123

# CORS Configuration
FRONTEND_URL=http://localhost:3000
```

## Important Notes

### Vite Environment Variables

- **Prefix**: All environment variables must start with `VITE_`
- **Access**: Use `import.meta.env.VITE_VARIABLE_NAME`
- **Build**: Variables are replaced at build time

### Common Issues

1. **"process is not defined"**: This happens when using `process.env` in Vite
   - **Solution**: Use `import.meta.env` instead

2. **Environment variables not loading**: 
   - Make sure the `.env` file is in the correct location
   - Restart the development server after changing `.env`
   - Variables must start with `VITE_`

3. **API connection issues**:
   - Ensure backend is running on the correct port
   - Check CORS configuration in backend
   - Verify the API_BASE_URL in frontend

## Development Workflow

1. **Start Backend**:
   ```bash
   cd backend
   npm install
   npm run dev
   ```

2. **Start Frontend**:
   ```bash
   cd Lex-Ledger
   npm install
   npm run dev
   ```

3. **Access Admin Panel**:
   - Navigate to: `http://localhost:3000/admin-login`
   - Login with: `admin` / `admin123`
   - Access services at: `http://localhost:3000/dashboard`

## Troubleshooting

### Frontend Issues
- Check browser console for errors
- Verify environment variables are loaded
- Ensure API configuration is correct

### Backend Issues
- Check MongoDB connection
- Verify JWT secret is set
- Check CORS configuration
- Ensure all required environment variables are set


