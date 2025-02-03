import { Group, Paper, Skeleton, Stack, Text, Title } from '@mantine/core'
import { IconArrowRight, IconPlane } from '@tabler/icons-react'

import { useFlights } from './hooks'
import { Flight } from './types'

const FlightListItem = ({ flight }: { flight: Flight }) => {
  return (
    <Paper p={'xs'} withBorder>
      <Group justify={'space-between'}>
        <Group gap={2}>
          <IconPlane size={20} />
          <Text>{flight.flightNumber}</Text>
        </Group>
        <Group>
          <Text>{flight.origin.code}</Text>
          <IconArrowRight size={20} />
          <Text>{flight.destination.code}</Text>
        </Group>
      </Group>
    </Paper>
  )
}

export const FlightList = () => {
  const { data, isLoading } = useFlights()

  console.log(data)

  if (isLoading)
    return Array(15)
      .fill(0)
      .map((_, index) => (
        <Skeleton key={index} h={28} mt="sm" animate={false} />
      ))

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
