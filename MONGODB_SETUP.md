# MongoDB Atlas Setup & Troubleshooting

## 🔴 Current Issue: Authentication Failed

The connection test is showing **"bad auth : Authentication failed"**. This means the MongoDB credentials need to be verified.

## ✅ Steps to Fix MongoDB Atlas Connection

### 1. Verify Database User Credentials

Go to your MongoDB Atlas Dashboard:

1. **Login to MongoDB Atlas**: https://cloud.mongodb.com/
2. **Select your cluster**: `lexandledger`
3. **Go to Database Access** (left sidebar)
4. **Check the user**: `lexledger7_db_user`

### 2. Reset or Verify Password

If the password is incorrect:

1. Click on **"Edit"** next to the user `lexledger7_db_user`
2. Click **"Edit Password"**
3. Set a new password (e.g., `NewPassword123`)
4. Click **"Update User"**

### 3. Update Connection String

After resetting the password, update your `.env` file:

```env
MONGODB_URI=mongodb+srv://lexledger7_db_user:NewPassword123@lexandledger.vgpgs5m.mongodb.net/lex-ledger?retryWrites=true&w=majority
```

**Important**: If your password contains special characters, URL-encode them:
- `@` → `%40`
- `:` → `%3A`
- `/` → `%2F`
- `?` → `%3F`
- `#` → `%23`
- `[` → `%5B`
- `]` → `%5D`

Example: If password is `Pass@123`, use `Pass%40123`

### 4. Check User Permissions

Ensure the user has proper permissions:

1. In **Database Access**, click **"Edit"** on your user
2. Under **Database User Privileges**, ensure:
   - **Built-in Role**: `Read and write to any database` OR
   - **Specific Privileges**: `readWrite` on database `lex-ledger`
3. Click **"Update User"**

### 5. Whitelist Your IP Address

1. Go to **Network Access** (left sidebar)
2. Click **"Add IP Address"**
3. Options:
   - **Add Current IP Address** (recommended for development)
   - **Allow Access from Anywhere** (`0.0.0.0/0`) - for testing only, not secure for production
4. Click **"Confirm"**

### 6. Verify Cluster is Running

1. Go to **Database** (left sidebar)
2. Check if your cluster is **Active** (not paused)
3. If paused, click **"Resume"**

## 🔧 Alternative: Create New Database User

If issues persist, create a new user:

1. Go to **Database Access**
2. Click **"Add New Database User"**
3. Choose **"Password"** authentication
4. Set username: `lexledger_admin`
5. Set password: `SecurePass123` (remember this!)
6. Set privileges: **"Read and write to any database"**
7. Click **"Add User"**

Then update your `.env`:

```env
MONGODB_URI=mongodb+srv://lexledger_admin:SecurePass123@lexandledger.vgpgs5m.mongodb.net/lex-ledger?retryWrites=true&w=majority
```

## 🧪 Test Connection

After making changes, test the connection:

```bash
npm run test-connection
```

You should see:
```
✅ MongoDB Atlas connection successful!
📊 Connected to: lexandledger.vgpgs5m.mongodb.net
📊 Database: lex-ledger
```

## 📝 Common Connection String Formats

### Standard Format
```
mongodb+srv://<username>:<password>@<cluster-url>/<database>?retryWrites=true&w=majority
```

### With All Options
```
mongodb+srv://<username>:<password>@<cluster-url>/<database>?retryWrites=true&w=majority&authSource=admin&ssl=true
```

### Your Current Format
```
mongodb+srv://lexledger7_db_user:123456@lexandledger.vgpgs5m.mongodb.net/lex-ledger?retryWrites=true&w=majority
```

## 🔍 Debugging Steps

### Check if .env is loaded
```bash
cd /home/ulap301/Downloads/Lex-Ledger/Lex-Ledger
node -e "require('dotenv').config(); console.log('MONGODB_URI:', process.env.MONGODB_URI ? 'Set' : 'Not set')"
```

### Test with MongoDB Compass (GUI Tool)

1. Download MongoDB Compass: https://www.mongodb.com/try/download/compass
2. Use your connection string
3. If Compass connects successfully, the issue is with the Node.js setup

### Test with mongosh (CLI)

```bash
mongosh "mongodb+srv://lexledger7_db_user:123456@lexandledger.vgpgs5m.mongodb.net/lex-ledger"
```

## ⚠️ Security Notes

1. **Never commit `.env` file** to version control
2. **Change default passwords** in production
3. **Restrict IP access** in production (don't use 0.0.0.0/0)
4. **Use environment variables** for sensitive data
5. **Rotate credentials regularly**

## 📞 Next Steps

Once MongoDB connection is working:

1. **Create Admin User**:
   ```bash
   npm run create-admin
   ```

2. **Seed Sample Data** (optional):
   ```bash
   npm run seed
   ```

3. **Start Development Server**:
   ```bash
   npm run dev:server
   ```

4. **Start Frontend**:
   ```bash
   npm run dev
   ```

## 🆘 Still Having Issues?

Check MongoDB Atlas Status: https://status.mongodb.com/

Contact MongoDB Support or check their documentation:
- https://docs.atlas.mongodb.com/
- https://www.mongodb.com/community/forums/
