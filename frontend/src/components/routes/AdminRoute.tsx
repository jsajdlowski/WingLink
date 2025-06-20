import { useAuth0 } from '@auth0/auth0-react'
import { Navigate } from 'react-router'

export const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, user, isLoading } = useAuth0()

  const roles: string[] = user?.['https://winglink.api/roles'] || []

  if (isLoading) return null
  return isAuthenticated && roles.includes('admin') ? (
    children
  ) : (
    <Navigate to="/" replace />
  )
}
