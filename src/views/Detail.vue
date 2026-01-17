/**
 * 详情页 - 活动详情展示
 */
<script setup lang="ts">
import { onMounted, computed, ref, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useEventStore } from '../stores/event'
import dayjs from 'dayjs'

const router = useRouter()
const route = useRoute()
const eventStore = useEventStore()

// 活动ID（从路由参数获取）
const eventId = computed(() => route.params.id as string)

// 当前活动详情
const event = computed(() => eventStore.currentEvent)

// 图片加载状态
const imageLoaded = ref(false)
const imageError = ref(false)

// 获取活动图片
const getEventImage = (images: any[]) => {
  // 优先获取 16:9 比例的图片
  const image = images.find(img => img.ratio === '16_9')
  return image?.url || images[0]?.url || ''
}

// 图片加载处理
const handleImageLoad = () => {
  imageLoaded.value = true
}

// 图片加载错误处理
const handleImageError = () => {
  imageError.value = true
  imageLoaded.value = true
}

// 格式化日期
const formatDate = (date: string, time?: string) => {
  if (time) {
    return dayjs(`${date} ${time}`).format('YYYY年MM月DD日 HH:mm')
  }
  return dayjs(date).format('YYYY年MM月DD日')
}

// 格式化价格
const formatPrice = (min: number, max: number, currency: string) => {
  const symbol = currency === 'USD' ? '$' : currency
  if (min === max) {
    return `${symbol}${min}`
  }
  return `${symbol}${min} - ${symbol}${max}`
}

// 返回上一页
const goBack = () => {
  router.back()
}

// 在票务网站打开
const openTicketUrl = (url?: string) => {
  if (url) {
    window.open(url, '_blank')
  }
}

// 组件挂载时加载活动详情
onMounted(() => {
  if (eventId.value) {
    eventStore.fetchEventById(eventId.value)
  }
})

// 组件卸载时清理状态
onUnmounted(() => {
  // 重置状态
  imageLoaded.value = false
  imageError.value = false
})
</script>

<template>
  <div class="flex min-h-screen flex-col bg-gray-50">
    <!-- 加载状态 -->
    <div v-if="eventStore.loading" class="flex h-screen items-center justify-center animate-fade-in">
      <div class="text-center">
        <div class="mb-4 inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-gray-200 border-t-primary" />
        <p class="text-gray-600">加载中...</p>
      </div>
    </div>

    <!-- 错误状态 -->
    <div v-else-if="eventStore.error" class="flex h-screen flex-col items-center justify-center px-6 text-center animate-fade-in">
      <div class="mb-4 text-6xl">⚠️</div>
      <p class="mb-4 max-w-md text-gray-600">
        {{ eventStore.error }}
      </p>
      <button
        class="btn-primary"
        @click="goBack"
      >
        返回
      </button>
    </div>

    <!-- 活动详情 -->
    <div v-else-if="event" class="flex min-h-screen flex-col animate-slide-up">
      <!-- 顶部图片 -->
      <div class="relative aspect-video w-full overflow-hidden bg-gray-100">
        <!-- 图片加载中占位 -->
        <div
          v-if="!imageLoaded"
          class="absolute inset-0 flex items-center justify-center skeleton"
        />

        <!-- 活动图片 -->
        <img
          v-show="imageLoaded"
          :src="getEventImage(event.images)"
          :alt="event.name"
          class="h-full w-full object-cover transition-opacity duration-500"
          :class="imageLoaded ? 'opacity-100' : 'opacity-0'"
          @load="handleImageLoad"
          @error="handleImageError"
        >

        <!-- 图片加载失败占位 -->
        <div
          v-if="imageError"
          class="absolute inset-0 flex items-center justify-center bg-gray-200"
        >
          <p class="text-gray-500">图片加载失败</p>
        </div>

        <!-- 返回按钮 -->
        <button
          class="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-sm transition-all duration-300 hover:bg-black/50 hover:scale-110"
          aria-label="返回上一页"
          @click="goBack"
        >
          <span class="text-xl">←</span>
        </button>
      </div>

      <!-- 活动信息 -->
      <div class="flex-1 overflow-y-auto">
        <div class="mx-auto max-w-3xl bg-white px-4 py-6 sm:px-6 sm:py-8">
          <!-- 活动名称 -->
          <h1 class="mb-4 text-2xl font-bold text-gray-900 sm:text-3xl">
            {{ event.name }}
          </h1>

          <!-- 分类标签 -->
          <div v-if="event.classifications" class="mb-6 flex flex-wrap gap-2">
            <span
              v-for="(classification, index) in event.classifications"
              :key="index"
              class="badge bg-primary/10 text-primary"
            >
              {{ classification.segment.name }} / {{ classification.genre.name }}
            </span>
          </div>

          <!-- 日期时间 -->
          <div class="mb-6 flex items-start gap-3 rounded-xl bg-gray-50 p-4 transition-all duration-300 hover:bg-gray-100">
            <div class="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
              <span class="text-xl">📅</span>
            </div>
            <div class="flex-1">
              <p class="text-sm font-medium text-gray-900 sm:text-base">
                {{ formatDate(event.dates.start.localDate, event.dates.start.localTime) }}
              </p>
              <p v-if="event.dates.status?.code" class="mt-1 text-xs text-gray-500">
                状态: {{ event.dates.status.code }}
              </p>
            </div>
          </div>

          <!-- 场地信息 -->
          <div v-if="event._embedded?.venues?.[0]" class="mb-6 rounded-xl bg-gray-50 p-4 transition-all duration-300 hover:bg-gray-100">
            <div class="mb-4 flex items-start gap-3">
              <div class="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-secondary/10 text-secondary">
                <span class="text-xl">📍</span>
              </div>
              <div class="flex-1">
                <p class="font-medium text-gray-900 sm:text-base">
                  {{ event._embedded.venues[0].name }}
                </p>
                <p class="mt-1 text-sm text-gray-600">
                  {{ event._embedded.venues[0].address?.city?.name }}
                  {{ event._embedded.venues[0].address?.state?.name }}
                  {{ event._embedded.venues[0].address?.postalCode }}
                </p>
                <p class="mt-1 text-sm text-gray-600">
                  {{ event._embedded.venues[0].address?.line1 }}
                </p>
              </div>
            </div>
          </div>

          <!-- 价格信息 -->
          <div v-if="event.priceRanges?.[0]" class="mb-6 rounded-xl bg-gray-50 p-4 transition-all duration-300 hover:bg-gray-100">
            <div class="flex items-start gap-3">
              <div class="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-success/10 text-success">
                <span class="text-xl">💰</span>
              </div>
              <div class="flex-1">
                <p class="text-sm text-gray-600">票价</p>
                <p class="mt-1 text-lg font-semibold text-gray-900">
                  {{ formatPrice(
                    event.priceRanges[0].min,
                    event.priceRanges[0].max,
                    event.priceRanges[0].currency
                  ) }}
                </p>
              </div>
            </div>
          </div>

          <!-- 购票按钮 -->
          <button
            v-if="event.url"
            class="btn-primary w-full py-4 text-lg"
            @click="openTicketUrl(event.url)"
          >
            前往购票
          </button>
        </div>
      </div>
    </div>

    <!-- 未找到活动 -->
    <div v-else class="flex h-screen flex-col items-center justify-center px-6 text-center animate-fade-in">
      <div class="mb-4 text-6xl">🔍</div>
      <p class="mb-4 max-w-md text-gray-600">未找到活动详情</p>
      <button
        class="btn-primary"
        @click="goBack"
      >
        返回
      </button>
    </div>
  </div>
</template>
