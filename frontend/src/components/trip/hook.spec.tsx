import { useMyTickets } from './hooks'

import * as hooks from '../../hooks/useFetcher'

import { renderHook } from '@testing-library/react'
import { vi } from 'vitest'

describe('tickets hooks - useMyTickets', () => {
  const setup = () => {
    const fetcherMock = vi.fn()
    vi.spyOn(hooks, 'useFetcher').mockReturnValue(fetcherMock)

    const result = renderHook(() => useMyTickets())

    return {
      result,
      fetcherMock,
    }
  }

  it('should use the useFetcher hook', () => {
    const { fetcherMock } = setup()

    expect(fetcherMock).toHaveBeenCalled()
  })
})
