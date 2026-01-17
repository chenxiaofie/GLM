/**
 * 活动相关 API 接口
 */
import { get } from './client'
import type { Event, EventsResponse, EventsQueryParams } from './types'

/**
 * 获取活动列表
 * @param params 查询参数
 * @returns 活动列表响应
 */
export async function getEvents(params?: EventsQueryParams): Promise<EventsResponse> {
  return await get<EventsResponse>('/events.json', params)
}

/**
 * 根据活动 ID 获取单个活动详情
 * @param eventId 活动ID
 * @returns 活动详情
 */
export async function getEventById(eventId: string): Promise<Event> {
  return await get<Event>(`/events/${eventId}.json`)
}

/**
 * 搜索活动
 * @param keyword 搜索关键词
 * @param params 其他查询参数
 * @returns 活动列表响应
 */
export async function searchEvents(
  keyword: string,
  params?: Omit<EventsQueryParams, 'keyword'>,
): Promise<EventsResponse> {
  return await get<EventsResponse>('/events.json', {
    keyword,
    ...params,
  })
}

/**
 * 获取推荐活动（默认获取热门活动）
 * @param params 查询参数
 * @returns 活动列表响应
 */
export async function getFeaturedEvents(params?: EventsQueryParams): Promise<EventsResponse> {
  return await get<EventsResponse>('/events.json', {
    sort: 'date,asc',
    ...params,
  })
}
