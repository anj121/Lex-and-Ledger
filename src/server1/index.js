import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import compression from 'compression'
import rateLimit from 'express-rate-limit'
import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'

// Load environment variables
dotenv.config()

// Import database connection
import connectDB from './config/database.js'

// Import routes
import authRoutes from './routes/auth.js'
import serviceRoutes from './routes/services.js'
import dataRoutes from './routes/data.js'

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Connect to database
connectDB()

const app = express()

// Security middleware
app.use(helmet({
	contentSecurityPolicy: false,
	crossOriginEmbedderPolicy: false
}))

// CORS configuration
app.use(cors({
	origin: process.env.FRONTEND_URL || 'http://localhost:5173',
	credentials: true
}))

// Rate limiting
const limiter = rateLimit({
	windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000,
	max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100,
	message: {
		success: false,
		message: 'Too many requests from this IP, please try again later.'
	}
})

app.use('/api', limiter)

// Body parsing middleware
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))

// Compression middleware
app.use(compression())

// Logging middleware
if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'))
} else {
	app.use(morgan('combined'))
}

// Health check endpoint
app.get('/api/health', (req, res) => {
	res.status(200).json({
		success: true,
		message: 'Server is running',
		timestamp: new Date().toISOString(),
		environment: process.env.NODE_ENV || 'development'
	})
})

// API routes
app.use('/api/auth', authRoutes)
app.use('/api/services', serviceRoutes)
app.use('/api/data', dataRoutes)

// Serve static files from React build in production
if (process.env.NODE_ENV === 'production') {
	// Serve static files from the dist directory
	// const distPath = path.join(__dirname, '../../dist')
	const distPath = path.join(__dirname, '../../dist')
	app.use(express.static(distPath))
	
	// Handle React routing, return all requests to React app
	app.get('*', (req, res) => {
		res.sendFile(path.join(distPath, 'index.html'))
	})
} else {
	// Development mode - API only
	app.get('/', (req, res) => {
		res.status(200).json({
			success: true,
			message: 'Welcome to Lex-Ledger API',
			version: '1.0.0',
			documentation: '/api/docs',
			endpoints: {
				auth: '/api/auth',
				services: '/api/services',
				data: '/api/data'
			}
		})
	})
}

// 404 handler for API routes
app.use('/api/*', (req, res) => {
	res.status(404).json({
		success: false,
		message: `Route ${req.originalUrl} not found`
	})
})

// Global error handler
app.use((err, req, res, next) => {
	console.error('Global error handler:', err)

	// Mongoose validation error
	if (err.name === 'ValidationError') {
		const errors = Object.values(err.errors).map(val => val.message)
		return res.status(400).json({
			success: false,
			message: 'Validation Error',
			errors
		})
	}

	// Mongoose duplicate key error
	if (err.code === 11000) {
		const field = Object.keys(err.keyValue)[0]
		return res.status(400).json({
			success: false,
			message: `${field} already exists`
		})
	}

	// JWT errors
	if (err.name === 'JsonWebTokenError') {
		return res.status(401).json({
			success: false,
			message: 'Invalid token'
		})
	}

	if (err.name === 'TokenExpiredError') {
		return res.status(401).json({
			success: false,
			message: 'Token expired'
		})
	}

	// Default error
	res.status(err.statusCode || 500).json({
		success: false,
		message: err.message || 'Internal Server Error',
		...(process.env.NODE_ENV === 'development' && { stack: err.stack })
	})
})

const PORT = process.env.PORT || 5000

const server = app.listen(PORT, () => {
	console.log(`🚀 Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`)
	console.log(`📊 Health check: http://localhost:${PORT}/api/health`)
	console.log(`🔗 API Base URL: http://localhost:${PORT}/api`)
	if (process.env.NODE_ENV === 'production') {
		console.log(`🌐 Frontend: http://localhost:${PORT}`)
	}
})

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
	console.log(`Error: ${err.message}`)
	// Close server & exit process
	server.close(() => {
		process.exit(1)
	})
})

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
	console.log(`Error: ${err.message}`)
	process.exit(1)
})

export default app
