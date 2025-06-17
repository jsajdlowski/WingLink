import { Center, Text, Stack, Button } from '@mantine/core'
import { IconHome2 } from '@tabler/icons-react'
import { useNavigate } from 'react-router'
import { useDispatch } from 'react-redux'
import { clearForm } from '../../store/searchFormSlice'
import { clearTrip } from '../../store/tripSlice'
import { resetSearch } from '../../store/flightSearchSlice'

export const AfterBuy = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const onClick = () => {
    dispatch(clearForm())
    dispatch(clearTrip())
    dispatch(resetSearch())
    navigate('/')
  }

  return (
    <Center style={{ height: '100vh' }}>
      <Stack align="center">
        <Text size="xl" fw={700}>
          Thank you for using WingLink! ❤️
        </Text>
        <Text size="lg" color="gray">
          Have a safe trip.
        </Text>
        <Button leftSection={<IconHome2 size={20} />} onClick={onClick}>
          Go to Home Page
        </Button>
      </Stack>
    </Center>
  )
}
