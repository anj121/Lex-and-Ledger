import React from 'react'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const token = localStorage.getItem('token')
  const user = localStorage.getItem('user')
  if (!token ) {
    return <Navigate to="/login" replace />
  }

  try {
    const userData = JSON.parse(user)
    
    if (requireAdmin && userData.userType !== 'admin') {
      return <Navigate to="/dashboard" replace />
    }

    return children
  } catch (error) {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    return <Navigate to="/login" replace />
  }
}

export default ProtectedRoute