import { Button } from '@mantine/core'

import { useAuth0 } from '@auth0/auth0-react'

export const LoginButton = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0()

  if (isAuthenticated) return null

  return (
    <Button
      onClick={() => loginWithRedirect()}
      variant="gradient"
      gradient={{
        from: 'rgba(0, 229, 255, 1)',
        to: 'rgba(42, 0, 255, 1)',
        deg: 172,
      }}
    >
      Sign in
    </Button>
  )
}
