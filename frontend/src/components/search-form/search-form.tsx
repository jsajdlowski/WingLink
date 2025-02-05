import { Button, Container, Group, Paper, TextInput, Text } from '@mantine/core'
import { useForm } from 'react-hook-form'
import { Form } from './types'
import { setSearch } from '../../store/flightSearchSlice'

import { useAppDispatch } from '../../hooks/storeHooks'

export const SearchForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Form>()
  const dispatch = useAppDispatch()

  const onSubmit = (formData: Form) => {
    dispatch(setSearch(formData))
  }

  return (
    <Container size="sm">
      <Paper shadow="xs" p="lg" radius="md" withBorder>
        <Text>Search Flights</Text>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextInput
            label="From"
            {...register('origin')}
            error={errors.origin?.message}
          />
          <TextInput
            label="To"
            {...register('destination')}
            error={errors.destination?.message}
          />
          <Group mt="md">
            <Button type="submit">Search</Button>
          </Group>
        </form>
      </Paper>
    </Container>
  )
}
