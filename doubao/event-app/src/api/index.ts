import axios from 'axios'
import { API_CONFIG } from './config'
import type { EventsResponse, SearchParams, Event, CategoriesResponse } from '@/types'

// 创建 axios 实例
const apiClient = axios.create({
  baseURL: API_CONFIG.baseURL,
  timeout: API_CONFIG.timeout,
  headers: API_CONFIG.headers
})

// 请求拦截器
apiClient.interceptors.request.use(
  config => {
    // 在发送请求之前添加 API 密钥
    if (config.params) {
      config.params.apikey = API_CONFIG.apiKey
    } else {
      config.params = {
        apikey: API_CONFIG.apiKey
      }
    }
    return config
  },
  error => {
    console.error('请求错误:', error)
    return Promise.reject(error)
  }
)

// 响应拦截器
apiClient.interceptors.response.use(
  response => response.data,
  error => {
    console.error('响应错误:', error)
    return Promise.reject(error)
  }
)

/**
 * 搜索活动
 * @param params 搜索参数
 * @returns 活动列表响应
 */
export const searchEvents = async (params: SearchParams): Promise<EventsResponse> => {
  const queryParams: any = {
    size: params.size || API_CONFIG.defaultPageSize,
    page: params.page || 0,
    ...(params.keyword && { keyword: params.keyword }),
    ...(params.category && { classificationId: params.category }),
    ...(params.city && { city: params.city }),
    ...(params.startDate && { startDateTime: params.startDate }),
    ...(params.endDate && { endDateTime: params.endDate })
  }

  return apiClient.get('/events.json', { params: queryParams })
}

/**
 * 获取活动详情
 * @param id 活动 ID
 * @returns 活动详情
 */
export const getEventDetail = async (id: string): Promise<Event> => {
  return apiClient.get(`/events/${id}.json`)
}

/**
 * 获取活动分类
 * @returns 活动分类列表
 */
export const getCategories = async (): Promise<CategoriesResponse> => {
  return apiClient.get('/classifications')
}

/**
 * 搜索建议
 * @param keyword 搜索关键词
 * @returns 搜索建议
 */
export const getSearchSuggestions = async (keyword: string) => {
  return apiClient.get('/suggestions', {
    params: {
      keyword,
      type: 'event'
    }
  })
}

export default apiClient
