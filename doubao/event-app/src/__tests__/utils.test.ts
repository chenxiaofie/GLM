import { describe, it, expect } from 'vitest'
import { formatDate, formatPrice, getImageUrl } from '@/utils'

describe('utils functions', () => {
  describe('formatDate', () => {
    it('should format date correctly', () => {
      // 测试 MM-DD 格式
      expect(formatDate('2024-04-10', 'MM-DD')).toBe('04-10')

      // 测试 YYYY年MM月DD日 格式
      expect(formatDate('2024-04-10', 'YYYY年MM月DD日')).toBe('2024年04月10日')
    })

    it('should handle invalid date', () => {
      expect(formatDate('', 'MM-DD')).toBe('NaN-NaN')
    })
  })

  describe('formatPrice', () => {
    it('should format price range correctly', () => {
      const priceRanges = [
        {
          type: 'standard',
          currency: 'USD',
          min: 50,
          max: 100
        }
      ]

      expect(formatPrice(priceRanges)).toBe('$50 - $100')
    })

    it('should handle no price range', () => {
      expect(formatPrice([])).toBe('价格待定')
      expect(formatPrice(undefined)).toBe('价格待定')
    })
  })

  describe('getImageUrl', () => {
    it('should return correct image URL', () => {
      const images = [
        {
          ratio: '16_9',
          url: 'https://example.com/image1.jpg',
          width: 800,
          height: 450,
          fallback: false
        },
        {
          ratio: '16_9',
          url: 'https://example.com/image2.jpg',
          width: 600,
          height: 338,
          fallback: false
        }
      ]

      // 测试获取宽100，高70的图片
      const imageUrl = getImageUrl(images, 100, 70)
      expect(imageUrl).toContain('https://example.com/image')
    })

    it('should handle no images', () => {
      expect(getImageUrl([], 100, 70)).toBe('https://via.placeholder.com/100x70?text=No+Image')
    })
  })
})
