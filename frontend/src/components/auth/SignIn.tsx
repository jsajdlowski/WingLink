import { LoginButton } from './LoginButton'
import { Text, Container } from '@mantine/core'

export const SignIn = () => {
  return (
    <Container
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text
        size="xl"
        fw={900}
        variant="gradient"
        gradient={{ from: 'blue', to: 'rgba(64, 201, 190, 1)', deg: 0 }}
      >
        WingLink
      </Text>
      <LoginButton />
    </Container>
  )
}
