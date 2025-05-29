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
import { useState, useEffect, useRef } from 'react'
import { Controller, useForm } from 'react-hook-form'
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
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<Form>()
  const dispatch = useAppDispatch()
  const { selectedField } = useAppSelector(getSelectedField)
  const { origin, destination } = useAppSelector(selectSearch)
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
    setValue('origin', origin || '') // sync with Redux
    setValue('destination', destination || '') // sync with Redux
  }, [origin, destination, setValue])

  const [isOneWay, setIsOneWay] = useState(false)

  const onSubmit = (formData: Form) => {
    dispatch(setSearch(formData))
  }

  return (
    <Container size="sm">
      <Paper shadow="xs" p="lg" radius="md" withBorder>
        <Text>Search Flights</Text>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="origin"
            defaultValue={origin} // sync with Redux
            control={control}
            render={({ field }) => (
              <TextInput
                label="From"
                ref={fromFieldRef}
                value={field.value}
                onChange={(event) => {
                  const value = event.currentTarget.value
                  field.onChange(value)
                  dispatch(
                    setSearch({ origin: value, destination: destination || '' })
                  ) // update Redux
                }}
                onFocus={() =>
                  dispatch(
                    setSelectedField({ selectedField: SearchFormFields.FROM })
                  )
                }
                error={errors.origin?.message}
              />
            )}
          />

          <Controller
            name="destination"
            defaultValue={destination} // sync with Redux
            control={control}
            render={({ field }) => (
              <TextInput
                label="To"
                ref={toFieldRef}
                value={field.value}
                onChange={(event) => {
                  const value = event.currentTarget.value
                  field.onChange(value)
                  dispatch(
                    setSearch({ origin: origin || '', destination: value })
                  ) // update Redux
                }}
                onFocus={() =>
                  dispatch(
                    setSelectedField({ selectedField: SearchFormFields.TO })
                  )
                }
                error={errors.destination?.message}
              />
            )}
          />

          <DateInput
            minDate={new Date()}
            maxDate={dayjs(new Date()).add(1, 'month').toDate()}
            label="Departure Date"
            placeholder="Departure Date"
          />

          {!isOneWay && (
            <DateInput
              mt="md"
              minDate={new Date()}
              maxDate={dayjs(new Date()).add(1, 'month').toDate()}
              label="Return Date"
              placeholder="Return Date"
            />
          )}

          <Checkbox
            mt="md"
            label="One Way"
            checked={isOneWay}
            onChange={(event) => setIsOneWay(event.currentTarget.checked)}
          />
          <NumberInput
            label="Number of Passangers"
            placeholder="Number of Passenge"
            clampBehavior="strict"
            min={1}
            max={8}
          />

          <Group mt="md">
            <Button type="submit">Search</Button>
          </Group>
        </form>
      </Paper>
    </Container>
  )
}
