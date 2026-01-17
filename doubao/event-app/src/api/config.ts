// Ticketmaster API 配置
export const API_CONFIG = {
  // API 基础 URL
  baseURL: 'https://app.ticketmaster.com/discovery/v2',

  // API 密钥 - 使用用户提供的备用密钥
  apiKey: import.meta.env.VITE_TICKETMASTER_API_KEY || 'AJIubp2Y9E8NY4rBrYmVt2nJqHjghF8S',

  // 请求超时时间（毫秒）
  timeout: 10000,

  // 默认分页大小
  defaultPageSize: 20,

  // 请求头
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
}
