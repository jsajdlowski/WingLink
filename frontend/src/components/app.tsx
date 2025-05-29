import { AppShell, Burger, Group, Loader, Text } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { UserAvatar } from './users/UserAvatar'
import { FlightList } from './flights/flight-list'
import { useAuth0 } from '@auth0/auth0-react'

import MapChart from './map/map.tsx'
import { SearchForm } from './search-form/search-form'
import { LoginButton } from './auth/LoginButton'

export const App = () => {
  const { isLoading, isAuthenticated } = useAuth0()
  const [opened, { toggle }] = useDisclosure()

  if (isLoading) return <Loader />

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: 'sm', collapsed: { mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md" justify={'space-between'}>
          <Text
            size="xl"
            fw={900}
            variant="gradient"
            gradient={{ from: 'blue', to: 'rgba(64, 201, 190, 1)', deg: 0 }}
          >
            WingLink
          </Text>
          {isAuthenticated ? <UserAvatar /> : <LoginButton />}

          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        <SearchForm />
      </AppShell.Navbar>
      <AppShell.Main>
        <MapChart></MapChart>
        <FlightList />
      </AppShell.Main>
    </AppShell>
  )
}
