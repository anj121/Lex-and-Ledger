import mongoose from 'mongoose'
import User from './src/server/models/User.js'
import Admin from './src/server/models/Admin.js'

const MONGODB_URI = "mongodb+srv://lexledger7_db_user:NewPassword123@lexandledger.vgpgs5m.mongodb.net/sample_mflix?retryWrites=true&w=majority"

async function checkUsers() {
  try {
    await mongoose.connect(MONGODB_URI)
    console.log('✅ Connected to MongoDB')
    
    const users = await User.find({})
    console.log(`\n📊 Regular Users (${users.length}):`)
    users.forEach(user => {
      console.log(`  - Username: ${user.username}, Email: ${user.email}`)
    })
    
    const admins = await Admin.find({})
    console.log(`\n📊 Admins (${admins.length}):`)
    admins.forEach(admin => {
      console.log(`  - Username: ${admin.username}, Email: ${admin.email}`)
    })
    
  } catch (error) {
    console.error('❌ Error:', error)
  } finally {
    await mongoose.connection.close()
    process.exit(0)
  }
}

checkUsers()


