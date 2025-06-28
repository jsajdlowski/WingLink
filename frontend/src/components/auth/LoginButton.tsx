import { Button } from '@mantine/core'

import { useAuth0 } from '@auth0/auth0-react'

export const LoginButton = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0()

  if (isAuthenticated) return null

  return (
    <Button
      onClick={() => loginWithRedirect()}
      variant="gradient"
      px={{ base: 'xs', sm: 'md' }}
      gradient={{ from: 'rgba(64, 201, 190, 1)', to: 'blue', deg: 180 }}
    >
      Sign in
    </Button>
  )
}
