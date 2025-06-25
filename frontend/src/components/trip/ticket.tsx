import { Card, Group, Image, Text, Divider, Select, Stack } from '@mantine/core'
import { Trip } from './types'
import { useState, useEffect, useCallback } from 'react'
import { IconPlane } from '@tabler/icons-react'
import { dayjs } from '../../i18n/dayjs-config'
import { useTranslation } from 'react-i18next'

interface TicketProps {
  flight: Trip
  title: string
  onPriceChange: (price: number, seatClass: string) => void
}

export const Ticket = ({ flight, title, onPriceChange }: TicketProps) => {
  const { t } = useTranslation()
  const [seatClass, setSeatClass] = useState<string>('ECONOMY')

  const basePrice = flight.price

  const calculatePrice = useCallback(
    (seatClass: string): number => {
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
    },
    [basePrice]
  )

  useEffect(() => {
    onPriceChange(calculatePrice(seatClass), seatClass)
  }, [seatClass, calculatePrice, onPriceChange])

  const departure = dayjs(flight.departureTime)
  const arrival = dayjs(flight.arrivalTime)
  const totalMinutes = arrival.diff(departure, 'minute')

  const hours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60

  const formattedDepartureTime = dayjs(flight.departureTime).format('L HH:mm')
  const formattedArrivalTime = dayjs(flight.arrivalTime).format('L HH:mm')

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
          {formattedDepartureTime}
        </Text>
        <Group>
          <Text size="sm" color="gray">
            {hours} {t('bookTrip.duration.hours')} {minutes}{' '}
            {t('bookTrip.duration.minutes')}
          </Text>

          {flight.flights.length > 1 ? (
            <Stack mb="xs">
              <Text fw={600} size="sm" color="dimmed">
                {t('bookTrip.transfers')}:
              </Text>
              {flight.flights.slice(0, -1).map((f) => {
                const translatedCity = t(
                  `translations.cities.${f.destination.city}`,
                  { defaultValue: f.destination.city }
                )
                return (
                  <Text size="sm" key={f.id}>
                    {translatedCity} ({f.destination.code})
                  </Text>
                )
              })}
            </Stack>
          ) : (
            <Text size="sm" color="gray">
              {t('bookTrip.nonStop')}
            </Text>
          )}
        </Group>

        <Text size="xl" fw={700}>
          {formattedArrivalTime}
        </Text>
      </Group>

      <Group mb="xs">
        <Text fw={600}>{flight.origin.code}</Text>
        <IconPlane />
        <Text fw={600}>{flight.destination.code}</Text>
      </Group>

      <Divider my="sm" />

      <Stack>
        <Select
          label={t('bookTrip.seatClass')}
          data={[
            { value: 'ECONOMY', label: t('bookTrip.seatClasses.economy') },
            {
              value: 'PREMIUM_ECONOMY',
              label: t('bookTrip.seatClasses.premiumEconomy'),
            },
            { value: 'BUSINESS', label: t('bookTrip.seatClasses.business') },
            {
              value: 'FIRST_CLASS',
              label: t('bookTrip.seatClasses.firstClass'),
            },
          ]}
          value={seatClass}
          onChange={(value) => setSeatClass(value || 'ECONOMY')}
        />
        <Text fw={600}>
          {t('bookTrip.price')}: {calculatePrice(seatClass).toFixed(2)} PLN
        </Text>
      </Stack>
    </Card>
  )
}
