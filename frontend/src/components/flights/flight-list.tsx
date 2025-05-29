import { Group, Paper, Skeleton, Stack, Text, Title } from '@mantine/core'
import { IconArrowRight, IconPlane } from '@tabler/icons-react'

import { useFlightsSearch } from './hooks'
import { Flight } from './types'
import { selectSearch } from '../../store/flightSearchSlice'
import { useAppSelector } from '../../hooks/storeHooks'

const FlightListItem = ({ flight }: { flight: Flight }) => {
  return (
    <Paper p={'xs'} withBorder>
      <Group justify={'space-between'}>
        <Group gap={2}>
          <IconPlane size={20} />
          <Text>{flight.flightNumber}</Text>
        </Group>
        <Group>
          <Text>{'JFK'}</Text>
          <IconArrowRight size={20} />
          <Text>{'GDA'}</Text>
        </Group>
      </Group>
    </Paper>
  )
}

export const FlightList = () => {
  const { destination, origin } = useAppSelector(selectSearch)
  const { data, isLoading } = useFlightsSearch(destination, origin)

  // if (isLoading)
  //   return Array(15)
  //     .fill(0)
  //     .map((_, index) => (
  //       <Skeleton key={index} h={28} mt="sm" animate={false} />
  //     ))

  return (
    <>
      <Title order={2} mb={'sm'}>
        Flights
      </Title>
      <Stack gap={'sm'}>
        {data?.map((flight) => (
          <FlightListItem key={flight.id} flight={flight} />
        ))}
      </Stack>
    </>
  )
}
