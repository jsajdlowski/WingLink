import { useUsers } from '../components/users/hooks'

export const Home = () => {
  const { data = [] } = useUsers()

  if (!data) {
    return null
  }

  return data?.map((user) => <p key={user.id}>{user.id}</p>)
}
