/**
 * Axios HTTP 客户端配置
 */
import axios, { type AxiosInstance, type AxiosError } from 'axios'
import type { ApiError } from './types'

// 从环境变量获取配置
const API_BASE_URL = import.meta.env.VITE_TICKETMASTER_API_BASE_URL || 'https://app.ticketmaster.com/discovery/v2'
const API_KEY = import.meta.env.VITE_TICKETMASTER_API_KEY

/**
 * 创建 Axios 实例
 */
export const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // 10 秒超时
  params: {
    apikey: API_KEY,
  },
})

/**
 * 请求拦截器 - 用于添加统一的请求处理
 */
apiClient.interceptors.request.use(
  (config) => {
    // 可以在这里添加 token 等认证信息
    return config
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  },
)

/**
 * 响应拦截器 - 统一错误处理
 */
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const apiError: ApiError = {
      message: error.message || '请求失败',
      status: error.response?.status,
    }

    // 根据状态码处理不同的错误
    if (error.response?.status === 401) {
      apiError.message = '未授权，请检查 API Key'
    } else if (error.response?.status === 404) {
      apiError.message = '未找到相关数据'
    } else if (error.response?.status === 429) {
      apiError.message = '请求过于频繁，请稍后再试'
    }

    return Promise.reject(apiError)
  },
)

/**
 * 封装 GET 请求
 */
export async function get<T>(url: string, params?: Record<string, any>): Promise<T> {
  const response = await apiClient.get<T>(url, { params })
  return response.data
}

/**
 * 封装 POST 请求
 */
export async function post<T>(url: string, data?: any): Promise<T> {
  const response = await apiClient.post<T>(url, data)
  return response.data
}
