import mongoose from 'mongoose'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

dotenv.config()

const testConnection = async () => {
  try {
    console.log('🔍 Testing MongoDB Atlas connection...');
    console.log('📍 Connection URI:', process.env.MONGODB_URI ? 'Set' : 'Not set');

    if (!process.env.MONGODB_URI) {
      console.log('❌ MONGODB_URI not found in environment variables');
      console.log('💡 Please check your .env file');
      process.exit(1);
    }

    // Test connection
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 10000, // 10 seconds timeout
    })

    console.log('✅ MongoDB Atlas connection successful!');
    console.log(`📊 Connected to: ${conn.connection.host}`);
    console.log(`📊 Database: ${conn.connection.name}`);

    // Test basic operations
    console.log('\n🧪 Testing basic operations...');
    
    // Test collection access
    const collections = await conn.connection.db.listCollections().toArray();
    console.log(`📋 Available collections: ${collections.length}`);
    
    if (collections.length > 0) {
      console.log('📝 Collections:');
      collections.forEach(col => {
        console.log(`   - ${col.name}`);
      });
    }

    // Test if we can perform a simple query
    const Service = (await import('../models/Service.js')).default
    const serviceCount = await Service.countDocuments()
    console.log(`📊 Services in database: ${serviceCount}`)

    console.log('\n🎉 All tests passed! MongoDB Atlas is working correctly.');

  } catch (error) {
    console.error('❌ Connection test failed:', error.message);
    
    if (error.message.includes('authentication failed')) {
      console.log('\n💡 Authentication failed. Please check:');
      console.log('   - Username and password in connection string');
      console.log('   - Database user has proper permissions');
    } else if (error.message.includes('timeout')) {
      console.log('\n💡 Connection timeout. Please check:');
      console.log('   - Internet connection');
      console.log('   - MongoDB Atlas cluster is running');
      console.log('   - IP whitelist includes your current IP');
    } else if (error.message.includes('ENOTFOUND')) {
      console.log('\n💡 DNS resolution failed. Please check:');
      console.log('   - Cluster URL is correct');
      console.log('   - Network connectivity');
    }
    
    process.exit(1);
  } finally {
    await mongoose.connection.close();
    console.log('🔒 Connection closed');
    process.exit(0);
  }
};

// Run test
testConnection()

export default testConnection

