import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  MantineProvider,
  createTheme,
  localStorageColorSchemeManager,
} from '@mantine/core'
import {
  AppState,
  Auth0Provider,
  Auth0ProviderOptions,
} from '@auth0/auth0-react'
import '@mantine/core/styles.css'
import '@mantine/dates/styles.css'
import { Provider } from 'react-redux'
import { store } from './store/store'
import { App } from './components/app'
import { getConfig } from './auth/config'
import { BrowserRouter } from 'react-router-dom'
import './i18n/i18n'
import './i18n/dayjs-config'

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

const theme = createTheme({})

const colorSchemeManager = localStorageColorSchemeManager({
  key: 'winglink-color-scheme',
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <Auth0Provider {...providerConfig}>
        <MantineProvider
          theme={theme}
          colorSchemeManager={colorSchemeManager}
          defaultColorScheme="light"
        >
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </MantineProvider>
      </Auth0Provider>
    </Provider>
  </StrictMode>
)
