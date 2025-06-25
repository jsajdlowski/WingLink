import { useAuth0 } from '@auth0/auth0-react'
import { Navigate } from 'react-router-dom'

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuth0()

  if (isLoading) return null
  return isAuthenticated ? children : <Navigate to="/" replace />
}
