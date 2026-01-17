import { defineStore } from 'pinia'
import type { AppState, Event, SearchParams, Category } from '@/types'
import { searchEvents, getEventDetail, getCategories } from '@/api'

// 应用全局状态 Store
export const useAppStore = defineStore('app', {
  state: (): AppState => ({
    isLoading: false,
    error: null,
    searchHistory: []
  }),
  persist: true,
  actions: {
    setLoading(loading: boolean) {
      this.isLoading = loading
    },
    setError(error: string | null) {
      this.error = error
    },
    addSearchHistory(keyword: string) {
      if (!keyword) return
      const index = this.searchHistory.indexOf(keyword)
      if (index > -1) {
        this.searchHistory.splice(index, 1)
      }
      this.searchHistory.unshift(keyword)
      if (this.searchHistory.length > 10) {
        this.searchHistory = this.searchHistory.slice(0, 10)
      }
    },
    clearSearchHistory() {
      this.searchHistory = []
    }
  }
})

// 活动搜索 Store
export const useEventStore = defineStore('events', {
  state: () => ({
    events: [] as Event[],
    totalElements: 0,
    totalPages: 0,
    currentPage: 0,
    pageSize: 20,
    isLoading: false,
    error: null,
    searchParams: {} as SearchParams,
    categories: [] as Category[]
  }),
  persist: true,
  actions: {
    async searchEvents(params: SearchParams) {
      this.isLoading = true
      this.error = null
      this.searchParams = params
      try {
        const response = await searchEvents({
          ...params,
          page: params.page || 0,
          size: params.size || this.pageSize
        })
        this.events = response._embedded?.events || []
        this.totalElements = response.page.totalElements
        this.totalPages = response.page.totalPages
        this.currentPage = response.page.number
      } catch (err: any) {
        this.error = err.message || '搜索活动失败'
        console.error('搜索活动失败:', err)
      } finally {
        this.isLoading = false
      }
    },
    async loadMoreEvents() {
      if (this.currentPage >= this.totalPages - 1 || this.isLoading) {
        return
      }
      this.isLoading = true
      try {
        const response = await searchEvents({
          ...this.searchParams,
          page: this.currentPage + 1,
          size: this.pageSize
        })
        this.events = [...this.events, ...(response._embedded?.events || [])]
        this.totalElements = response.page.totalElements
        this.totalPages = response.page.totalPages
        this.currentPage = response.page.number
      } catch (err: any) {
        this.error = err.message || '加载更多失败'
        console.error('加载更多失败:', err)
      } finally {
        this.isLoading = false
      }
    },
    async getCategories() {
      try {
        const response = await getCategories()
        this.categories = response._embedded?.classifications || []
      } catch (err: any) {
        this.error = err.message || '获取分类失败'
        console.error('获取分类失败:', err)
      }
    },
    clearEvents() {
      this.events = []
      this.totalElements = 0
      this.totalPages = 0
      this.currentPage = 0
      this.searchParams = {} as SearchParams
    },
    clearError() {
      this.error = null
    }
  },
  getters: {
    hasMore: (state) => state.currentPage < state.totalPages - 1,
    eventCount: (state) => state.events.length
  }
})

// 活动详情 Store
export const useEventDetailStore = defineStore('eventDetail', {
  state: () => ({
    event: null as Event | null,
    isLoading: false,
    error: null
  }),
  actions: {
    async getEventDetail(id: string) {
      this.isLoading = true
      this.error = null
      try {
        const response = await getEventDetail(id)
        this.event = response || null
      } catch (err: any) {
        this.error = err.message || '获取活动详情失败'
        console.error('获取活动详情失败:', err)
      } finally {
        this.isLoading = false
      }
    },
    clearEventDetail() {
      this.event = null
    },
    clearError() {
      this.error = null
    }
  }
})
