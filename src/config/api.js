
// API Configuration
const API_CONFIG = {
	// Base URL for the backend API
	BASE_URL: (() => {
		// Try to get from environment variable first
		if (typeof import.meta !== 'undefined' && import.meta.env?.VITE_API_URL) {
			return import.meta.env.VITE_API_URL
		}
		// In production, use relative path since FE and BE are on same server
		if (typeof window !== 'undefined' && window.location.hostname !== 'localhost') {
			return '/api'
		}
		// Fallback to default localhost URL for development
		return 'http://localhost:5000'
	})(),
	
	// API endpoints
	ENDPOINTS: {
		AUTH: {
			LOGIN: '/auth/login',
			ME: '/auth/me',
			LOGOUT: '/auth/logout'
		},
		SERVICES: {
			BASE: '/services',
			STATS: '/services/stats/overview'
		}
	},
	
	// Request timeout (in milliseconds)
	TIMEOUT: 10000,
	
	// Default headers
	DEFAULT_HEADERS: {
		'Content-Type': 'application/json'
	}
}

export default API_CONFIG


