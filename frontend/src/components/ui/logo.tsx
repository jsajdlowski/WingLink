import { Text } from '@mantine/core'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { clearForm } from '../../store/searchFormSlice'
import { resetSearch } from '../../store/flightSearchSlice'
import { clearTrip } from '../../store/tripSlice'

export const Logo = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  return (
    <Text
      size="xl"
      fw={900}
      variant="gradient"
      gradient={{ from: 'blue', to: 'rgba(64, 201, 190, 1)', deg: 0 }}
      onClick={() => {
        dispatch(clearForm())
        dispatch(resetSearch())
        dispatch(clearTrip())

        navigate('/')
      }}
      style={{ cursor: 'pointer' }}
    >
      WingLink
    </Text>
  )
}
