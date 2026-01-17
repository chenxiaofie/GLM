/**
 * 首页 - 活动列表页
 */
<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useEventStore } from '../stores/event'
import dayjs from 'dayjs'
import { useIntersectionLoad } from '../hooks'
const router = useRouter()
const eventStore = useEventStore()

// 应用标题
const appTitle = import.meta.env.VITE_APP_TITLE || '活动发现'

// 视图模式：list（列表）或 grid（网格）
const viewMode = ref<'list' | 'grid'>('list')

// 本地搜索关键词状态
const localSearchKeyword = ref('')

// 网格列数（响应式）
const gridColumns = ref(2)

// 检测屏幕尺寸
const checkScreenSize = () => {
  const width = window.innerWidth
  if (width >= 1024) {
    gridColumns.value = 4
  } else if (width >= 768) {
    gridColumns.value = 3
  } else {
    gridColumns.value = 2
  }
}

const loadMoreRef=ref<HTMLElement|null>(null)
// 加载更多
const handleLoadMore = async () => {
  try {
    await eventStore.loadMore()
  } catch {
    // 错误已在 store 中处理
  }
}

// 搜索
const handleSearch = () => {
  const keyword = localSearchKeyword.value.trim()

  if (keyword) {
    // 有关键词时执行搜索
    eventStore.searchEvents(keyword)
    // 同步 store 中的搜索关键词
    eventStore.searchKeyword = keyword
  } else {
    // 空关键词时重置搜索
    handleResetSearch()
  }
}

// 重置搜索
const handleResetSearch = () => {
  eventStore.resetSearch()
  localSearchKeyword.value = ''
}

// 监听 store 中的搜索关键词变化，同步到本地
watch(() => eventStore.searchKeyword, (newKeyword) => {
  localSearchKeyword.value = newKeyword
})

// 切换视图模式
const toggleViewMode = () => {
  viewMode.value = viewMode.value === 'list' ? 'grid' : 'list'
}

// 格式化日期
const formatDate = (date: string) => {
  return dayjs(date).format('MM月DD日')
}

// 获取活动图片
const getEventImage = (images: any[]) => {
  // 优先获取 16:9 比例的图片
  const image = images.find(img => img.ratio === '16_9')
  return image?.url || images[0]?.url || ''
}

// 图片加载错误处理
const handleImageError = (event: Event) => {
  const img = event.target as HTMLImageElement
  img.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect width="100" height="100" fill="%23e5e7eb"/%3E%3Ctext x="50" y="50" text-anchor="middle" dy=".3em" fill="%239ca3af" font-size="12"%3E图片加载失败%3C/text%3E%3C/svg%3E'
}

// 跳转到详情页
const goToDetail = (eventId: string) => {
  router.push({ name: 'Detail', params: { id: eventId } })
}

// 组件挂载时加载数据
onMounted(async() => {
  checkScreenSize()
  window.addEventListener('resize', checkScreenSize)

  // 只在没有数据时才加载
  if (eventStore.events.length === 0) {
    eventStore.fetchEvents()
  }
  useIntersectionLoad(loadMoreRef, handleLoadMore)
})
</script>

