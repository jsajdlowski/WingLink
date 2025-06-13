import { Group, Text, Card, Button, Image } from '@mantine/core'

import { Destination } from './types'
import { useAppDispatch } from '../../hooks/storeHooks'
import { setSearch } from '../../store/flightSearchSlice'

export const PopularDestinations = ({
  destination,
}: {
  destination: Destination
}) => {
  const dispatch = useAppDispatch()
  const onClickDestination = (airport: string) => {
    dispatch(
      setSearch({
        destination: airport,
        origin: '',
      })
    )
  }

  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      <Card.Section>
        <Image src={destination.image} height={160} alt="Image" />
      </Card.Section>

      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={500}>{destination.name}</Text>
      </Group>

      <Text size="sm" c="dimmed" style={{ flexGrow: 1 }}>
        {destination.text}
      </Text>

      <Button
        color="blue"
        fullWidth
        mt="md"
        radius="md"
        onClick={() => {
          onClickDestination(destination.airport)
        }}
      >
        Check Flights
      </Button>
    </Card>
  )
}
