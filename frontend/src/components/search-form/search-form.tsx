import {
  Button,
  Container,
  Group,
  Paper,
  Text,
  Checkbox,
  Select,
  ActionIcon,
} from '@mantine/core'
import { IconArrowsUpDown } from '@tabler/icons-react'
import { useEffect, useMemo } from 'react'
import { useForm } from '@mantine/form'
import { SearchFormType } from './types'
import { selectSearch, setSearch } from '../../store/flightSearchSlice'
import { setFormData } from '../../store/searchFormSlice'
import { dayjs } from '../../i18n/dayjs-config'
import { DateInput } from '@mantine/dates'
import { useAppDispatch, useAppSelector } from '../../hooks/storeHooks'
import { selectAirports } from '../../store/airportsSlice'
import { useTranslation } from 'react-i18next'

interface SearchFormProps {
  onSearch?: () => void
}

export const SearchForm = ({ onSearch }: SearchFormProps) => {
  const { t, i18n } = useTranslation()
  const dispatch = useAppDispatch()
  const { destination: storeDestination, origin: storeOrigin } =
    useAppSelector(selectSearch)
  const { airports } = useAppSelector(selectAirports)

  const form = useForm<SearchFormType>({
    initialValues: {
      origin: '',
      destination: '',
      departureDate: null,
      returnDate: null,
      isOneWay: false,
      numberOfPassengers: 1,
    },

    validate: {
      origin: (value) =>
        value ? null : t('searchForm.validation.originRequired'),
      destination: (value) =>
        value ? null : t('searchForm.validation.destinationRequired'),
      departureDate: (value) =>
        value ? null : t('searchForm.validation.departureDateRequired'),
      returnDate: (value, values) => {
        if (values.isOneWay) {
          return null
        }
        if (!value) {
          return t('searchForm.validation.returnDateRequired')
        }
        return null
      },
      numberOfPassengers: (value) =>
        value >= 1 && value <= 8
          ? null
          : t('searchForm.validation.passengersLimit'),
    },
  })

  useEffect(() => {
    const currentOrigin = form.getValues().origin
    const currentDestination = form.getValues().destination

    if (storeOrigin !== undefined && storeOrigin !== currentOrigin) {
      form.setFieldValue('origin', storeOrigin)
    }

    if (
      storeDestination !== undefined &&
      storeDestination !== currentDestination
    ) {
      form.setFieldValue('destination', storeDestination)
    }
  }, [storeOrigin, storeDestination, form])

  form.watch('origin', ({ value }) => {
    dispatch(setSearch({ origin: value }))
  })

  form.watch('destination', ({ value }) => {
    dispatch(setSearch({ destination: value }))
  })

  form.watch('departureDate', ({ value }) => {
    if (
      value &&
      form.values.returnDate &&
      dayjs(form.values.returnDate).isBefore(dayjs(value), 'day')
    ) {
      form.setFieldValue('returnDate', null)
    }
  })

  const airportOptions = useMemo(() => {
    if (!airports) return []

    return airports.map((airport) => ({
      value: airport.code,
      label: `${airport.city}, ${airport.country} (${airport.code}) - ${airport.name}`,
    }))
  }, [airports])

  const handleSwapAirports = () => {
    const currentOrigin = form.values.origin
    const currentDestination = form.values.destination

    form.setFieldValue('origin', currentDestination)
    form.setFieldValue('destination', currentOrigin)
  }

  const onSubmit = (formData: SearchFormType) => {
    dispatch(
      setFormData({
        ...formData,
        departureDate: dayjs(formData.departureDate).format(
          'YYYY-MM-DDTHH:mm:ss'
        ),
        returnDate: !formData.isOneWay
          ? dayjs(formData.returnDate).format('YYYY-MM-DDTHH:mm:ss')
          : null,
        isSubmitted: true,
      })
    )

    if (onSearch) {
      onSearch()
    }
  }

  return (
    <Container size="sm" mb="md">
      <Paper shadow="xs" p="lg" radius="md" withBorder>
        <Text size="lg" mb="md" fw="bold">
          {t('searchForm.title')}
        </Text>

        <form onSubmit={form.onSubmit(onSubmit)}>
          <Select
            label={`${t('searchForm.from')}:`}
            placeholder={t('searchForm.placeholders.selectOrigin')}
            limit={10}
            maxDropdownHeight={280}
            data={airportOptions}
            searchable
            clearable
            value={form.values.origin}
            onChange={(value) => {
              form.setFieldValue('origin', value || '')
              dispatch(setSearch({ origin: value || '' }))
            }}
            onClear={() => {
              form.setFieldValue('origin', '')
              dispatch(setSearch({ origin: '' }))
            }}
            error={form.errors.origin}
            styles={{
              input: { paddingRight: '36px' },
              section: { paddingRight: '8px' },
            }}
          />

          <Group justify="center" mt="xs">
            <ActionIcon
              variant="light"
              size="lg"
              radius="xl"
              onClick={handleSwapAirports}
              disabled={!form.values.origin || !form.values.destination}
              title={t('searchForm.swapAirports')}
            >
              <IconArrowsUpDown size={18} />
            </ActionIcon>
          </Group>

          <Select
            label={`${t('searchForm.to')}:`}
            placeholder={t('searchForm.placeholders.selectDestination')}
            limit={10}
            maxDropdownHeight={280}
            data={airportOptions}
            searchable
            clearable
            value={form.values.destination}
            onChange={(value) => {
              form.setFieldValue('destination', value || '')
              dispatch(setSearch({ destination: value || '' }))
            }}
            onClear={() => {
              form.setFieldValue('destination', '')
              dispatch(setSearch({ destination: '' }))
            }}
            error={form.errors.destination}
            styles={{
              input: { paddingRight: '36px' },
              section: { paddingRight: '8px' },
            }}
          />

          <DateInput
            mt="md"
            label={`${t('searchForm.departureDate')}:`}
            minDate={new Date()}
            maxDate={dayjs().add(8, 'month').toDate()}
            placeholder={t('searchForm.placeholders.departureDate')}
            locale={i18n.language}
            {...form.getInputProps('departureDate')}
          />

          <DateInput
            mt="md"
            label={`${t('searchForm.returnDate')}:`}
            minDate={form.values.departureDate ?? new Date()}
            maxDate={dayjs().add(8, 'month').toDate()}
            placeholder={t('searchForm.placeholders.returnDate')}
            disabled={form.values.isOneWay || !form.values.departureDate}
            locale={i18n.language}
            {...form.getInputProps('returnDate')}
          />

          <Checkbox
            mt="md"
            mb="md"
            label={t('searchForm.oneWay')}
            {...form.getInputProps('isOneWay', { type: 'checkbox' })}
          />

          <Group mt="lg" mb="md">
            <Button type="submit" size="md">
              {t('searchForm.search')}
            </Button>
          </Group>
        </form>
      </Paper>
    </Container>
  )
}
