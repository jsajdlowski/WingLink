import { Text } from '@mantine/core'
import { useNavigate } from 'react-router'

export const Logo = () => {
  const navigate = useNavigate()
  return (
    <Text
      size="xl"
      fw={900}
      variant="gradient"
      gradient={{ from: 'blue', to: 'rgba(64, 201, 190, 1)', deg: 0 }}
      onClick={() => {
        navigate('/')
      }}
    >
      WingLink
    </Text>
  )
}
