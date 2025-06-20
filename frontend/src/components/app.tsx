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
import { ProtectedRoute } from './routes/ProtectedRoute'
import { AdminRoute } from './routes/AdminRoute'

export const App = () => {
  const { isLoading, isAuthenticated } = useAuth0()
  const [opened, { toggle }] = useDisclosure()
  const location = useLocation()
  const isMainPage = location.pathname === '/'
  if (isLoading) return <PageLoader />

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

          <Route
            path="book-trip"
            element={
              <ProtectedRoute>
                <BookTrip />
              </ProtectedRoute>
            }
          />
          <Route
            path="book-trip/thank-you-page"
            element={
              <ProtectedRoute>
                <AfterBuy />
              </ProtectedRoute>
            }
          />

          <Route
            path="my-trip-history"
            element={
              <ProtectedRoute>
                <TripHistory />
              </ProtectedRoute>
            }
          />

          <Route
            path="admin"
            element={
              <AdminRoute>
                <AdminPage />
              </AdminRoute>
            }
          />
        </Routes>
      </AppShell.Main>
    </AppShell>
  )
}
