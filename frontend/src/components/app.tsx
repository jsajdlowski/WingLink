import { AppShell, Burger, Group, Loader, Text } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { UserAvatar } from './users/UserAvatar'
import { FlightList } from './flights/flight-list'
import { useAuth0 } from '@auth0/auth0-react'

// @ts-ignore
import MapChart from './map/map.jsx'
import { SearchForm } from './search-form/search-form'
import { SignIn } from './auth/SignIn'

export const App = () => {
  const { isLoading, isAuthenticated } = useAuth0()
  const [opened, { toggle }] = useDisclosure()

  if (isLoading) return <Loader />

  if (!isAuthenticated) return <SignIn />

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: 'sm', collapsed: { mobile: !opened } }}
      aside={{
        width: 300,
        breakpoint: 'md',
        collapsed: { desktop: false, mobile: true },
      }}
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

          <UserAvatar />
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        <SearchForm />
      </AppShell.Navbar>
      <AppShell.Main>
        <MapChart></MapChart>
      </AppShell.Main>
      <AppShell.Aside p="md" style={{ overflow: 'auto' }}>
        <FlightList />
      </AppShell.Aside>
    </AppShell>
  )
}
