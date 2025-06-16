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
  return (
    <Paper p={'xs'} withBorder>
      <Group justify={'space-between'}>
        <Group gap={2}>
          <Image src={flight.flights[0].airlineLogo} />
          <Text>{flight.origin.code}</Text>
          <IconArrowRight size={20} />
          <Text>{flight.destination.code}</Text>
        </Group>
        <Group>
          <Text>{dayjs(flight.departureTime).format('HH:mm DD/MM')}</Text>
          <Text>
            {flight.flights.length > 1
              ? 'Non-Stop'
              : `transfers ${flight.flights.length}`}
          </Text>
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
    useFlightsSearch(isSubmitted, origin, destination, departureDate)

  const { data: returnData, isLoading: isReturnLoading } = useFlightsSearch(
    isSubmitted && step === 'return' && !isOneWay,
    destination,
    origin,
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

  // SHOW POPULAR DESTINATIONS BEFORE SEARCH
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
          <Text>No flights found</Text>
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
          <Text>No flights found</Text>
        </>
      )
    }
  }

  return null
}
