/**
 * 格式化日期
 * @param dateStr 日期字符串
 * @param format 格式
 * @returns 格式化后的日期
 */
export const formatDate = (dateStr: string, format: string = 'YYYY-MM-DD'): string => {
  const date = new Date(dateStr)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')

  return format
    .replace('YYYY', year.toString())
    .replace('MM', month)
    .replace('DD', day)
    .replace('HH', hours)
    .replace('mm', minutes)
}

/**
 * 格式化价格
 * @param priceRanges 价格范围
 * @param currency 货币符号
 * @returns 格式化后的价格字符串
 */
export const formatPrice = (priceRanges?: { min: number; max: number; currency: string }[]): string => {
  if (!priceRanges || priceRanges.length === 0) {
    return '价格待定'
  }

  const firstPrice = priceRanges[0]
  if (!firstPrice) {
    return '价格待定'
  }

  const currency = firstPrice.currency || 'USD'
  const currencySymbol = {
    USD: '$',
    EUR: '€',
    GBP: '£',
    CNY: '¥'
  }[currency] || currency

  if (firstPrice.min === firstPrice.max) {
    return `${currencySymbol}${firstPrice.min}`
  }

  return `${currencySymbol}${firstPrice.min} - ${currencySymbol}${firstPrice.max}`
}

/**
 * 获取图片 URL（根据尺寸）
 * @param images 图片数组
 * @param width 期望宽度
 * @param height 期望高度
 * @returns 最合适的图片 URL
 */
export const getImageUrl = (
  images: { url: string; width: number; height: number }[],
  width: number = 300,
  height: number = 200
): string => {
  if (!images || images.length === 0) {
    return `https://via.placeholder.com/${width}x${height}?text=No+Image`
  }

  // 找到最接近目标尺寸的图片
  let bestMatch = images[0]
  let minDiff = Number.MAX_SAFE_INTEGER

  images.forEach(image => {
    const diff = Math.abs(image.width - width) + Math.abs(image.height - height)
    if (diff < minDiff) {
      minDiff = diff
      bestMatch = image
    }
  })

  return bestMatch?.url || `https://via.placeholder.com/${width}x${height}?text=No+Image`
}

/**
 * 防抖函数
 * @param func 要防抖的函数
 * @param delay 延迟时间（毫秒）
 * @returns 防抖后的函数
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: number | null = null
  return (...args: Parameters<T>) => {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    timeoutId = window.setTimeout(() => {
      func(...args)
    }, delay)
  }
}

/**
 * 节流函数
 * @param func 要节流的函数
 * @param delay 延迟时间（毫秒）
 * @returns 节流后的函数
 */
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let lastExecTime = 0
  return (...args: Parameters<T>) => {
    const currentTime = Date.now()
    if (currentTime - lastExecTime >= delay) {
      func(...args)
      lastExecTime = currentTime
    }
  }
}

/**
 * 验证邮箱格式
 * @param email 邮箱地址
 * @returns 是否有效
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * 验证手机号格式（中国手机号）
 * @param phone 手机号
 * @returns 是否有效
 */
export const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^1[3-9]\d{9}$/
  return phoneRegex.test(phone.replace(/\s/g, ''))
}

/**
 * 生成随机 ID
 * @param length ID 长度
 * @returns 随机 ID
 */
export const generateRandomId = (length: number = 8): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}
