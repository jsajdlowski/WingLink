import { Card, Group, Image, Text, Divider, Stack } from '@mantine/core'
import { SeatClass, Trip } from './types'
import { IconPlane } from '@tabler/icons-react'
import dayjs from 'dayjs'

interface TicketHistoryCardProps {
  trip: Trip
  title: string
  price: number
  seatClass: SeatClass
}

export const TicketHistoryCard = ({
  trip,
  title,
  seatClass,
}: TicketHistoryCardProps) => {
  const departure = dayjs(trip.departureTime)
  const arrival = dayjs(trip.arrivalTime)
  const totalMinutes = arrival.diff(departure, 'minute')

  const hours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60

  const formattedDepartureTime = departure.format('DD/MM HH:mm')
  const formattedArrivalTime = arrival.format('DD/MM HH:mm')

  const firstFlight = trip.flights?.[0]

  const transfers = (trip.flights?.length || 1) - 1

  return (
    <Card shadow="sm" padding="md" radius="md" withBorder mb="md">
      <Text size="lg" fw={500} mb="sm">
        {title}
      </Text>

      <Group mb="xs">
        {firstFlight?.airlineLogo && <Image src={firstFlight.airlineLogo} />}
        <Text fw={700} size="lg">
          {firstFlight?.airline || 'Unknown Airline'}
        </Text>
      </Group>

      <Group mb="xs">
        <Text size="xl" fw={700}>
          {formattedDepartureTime}
        </Text>
        <Group>
          <Text size="sm" color="gray">
            {hours} godz. {minutes} min
          </Text>
          <Text size="sm" color="gray">
            {transfers > 0
              ? `${transfers} Transfer${transfers > 1 ? 's' : ''}`
              : 'Non-Stop'}
          </Text>
        </Group>

        <Text size="xl" fw={700}>
          {formattedArrivalTime}
        </Text>
      </Group>

      <Group mb="xs">
        <Text fw={600}>{trip.origin?.code || '???'}</Text>
        <IconPlane />
        <Text fw={600}>{trip.destination?.code || '???'}</Text>
      </Group>

      <Divider my="sm" />

      <Stack>
        <Text fw={600}>Seat Class: {seatClass}</Text>
      </Stack>
    </Card>
  )
}
