import { Center, Loader, px, Text } from '@mantine/core'
import { useMyTickets } from './hooks'
import { TicketHistoryCard } from './ticketHistoryCard'

export const TripHistory = () => {
  const { data, isLoading } = useMyTickets()

  if (isLoading) {
    return (
      <Center style={{ minHeight: '100vh' }}>
        <Loader size="lg" />
      </Center>
    )
  }

  if (!data || data.length === 0) {
    return (
      <Center style={{ minHeight: '100vh', flexDirection: 'column' }}>
        <Text size="xl">No flights yet</Text>
        <Text size="md" color="dimmed">
          Go book some!
        </Text>
      </Center>
    )
  }

  return (
    <Center style={{ minHeight: '100vh' }}>
      <div>
        {data?.map((ticket) => (
          <TicketHistoryCard
            key={ticket.id}
            trip={ticket.flightTrip}
            price={ticket.flightTrip.price}
            seatClass={ticket.seatClass}
            padding="md"
          />
        ))}
      </div>
    </Center>
  )
}
