import { renderHook } from '@testing-library/react'
import { useMe, useUsers } from './hooks'
import { vi } from 'vitest'
import * as hooks from '../../hooks/useFetcher'

describe('users hooks', () => {
  const setup = () => {
    const fetcherMock = vi.fn()
    vi.spyOn(hooks, 'useFetcher').mockReturnValue(fetcherMock)

    const result = renderHook(() => useMe())

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

describe('users hooks', () => {
  const setup = () => {
    const fetcherMock = vi.fn()
    vi.spyOn(hooks, 'useFetcher').mockReturnValue(fetcherMock)

    const result = renderHook(() => useUsers())

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
