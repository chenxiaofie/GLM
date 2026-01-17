import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { createPinia } from 'pinia'
import { mount } from '@vue/test-utils'

// 全局设置
beforeEach(() => {
  // 创建 Pinia 实例
  const pinia = createPinia()
  // 可以在这里添加全局测试配置
})

// 全局清理
afterEach(() => {
  // 可以在这里添加全局测试清理逻辑
})

// 导出常用工具
export { describe, it, expect, vi, beforeEach, afterEach, mount, createPinia }
