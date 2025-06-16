import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { MantineProvider } from '@mantine/core'
import {
  AppState,
  Auth0Provider,
  Auth0ProviderOptions,
} from '@auth0/auth0-react'
import { BrowserRouter, Routes, Route } from 'react-router'
import '@mantine/core/styles.css'
import '@mantine/dates/styles.css'
import { Provider } from 'react-redux'
import { store } from './store/store'
import { App } from './components/app'
import { getConfig } from './auth/config'
import { BookTrip } from './components/trip/book-trip'
import { AfterBuy } from './components/trip/afterBuy'
import { TripHistory } from './components/trip/tripHistory'

const onRedirectCallback = (appState?: AppState) => {
  console.log(appState)
}

const config = getConfig()

const providerConfig: Auth0ProviderOptions = {
  domain: config.domain,
  clientId: config.clientId,
  onRedirectCallback,
  authorizationParams: {
    redirect_uri: window.location.origin,
    ...(config.audience ? { audience: config.audience } : null),
  },
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <Auth0Provider {...providerConfig}>
        <MantineProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<App />} />
              <Route path="book-trip">
                <Route index element={<BookTrip />} />
                <Route path="thank-you-page" element={<AfterBuy />} />
              </Route>
              <Route path="my-trip-history" element={<TripHistory />} />
              <Route path="admin-panel" element={<TripHistory />} />
            </Routes>
          </BrowserRouter>
        </MantineProvider>
      </Auth0Provider>
    </Provider>
  </StrictMode>
)
