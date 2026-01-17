import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import EventList from '@/components/EventList.vue'
import { useEventStore } from '@/store'
import Vant from 'vant'
import 'vant/lib/index.css'
import { createRouter, createMemoryHistory } from 'vue-router'

vi.mock('@/store', () => ({
  useEventStore: vi.fn()
}))

// 创建测试路由
const router = createRouter({
  history: createMemoryHistory(),
  routes: [
    {
      path: '/',
      component: EventList
    }
  ]
})

describe('EventList Component', () => {
  it('should render loading state when loading and no events', () => {
    // Mock store
    vi.mocked(useEventStore).mockReturnValue({
      isLoading: true,
      events: [],
      error: null,
      searchEvents: vi.fn(),
      loadMoreEvents: vi.fn(),
      currentPage: 0,
      totalPages: 10
    })

    const wrapper = mount(EventList, {
      global: {
        plugins: [Vant, router]
      }
    })
    expect(wrapper.findComponent({ name: 'van-loading' }).exists()).toBe(true)
  })

  it('should render error state when error occurs', () => {
    // Mock store
    vi.mocked(useEventStore).mockReturnValue({
      isLoading: false,
      events: [],
      error: '加载失败',
      searchEvents: vi.fn(),
      loadMoreEvents: vi.fn(),
      currentPage: 0,
      totalPages: 10
    })

    const wrapper = mount(EventList, {
      global: {
        plugins: [Vant, router]
      }
    })
    expect(wrapper.findComponent({ name: 'van-empty' }).exists()).toBe(true)
    expect(wrapper.find('.van-empty__description').text()).toBe('加载失败')
    expect(wrapper.findComponent({ name: 'van-button' }).exists()).toBe(true)
  })

  it('should render empty state when no events', () => {
    // Mock store
    vi.mocked(useEventStore).mockReturnValue({
      isLoading: false,
      events: [],
      error: null,
      searchEvents: vi.fn(),
      loadMoreEvents: vi.fn(),
      currentPage: 0,
      totalPages: 10
    })

    const wrapper = mount(EventList, {
      global: {
        plugins: [Vant, router]
      }
    })
    expect(wrapper.findComponent({ name: 'van-empty' }).exists()).toBe(true)
    expect(wrapper.find('.van-empty__description').text()).toBe('暂无活动')
  })

  it('should render events list when events exist', () => {
    // Mock store
    vi.mocked(useEventStore).mockReturnValue({
      isLoading: false,
      events: [
        {
          id: '1',
          name: 'Test Event',
          dates: {
            start: {
              localDate: '2024-04-10',
              localTime: '19:00'
            }
          },
          images: [
            {
              ratio: '16_9',
              url: 'https://example.com/image.jpg',
              width: 800,
              height: 450,
              fallback: false
            }
          ]
        }
      ],
      error: null,
      searchEvents: vi.fn(),
      loadMoreEvents: vi.fn(),
      currentPage: 0,
      totalPages: 10
    })

    const wrapper = mount(EventList, {
      global: {
        plugins: [Vant, router]
      }
    })
    expect(wrapper.find('.events-container').exists()).toBe(true)
    expect(wrapper.find('.event-cell').exists()).toBe(true)
  })

  it('should render load more button when there are more pages', () => {
    // Mock store
    vi.mocked(useEventStore).mockReturnValue({
      isLoading: false,
      events: [
        {
          id: '1',
          name: 'Test Event',
          dates: {
            start: {
              localDate: '2024-04-10',
              localTime: '19:00'
            }
          },
          images: [
            {
              ratio: '16_9',
              url: 'https://example.com/image.jpg',
              width: 800,
              height: 450,
              fallback: false
            }
          ]
        }
      ],
      error: null,
      searchEvents: vi.fn(),
      loadMoreEvents: vi.fn(),
      currentPage: 0,
      totalPages: 2
    })

    const wrapper = mount(EventList, {
      global: {
        plugins: [Vant, router]
      }
    })
    expect(wrapper.find('.load-more').exists()).toBe(true)
    expect(wrapper.find('.load-more button').text()).toBe('加载更多')
  })

  it('should render all loaded state when no more pages', () => {
    // Mock store
    vi.mocked(useEventStore).mockReturnValue({
      isLoading: false,
      events: [
        {
          id: '1',
          name: 'Test Event',
          dates: {
            start: {
              localDate: '2024-04-10',
              localTime: '19:00'
            }
          },
          images: [
            {
              ratio: '16_9',
              url: 'https://example.com/image.jpg',
              width: 800,
              height: 450,
              fallback: false
            }
          ]
        }
      ],
      error: null,
      searchEvents: vi.fn(),
      loadMoreEvents: vi.fn(),
      currentPage: 0,
      totalPages: 1
    })

    const wrapper = mount(EventList, {
      global: {
        plugins: [Vant, router]
      }
    })
    expect(wrapper.find('.van-empty').exists()).toBe(true)
    expect(wrapper.find('.van-empty__description').text()).toBe('已加载全部')
  })
})
