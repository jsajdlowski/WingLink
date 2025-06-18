import {
  Avatar,
  Group,
  Loader,
  Menu,
  Text,
  UnstyledButton,
} from '@mantine/core'
import { IconChevronRight } from '@tabler/icons-react'

import { useMe } from './hooks'
import { useAuth0 } from '@auth0/auth0-react'
import { useNavigate } from 'react-router'

export const UserAvatar = () => {
  const navigate = useNavigate()
  const { logout, user } = useAuth0()
  const { data, isLoading } = useMe()

  const isAdmin = (user: any) => {
    const roles = user?.['https://winglink.api/roles'] || []
    return roles.includes('admin')
  }

  if (isLoading) return <Loader size={'sm'} />

  const name = `${data?.firstName} ${data?.lastName}`

  return (
    <Menu withArrow>
      <Menu.Target>
        <UnstyledButton
          style={{
            padding: 'var(--mantine-spacing-md)',
            color: 'var(--mantine-color-text)',
            borderRadius: 'var(--mantine-radius-sm)',
          }}
        >
          <Group>
            <Avatar name={name} radius="xl" />

            <div style={{ flex: 1 }}>
              <Text size="sm" fw={500}>
                {name}
              </Text>

              <Text c="dimmed" size="xs">
                {data?.email}
              </Text>
            </div>

            <IconChevronRight size={16} />
          </Group>
        </UnstyledButton>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item onClick={() => logout()}>Logout</Menu.Item>
        <Menu.Item onClick={() => navigate('my-trip-history')}>
          Trip history
        </Menu.Item>
        {isAdmin(user) && (
          <Menu.Item onClick={() => navigate('/admin')}>Admin Panel</Menu.Item>
        )}
      </Menu.Dropdown>
    </Menu>
  )
}
