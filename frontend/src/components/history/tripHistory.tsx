import { Center, Loader } from '@mantine/core'
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

  return (
    <Center style={{ minHeight: '100vh' }}>
      <div>
        {data?.map((ticket) => (
          <TicketHistoryCard
            key={ticket.id}
            trip={ticket.flightTrip}
            title="Booked Flight"
            price={ticket.flightTrip.price}
            seatClass={ticket.seatClass}
          />
        ))}
      </div>
    </Center>
  )
}
