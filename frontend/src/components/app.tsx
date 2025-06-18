import { AppShell, Burger, Group } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { UserAvatar } from './users/UserAvatar'
import { FlightList } from './flights/flight-list'
import { useAuth0 } from '@auth0/auth0-react'

import MapChart from './map/map.tsx'
import { SearchForm } from './search-form/search-form'
import { LoginButton } from './auth/LoginButton'
import { Route, Routes, useLocation } from 'react-router'
import { BookTrip } from './trip/book-trip.tsx'
import { AfterBuy } from './trip/afterBuy.tsx'
import { TripHistory } from './history/tripHistory.tsx'
import { PageLoader } from './ui/pageLoader.tsx'
import { Logo } from './ui/logo.tsx'
import { AdminPage } from './admin/admin.tsx'

export const App = () => {
  const { isLoading, isAuthenticated, user } = useAuth0()
  const [opened, { toggle }] = useDisclosure()
  const location = useLocation()
  const isMainPage = location.pathname === '/'
  if (isLoading) return <PageLoader />
  console.log(user)

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: isMainPage ? 300 : 0,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md" justify={'space-between'}>
          <Logo />
          {isAuthenticated ? <UserAvatar /> : <LoginButton />}

          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
        </Group>
      </AppShell.Header>
      {isMainPage && (
        <AppShell.Navbar p="md">
          <SearchForm />
        </AppShell.Navbar>
      )}
      <AppShell.Main>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <MapChart />
                <FlightList />
              </>
            }
          />
          <Route path="book-trip">
            <Route index element={<BookTrip />} />
            <Route path="thank-you-page" element={<AfterBuy />} />
          </Route>
          <Route path="my-trip-history" element={<TripHistory />} />
          <Route path="admin" element={<AdminPage />} />
        </Routes>
      </AppShell.Main>
    </AppShell>
  )
}
