import { Center, Loader, Paper, Stack } from '@mantine/core'
import { Logo } from './logo'

export const PageLoader = () => {
  return (
    <Center w={'100%'} h={'100vh'}>
      <Paper>
        <Stack gap={'md'} justify={'center'} align={'center'}>
          <Logo />
          <Loader />
        </Stack>
      </Paper>
    </Center>
  )
}
