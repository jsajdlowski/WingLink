import {
  Group,
  Paper,
  Skeleton,
  Stack,
  Text,
  Title,
  NumberFormatter,
  Image,
  SimpleGrid,
  Button,
} from '@mantine/core'
import { IconPlaneDeparture, IconPlaneArrival } from '@tabler/icons-react'
import { IconArrowRight } from '@tabler/icons-react'
import { useFlightsSearch } from './hooks'
import { Trip } from './types'
import { useAppDispatch, useAppSelector } from '../../hooks/storeHooks'
import dayjs from 'dayjs'
import { popularDestinations } from '../../data/destinations-data'
import { PopularDestinations } from './popularDesinations'
import { useNavigate } from 'react-router'
import { selectSearchForm } from '../../store/searchFormSlice'
import { setDepartureFlight, setReturnFlight } from '../../store/tripSlice'
import { useState } from 'react'

const FlightListItem = ({
  flight,
  onSelect,
}: {
  flight: Trip
  onSelect: (flight: Trip) => void
}) => {
  const departure = dayjs(flight.departureTime)
  const arrival = dayjs(flight.arrivalTime)
  const totalMinutes = arrival.diff(departure, 'minute')
  const hours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60
  const transfers = flight.flights.length - 1

  const formattedDeparture = departure.format('HH:mm DD/MM')
  const formattedArrival = arrival.format('HH:mm DD/MM')

  return (
    <Paper p="xs" withBorder>
      <Group justify="space-between" align="center">
        <Group gap={2}>
          <Image src={flight.flights[0].airlineLogo} height={24} />
          <Text fw={600}>{flight.origin.code}</Text>
          <IconArrowRight size={20} />
          <Text fw={600}>{flight.destination.code}</Text>
        </Group>

        <Group>
          <IconPlaneDeparture stroke={1} />
          <Text>{formattedDeparture}</Text>
          <Text color="gray">
            {hours}h {minutes}m
          </Text>
          <Text>
            {transfers > 0
              ? `${transfers} Transfer${transfers > 1 ? 's' : ''}`
              : 'Non-Stop'}
          </Text>
          <IconPlaneArrival stroke={1} />
          <Text>{formattedArrival}</Text>
        </Group>

        <Group>
          <NumberFormatter value={flight.price} suffix=" PLN" />
          <Button onClick={() => onSelect(flight)}>Select</Button>
        </Group>
      </Group>
    </Paper>
  )
}

export const FlightList = () => {
  const {
    destination,
    origin,
    departureDate,
    returnDate,
    isSubmitted,
    isOneWay,
  } = useAppSelector(selectSearchForm)

  const [step, setStep] = useState<'departure' | 'return'>('departure')
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const { data: departureData, isLoading: isDepartureLoading } =
    useFlightsSearch(isSubmitted, destination, origin, departureDate)

  const { data: returnData, isLoading: isReturnLoading } = useFlightsSearch(
    isSubmitted && step === 'return' && !isOneWay,
    origin,
    destination,
    returnDate
  )

  const handleDepartureSelect = (flight: Trip) => {
    dispatch(setDepartureFlight(flight))
    if (isOneWay) {
      navigate('/book-trip')
    } else {
      setStep('return')
    }
  }

  const handleReturnSelect = (flight: Trip) => {
    dispatch(setReturnFlight(flight))
    navigate('/book-trip')
  }

  if (!isSubmitted) {
    return (
      <>
        <Title order={2} mb="sm">
          Popular Destinations
        </Title>
        <SimpleGrid cols={3}>
          {popularDestinations.map((destination) => (
            <PopularDestinations
              key={destination.name}
              destination={destination}
            />
          ))}
        </SimpleGrid>
      </>
    )
  }

  if (isDepartureLoading || isReturnLoading) {
    return (
      <>
        {Array(15)
          .fill(0)
          .map((_, index) => (
            <Skeleton key={index} h={28} mt="sm" animate={false} />
          ))}
      </>
    )
  }

  if (step === 'departure') {
    if (departureData && departureData.length > 0) {
      return (
        <>
          <Title order={2} mb="sm">
            Select Departure Flight
          </Title>
          <Stack gap="sm">
            {departureData.map((flight) => (
              <FlightListItem
                key={flight.id}
                flight={flight}
                onSelect={handleDepartureSelect}
              />
            ))}
          </Stack>
        </>
      )
    } else {
      return (
        <>
          <Title order={2} mb="sm">
            Select Departure Flight
          </Title>
          <Text>No flights found! Choose another date.</Text>
        </>
      )
    }
  }

  if (step === 'return') {
    if (returnData && returnData.length > 0) {
      return (
        <>
          <Title order={2} mb="sm">
            Select Return Flight
          </Title>
          <Stack gap="sm">
            {returnData.map((flight) => (
              <FlightListItem
                key={flight.id}
                flight={flight}
                onSelect={handleReturnSelect}
              />
            ))}
          </Stack>
        </>
      )
    } else {
      return (
        <>
          <Title order={2} mb="sm">
            Select Return Flight
          </Title>
          <Text>No flights found! Choose another date.</Text>
        </>
      )
    }
  }

  return null
}
