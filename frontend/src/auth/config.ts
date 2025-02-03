export const getConfig = () => {
  return {
    domain: import.meta.env.VITE_OAUTH_DOMAIN,
    clientId: import.meta.env.VITE_OAUTH_CLIENTID,
    audience: import.meta.env.VITE_OAUTH_AUDIENCE || null,
  }
}
