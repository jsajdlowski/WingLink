import { Center, Text, Stack } from '@mantine/core'

export const AfterBuy = () => {
  return (
    <Center style={{ height: '100vh' }}>
      <Stack align="center" spacing="md">
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
