import { Card, Text, TextInput, Button, Stack } from '@mantine/core'
import { useAppSelector } from '../../hooks/storeHooks'
import { Outlet } from 'react-router'
import { selectTrip } from '../../store/tripSlice'
import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router'
import { Ticket } from './ticket'
import { useBuyTicket } from './hooks'
import { SeatClass } from '../history/types'
import { useAuth0 } from '@auth0/auth0-react'

export const BookTrip = () => {
  const tripState = useAppSelector(selectTrip)
  const navigate = useNavigate()
  const buyTicket = useBuyTicket()
  const { isAuthenticated } = useAuth0()

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
            Flights info
          </Text>
        </Card.Section>

        <Card.Section p="md">
          <Stack mb="md">
            <Ticket
              flight={tripState.departureFlight!}
              title={'Departure Flight'}
              onPriceChange={(price, seatClass) => {
                setDeparturePrice(price)
                setDepartureClass(seatClass as unknown as SeatClass)
              }}
            />

            {!isOneWay && (
              <Ticket
                flight={tripState.returnFlight!}
                title="Return Flight"
                onPriceChange={(price, seatClass) => {
                  setReturnPrice(price)
                  setReturnClass(seatClass as unknown as SeatClass)
                }}
              />
            )}
          </Stack>

          {isAuthenticated ? (
            <>
              <Text fw="bold">Passenger Info</Text>
              <Stack>
                <TextInput
                  label="First Name"
                  placeholder="Enter your first name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.currentTarget.value)}
                  required
                />

                <TextInput
                  label="Last Name"
                  placeholder="Enter your last name"
                  value={lastName}
                  onChange={(e) => setLastName(e.currentTarget.value)}
                  required
                />

                <Text fw={600}>Total Price: {totalPrice.toFixed(2)} PLN</Text>

                <Button onClick={handleSubmit} disabled={!isFormValid}>
                  Buy Ticket
                </Button>
              </Stack>
            </>
          ) : (
            <Text c="red" fw={600}>
              Please log in to complete your booking.
            </Text>
          )}
        </Card.Section>
      </Card>
      <Outlet />
    </>
  )
}
