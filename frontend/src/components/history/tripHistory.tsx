import { Loader, Text, Stack, Box, Center } from '@mantine/core'
import { useMyTickets } from './hooks'
import { TicketHistoryCard } from './ticketHistoryCard'

export const TripHistory = () => {
  const { data, isLoading } = useMyTickets()

  if (isLoading) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Loader size="lg" />
      </div>
    )
  }

  if (!data || data.length === 0) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text size="xl">No flights yet</Text>
        <Text size="md" color="dimmed">
          Go book some!
        </Text>
      </div>
    )
  }

  return (
    <Box p="2rem">
      <Text size="xl" fw={700} mb="lg">
        Your trip history
      </Text>
      <Stack>
        {data.map((ticket) => (
          <Center key={ticket.id}>
            <TicketHistoryCard
              trip={ticket.flightTrip}
              price={ticket.flightTrip.price}
              seatClass={ticket.seatClass}
            />
          </Center>
        ))}
      </Stack>
    </Box>
  )
}
