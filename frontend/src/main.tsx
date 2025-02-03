import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { MantineProvider } from '@mantine/core'
import {
  AppState,
  Auth0Provider,
  Auth0ProviderOptions,
} from '@auth0/auth0-react'
import { BrowserRouter } from 'react-router-dom'
import '@mantine/core/styles.css'

import { App } from './components/app'
import { getConfig } from './auth/config'

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
    <Auth0Provider {...providerConfig}>
      <MantineProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </MantineProvider>
    </Auth0Provider>
  </StrictMode>
)
