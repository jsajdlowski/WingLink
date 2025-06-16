import {
  Card,
  Group,
  Image,
  Text,
  Divider,
  ThemeIcon,
  Select,
  Stack,
} from '@mantine/core'
import { Trip } from './types'
import { useState, useEffect } from 'react'

interface TicketProps {
  flight: Trip
  title: string
  onPriceChange: (price: number, seatClass: string) => void
}

export const Ticket = ({ flight, title, onPriceChange }: TicketProps) => {
  const [seatClass, setSeatClass] = useState<string>('ECONOMY')

  const basePrice = flight.price

  const calculatePrice = (seatClass: string): number => {
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

  useEffect(() => {
    onPriceChange(calculatePrice(seatClass), seatClass)
  }, [seatClass])

  const totalMinutes = 200 // stub duration
  const hours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60

  return (
    <Card shadow="sm" padding="md" radius="md" withBorder mb="md">
      <Text size="lg" fw={500} mb="sm">
        {title}
      </Text>

      <Group mb="xs">
        <Image src={flight.flights[0].airlineLogo} />
        <Text fw={700} size="lg">
          {flight.flights[0].airline}
        </Text>
      </Group>

      <Group mb="xs">
        <Text size="xl" fw={700}>
          {flight.departureTime}
        </Text>
        <Text size="sm" color="gray">
          {hours} godz. {minutes} min
        </Text>
        <Text size="xl" fw={700}>
          {flight.arrivalTime}
        </Text>
      </Group>

      <Group mb="xs">
        <Text fw={600}>{flight.origin.code}</Text>
        <ThemeIcon variant="light" color="blue" radius="xl" />
        <Text fw={600}>{flight.destination.code}</Text>
      </Group>

      <Divider my="sm" />

      <Stack>
        <Select
          label="Seat Class"
          data={[
            { value: 'ECONOMY', label: 'Economy' },
            { value: 'PREMIUM_ECONOMY', label: 'Premium Economy' },
            { value: 'BUSINESS', label: 'Business' },
            { value: 'FIRST_CLASS', label: 'First Class' },
          ]}
          value={seatClass}
          onChange={(value) => setSeatClass(value || 'ECONOMY')}
        />
        <Text fw={600}>Price: {calculatePrice(seatClass).toFixed(2)} PLN</Text>
      </Stack>
    </Card>
  )
}
