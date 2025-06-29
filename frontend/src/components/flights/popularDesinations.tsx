import { Group, Text, Card, Button, Image } from '@mantine/core'

import { Destination } from './types'
import { useAppDispatch } from '../../hooks/storeHooks'
import { setSearch } from '../../store/flightSearchSlice'
import { useTranslation } from 'react-i18next'

export const PopularDestinations = ({
  destination,
}: {
  destination: Destination
}) => {
  const { t } = useTranslation(['common', 'destinations'])
  const dispatch = useAppDispatch()
  const onClickDestination = (airport: string) => {
    dispatch(
      setSearch({
        destination: airport,
        origin: '',
      })
    )
  }

  const getDestinationKey = (name: string) => {
    if (name.includes('Paris')) return 'paris'
    if (name.includes('Rome')) return 'rome'
    if (name.includes('New York')) return 'newYork'
    if (name.includes('Tokyo')) return 'tokyo'
    if (name.includes('London')) return 'london'
    if (name.includes('Barcelona')) return 'barcelona'
    if (name.includes('Sydney')) return 'sydney'
    if (name.includes('Rio')) return 'rio'
    if (name.includes('Dubai')) return 'dubai'
    return ''
  }

  const destinationKey = getDestinationKey(destination.name)

  return (
    <Card
      shadow="sm"
      radius="md"
      withBorder
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      <Card.Section>
        <Image
          src={destination.image}
          h={{ base: 140, sm: 160, lg: 200 }}
          alt={
            destinationKey
              ? t(`destinations:destinations.${destinationKey}.name`)
              : destination.name
          }
        />
      </Card.Section>

      <Group justify="space-between" mt={{ base: 'xs', sm: 'md' }} mb="xs">
        <Text fw={500} size="sm">
          {destinationKey
            ? t(`destinations:destinations.${destinationKey}.name`)
            : destination.name}
        </Text>
      </Group>

      <Text size="xs" c="dimmed" style={{ flexGrow: 1 }} lineClamp={3}>
        {destinationKey
          ? t(`destinations:destinations.${destinationKey}.text`)
          : destination.text}
      </Text>

      <Button
        color="blue"
        fullWidth
        mt={{ base: 'xs', sm: 'md' }}
        radius="md"
        size="sm"
        onClick={() => {
          onClickDestination(destination.airport)
        }}
      >
        {t('common:flightList.checkFlights')}
      </Button>
    </Card>
  )
}
