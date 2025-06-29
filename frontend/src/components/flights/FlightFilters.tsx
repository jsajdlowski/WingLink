import {
  Paper,
  Text,
  Group,
  Button,
  Slider,
  NumberInput,
  RangeSlider,
  Select,
  Popover,
  Stack,
} from '@mantine/core'
import { useTranslation } from 'react-i18next'
import { FlightFilters } from './types'
import { IconChevronDown } from '@tabler/icons-react'

interface FlightFiltersComponentProps {
  filters: FlightFilters
  onFiltersChange: (filters: FlightFilters) => void
  onReset: () => void
  resultCount: number
  totalCount: number
  priceStats?: { min: number; max: number }
}

export const FlightFiltersComponent = ({
  filters,
  onFiltersChange,
  onReset,
  resultCount,
  totalCount,
  priceStats,
}: FlightFiltersComponentProps) => {
  const { t } = useTranslation()

  const handleFilterChange = (
    key: keyof FlightFilters,
    value: number | [number, number] | [number | null, number | null] | null
  ) => {
    onFiltersChange({
      ...filters,
      [key]: value,
    })
  }

  const hasActiveFilters =
    filters.maxDuration !== null ||
    filters.departureTimeRange !== null ||
    filters.arrivalTimeRange !== null ||
    filters.maxTransfers !== null ||
    filters.priceRange[0] !== null ||
    filters.priceRange[1] !== null

  const formatHour = (hour: number) => `${hour.toString().padStart(2, '0')}:00`

  const getDurationLabel = () => {
    if (!filters.maxDuration) return t('filters.duration')
    return `${t('filters.duration')}: ${filters.maxDuration}h`
  }

  const getDepartureTimeLabel = () => {
    if (!filters.departureTimeRange) return t('filters.departureTime')
    return `${t('filters.departureTime')}: ${formatHour(
      filters.departureTimeRange[0]
    )}-${formatHour(filters.departureTimeRange[1])}`
  }

  const getArrivalTimeLabel = () => {
    if (!filters.arrivalTimeRange) return t('filters.arrivalTime')
    return `${t('filters.arrivalTime')}: ${formatHour(
      filters.arrivalTimeRange[0]
    )}-${formatHour(filters.arrivalTimeRange[1])}`
  }

  const getPriceLabel = () => {
    if (!filters.priceRange[0] && !filters.priceRange[1])
      return t('filters.priceRange')
    const from = filters.priceRange[0]
      ? `${filters.priceRange[0]} PLN`
      : '0 PLN'
    const to = filters.priceRange[1] ? `${filters.priceRange[1]} PLN` : '∞'
    return `${t('filters.priceRange')}: ${from} - ${to}`
  }

  return (
    <Paper p="md" withBorder mb="md">
      <Stack gap="md">
        <Group justify="space-between" align="center">
          <Text size="lg" fw={500}>
            {t('filters.title')}
          </Text>
          <Group gap="xs">
            <Text size="sm" c="dimmed">
              {t('filters.showingResults', {
                count: resultCount,
                total: totalCount,
              })}
            </Text>
            {hasActiveFilters && (
              <Button variant="outline" size="xs" onClick={onReset}>
                {t('filters.clearAll')}
              </Button>
            )}
          </Group>
        </Group>

        <Group gap="sm" wrap="wrap">
          <Popover width={380} position="bottom" withArrow shadow="md">
            <Popover.Target>
              <Button
                variant={filters.maxDuration ? 'filled' : 'light'}
                size="sm"
                leftSection={<IconChevronDown size={14} />}
              >
                {getDurationLabel()}
              </Button>
            </Popover.Target>
            <Popover.Dropdown p="lg">
              <Stack gap="md">
                <Text size="sm" fw={500}>
                  {t('filters.duration')}
                </Text>
                <Text size="xs" c="dimmed">
                  {filters.maxDuration
                    ? t('filters.maxDurationValue', {
                        hours: filters.maxDuration,
                      })
                    : t('filters.selectMaxDuration')}
                </Text>
                <div style={{ padding: '0 20px', marginBottom: '10px' }}>
                  <Slider
                    min={1}
                    max={24}
                    step={1}
                    value={filters.maxDuration || 24}
                    onChange={(value) =>
                      handleFilterChange('maxDuration', value)
                    }
                    marks={[
                      { value: 6, label: '6h' },
                      { value: 12, label: '12h' },
                      { value: 18, label: '18h' },
                      { value: 24, label: '24h' },
                    ]}
                    size="sm"
                  />
                </div>
              </Stack>
            </Popover.Dropdown>
          </Popover>

          <Popover width={450} position="bottom" withArrow shadow="md">
            <Popover.Target>
              <Button
                variant={filters.departureTimeRange ? 'filled' : 'light'}
                size="sm"
                leftSection={<IconChevronDown size={14} />}
              >
                {getDepartureTimeLabel()}
              </Button>
            </Popover.Target>
            <Popover.Dropdown p="lg">
              <Stack gap="md">
                <Text size="sm" fw={500}>
                  {t('filters.departureTime')}
                </Text>
                <Text size="xs" c="dimmed">
                  {filters.departureTimeRange
                    ? `${formatHour(
                        filters.departureTimeRange[0]
                      )} - ${formatHour(filters.departureTimeRange[1])}`
                    : t('filters.selectDepartureTime')}
                </Text>
                <div style={{ padding: '0 25px', marginBottom: '10px' }}>
                  <RangeSlider
                    min={0}
                    max={23}
                    step={1}
                    value={filters.departureTimeRange || [0, 23]}
                    onChange={(value) => {
                      if (value[0] === 0 && value[1] === 23) {
                        handleFilterChange('departureTimeRange', null)
                      } else {
                        handleFilterChange('departureTimeRange', value)
                      }
                    }}
                    marks={[
                      { value: 0, label: '00:00' },
                      { value: 8, label: '08:00' },
                      { value: 16, label: '16:00' },
                      { value: 23, label: '23:00' },
                    ]}
                    size="sm"
                  />
                </div>
              </Stack>
            </Popover.Dropdown>
          </Popover>

          <Popover width={450} position="bottom" withArrow shadow="md">
            <Popover.Target>
              <Button
                variant={filters.arrivalTimeRange ? 'filled' : 'light'}
                size="sm"
                leftSection={<IconChevronDown size={14} />}
              >
                {getArrivalTimeLabel()}
              </Button>
            </Popover.Target>
            <Popover.Dropdown p="lg">
              <Stack gap="md">
                <Text size="sm" fw={500}>
                  {t('filters.arrivalTime')}
                </Text>
                <Text size="xs" c="dimmed">
                  {filters.arrivalTimeRange
                    ? `${formatHour(
                        filters.arrivalTimeRange[0]
                      )} - ${formatHour(filters.arrivalTimeRange[1])}`
                    : t('filters.selectArrivalTime')}
                </Text>
                <div style={{ padding: '0 25px', marginBottom: '10px' }}>
                  <RangeSlider
                    min={0}
                    max={23}
                    step={1}
                    value={filters.arrivalTimeRange || [0, 23]}
                    onChange={(value) => {
                      if (value[0] === 0 && value[1] === 23) {
                        handleFilterChange('arrivalTimeRange', null)
                      } else {
                        handleFilterChange('arrivalTimeRange', value)
                      }
                    }}
                    marks={[
                      { value: 0, label: '00:00' },
                      { value: 8, label: '08:00' },
                      { value: 16, label: '16:00' },
                      { value: 23, label: '23:00' },
                    ]}
                    size="sm"
                  />
                </div>
              </Stack>
            </Popover.Dropdown>
          </Popover>

          <Select
            placeholder={t('filters.selectStops')}
            value={filters.maxTransfers?.toString() || ''}
            onChange={(value) =>
              handleFilterChange('maxTransfers', value ? parseInt(value) : null)
            }
            data={[
              { value: '0', label: t('filters.directOnly') },
              { value: '1', label: t('filters.upTo1Stop') },
              { value: '2', label: t('filters.upTo2Stops') },
              { value: '3', label: t('filters.upTo3Stops') },
            ]}
            size="sm"
          />

          <Popover width={350} position="bottom" withArrow shadow="md">
            <Popover.Target>
              <Button
                variant={
                  filters.priceRange[0] !== null ||
                  filters.priceRange[1] !== null
                    ? 'filled'
                    : 'light'
                }
                size="sm"
                leftSection={<IconChevronDown size={14} />}
              >
                {getPriceLabel()}
              </Button>
            </Popover.Target>
            <Popover.Dropdown>
              <Stack gap="md">
                <Text size="sm" fw={500}>
                  {t('filters.priceRange')}
                </Text>
                <Group grow>
                  <NumberInput
                    label={t('filters.minPrice')}
                    placeholder={priceStats ? priceStats.min.toString() : '0'}
                    min={0}
                    value={filters.priceRange[0] || ''}
                    onChange={(value) =>
                      handleFilterChange('priceRange', [
                        typeof value === 'number' ? value : null,
                        filters.priceRange[1],
                      ])
                    }
                    suffix=" PLN"
                    size="sm"
                  />
                  <NumberInput
                    label={t('filters.maxPrice')}
                    placeholder={priceStats ? priceStats.max.toString() : '∞'}
                    min={0}
                    value={filters.priceRange[1] || ''}
                    onChange={(value) =>
                      handleFilterChange('priceRange', [
                        filters.priceRange[0],
                        typeof value === 'number' ? value : null,
                      ])
                    }
                    suffix=" PLN"
                    size="sm"
                  />
                </Group>
                {priceStats && (
                  <Text size="xs" c="dimmed">
                    {t('filters.priceRangeInfo', {
                      min: priceStats.min,
                      max: priceStats.max,
                    })}
                  </Text>
                )}
              </Stack>
            </Popover.Dropdown>
          </Popover>
        </Group>
      </Stack>
    </Paper>
  )
}
