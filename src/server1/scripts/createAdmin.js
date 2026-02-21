import mongoose from 'mongoose'
import Admin from '../models/Admin.js'
import dotenv from 'dotenv'

dotenv.config()

const createAdmin = async () => {
	try {
		// Connect to database
		await mongoose.connect(process.env.MONGODB_URI)

		console.log('✅ Connected to MongoDB Atlas')

		// Check if admin already exists
		const existingAdmin = await Admin.findOne({ username: process.env.ADMIN_USERNAME || 'admin' })
		
		if (existingAdmin) {
			console.log('⚠️  Admin user already exists')
			console.log(`Username: ${existingAdmin.username}`)
			console.log(`Email: ${existingAdmin.email}`)
			await mongoose.connection.close()
			process.exit(0)
		}

		// Create admin user
		const admin = await Admin.create({
			username: process.env.ADMIN_USERNAME || 'admin',
			password: process.env.ADMIN_PASSWORD || 'admin123',
			email: 'admin@lexledger.com',
			role: 'super-admin'
		})

		console.log('🎉 Admin user created successfully!')
		console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
		console.log(`Username: ${admin.username}`)
		console.log(`Password: ${process.env.ADMIN_PASSWORD || 'admin123'}`)
		console.log(`Email: ${admin.email}`)
		console.log(`Role: ${admin.role}`)
		console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
		console.log('⚠️  Please change the default password after first login!')

	} catch (error) {
		console.error('❌ Error creating admin:', error.message)
	} finally {
		// Close database connection
		await mongoose.connection.close()
		process.exit(0)
	}
}

// Run the script
createAdmin()


