import {Button, Container, Group, Paper, Text, TextInput} from '@mantine/core'
import {useForm} from 'react-hook-form'
import {Form} from './types'
import {selectSearch, setSearch} from '../../store/flightSearchSlice'
import {getSelectedField, SearchFormFields, setSelectedField} from '../../store/currentlySelectedSearchFieldSlice'
import {useAppDispatch, useAppSelector} from '../../hooks/storeHooks'
import {useEffect, useRef} from "react";

export const SearchForm = () => {
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<Form>()
  const dispatch = useAppDispatch();
  const {selectedField} = useAppSelector(getSelectedField);
  const {origin, destination} = useAppSelector(selectSearch);
  const fromFieldRef = useRef<HTMLInputElement>(null);
  const toFieldRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    switch (selectedField) {
      case SearchFormFields.FROM:
        fromFieldRef.current?.focus();
        break;
      case SearchFormFields.TO:
        toFieldRef.current?.focus();
        break;
    }
  }, [selectedField]);

  const onSubmit = (formData: Form) => {
    dispatch(setSearch(formData))
  }

  return (
    <Container size="sm">
      <Paper shadow="xs" p="lg" radius="md" withBorder>
        <Text>Search Flights</Text>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextInput
            value={origin || ''}
            // onChange={handleOriginChange}
            label="From"
            {...register('origin')}
            error={errors.origin?.message}
            ref={fromFieldRef}
            onFocus={() => dispatch(setSelectedField({selectedField: SearchFormFields.FROM}))}
          />
          <TextInput
            value={destination || ''}
            // onChange={handleDestinationChange}
            label="To"
            {...register('destination')}
            error={errors.destination?.message}
            onFocus={() => dispatch(setSelectedField({selectedField: SearchFormFields.TO}))}
            ref={toFieldRef}
          />
          <Group mt="md">
            <Button type="submit">Search</Button>
          </Group>
        </form>
      </Paper>
    </Container>
  )
}
