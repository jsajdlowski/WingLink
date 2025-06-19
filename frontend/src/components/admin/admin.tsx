import {
  AppShell,
  Button,
  Group,
  Text,
  Loader,
  Stack,
  Paper,
  Badge,
  Flex,
  Modal,
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { useState } from 'react'
import { mutate } from 'swr'
import { useTickets, useUsers, useDeleteTicket } from './hooks'

enum SeatClass {
  ECONOMY,
  PREMIUM_ECONOMY,
  BUSINESS,
  FIRST_CLASS,
}

export const AdminPage = () => {
  const [active, setActive] = useState<'users' | 'tickets'>('users')
  const [modalOpened, { open, close }] = useDisclosure(false)
  const [selectedTicketId, setSelectedTicketId] = useState<number | null>(null)

  const {
    data: users,
    isLoading: loadingUsers,
    error: errorUsers,
  } = useUsers(active === 'users')

  const {
    data: tickets,
    isLoading: loadingTickets,
    error: errorTickets,
  } = useTickets()

  const deleteTicket = useDeleteTicket()

  const handleDelete = async () => {
    if (selectedTicketId !== null) {
      try {
        await deleteTicket(selectedTicketId)
        mutate(['/tickets'])
      } catch (error) {
        console.error('Failed to delete ticket:', error)
      } finally {
        close()
        setSelectedTicketId(null)
      }
    }
  }

  const seatClassMap = {
    [SeatClass.ECONOMY]: 'Economy',
    [SeatClass.PREMIUM_ECONOMY]: 'Premium Economy',
    [SeatClass.BUSINESS]: 'Business',
    [SeatClass.FIRST_CLASS]: 'First Class',
  }

  return (
    <AppShell
      padding="md"
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { mobile: false },
      }}
    >
      {/* Confirmation Modal */}
      <Modal
        opened={modalOpened}
        onClose={close}
        title="Confirm Deletion"
        centered
      >
        <Text mb="md">Are you sure you want to delete this ticket?</Text>
        <Group justify="flex-end">
          <Button variant="default" onClick={close}>
            Cancel
          </Button>
          <Button color="red" onClick={handleDelete}>
            Delete
          </Button>
        </Group>
      </Modal>

      {/* Sidebar */}
      <AppShell.Navbar p="md">
        <Text size="xl" fw={700} mb="md">
          Admin Panel Options
        </Text>
        <Group grow>
          <Button
            variant={active === 'users' ? 'filled' : 'light'}
            onClick={() => setActive('users')}
          >
            All Users
          </Button>
          <Button
            variant={active === 'tickets' ? 'filled' : 'light'}
            onClick={() => setActive('tickets')}
          >
            Tickets
          </Button>
        </Group>
      </AppShell.Navbar>

      <AppShell.Main style={{ height: '100%' }}>
        {/* USERS */}
        {active === 'users' && (
          <Flex direction="column" justify="center" align="center" h="100%">
            <Text size="xl" fw={700} mb="md">
              Users
            </Text>
            {loadingUsers ? (
              <Loader />
            ) : errorUsers ? (
              <Text c="red">Failed to load users</Text>
            ) : (
              <Stack gap="sm" align="center">
                {users?.map((user) => (
                  <Paper
                    key={user.id}
                    p="lg"
                    radius="md"
                    shadow="md"
                    withBorder
                    style={{
                      maxWidth: 500,
                      width: '100%',
                      backgroundColor: '#f4f9ff',
                    }}
                  >
                    <Text fw={700} size="lg" mb="xs">
                      {user.firstName} {user.lastName}
                    </Text>
                    <Text size="sm" c="dimmed" mb="sm">
                      {user.email}
                    </Text>
                    <Group justify="space-between" mb={4}>
                      <Text size="sm" fw={500}>
                        Role:
                      </Text>
                      <Badge size="sm" color="blue" variant="light">
                        {user.role ?? 'No Role'}
                      </Badge>
                    </Group>
                    <Group justify="space-between">
                      <Text size="sm" fw={500}>
                        Tickets:
                      </Text>
                      <Text size="sm" c="gray">
                        {user.tickets.length}
                      </Text>
                    </Group>
                  </Paper>
                ))}
              </Stack>
            )}
          </Flex>
        )}

        {/* TICKETS */}
        {active === 'tickets' && (
          <Flex direction="column" justify="center" align="center" h="100%">
            <Text size="xl" fw={700} mb="md">
              All Tickets
            </Text>
            {loadingTickets ? (
              <Loader />
            ) : errorTickets ? (
              <Text c="red">Failed to load tickets</Text>
            ) : (
              <Stack gap="sm" align="center">
                {tickets?.map((ticket) => {
                  const flight = ticket.flightTrip.flights[0]

                  return (
                    <Paper
                      key={ticket.id}
                      p="lg"
                      radius="xl"
                      shadow="lg"
                      withBorder
                      style={{
                        maxWidth: 800,
                        width: '100%',
                        backgroundColor: '#fff',
                        border: '2px dashed #ccc',
                        position: 'relative',
                      }}
                    >
                      {/* DELETE BUTTON */}
                      <Button
                        color="red"
                        size="xs"
                        style={{ position: 'absolute', top: 16, right: 16 }}
                        onClick={() => {
                          setSelectedTicketId(ticket.id)
                          open()
                        }}
                      >
                        Delete
                      </Button>

                      <Group align="center" justify="space-between" mb="md">
                        <Group align="center">
                          <img
                            src={flight.airlineLogo}
                            alt={flight.airline}
                            style={{ height: 40, objectFit: 'contain' }}
                          />
                          <Text fw={700} size="lg">
                            {flight.airline}
                          </Text>
                        </Group>
                      </Group>

                      <Group justify="space-between" mb="xs">
                        <Text fw={500} size="sm">
                          Passenger:
                        </Text>
                        <Text size="sm" fw={600}>
                          {ticket.firstName} {ticket.lastName}
                        </Text>
                        <Text size="sm" fw={500}>
                          Seat Class: {ticket.seatClass}
                        </Text>
                      </Group>

                      <hr
                        style={{
                          borderTop: '1px dashed #ddd',
                          margin: '12px 0',
                        }}
                      />

                      <Group justify="space-between" mb={4}>
                        <Text size="sm" fw={500}>
                          Route:
                        </Text>
                        <Text size="sm">
                          {ticket.flightTrip.origin.city} →{' '}
                          {ticket.flightTrip.destination.city}
                        </Text>
                      </Group>

                      <Group justify="space-between" mb={4}>
                        <Text size="sm" fw={500}>
                          Departure:
                        </Text>
                        <Text size="sm">
                          {new Date(
                            ticket.flightTrip.departureTime
                          ).toLocaleString()}
                        </Text>
                      </Group>

                      <Group justify="space-between">
                        <Text size="sm" fw={500}>
                          Price:
                        </Text>
                        <Text size="sm" c="green" fw={700}>
                          {ticket.flightTrip.price} PLN
                        </Text>
                      </Group>
                    </Paper>
                  )
                })}
              </Stack>
            )}
          </Flex>
        )}
      </AppShell.Main>
    </AppShell>
  )
}
