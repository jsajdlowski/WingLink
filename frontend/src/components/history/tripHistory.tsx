import { Center, Loader } from '@mantine/core'
import { useMyTickets } from './hooks'
import { TicketHistoryCard } from './TicketHistoryCard'

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
            flight={ticket.flight}
            title="Booked Flight"
            price={ticket.price}
            seatClass={ticket.seatClass}
          />
        ))}
      </div>
    </Center>
  )
}
