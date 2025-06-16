import { render, screen } from '@testing-library/react'
import { Logo } from './logo'
import { MantineProvider } from '@mantine/core'

describe('<Logo />', () => {
  const setup = () => {
    render(
      <MantineProvider>
        <Logo />
      </MantineProvider>
    )
  }

  it('should render an image', () => {
    // Ustawianie
    setup()

    // Wykonanie
    const result = screen.queryByText('WingLink')

    // Sprawdzenie
    expect(result).not.toBeNull()
  })
})
