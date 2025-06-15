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

import { selectSearchForm } from '../../store/searchFormSlice'
import { setDepartureFlight } from '../../store/tripSlice'

const FlightListItem = ({ flight }: { flight: Trip }) => {
  const dispatch = useAppDispatch()
  const { isOneWay } = useAppSelector(selectSearchForm)
  const onClick = (flight: Trip, isOneWay: boolean) => {
    // isOneWay ? dispatch(setDepartureFlight(flight))

    console.log(flight)
    console.log(isOneWay)
  }

  return (
    <Paper p={'xs'} withBorder>
      <Group justify={'space-between'}>
        <Group gap={2}>
          <Image src={flight.flights[0].airlineLogo} />
          {/* <IconPlane size={20} /> */}
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
          <Button onClick={() => onClick(flight, isOneWay)}>Select</Button>
        </Group>
      </Group>
    </Paper>
  )
}

export const FlightList = () => {
  const { destination, origin, departureDate, isSubmitted } =
    useAppSelector(selectSearchForm)

  const { data, isLoading } = useFlightsSearch(
    isSubmitted,
    destination,
    origin,
    departureDate
  )

  if (isLoading) {
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

  if (data && data.length > 0) {
    return (
      <>
        <Title order={2} mb="sm">
          Departure Flights
        </Title>
        <Stack gap="sm">
          {data.map((flight) => (
            <FlightListItem key={flight.id} flight={flight} />
          ))}
        </Stack>
      </>
    )
  }

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
