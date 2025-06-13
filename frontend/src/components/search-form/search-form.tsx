import {
  Button,
  Container,
  Group,
  Paper,
  TextInput,
  Text,
  NumberInput,
  Checkbox,
} from '@mantine/core'
import { useEffect, useRef } from 'react'
import { useForm } from '@mantine/form'
import { Form } from './types'
import {
  getSelectedField,
  SearchFormFields,
  setSelectedField,
} from '../../store/currentlySelectedSearchFieldSlice'
import { selectSearch, setSearch } from '../../store/flightSearchSlice'
import dayjs from 'dayjs'
import { DateInput } from '@mantine/dates'
import { useAppDispatch, useAppSelector } from '../../hooks/storeHooks'

export const SearchForm = () => {
  const dispatch = useAppDispatch()
  const { selectedField } = useAppSelector(getSelectedField)
  const searchState = useAppSelector(selectSearch) // full state from Redux

  const form = useForm<Form>({
    initialValues: {
      origin: searchState.origin || '',
      destination: searchState.destination || '',
      departureDate: searchState.departureDate || null,
      returnDate: searchState.returnDate || null,
      isOneWay: searchState.isOneWay || false,
      numberOfPassengers: searchState.numberOfPassengers || 1,
    },

    validate: {
      origin: (value) => (value ? null : 'Origin is required'),
      destination: (value) => (value ? null : 'Destination is required'),
      departureDate: (value) => (value ? null : 'Departure date is required'),
      numberOfPassengers: (value) =>
        value >= 1 && value <= 8 ? null : 'Between 1 and 8 passengers',
    },
  })

  const fromFieldRef = useRef<HTMLInputElement>(null)
  const toFieldRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    switch (selectedField) {
      case SearchFormFields.FROM:
        fromFieldRef.current?.focus()
        break
      case SearchFormFields.TO:
        toFieldRef.current?.focus()
        break
    }
  }, [selectedField])

  useEffect(() => {
    form.setValues({
      origin: searchState.origin || '',
      destination: searchState.destination || '',
      departureDate: searchState.departureDate || null,
      returnDate: searchState.returnDate || null,
      isOneWay: searchState.isOneWay || false,
      numberOfPassengers: searchState.numberOfPassengers || 1,
    })
  }, [searchState])

  const onSubmit = (formData: Form) => {
    // console.log('Submitting full form', formData)
    dispatch(setSearch(formData))
    // useFlightsSearch(formData.destination,formData.origin)
  }

  return (
    <Container size="sm">
      <Paper shadow="xs" p="lg" radius="md" withBorder>
        <Text>Search Flights</Text>
        <form onSubmit={form.onSubmit(onSubmit)}>
          <TextInput
            label="From"
            ref={fromFieldRef}
            {...form.getInputProps('origin')}
            onChange={(event) => {
              const value = event.currentTarget.value
              form.setFieldValue('origin', value)
              dispatch(
                setSearch({
                  ...searchState,
                  origin: value,
                })
              )
            }}
            onFocus={() =>
              dispatch(
                setSelectedField({ selectedField: SearchFormFields.FROM })
              )
            }
          />

          <TextInput
            label="To"
            ref={toFieldRef}
            {...form.getInputProps('destination')}
            onChange={(event) => {
              const value = event.currentTarget.value
              form.setFieldValue('destination', value)
              dispatch(
                setSearch({
                  ...searchState,
                  destination: value,
                })
              )
            }}
            onFocus={() =>
              dispatch(setSelectedField({ selectedField: SearchFormFields.TO }))
            }
          />

          <DateInput
            label="Departure Date"
            minDate={new Date()}
            maxDate={dayjs(new Date()).add(1, 'month').toDate()}
            placeholder="Departure Date"
            value={form.values.departureDate}
            onChange={(value) => {
              form.setFieldValue('departureDate', value)
              dispatch(setSearch({ ...searchState, departureDate: value }))
            }}
            error={form.errors.departureDate}
          />

          <DateInput
            mt="md"
            label="Return Date"
            minDate={new Date()}
            maxDate={dayjs(new Date()).add(1, 'month').toDate()}
            placeholder="Return Date"
            disabled={form.values.isOneWay}
            value={form.values.returnDate}
            onChange={(value) => {
              form.setFieldValue('returnDate', value)
              dispatch(setSearch({ ...searchState, returnDate: value }))
            }}
            error={form.errors.returnDate}
          />

          <Checkbox
            mt="md"
            label="One Way"
            checked={form.values.isOneWay}
            onChange={(e) => {
              const value = e.currentTarget.checked
              form.setFieldValue('isOneWay', value)
              dispatch(setSearch({ ...searchState, isOneWay: value }))
            }}
          />

          <NumberInput
            label="Number of Passengers"
            min={1}
            max={8}
            value={form.values.numberOfPassengers}
            onChange={(value) => {
              form.setFieldValue('numberOfPassengers', value ?? 1)
              dispatch(
                setSearch({ ...searchState, numberOfPassengers: value ?? 1 })
              )
            }}
            error={form.errors.numberOfPassengers}
          />

          <Group mt="md">
            <Button type="submit">Search</Button>
          </Group>
        </form>
      </Paper>
    </Container>
  )
}
