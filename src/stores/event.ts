/**
 * 活动状态管理
 */
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Event, Page } from '../api/types'
import { getEvents, getEventById } from '../api/events'
import type { EventsQueryParams } from '../api/types'

// 默认每页条数
const DEFAULT_PAGE_SIZE = 20

export const useEventStore = defineStore('event', () => {
  // 状态
  const events = ref<Event[]>([])
  const currentEvent = ref<Event | null>(null)
  const page = ref<Page>({
    size: DEFAULT_PAGE_SIZE,
    totalElements: 0,
    totalPages: 0,
    number: 0,
  })
  const loading = ref(false)
  const error = ref<string | null>(null)
  const queryParams = ref<EventsQueryParams>({
    size: DEFAULT_PAGE_SIZE,
  })

  // 搜索防抖定时器
  let searchTimer: ReturnType<typeof setTimeout> | null = null

  // 计算属性
  const hasMore = computed(() => page.value.number < page.value.totalPages - 1)
  const isEmpty = computed(() => events.value.length === 0 && !loading.value)
  const isFirstPage = computed(() => page.value.number === 0)

  /**
   * 获取活动列表
   * @param params 查询参数
   * @param append 是否追加到现有列表（用于分页）
   */
  async function fetchEvents(params?: EventsQueryParams, append = false) {
    loading.value = true
    error.value = null

    try {
      // 合并查询参数，确保包含默认的 size
      const mergedParams: EventsQueryParams = {
        size: DEFAULT_PAGE_SIZE,
        ...queryParams.value,
        ...(params || {}),
      }

      // 计算页码：append 模式下明确使用下一页，覆盖其他逻辑
      if (append) {
        mergedParams.page = page.value.number + 1
      } else if (params?.page !== undefined) {
        mergedParams.page = params.page
      } else {
        // 首次加载或刷新，使用第 0 页
        mergedParams.page = 0
      }

      const response = await getEvents(mergedParams)

      // 获取新数据
      const newEvents = response._embedded?.events ?? []

      // 防止重复数据：根据活动 ID 去重
      if (append) {
        // 使用 Set 去重，保留现有数据和新数据
        const existingIds = new Set(events.value.map(e => e.id))
        const uniqueNewEvents = newEvents.filter(e => !existingIds.has(e.id))
        events.value = [...events.value, ...uniqueNewEvents]
      } else {
        // 非追加模式，直接替换
        events.value = newEvents
      }

      // 更新分页信息
      page.value = response.page
      queryParams.value = mergedParams
    } catch (e: any) {
      error.value = e.message || '获取活动列表失败'
      console.error('fetchEvents error:', e)
    } finally {
      loading.value = false
    }
  }

  /**
   * 加载更多活动
   */
  async function loadMore() {
    // 防止重复加载和加载超出范围
    if (loading.value || !hasMore.value) {
      return
    }

    try {
      console.log('Loading more events, current page:', page.value.number)
      page.value.number++
      // 加载下一页数据并追加
      await fetchEvents({ page: page.value.number + 1 }, true)
    } catch (e: any) {
      error.value = e.message || '加载更多失败'
      console.error('loadMore error:', e)
    }
  }

  /**
   * 刷新活动列表
   */
  async function refresh() {
    // 清空列表并重新加载第一页
    events.value = []
    await fetchEvents({ ...queryParams.value, page: 0 }, false)
  }

  /**
   * 获取单个活动详情
   * @param eventId 活动ID
   */
  async function fetchEventById(eventId: string) {
    loading.value = true
    error.value = null

    try {
      currentEvent.value = await getEventById(eventId)
    } catch (e: any) {
      error.value = e.message || '获取活动详情失败'
      console.error('fetchEventById error:', e)
    } finally {
      loading.value = false
    }
  }

  /**
   * 搜索活动
   * @param keyword 搜索关键词
   */
  async function searchEvents(keyword: string) {
    // 清除之前的定时器
    if (searchTimer) {
      clearTimeout(searchTimer)
      searchTimer = null
    }

    // 防抖：设置新的定时器，300ms 后执行搜索
    searchTimer = setTimeout(async () => {
      // 搜索时清空当前列表并重置到第 0 页
      events.value = []
      queryParams.value = {
        keyword,
        size: DEFAULT_PAGE_SIZE,
      }
      await fetchEvents({ keyword, page: 0 }, false)
    }, 300)
  }

  /**
   * 搜索关键词状态
   */
  const searchKeyword = ref('')

  /**
   * 重置搜索（清空关键词和列表）
   */
  async function resetSearch() {
      searchEvents('')
  }

  return {
    // 状态
    events,
    currentEvent,
    page,
    loading,
    error,
    queryParams,
    searchKeyword,
    // 计算属性
    hasMore,
       isEmpty,
    isFirstPage,
    // 方法
    fetchEvents,
    loadMore,
    refresh,
    fetchEventById,
    searchEvents,
    resetSearch,
  }
})