<template>
  <div class="flex min-h-screen flex-col bg-gray-50" >
    <!-- 顶部导航栏 -->
    <header class="sticky top-0 z-10 bg-white px-4 shadow-sm animate-fade-in">
      <div class="mx-auto flex max-w-7xl items-center justify-between">
        <h1 class="text-xl font-semibold text-gray-900">
          {{ appTitle }}
        </h1>
        <button
          class="btn-ghost"
          :aria-label="viewMode === 'list' ? '切换到网格视图' : '切换到列表视图'"
          @click="toggleViewMode"
        >
          <span v-if="viewMode === 'list'" class="text-lg icon-animate">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="3" y="3" width="7" height="7" />
              <rect x="14" y="3" width="7" height="7" />
              <rect x="14" y="14" width="7" height="7" />
              <rect x="3" y="14" width="7" height="7" />
            </svg>
          </span>
          <span v-else class="text-lg icon-animate">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="8" y1="6" x2="21" y2="6" />
              <line x1="8" y1="12" x2="21" y2="12" />
              <line x1="8" y1="18" x2="21" y2="18" />
            </svg>
          </span>
        </button>
      </div>
    </header>

    <!-- 搜索栏 -->
    <div class="bg-white px-4 pt-4 pb-4">
      <div class="mx-auto flex max-w-7xl gap-2">
        <input
          v-model="localSearchKeyword"
          type="text"
          placeholder="搜索活动..."
          class="input"
          @keyup.enter="handleSearch"
        >
        <button
          class="btn-primary"
          @click="handleSearch"
        >
          搜索
        </button>
      </div>
    </div>

    <!-- 活动列表 -->
    <main class="flex-1 px-4 py-4">
      <div class="mx-auto max-w-7xl">
        <!-- 加载状态 - 首次加载 -->
        <div v-if="eventStore.loading && eventStore.isFirstPage" class="flex items-center justify-center py-20">
          <div class="text-center">
            <div class="mb-4 inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-gray-200 border-t-primary" />
            <p class="text-gray-600">加载中...</p>
          </div>
        </div>

        <!-- 错误状态 -->
        <div
          v-else-if="eventStore.error && eventStore.isEmpty"
          class="flex flex-col items-center justify-center py-20 animate-fade-in"
        >
          <div class="mb-4 text-6xl">⚠️</div>
          <p class="mb-4 max-w-md text-center text-gray-600">
            {{ eventStore.error }}
          </p>
          <div class="flex gap-2">
            <button
              v-if="eventStore.searchKeyword"
              class="btn-secondary"
              @click="handleResetSearch"
            >
              清空搜索
            </button>
            <button
              class="btn-primary"
              @click="eventStore.fetchEvents()"
            >
              重新加载
            </button>
          </div>
        </div>

        <!-- 空状态（无错误） -->
        <div v-else-if="eventStore.isEmpty" class="flex flex-col items-center justify-center py-20 animate-fade-in">
          <div class="mb-4 text-6xl">📭</div>
          <p class="text-gray-600">暂无活动</p>
        </div>

        <!-- 列表视图 -->
        <div v-else-if="viewMode === 'list'" class="space-y-3">
          <div
            v-for="(event, index) in eventStore.events"
            :key="event.id"
            class="card card-hover cursor-pointer p-4"
            :style="{ animationDelay: `${index * 50}ms` }"
            @click="goToDetail(event.id)"
          >
            <div class="flex gap-4">
              <!-- 活动图片 -->
              <div class="h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100">
                <img
                  :src="getEventImage(event.images)"
                  :alt="event.name"
                  class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                  loading="lazy"
                  @error="handleImageError"
                >
              </div>
              <!-- 活动信息 -->
              <div class="flex min-w-0 flex-1 flex-col">
                <h2 class="mb-1 truncate text-base font-semibold text-gray-900">
                  {{ event.name }}
                </h2>
                <div class="flex items-center gap-2 text-sm text-gray-600">
                  <span class="text-sm">📅</span>
                  {{ formatDate(event.dates.start.localDate) }}
                </div>
                <p class="text-xs text-gray-500">
                  {{ event._embedded?.venues[0]?.name || '待定场地' }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- 网格视图 -->
        <div v-else class="grid gap-3" :class="`grid-cols-${gridColumns}`">
          <div
            v-for="(event, index) in eventStore.events"
            :key="event.id"
            class="card card-hover cursor-pointer overflow-hidden group"
            :style="{ animationDelay: `${index * 30}ms` }"
            @click="goToDetail(event.id)"
          >
            <!-- 活动图片 -->
            <div class="aspect-square w-full overflow-hidden bg-gray-100">
              <img
                :src="getEventImage(event.images)"
                :alt="event.name"
                class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                loading="lazy"
                @error="handleImageError"
              >
            </div>
            <!-- 活动信息 -->
            <div class="p-3">
              <h2 class="mb-1 truncate text-sm font-semibold text-gray-900">
                {{ event.name }}
              </h2>
              <p class="text-xs text-gray-600">
                <span class="mr-1">📅</span>
                {{ formatDate(event.dates.start.localDate) }}
              </p>
            </div>
          </div>
        </div>

        <!-- 加载更多按钮 -->
        <div
          v-if="eventStore.hasMore && !eventStore.loading"
          class="mt-6 text-center" 
        >
          <button
            class="btn-secondary"
            @click="handleLoadMore"
          >
            加载更多
          </button>
        </div>

        <!-- 加载中（分页） -->
        <div
          v-if="eventStore.loading && !eventStore.isFirstPage"
          class="mt-6 text-center"
        >
          <div class="inline-block h-6 w-6 animate-spin rounded-full border-4 border-solid border-gray-200 border-t-primary" />
        </div>

        <!-- 已加载全部提示 -->
        <div
          v-if="!eventStore.hasMore && !eventStore.isFirstPage && !eventStore.loading && eventStore.events.length > 0"
          class="mt-6 text-center"
        >
          <p class="text-sm text-gray-500">
            已加载全部活动（共 {{ eventStore.page.totalElements }} 条）
          </p>
        </div>
      </div>
       <div ref="loadMoreRef" class="h-px"></div>
    </main>
   
  </div>
</template>
