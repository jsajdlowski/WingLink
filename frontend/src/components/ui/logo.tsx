import { Text } from '@mantine/core'

export const Logo = () => {
  return (
    <Text
      size="xl"
      fw={900}
      variant="gradient"
      gradient={{ from: 'blue', to: 'rgba(64, 201, 190, 1)', deg: 0 }}
    >
      WingLink
    </Text>
  )
}
