import { Group, Text, Burger } from '@mantine/core'

import { UserAvatar } from '../users/UserAvatar'
import { LoginButton } from '../auth/LoginButton'
import { useAuth0 } from '@auth0/auth0-react'

export const HeaderBar = () => {
  const { isLoading, isAuthenticated } = useAuth0()
  return (
    <Group h="100%" px="md" justify="space-between">
      <Text
        size="xl"
        fw={900}
        variant="gradient"
        gradient={{ from: 'blue', to: 'rgba(64, 201, 190, 1)', deg: 0 }}
      >
        WingLink
      </Text>

      {isAuthenticated ? <UserAvatar /> : <LoginButton />}

      <Burger onClick={toggle} hiddenFrom="sm" size="sm" />
    </Group>
  )
}
