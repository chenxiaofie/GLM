/**
 * Event Store 单元测试
 */
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useEventStore } from '../event'

describe('useEventStore', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    setActivePinia(createPinia())
  })

  it('应该初始化空状态', () => {
    const store = useEventStore()

    expect(store.events).toEqual([])
    expect(store.currentEvent).toBe(null)
    expect(store.loading).toBe(false)
    expect(store.error).toBe(null)
  })
})
