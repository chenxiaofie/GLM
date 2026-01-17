/**
 * Ticketmaster API 响应类型定义
 */

// 活动图片类型
export interface EventImage {
  ratio: string
  url: string
  width: number
  height: number
  fallback: boolean
}

// 活动分类类型
export interface EventClassification {
  primary: {
    name: string
  }
  segment: {
    name: string
  }
  genre: {
    name: string
  }
  subGenre?: {
    name: string
  }
}

// 活动日期类型
export interface EventDate {
  start: {
    localDate: string
    localTime?: string
    dateTime?: string
  }
  status?: {
    code: string
  }
}

// 活动场地类型
export interface Venue {
  name: string
  address?: {
    line1?: string
    city?: {
      name: string
    }
    state?: {
      name: string
    }
    postalCode?: string
  }
  location?: {
    longitude?: string
    latitude?: string
  }
}

// 价格类型
export interface PriceRange {
  type: string
  currency: string
  min: number
  max: number
}

// 单个活动类型
export interface Event {
  id: string
  name: string
  url?: string
  images: EventImage[]
  dates: EventDate
  classifications?: EventClassification[]
  _embedded?: {
    venues: Venue[]
  }
  priceRanges?: PriceRange[]
  segment?: string
  genre?: string
  subGenre?: string
}

// 分页信息
export interface Page {
  size: number
  totalElements: number
  totalPages: number
  number: number
}

// API 响应类型
export interface EventsResponse {
  _embedded?: {
    events: Event[]
  }
  page: Page
}

// API 错误类型
export interface ApiError {
  message: string
  code?: string
  status?: number
}

// 请求参数类型
export interface EventsQueryParams {
  keyword?: string
  city?: string
  stateCode?: string
  countryCode?: string
  startDateTime?: string
  endDateTime?: string
  size?: number
  page?: number
  sort?: string
}
