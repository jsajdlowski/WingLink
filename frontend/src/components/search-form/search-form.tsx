import {Button, Container, Group, Paper, Text, TextInput} from '@mantine/core'
import {Controller, useForm} from 'react-hook-form'
import {Form} from './types'
import {selectSearch, setSearch} from '../../store/flightSearchSlice'
import {getSelectedField, SearchFormFields, setSelectedField} from '../../store/currentlySelectedSearchFieldSlice'
import {useAppDispatch, useAppSelector} from '../../hooks/storeHooks'
import {useEffect, useRef} from "react";

export const SearchForm = () => {
  const { control, handleSubmit, formState: { errors }, setValue } = useForm<Form>();
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

  useEffect(() => {
    setValue('origin', origin || ''); // sync with Redux
    setValue('destination', destination || ''); // sync with Redux
  }, [origin, destination]);


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
                  const value = event.currentTarget.value;
                  field.onChange(value);
                  dispatch(setSearch({ origin: value, destination: destination || '' })); // update Redux
                }}
                onFocus={() => dispatch(setSelectedField({ selectedField: SearchFormFields.FROM }))}
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
                  const value = event.currentTarget.value;
                  field.onChange(value);
                  dispatch(setSearch({ origin: origin || '', destination: value })); // update Redux
                }}
                onFocus={() => dispatch(setSelectedField({ selectedField: SearchFormFields.TO }))}
                error={errors.destination?.message}
              />
            )}
          />

          <Group mt="md">
            <Button type="submit">Search</Button>
          </Group>
        </form>
      </Paper>
    </Container>
  )
}
