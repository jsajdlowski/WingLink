import { AppShell, Burger, Group, Loader, Skeleton } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { UserAvatar } from './users/UserAvatar'
import { FlightList } from './flights/flight-list'
import { useAuth0 } from '@auth0/auth0-react'
import { LoginButton } from './auth/LoginButton'

export const App = () => {
  const { isLoading, isAuthenticated } = useAuth0()
  const [opened, { toggle }] = useDisclosure()

  if (isLoading) return <Loader />

  if (!isAuthenticated) return <LoginButton />

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
        <Group h="100%" px="md" justify={'flex-end'}>
          <UserAvatar />
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        Navbar
        {Array(15)
          .fill(0)
          .map((_, index) => (
            <Skeleton key={index} h={28} mt="sm" animate={false} />
          ))}
      </AppShell.Navbar>
      <AppShell.Main>
        Aside is hidden on on md breakpoint and cannot be opened when it is
        collapsed
      </AppShell.Main>
      <AppShell.Aside p="md" style={{ overflow: 'auto' }}>
        <FlightList />
      </AppShell.Aside>
    </AppShell>
  )
}
