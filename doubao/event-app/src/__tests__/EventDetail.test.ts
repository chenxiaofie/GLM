import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import EventDetail from '@/components/EventDetail.vue'
import { useEventDetailStore } from '@/store'
import Vant from 'vant'
import 'vant/lib/index.css'
import { createRouter, createMemoryHistory } from 'vue-router'

vi.mock('@/store', () => ({
  useEventDetailStore: vi.fn()
}))

// 创建测试路由
const router = createRouter({
  history: createMemoryHistory(),
  routes: [
    {
      path: '/event/:id',
      component: EventDetail
    }
  ]
})

describe('EventDetail Component', () => {
  it('should render loading state when loading', () => {
    // Mock store
    vi.mocked(useEventDetailStore).mockReturnValue({
      isLoading: true,
      event: null,
      error: null,
      getEventDetail: vi.fn(),
      clearEventDetail: vi.fn()
    })

    const wrapper = mount(EventDetail, {
      global: {
        plugins: [Vant, router]
      }
    })
    expect(wrapper.findComponent({ name: 'van-loading' }).exists()).toBe(true)
  })

  it('should render error state when error occurs', () => {
    // Mock store
    vi.mocked(useEventDetailStore).mockReturnValue({
      isLoading: false,
      event: null,
      error: '加载失败',
      getEventDetail: vi.fn(),
      clearEventDetail: vi.fn()
    })

    const wrapper = mount(EventDetail, {
      global: {
        plugins: [Vant, router]
      }
    })
    expect(wrapper.findComponent({ name: 'van-empty' }).exists()).toBe(true)
    expect(wrapper.find('.van-empty__description').text()).toBe('加载失败')
    expect(wrapper.findComponent({ name: 'van-button' }).exists()).toBe(true)
  })

  it('should render event detail when event exists', () => {
    // Mock store
    vi.mocked(useEventDetailStore).mockReturnValue({
      isLoading: false,
      event: {
        id: '1',
        name: 'Test Event',
        dates: {
          start: {
            localDate: '2024-04-10',
            localTime: '19:00'
          },
          status: {
            code: 'onsale'
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
        ],
        classifications: [
          {
            genre: {
              name: 'Music'
            }
          }
        ],
        priceRanges: [
          {
            type: 'standard',
            currency: 'USD',
            min: 50,
            max: 100
          }
        ],
        _embedded: {
          venues: [
            {
              name: 'Test Venue',
              address: {
                line1: '123 Test St'
              },
              city: {
                name: 'Test City'
              },
              state: {
                name: 'Test State'
              },
              country: {
                name: 'Test Country'
              }
            }
          ]
        },
        seatmap: {
          staticUrl: 'https://example.com/seatmap.jpg'
        }
      },
      error: null,
      getEventDetail: vi.fn(),
      clearEventDetail: vi.fn()
    })

    const wrapper = mount(EventDetail, {
      global: {
        plugins: [Vant, router]
      }
    })
    expect(wrapper.find('.event-content').exists()).toBe(true)
    expect(wrapper.find('.event-name').text()).toBe('Test Event')
  })

  it('should render venue information when available', () => {
    // Mock store
    vi.mocked(useEventDetailStore).mockReturnValue({
      isLoading: false,
      event: {
        id: '1',
        name: 'Test Event',
        dates: {
          start: {
            localDate: '2024-04-10',
            localTime: '19:00'
          },
          status: {
            code: 'onsale'
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
        ],
        classifications: [
          {
            genre: {
              name: 'Music'
            }
          }
        ],
        priceRanges: [
          {
            type: 'standard',
            currency: 'USD',
            min: 50,
            max: 100
          }
        ],
        _embedded: {
          venues: [
            {
              name: 'Test Venue',
              address: {
                line1: '123 Test St'
              },
              city: {
                name: 'Test City'
              },
              state: {
                name: 'Test State'
              },
              country: {
                name: 'Test Country'
              }
            }
          ]
        },
        seatmap: {
          staticUrl: 'https://example.com/seatmap.jpg'
        }
      },
      error: null,
      getEventDetail: vi.fn(),
      clearEventDetail: vi.fn()
    })

    const wrapper = mount(EventDetail, {
      global: {
        plugins: [Vant, router]
      }
    })
    expect(wrapper.find('.venue-section').exists()).toBe(true)
    expect(wrapper.find('.venue-name').text()).toBe('Test Venue')
    expect(wrapper.find('.venue-address').text()).toBe('123 Test St')
    expect(wrapper.find('.venue-location').text()).toContain('Test City')
    expect(wrapper.find('.venue-location').text()).toContain('Test State')
    expect(wrapper.find('.venue-location').text()).toContain('Test Country')
  })

  it('should render seatmap when available', () => {
    // Mock store
    vi.mocked(useEventDetailStore).mockReturnValue({
      isLoading: false,
      event: {
        id: '1',
        name: 'Test Event',
        dates: {
          start: {
            localDate: '2024-04-10',
            localTime: '19:00'
          },
          status: {
            code: 'onsale'
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
        ],
        classifications: [
          {
            genre: {
              name: 'Music'
            }
          }
        ],
        priceRanges: [
          {
            type: 'standard',
            currency: 'USD',
            min: 50,
            max: 100
          }
        ],
        _embedded: {
          venues: [
            {
              name: 'Test Venue',
              address: {
                line1: '123 Test St'
              },
              city: {
                name: 'Test City'
              },
              state: {
                name: 'Test State'
              },
              country: {
                name: 'Test Country'
              }
            }
          ]
        },
        seatmap: {
          staticUrl: 'https://example.com/seatmap.jpg'
        }
      },
      error: null,
      getEventDetail: vi.fn(),
      clearEventDetail: vi.fn()
    })

    const wrapper = mount(EventDetail, {
      global: {
        plugins: [Vant, router]
      }
    })
    expect(wrapper.find('.seatmap-section').exists()).toBe(true)
    expect(wrapper.find('.seatmap-image').exists()).toBe(true)
  })
})
