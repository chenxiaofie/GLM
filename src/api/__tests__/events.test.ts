/**
 * Events API 单元测试
 */
import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest'

describe('Events API', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('基础测试', () => {
    it('应该能够导入 API 函数', async () => {
      const { getEvents, getEventById, searchEvents, getFeaturedEvents } = await import('../events')
      expect(typeof getEvents).toBe('function')
      expect(typeof getEventById).toBe('function')
      expect(typeof searchEvents).toBe('function')
      expect(typeof getFeaturedEvents).toBe('function')
    })
  })
})
