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
import { Trip, FlightFilters } from './types'
import { useAppDispatch, useAppSelector } from '../../hooks/storeHooks'
import { dayjs } from '../../i18n/dayjs-config'
import { popularDestinations } from '../../data/destinations-data'
import { PopularDestinations } from './popularDesinations'
import { useNavigate } from 'react-router-dom'
import { selectSearchForm } from '../../store/searchFormSlice'
import { setDepartureFlight, setReturnFlight } from '../../store/tripSlice'
import { useState, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { FlightFiltersComponent } from './FlightFilters'
import {
  applyFlightFilters,
  getDefaultFilters,
  getFlightStats,
} from './filterUtils'

const FlightListItem = ({
  flight,
  onSelect,
}: {
  flight: Trip
  onSelect: (flight: Trip) => void
}) => {
  const { t } = useTranslation()
  const departure = dayjs(flight.departureTime)
  const arrival = dayjs(flight.arrivalTime)
  const totalMinutes = arrival.diff(departure, 'minute')
  const hours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60
  const transfers = flight.flights.length - 1

  const formattedDeparture = departure.format('HH:mm L')
  const formattedArrival = arrival.format('HH:mm L')

  return (
    <Paper p={{ base: 'xs', sm: 'md' }} withBorder>
      <Group justify="space-between" align="center" wrap="wrap">
        <Group gap={2}>
          <Image src={flight.flights[0].airlineLogo} height={24} />
          <Text fw={600}>{flight.origin.code}</Text>
          <IconArrowRight size={20} />
          <Text fw={600}>{flight.destination.code}</Text>
        </Group>

        <Group
          wrap="wrap"
          style={{
            flex: '1 1 auto',
            justifyContent: 'center',
          }}
          visibleFrom="sm"
        >
          <IconPlaneDeparture stroke={1} />
          <Text>{formattedDeparture}</Text>
          <Text color="gray">
            {hours}h {minutes}m
          </Text>
          <Text>
            {transfers > 0
              ? t('flightList.transfer', { count: transfers })
              : t('flightList.nonStop')}
          </Text>
          <IconPlaneArrival stroke={1} />
          <Text>{formattedArrival}</Text>
        </Group>

        <Group hiddenFrom="sm" style={{ width: '100%' }} mt="xs">
          <Group gap="xs">
            <IconPlaneDeparture stroke={1} />
            <Text>{formattedDeparture}</Text>
          </Group>
          <Text color="gray">
            {hours}h {minutes}m
          </Text>
          <Group gap="xs">
            <IconPlaneArrival stroke={1} />
            <Text>{formattedArrival}</Text>
          </Group>
          <Text>
            {transfers > 0
              ? t('flightList.transfer', { count: transfers })
              : t('flightList.nonStop')}
          </Text>
        </Group>

        <Group
          justify="space-between"
          style={{
            flex: '0 0 auto',
            alignSelf: 'flex-end',
          }}
        >
          <NumberFormatter value={flight.price} suffix=" PLN" />
          <Button onClick={() => onSelect(flight)} size="sm">
            {t('flightList.select')}
          </Button>
        </Group>
      </Group>
    </Paper>
  )
}

export const FlightList = () => {
  const { t } = useTranslation()
  const {
    destination,
    origin,
    departureDate,
    returnDate,
    isSubmitted,
    isOneWay,
  } = useAppSelector(selectSearchForm)

  const [step, setStep] = useState<'departure' | 'return'>('departure')
  const [filters, setFilters] = useState<FlightFilters>(getDefaultFilters())
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

  const filteredDepartureData = useMemo(() => {
    if (!departureData) return []
    return applyFlightFilters(departureData, filters)
  }, [departureData, filters])

  const filteredReturnData = useMemo(() => {
    if (!returnData) return []
    return applyFlightFilters(returnData, filters)
  }, [returnData, filters])

  const departureFlightStats = useMemo(() => {
    if (!departureData) return { min: 0, max: 0 }
    const stats = getFlightStats(departureData)
    return { min: stats.minPrice, max: stats.maxPrice }
  }, [departureData])

  const returnFlightStats = useMemo(() => {
    if (!returnData) return { min: 0, max: 0 }
    const stats = getFlightStats(returnData)
    return { min: stats.minPrice, max: stats.maxPrice }
  }, [returnData])

  const handleFiltersChange = (newFilters: FlightFilters) => {
    setFilters(newFilters)
  }

  const handleFiltersReset = () => {
    setFilters(getDefaultFilters())
  }

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
          {t('flightList.popularDestinations')}
        </Title>
        <SimpleGrid
          cols={{ base: 1, sm: 2, lg: 3 }}
          spacing={{ base: 'xs', sm: 'md' }}
        >
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
            {t('flightList.selectDepartureFlight')}
          </Title>

          <FlightFiltersComponent
            filters={filters}
            onFiltersChange={handleFiltersChange}
            onReset={handleFiltersReset}
            resultCount={filteredDepartureData.length}
            totalCount={departureData.length}
            priceStats={departureFlightStats}
          />

          {filteredDepartureData.length > 0 ? (
            <Stack gap="sm">
              {filteredDepartureData.map((flight) => (
                <FlightListItem
                  key={flight.id}
                  flight={flight}
                  onSelect={handleDepartureSelect}
                />
              ))}
            </Stack>
          ) : (
            <Text>{t('flightList.noFlightsMatchFilters')}</Text>
          )}
        </>
      )
    } else {
      return (
        <>
          <Title order={2} mb="sm">
            {t('flightList.selectDepartureFlight')}
          </Title>
          <Text>{t('flightList.noFlights')}</Text>
        </>
      )
    }
  }

  if (step === 'return') {
    if (returnData && returnData.length > 0) {
      return (
        <>
          <Title order={2} mb="sm">
            {t('flightList.selectReturnFlight')}
          </Title>

          <FlightFiltersComponent
            filters={filters}
            onFiltersChange={handleFiltersChange}
            onReset={handleFiltersReset}
            resultCount={filteredReturnData.length}
            totalCount={returnData.length}
            priceStats={returnFlightStats}
          />

          {filteredReturnData.length > 0 ? (
            <Stack gap="sm">
              {filteredReturnData.map((flight) => (
                <FlightListItem
                  key={flight.id}
                  flight={flight}
                  onSelect={handleReturnSelect}
                />
              ))}
            </Stack>
          ) : (
            <Text>{t('flightList.noFlightsMatchFilters')}</Text>
          )}
        </>
      )
    } else {
      return (
        <>
          <Title order={2} mb="sm">
            {t('flightList.selectReturnFlight')}
          </Title>
          <Text>{t('flightList.noFlights')}</Text>
        </>
      )
    }
  }

  return null
}
