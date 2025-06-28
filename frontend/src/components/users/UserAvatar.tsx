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
import { useNavigate } from 'react-router-dom'
import { User } from './types'
import { useTranslation } from 'react-i18next'

export const UserAvatar = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { logout, user } = useAuth0()
  const { data, isLoading } = useMe()

  const isAdmin = (user: User) => {
    if (!user) return false
    const roles = user?.['https://winglink.api/roles'] || []
    return roles.includes('admin')
  }

  if (isLoading) return <Loader size={'sm'} />

  return (
    <Menu withArrow>
      <Menu.Target>
        <UnstyledButton
          style={{
            padding: 'var(--mantine-spacing-xs)',
            color: 'var(--mantine-color-text)',
            borderRadius: 'var(--mantine-radius-sm)',
          }}
        >
          <Group wrap="nowrap" gap="xs">
            <Avatar radius="xl" size="sm" />

            <Text
              c="dimmed"
              size="xs"
              lineClamp={1}
              style={{ maxWidth: '100px' }}
              visibleFrom="xs"
            >
              {data?.email}
            </Text>

            <IconChevronRight size={14} />
          </Group>
        </UnstyledButton>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item onClick={() => navigate('my-trip-history')}>
          {t('navigation.tripHistory')}
        </Menu.Item>
        {user && isAdmin(user as User) && (
          <Menu.Item onClick={() => navigate('/admin')}>
            {t('navigation.adminPanel')}
          </Menu.Item>
        )}
        <Menu.Divider />
        <Menu.Item color="red" onClick={() => logout()}>
          {t('navigation.logout')}
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  )
}
