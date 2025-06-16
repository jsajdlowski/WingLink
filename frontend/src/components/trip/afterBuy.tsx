import { Center, Text, Stack, Button } from '@mantine/core'
import { IconHome2 } from '@tabler/icons-react'
import { useNavigate } from 'react-router'

export const AfterBuy = () => {
  const navigate = useNavigate()

  return (
    <Center style={{ height: '100vh' }}>
      <Stack align="center">
        <Text size="xl" fw={700}>
          Thank you for using WingLink! ❤️
        </Text>
        <Text size="lg" color="gray">
          Have a safe trip.
        </Text>
        <Button
          leftSection={<IconHome2 size={20} />}
          onClick={() => navigate('/')}
        >
          Go to Home Page
        </Button>
      </Stack>
    </Center>
  )
}
