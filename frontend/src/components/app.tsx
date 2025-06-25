import { AppShell, Burger, Group } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { UserAvatar } from './users/UserAvatar'
import { FlightList } from './flights/flight-list'
import { useAuth0 } from '@auth0/auth0-react'
import { LanguageSwitcher } from './language-switcher/language-switcher'
import { ThemeSwitcher } from './theme-switcher/theme-switcher'

import MapChart from './map/map.tsx'
import { SearchForm } from './search-form/search-form'
import { LoginButton } from './auth/LoginButton'
import { Route, Routes, useLocation } from 'react-router-dom'
import { BookTrip } from './trip/book-trip.tsx'
import { AfterBuy } from './trip/afterBuy.tsx'
import { TripHistory } from './history/tripHistory.tsx'
import { PageLoader } from './ui/pageLoader.tsx'
import { Logo } from './ui/logo.tsx'
import { AdminPage } from './admin/admin.tsx'
import { NotFound } from './not-found/not-found.tsx'
import { ProtectedRoute } from './routes/ProtectedRoute'
import { AdminRoute } from './routes/AdminRoute'

export const App = () => {
  const { isLoading, isAuthenticated } = useAuth0()
  const [opened, { toggle, close }] = useDisclosure()
  const location = useLocation()
  const isMainPage = location.pathname === '/'
  if (isLoading) return <PageLoader />

  return (
    <AppShell
      header={{ height: { base: 60, sm: 60 } }}
      navbar={{
        width: isMainPage ? { base: '100%', sm: 300 } : 0,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      padding={{ base: 'xs', sm: 'md' }}
    >
      <AppShell.Header>
        <Group h="100%" px={{ base: 'xs', sm: 'md' }} justify={'space-between'}>
          <Logo />
          <Group wrap="nowrap">
            <Group visibleFrom="sm">
              <LanguageSwitcher />
              <ThemeSwitcher />
            </Group>
            {isAuthenticated ? <UserAvatar /> : <LoginButton />}
            {/* Hamburger widoczny tylko na stronie głównej i tylko na małych ekranach */}
            {isMainPage && (
              <Burger
                opened={opened}
                onClick={toggle}
                hiddenFrom="sm"
                size="sm"
              />
            )}
          </Group>
        </Group>
      </AppShell.Header>
      {isMainPage && (
        <AppShell.Navbar
          p={{ base: 'md', sm: 'md' }}
          pb={{ base: 'xl', sm: 'xl' }}
        >
          <SearchForm onSearch={close} />
          <Group
            hiddenFrom="sm"
            mt="lg"
            pt="lg"
            pb="md"
            justify="center"
            style={{
              width: '100%',
              borderTop: '1px solid #eee',
            }}
          >
            <LanguageSwitcher position="navbar" />
            <ThemeSwitcher />
          </Group>
        </AppShell.Navbar>
      )}
      <AppShell.Main>
        <Routes>
          <Route
            path="/"
            element={
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem',
                }}
              >
                <MapChart />
                <FlightList />
              </div>
            }
          />

          <Route path="book-trip" element={<BookTrip />} />
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
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AppShell.Main>
    </AppShell>
  )
}
