import { Card, Group, Image, Text, Divider, Stack } from '@mantine/core'
import { SeatClass, Trip } from './types'
import { IconPlane } from '@tabler/icons-react'
import dayjs from 'dayjs'

interface TicketHistoryCardProps {
  trip: Trip
  title: string
  price: number // base price
  seatClass: SeatClass
}

export const TicketHistoryCard = ({
  trip,
  price: basePrice, // alias for clarity
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

  const calculatePrice = (seatClass: SeatClass): number => {
    switch (seatClass) {
      case 'PREMIUM_ECONOMY':
        return basePrice * 1.5
      case 'BUSINESS':
        return basePrice * 2.5
      case 'FIRST_CLASS':
        return basePrice * 3.5
      case 'ECONOMY':
      default:
        return basePrice
    }
  }

  const finalPrice = calculatePrice(seatClass)

  return (
    <Card shadow="sm" padding="md" radius="md" withBorder mb="md">
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
        </Group>
        <Text size="xl" fw={700}>
          {formattedArrivalTime}
        </Text>
      </Group>

      <Group mb="xs">
        <Text fw={600}>{trip.origin?.code || '???'}</Text>
        <IconPlane />
        <Text fw={600}>{trip.destination?.code || '???'}</Text>

        <Text size="sm" color="gray">
          {transfers > 0
            ? `${transfers} Transfer${transfers > 1 ? 's' : ''}`
            : 'Non-Stop'}
        </Text>
      </Group>

      <Divider my="sm" />

      <Stack>
        <Text fw={600}>Seat Class: {seatClass}</Text>
        <Text>Price {finalPrice.toFixed(2)} PLN</Text>
      </Stack>
    </Card>
  )
}
