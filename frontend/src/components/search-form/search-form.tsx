import { Button, Container, Group, Paper, TextInput } from '@mantine/core'
import { useForm } from 'react-hook-form'
import { Form } from './types'

export const SearchForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Form>()

  const onSubmit = (data: Form) => {
    console.log(data)
  }

  return (
    <Container size="sm">
      <Paper shadow="xs" p="lg" radius="md" withBorder>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextInput
            label="From"
            {...register('origin', { required: 'Origin country is required' })}
            error={errors.origin?.message}
          />
          <TextInput
            label="To"
            {...register('destination', {
              required: 'Destination country is required',
            })}
            error={errors.destination?.message}
          />
          <TextInput
            label="Departure"
            type="date"
            {...register('departure', {
              required: 'Departure date is required',
            })}
            error={errors.departure?.message}
          />
          <TextInput
            label="Return"
            type="date"
            {...register('comeback', { required: 'Return date is required' })}
            error={errors.comeback?.message}
          />
          <Group mt="md">
            <Button type="submit">Search</Button>
          </Group>
        </form>
      </Paper>
    </Container>
  )
}
