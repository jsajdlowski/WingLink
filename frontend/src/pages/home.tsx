import { useUsers } from '../components/users/hooks'

export const Home = () => {
  const { data = [] } = useUsers()

  console.log(data)

  return null
}
