import { Card, Text, TextInput, Button, Stack } from '@mantine/core'
import { useAppSelector } from '../../hooks/storeHooks'
import { Outlet } from 'react-router-dom'
import { selectTrip } from '../../store/tripSlice'
import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Ticket } from './ticket'
import { useBuyTicket } from './hooks'
import { SeatClass } from '../history/types'
import { useAuth0 } from '@auth0/auth0-react'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

export const BookTrip = () => {
  const { t } = useTranslation()
  const tripState = useAppSelector(selectTrip)
  const navigate = useNavigate()
  const buyTicket = useBuyTicket()
  const { isAuthenticated } = useAuth0()

  useEffect(() => {
    if (tripState.departureFlight == null) {
      navigate('/')
    }
  }, [tripState, navigate])

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')

  const [departurePrice, setDeparturePrice] = useState(0)
  const [departureClass, setDepartureClass] = useState(SeatClass.ECONOMY)

  const [returnPrice, setReturnPrice] = useState(0)
  const [returnClass, setReturnClass] = useState(SeatClass.ECONOMY)

  const isOneWay = !tripState.returnFlight

  const totalPrice = useMemo(() => {
    return isOneWay ? departurePrice : departurePrice + returnPrice
  }, [departurePrice, returnPrice, isOneWay])

  const handleSubmit = () => {
    if (isOneWay) {
      const payload = {
        flightId: tripState.departureFlight!.id,
        seatClass: departureClass,
        firstName,
        lastName,
      }

      buyTicket(payload)
    } else {
      buyTicket({
        flightId: tripState.departureFlight!.id,
        seatClass: departureClass,
        firstName,
        lastName,
      })

      buyTicket({
        flightId: tripState.returnFlight!.id,
        seatClass: returnClass,
        firstName,
        lastName,
      })
    }

    navigate('thank-you-page')
  }

  const isFormValid =
    firstName.trim() !== '' &&
    lastName.trim() !== '' &&
    departureClass &&
    (isOneWay || returnClass)

  return (
    <>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Card.Section>
          <Text size="lg" fw={500} p="md">
            {t('bookTrip.flightsInfo')}
          </Text>
        </Card.Section>

        <Card.Section p="md">
          <Stack mb="md">
            <Ticket
              flight={tripState.departureFlight!}
              title={t('bookTrip.departureFlight')}
              onPriceChange={(price, seatClass) => {
                setDeparturePrice(price)
                setDepartureClass(seatClass as unknown as SeatClass)
              }}
            />

            {!isOneWay && (
              <Ticket
                flight={tripState.returnFlight!}
                title={t('bookTrip.returnFlight')}
                onPriceChange={(price, seatClass) => {
                  setReturnPrice(price)
                  setReturnClass(seatClass as unknown as SeatClass)
                }}
              />
            )}
          </Stack>

          {isAuthenticated ? (
            <>
              <Text fw="bold">{t('bookTrip.passengerInfo')}</Text>
              <Stack>
                <TextInput
                  label={t('bookTrip.firstName')}
                  placeholder={t('bookTrip.enterFirstName')}
                  value={firstName}
                  onChange={(e) => setFirstName(e.currentTarget.value)}
                  required
                />

                <TextInput
                  label={t('bookTrip.lastName')}
                  placeholder={t('bookTrip.enterLastName')}
                  value={lastName}
                  onChange={(e) => setLastName(e.currentTarget.value)}
                  required
                />

                <Text fw={600}>
                  {t('bookTrip.totalPrice')}: {totalPrice.toFixed(2)} PLN
                </Text>

                <Button onClick={handleSubmit} disabled={!isFormValid}>
                  {t('bookTrip.buyTicket')}
                </Button>
              </Stack>
            </>
          ) : (
            <Text c="red" fw={600}>
              {t('bookTrip.loginRequired')}
            </Text>
          )}
        </Card.Section>
      </Card>
      <Outlet />
    </>
  )
}
