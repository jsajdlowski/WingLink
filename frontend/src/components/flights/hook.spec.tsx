import { describe, expect, it, vi } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useFlightsSearch } from './hooks'
import useSWR from 'swr'
import { useFetcher } from '../../hooks/useFetcher'
import { usePublicFetcher } from '../../hooks/usePublicFetcher'
import { useAuth0 } from '@auth0/auth0-react'

// Mocks
vi.mock('swr')
vi.mock('../../hooks/useFetcher', () => ({
  useFetcher: vi.fn(),
}))
vi.mock('../../hooks/usePublicFetcher', () => ({
  usePublicFetcher: vi.fn(),
}))
vi.mock('@auth0/auth0-react', () => ({
  useAuth0: vi.fn(),
}))

describe('useFlightsSearch', () => {
  const mockSWR = useSWR as unknown as ReturnType<typeof vi.fn>
  const mockUseFetcher = useFetcher as unknown as ReturnType<typeof vi.fn>
  const mockUsePublicFetcher = usePublicFetcher as unknown as ReturnType<
    typeof vi.fn
  >
  const mockUseAuth0 = useAuth0 as unknown as ReturnType<typeof vi.fn>

  it('uses authFetcher when user is authenticated', () => {
    const authFetcher = vi.fn()
    mockUseAuth0.mockReturnValue({ isAuthenticated: true })
    mockUseFetcher.mockReturnValue(authFetcher)
    mockUsePublicFetcher.mockReturnValue(vi.fn())
    mockSWR.mockReturnValue('mockedData')

    const { result } = renderHook(() =>
      useFlightsSearch(true, 'NYC', 'LON', '2025-08-10')
    )

    expect(mockSWR).toHaveBeenCalledWith(
      [
        '/flights/search',
        { destination: 'NYC', origin: 'LON', date: '2025-08-10' },
      ],
      authFetcher
    )
    expect(result.current).toBe('mockedData')
  })

  it('uses publicFetcher when user is not authenticated', () => {
    const publicFetcher = vi.fn()
    mockUseAuth0.mockReturnValue({ isAuthenticated: false })
    mockUseFetcher.mockReturnValue(vi.fn())
    mockUsePublicFetcher.mockReturnValue(publicFetcher)
    mockSWR.mockReturnValue('mockedPublicData')

    const { result } = renderHook(() =>
      useFlightsSearch(true, 'PAR', 'BER', '2025-12-01')
    )

    expect(mockSWR).toHaveBeenCalledWith(
      [
        '/flights/search',
        { destination: 'PAR', origin: 'BER', date: '2025-12-01' },
      ],
      publicFetcher
    )
    expect(result.current).toBe('mockedPublicData')
  })

  it('does not fetch when shouldFetch is false', () => {
    mockUseAuth0.mockReturnValue({ isAuthenticated: true })
    mockUseFetcher.mockReturnValue(vi.fn())
    mockUsePublicFetcher.mockReturnValue(vi.fn())
    mockSWR.mockReturnValue('noData')

    const { result } = renderHook(() =>
      useFlightsSearch(false, 'LAX', 'MIA', '2025-11-11')
    )

    expect(mockSWR).toHaveBeenCalledWith(null, expect.any(Function))
    expect(result.current).toBe('noData')
  })
})
