import { Card, Group, Image, Text, Divider, Stack } from '@mantine/core'
import { SeatClass, Trip } from './types'
import { IconPlane } from '@tabler/icons-react'
import { dayjs } from '../../i18n/dayjs-config'
import { useTranslation } from 'react-i18next'

interface TicketHistoryCardProps {
  trip: Trip
  price: number
  seatClass: SeatClass
}

export const TicketHistoryCard = ({
  trip,
  price: basePrice,
  seatClass,
}: TicketHistoryCardProps) => {
  const { t } = useTranslation()
  const departure = dayjs(trip.departureTime)
  const arrival = dayjs(trip.arrivalTime)
  const totalMinutes = arrival.diff(departure, 'minute')

  const hours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60

  const formattedDepartureTime = departure.format('L HH:mm')
  const formattedArrivalTime = arrival.format('L HH:mm')

  const firstFlight = trip.flights?.[0]
  const transfers = (trip.flights?.length || 1) - 1

  const seatClassMap: Record<SeatClass, string> = {
    ECONOMY: t('bookTrip.seatClasses.economy'),
    PREMIUM_ECONOMY: t('bookTrip.seatClasses.premiumEconomy'),
    BUSINESS: t('bookTrip.seatClasses.business'),
    FIRST_CLASS: t('bookTrip.seatClasses.firstClass'),
  }

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
    <Card
      shadow="md"
      padding="lg"
      radius="md"
      withBorder
      style={{
        maxWidth: 800,
        width: '100%',
        backgroundColor: '#f9f9fc',
      }}
    >
      <Group align="center" justify="space-between" mb="md">
        <Group align="center" gap="xs">
          {firstFlight?.airlineLogo && (
            <Image
              src={firstFlight.airlineLogo}
              height={32}
              fit="contain"
              alt="Airline Logo"
            />
          )}
          <Text fw={700} size="lg">
            {firstFlight?.airline || 'Unknown Airline'}
          </Text>
        </Group>

        <Text fw={500} size="sm" c="dimmed">
          {transfers > 0
            ? t('tripHistory.transfers.transfer', { count: transfers })
            : t('tripHistory.transfers.nonStop')}
        </Text>
      </Group>

      <Group align="center" justify="space-between" mb="xs">
        <Text size="lg" fw={700}>
          {formattedDepartureTime}
        </Text>
        <Text size="sm" c="gray">
          {hours} {t('bookTrip.duration.hours')} {minutes}{' '}
          {t('bookTrip.duration.minutes')}
        </Text>
        <Text size="lg" fw={700}>
          {formattedArrivalTime}
        </Text>
      </Group>

      <Group align="center" justify="center" mb="md">
        <Text fw={600}>{trip.origin?.code || '???'}</Text>
        <IconPlane size={20} />
        <Text fw={600}>{trip.destination?.code || '???'}</Text>
      </Group>

      <Divider my="sm" />

      <Stack gap="xs">
        <Group justify="space-between">
          <Text fw={500} size="sm">
            {t('tripHistory.seatClass')}:
          </Text>
          <Text size="sm">{seatClassMap[seatClass]}</Text>
        </Group>

        <Group justify="space-between">
          <Text fw={500} size="sm">
            {t('tripHistory.price')}:
          </Text>
          <Text fw={700} size="sm" c="green">
            {finalPrice.toFixed(2)} PLN
          </Text>
        </Group>
      </Stack>
    </Card>
  )
}
