// 全局类型定义

// 活动分类
export interface Category {
  id: string
  name: string
  shortName: string
  url: string
}

// 活动图片
export interface Image {
  ratio: string
  url: string
  width: number
  height: number
  fallback: boolean
}

// 价格信息
export interface PriceRange {
  type: string
  currency: string
  min: number
  max: number
}

// 场地信息
export interface Venue {
  id: string
  name: string
  city: {
    name: string
  }
  state: {
    name: string
  }
  country: {
    name: string
  }
  address: {
    line1: string
  }
  location: {
    latitude: string
    longitude: string
  }
}

// 活动信息
export interface Event {
  id: string
  name: string
  url: string
  dates: {
    start: {
      localDate: string
      localTime?: string
      dateTime?: string
    }
    timezone?: string
    status: {
      code: string
    }
  }
  images: Image[]
  classifications: {
    segment: Category
    genre: Category
    subGenre: Category
  }[]
  priceRanges?: PriceRange[]
  seatmap?: {
    staticUrl?: string
  }
  _embedded?: {
    venues: Venue[]
  }
}

// 活动列表响应
export interface EventsResponse {
  _embedded?: {
    events: Event[]
  }
  page: {
    size: number
    totalElements: number
    totalPages: number
    number: number
  }
}

// 分类列表响应
export interface CategoriesResponse {
  _embedded?: {
    classifications: Category[]
  }
}

// 搜索参数
export interface SearchParams {
  keyword?: string
  category?: string
  city?: string
  startDate?: string
  endDate?: string
  page?: number
  size?: number
}

// 全局状态
export interface AppState {
  isLoading: boolean
  error: string | null
  searchHistory: string[]
}
