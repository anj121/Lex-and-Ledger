import mongoose from 'mongoose'
import User from '../models/User.js'
import Admin from '../models/Admin.js'
import dotenv from 'dotenv'

dotenv.config()

const createTestUsers = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('✅ Connected to MongoDB')

    // Clear existing test users
    await User.deleteMany({ username: { $in: ['testuser', 'john_doe', 'jane_smith'] } })
    await Admin.deleteMany({ username: { $in: ['admin', 'testadmin'] } })
    console.log('🧹 Cleared existing test users')

    // Create test regular users
    const testUsers = [
      {
        username: 'testuser',
        password: 'password123',
        email: 'testuser@example.com',
        firstName: 'Test',
        lastName: 'User',
        phone: '+1234567890',
        role: 'user'
      },
      {
        username: 'john_doe',
        password: 'password123',
        email: 'john.doe@example.com',
        firstName: 'John',
        lastName: 'Doe',
        phone: '+1234567891',
        role: 'premium-user'
      },
      {
        username: 'jane_smith',
        password: 'password123',
        email: 'jane.smith@example.com',
        firstName: 'Jane',
        lastName: 'Smith',
        phone: '+1234567892',
        role: 'expert'
      }
    ]

    // Create test admins
    const testAdmins = [
      {
        username: 'admin',
        password: 'admin123',
        email: 'admin@lexledger.com',
        role: 'admin'
      },
      {
        username: 'testadmin',
        password: 'admin123',
        email: 'testadmin@lexledger.com',
        role: 'super-admin'
      }
    ]

    // Create users
    for (const userData of testUsers) {
      const user = new User(userData)
      await user.save()
      console.log(`✅ Created user: ${user.username}`)
    }

    // Create admins
    for (const adminData of testAdmins) {
      const admin = new Admin(adminData)
      await admin.save()
      console.log(`✅ Created admin: ${admin.username}`)
    }

    console.log('\n🎉 Test users created successfully!')
    console.log('\n📋 Test Credentials:')
    console.log('Regular Users:')
    console.log('  Username: testuser, Password: password123')
    console.log('  Username: john_doe, Password: password123')
    console.log('  Username: jane_smith, Password: password123')
    console.log('\nAdmins:')
    console.log('  Username: admin, Password: admin123')
    console.log('  Username: testadmin, Password: admin123')

  } catch (error) {
    console.error('❌ Error creating test users:', error)
  } finally {
    await mongoose.connection.close()
    console.log('🔒 Database connection closed')
    process.exit(0)
  }
}

// Run the script
createTestUsers()


