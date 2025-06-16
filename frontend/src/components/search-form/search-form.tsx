import {
  Button,
  Container,
  Group,
  Paper,
  TextInput,
  Text,
  Checkbox,
} from '@mantine/core'
import { useRef } from 'react'
import { useForm } from '@mantine/form'
import { Form } from './types'
import {
  getSelectedField,
  SearchFormFields,
  setSelectedField,
} from '../../store/currentlySelectedSearchFieldSlice'
import { selectSearch, setSearch } from '../../store/flightSearchSlice'
import { setFormData } from '../../store/searchFormSlice'
import dayjs from 'dayjs'
import { DateInput } from '@mantine/dates'
import { useAppDispatch, useAppSelector } from '../../hooks/storeHooks'

export const SearchForm = () => {
  const dispatch = useAppDispatch()
  const searchState = useAppSelector(selectSearch)

  const form = useForm<Form>({
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

  const fromFieldRef = useRef<HTMLInputElement>(null)
  const toFieldRef = useRef<HTMLInputElement>(null)

  const handleInputChange = (field: keyof Form, value: string) => {
    const upperValue = value.toUpperCase()
    form.setFieldValue(field, upperValue)
    dispatch(setSearch({ ...searchState, [field]: upperValue }))
  }

  const onSubmit = (formData: Form) => {
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
          <TextInput
            maxLength={3}
            label="From"
            ref={fromFieldRef}
            {...form.getInputProps('origin')}
            onChange={(e) => handleInputChange('origin', e.currentTarget.value)}
            onFocus={() =>
              dispatch(
                setSelectedField({ selectedField: SearchFormFields.FROM })
              )
            }
          />

          <TextInput
            maxLength={3}
            label="To"
            ref={toFieldRef}
            {...form.getInputProps('destination')}
            onChange={(e) =>
              handleInputChange('destination', e.currentTarget.value)
            }
            onFocus={() =>
              dispatch(setSelectedField({ selectedField: SearchFormFields.TO }))
            }
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
            minDate={new Date()}
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
