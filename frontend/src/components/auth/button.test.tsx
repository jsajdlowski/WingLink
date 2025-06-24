import { render, screen } from '@testing-library/react'
import { vi, describe, it, expect } from 'vitest'
import { LoginButton } from './LoginButton'
import { useAuth0 } from '@auth0/auth0-react'
import { MantineProvider } from '@mantine/core'

vi.mock('@auth0/auth0-react', () => ({
  useAuth0: vi.fn(),
}))

describe('LoginButton', () => {
  it('renders the button when user is not authenticated', () => {
    const mockedUseAuth0 = useAuth0 as unknown as ReturnType<typeof vi.fn>
    mockedUseAuth0.mockReturnValue({
      isAuthenticated: false,
      loginWithRedirect: vi.fn(),
    })

    render(
      <MantineProvider>
        <LoginButton />
      </MantineProvider>
    )

    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument()
  })

  it('does not render the button when user is authenticated', () => {
    const mockedUseAuth0 = useAuth0 as unknown as ReturnType<typeof vi.fn>
    mockedUseAuth0.mockReturnValue({
      isAuthenticated: true,
      loginWithRedirect: vi.fn(),
    })

    const { container } = render(<LoginButton />)
    expect(container).toBeEmptyDOMElement()
  })
})
