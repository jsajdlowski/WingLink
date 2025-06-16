import { Center, Text, Stack } from '@mantine/core'

export const TripHistory = () => {
  return (
    <Center style={{ height: '100vh' }}>
      <Stack align="center">
        <Text size="xl" fw={700}>
          Thank you for using WingLink! ❤️
        </Text>
        <Text size="lg" color="gray">
          Have a safe flight.
        </Text>
      </Stack>
    </Center>
  )
}
