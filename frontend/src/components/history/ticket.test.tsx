import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { TicketHistoryCard } from './ticketHistoryCard'
import { MantineProvider } from '@mantine/core'
import { Trip, SeatClass, Airport, Flight } from './types'

const mockAirport: Airport = {
  id: 1,
  code: 'JFK',
  name: 'John F. Kennedy International Airport',
  country: 'USA',
  city: 'New York',
  latitude: 40.6413,
  longitude: -73.7781,
}

const mockDestinationAirport: Airport = {
  id: 2,
  code: 'LHR',
  name: 'Heathrow Airport',
  country: 'UK',
  city: 'London',
  latitude: 51.47,
  longitude: -0.4543,
}

const mockFlight: Flight = {
  id: 1,
  flightNumber: 'AA100',
  origin: mockAirport,
  destination: mockDestinationAirport,
  departureTime: new Date('2025-06-30T10:00:00Z'),
  arrivalTime: new Date('2025-06-30T14:30:00Z'),
  airline: 'Air Sample',
  airlineLogo: 'https://example.com/logo.png',
}

const mockTrip: Trip = {
  id: 1,
  origin: mockAirport,
  destination: mockDestinationAirport,
  departureTime: mockFlight.departureTime,
  arrivalTime: mockFlight.arrivalTime,
  price: 1000,
  flights: [mockFlight],
}

const renderWithProvider = (ui: React.ReactElement) => {
  return render(<MantineProvider>{ui}</MantineProvider>)
}

describe('TicketHistoryCard', () => {
  it('renders airline logo and name', () => {
    renderWithProvider(
      <TicketHistoryCard
        trip={mockTrip}
        price={1000}
        seatClass={SeatClass.ECONOMY}
      />
    )

    expect(screen.getByAltText(/airline logo/i)).toHaveAttribute(
      'src',
      mockFlight.airlineLogo
    )
    expect(screen.getByText(/air sample/i)).toBeInTheDocument()
  })

  it('renders non-stop text when there are no transfers', () => {
    renderWithProvider(
      <TicketHistoryCard
        trip={mockTrip}
        price={1000}
        seatClass={SeatClass.ECONOMY}
      />
    )

    expect(screen.getByText(/non-stop/i)).toBeInTheDocument()
  })

  it('renders transfer text when there are multiple flights', () => {
    const secondFlight: Flight = {
      ...mockFlight,
      id: 2,
      flightNumber: 'BB200',
      origin: mockDestinationAirport,
      destination: mockDestinationAirport,
    }

    const tripWithTransfers: Trip = {
      ...mockTrip,
      flights: [mockFlight, secondFlight],
    }

    renderWithProvider(
      <TicketHistoryCard
        trip={tripWithTransfers}
        price={1000}
        seatClass={SeatClass.ECONOMY}
      />
    )
    expect(screen.getByText(/1 transfer/i)).toBeInTheDocument()
  })

  it('renders airport codes', () => {
    renderWithProvider(
      <TicketHistoryCard
        trip={mockTrip}
        price={1000}
        seatClass={SeatClass.ECONOMY}
      />
    )

    expect(screen.getByText('JFK')).toBeInTheDocument()
    expect(screen.getByText('LHR')).toBeInTheDocument()
  })

  it.each([
    [SeatClass.ECONOMY, 'Economy', 1000],
    [SeatClass.PREMIUM_ECONOMY, 'Premium Economy', 1500],
    [SeatClass.BUSINESS, 'Business', 2500],
    [SeatClass.FIRST_CLASS, 'First Class', 3500],
  ] as const)(
    'renders correct seat class and price for %s',
    (seatClass, label, expectedPrice) => {
      renderWithProvider(
        <TicketHistoryCard trip={mockTrip} price={1000} seatClass={seatClass} />
      )

      expect(screen.getByText(label)).toBeInTheDocument()
      expect(
        screen.getByText(`${expectedPrice.toFixed(2)} PLN`)
      ).toBeInTheDocument()
    }
  )
})
