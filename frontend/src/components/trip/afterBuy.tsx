import { Center, Text, Stack, Button } from '@mantine/core'
import { IconHome2 } from '@tabler/icons-react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { clearForm } from '../../store/searchFormSlice'
import { clearTrip } from '../../store/tripSlice'
import { resetSearch } from '../../store/flightSearchSlice'
import { useTranslation } from 'react-i18next'

export const AfterBuy = () => {
  const { t } = useTranslation('afterBuy')
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
          {t('afterBuy.thankYou')}
        </Text>
        <Text size="lg" color="gray">
          {t('afterBuy.safeTripWish')}
        </Text>
        <Button leftSection={<IconHome2 size={20} />} onClick={onClick}>
          {t('afterBuy.goToHomePage')}
        </Button>
      </Stack>
    </Center>
  )
}
