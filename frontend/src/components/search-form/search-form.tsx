import {
  Button,
  Container,
  Group,
  Paper,
  Text,
  Checkbox,
  Select,
} from '@mantine/core'
import { useEffect, useMemo } from 'react'
import { useForm } from '@mantine/form'
import { SearchFormType } from './types'
import { selectSearch, setSearch } from '../../store/flightSearchSlice'
import { setFormData } from '../../store/searchFormSlice'
import dayjs from 'dayjs'
import { DateInput } from '@mantine/dates'
import { useAppDispatch, useAppSelector } from '../../hooks/storeHooks'
import { selectAirports } from '../../store/airportsSlice'

export const SearchForm = () => {
  const dispatch = useAppDispatch()
  const { destination: storeDestination, origin: storeOrigin } =
    useAppSelector(selectSearch)
  const { airports } = useAppSelector(selectAirports)

  const form = useForm<SearchFormType>({
    initialValues: {
      origin: '',
      destination: '',
      departureDate: null,
      returnDate: null,
      isOneWay: false,
      numberOfPassengers: 1,
    },

    validate: {
      origin: (value) => (value ? null : 'Origin is required'),
      destination: (value) => (value ? null : 'Destination is required'),
      departureDate: (value) => (value ? null : 'Departure date is required'),
      returnDate: (value, values) =>
        values.isOneWay || value ? null : 'Return date is required',
      numberOfPassengers: (value) =>
        value >= 1 && value <= 8 ? null : 'Between 1 and 8 passengers',
    },
  })

  useEffect(() => {
    if (storeDestination && storeDestination !== form.getValues().destination) {
      form.setFieldValue('destination', storeDestination)
    }

    if (storeOrigin && storeOrigin !== form.getValues().origin) {
      form.setFieldValue('destination', storeOrigin)
    }
  }, [storeOrigin, storeDestination, form])

  form.watch('origin', ({ value }) => {
    dispatch(setSearch({ origin: value }))
  })

  form.watch('destination', ({ value }) => {
    dispatch(setSearch({ destination: value }))
  })

  const airportCodes = useMemo(
    () => airports?.map((airport) => airport.code),
    [airports]
  )

  const onSubmit = (formData: SearchFormType) => {
    dispatch(
      setFormData({
        ...formData,
        departureDate: dayjs(formData.departureDate).format(
          'YYYY-MM-DDTHH:mm:ss'
        ),
        returnDate: !formData.isOneWay
          ? dayjs(formData.returnDate).format('YYYY-MM-DDTHH:mm:ss')
          : null,
        isSubmitted: true,
      })
    )
  }

  return (
    <Container size="sm">
      <Paper shadow="xs" p="lg" radius="md" withBorder>
        <Text size="lg">Search Flights</Text>

        <form onSubmit={form.onSubmit(onSubmit)}>
          <Select
            label="From"
            limit={10}
            maxDropdownHeight={280}
            data={airportCodes}
            searchable
            {...form.getInputProps('origin')}
          />
          <Select
            label="To"
            limit={10}
            maxDropdownHeight={280}
            data={airportCodes}
            searchable
            {...form.getInputProps('destination')}
          />

          <DateInput
            label="Departure Date"
            minDate={new Date()}
            maxDate={dayjs().add(1, 'month').toDate()}
            placeholder="Departure Date"
            {...form.getInputProps('departureDate')}
          />

          <DateInput
            mt="md"
            label="Return Date"
            minDate={form.values.departureDate ?? new Date()}
            maxDate={dayjs().add(1, 'month').toDate()}
            placeholder="Return Date"
            disabled={form.values.isOneWay}
            {...form.getInputProps('returnDate')}
          />

          <Checkbox
            mt="md"
            label="One Way"
            {...form.getInputProps('isOneWay', { type: 'checkbox' })}
          />

          <Group mt="md">
            <Button type="submit">Search</Button>
          </Group>
        </form>
      </Paper>
    </Container>
  )
}
