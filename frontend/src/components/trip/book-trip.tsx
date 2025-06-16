import {
  Card,
  Text,
  TextInput,
  Select,
  Button,
  Stack,
  Group,
  ThemeIcon,
  Divider,
  Image,
  Flex,
  Grid,
} from '@mantine/core'
import { useAppSelector } from '../../hooks/storeHooks'
import { Outlet } from 'react-router'
import { selectTrip } from '../../store/tripSlice'
import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router'

export const BookTrip = () => {
  const tripState = useAppSelector(selectTrip)
  const navigate = useNavigate()
  // Form state
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [seatClass, setSeatClass] = useState('')

  const basePrice = tripState.departureFlight?.price ?? 0

  const layovers = 1

  // calculate trip duration
  // const durationMs =
  //   tripState.departureFlight?.getTime() - trip.departureTime.getTime()
  const totalMinutes = 200
  const hours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60

  const finalPrice = useMemo(() => {
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
  }, [basePrice, seatClass])

  const handleSubmit = () => {
    console.log({
      firstName,
      lastName,
      seatClass,
      price: finalPrice,
    })
    navigate('thank-you-page')
  }

  return (
    <>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Card.Section>
          <Text size="lg" fw={500} p="md">
            Book your trip
          </Text>
        </Card.Section>

        <Card.Section p="md">
          <Group mb="xs">
            <Image src={tripState.departureFlight?.flights[0].airlineLogo} />
            <Text fw={700} size="lg">
              {tripState.departureFlight?.flights[0].airline}
            </Text>
          </Group>

          <Group mb="xs">
            <Text size="xl" fw={700}>
              {tripState.departureFlight?.departureTime}
            </Text>
            <Text size="sm" color="gray">
              {hours} godz. {minutes} min
            </Text>
            <Text size="xl" fw={700}>
              {tripState.departureFlight?.arrivalTime}
            </Text>
          </Group>

          <Group mb="xs">
            <Text fw={600}>{tripState.departureFlight?.origin.code}</Text>
            <ThemeIcon variant="light" color="blue" radius="xl"></ThemeIcon>
            <Text fw={600}>{tripState.departureFlight?.destination.code}</Text>
          </Group>

          <Divider my="sm" />
          <Text fw={'bold'}>Passenger Info</Text>
          <Stack>
            <TextInput
              label="First Name"
              placeholder="Enter your first name"
              value={firstName}
              onChange={(e) => setFirstName(e.currentTarget.value)}
              required
            />

            <TextInput
              label="Last Name"
              placeholder="Enter your last name"
              value={lastName}
              onChange={(e) => setLastName(e.currentTarget.value)}
              required
            />

            <Select
              label="Seat Class"
              placeholder="Pick one"
              data={[
                { value: 'ECONOMY', label: 'Economy' },
                { value: 'PREMIUM_ECONOMY', label: 'Premium Economy' },
                { value: 'BUSINESS', label: 'Business' },
                { value: 'FIRST_CLASS', label: 'First Class' },
              ]}
              value={seatClass}
              onChange={(value) => setSeatClass(value || '')}
              required
            />

            <Text fw={600}>Price: {finalPrice.toFixed(2)} PLN</Text>

            <Button onClick={handleSubmit} disabled={!seatClass}>
              Buy Ticket
            </Button>
          </Stack>
        </Card.Section>
      </Card>
      <Outlet />
    </>
  )
}
