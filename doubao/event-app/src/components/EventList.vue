<template>
  <div class="event-list">
    <!-- 加载状态 -->
    <div v-if="eventStore.isLoading && eventStore.events.length === 0" class="loading-state">
      <transition name="fade">
        <van-loading type="spinner" />
      </transition>
    </div>

    <!-- 错误信息 -->
    <div v-else-if="eventStore.error" class="error-state">
      <transition name="slide-up">
        <van-empty
          description="加载失败"
          class="error-empty"
        >
          <van-button type="primary" @click="handleRefresh">重新加载</van-button>
        </van-empty>
      </transition>
    </div>

    <!-- 空状态 -->
    <div v-else-if="eventStore.events.length === 0" class="empty-state">
      <transition name="slide-up">
        <van-empty
          description="暂无活动"
        >
          <van-button type="primary" @click="handleRefresh">刷新</van-button>
        </van-empty>
      </transition>
    </div>

    <!-- 活动列表 -->
    <div v-else class="list-state">
      <transition-group
        name="slide-up"
        class="events-container"
        :class="{ 'grid-view': viewMode === 'grid', 'list-view': viewMode === 'list' }"
      >
        <van-cell
          v-for="event in eventStore.events"
          :key="event.id"
          class="event-cell card-hover"
          clickable
          @click="handleEventClick(event)"
        >
        <!-- 列表视图 -->
        <template #title v-if="viewMode === 'list'">
          <div class="event-header">
            <img
              :src="getImageUrl(event.images, 100, 70)"
              :alt="event.name"
              class="event-thumbnail"
            />
            <div class="event-content">
              <div class="event-title">{{ event.name }}</div>
              <div class="event-meta">
                <span class="event-date">
                  {{ formatDate(event.dates.start.localDate, 'MM-DD') }}
                  <span v-if="event.dates.start.localTime">
                    {{ formatTime(event.dates.start.localTime) }}
                  </span>
                </span>
              </div>
            </div>
          </div>
        </template>

        <!-- 网格视图 -->
        <template v-if="viewMode === 'grid'">
          <div class="event-grid-item">
            <img
              :src="getImageUrl(event.images, 300, 200)"
              :alt="event.name"
              class="event-image"
            />
            <div class="event-info">
              <h3 class="event-name">{{ event.name }}</h3>
              <div class="event-date">
                {{ formatDate(event.dates.start.localDate, 'MM-DD') }}
                <span v-if="event.dates.start.localTime">
                  {{ formatTime(event.dates.start.localTime) }}
                </span>
              </div>
            </div>
          </div>
        </template>
      </van-cell>
    </transition-group>

    <!-- 加载更多 -->
    <div v-if="eventStore.currentPage < eventStore.totalPages - 1" class="load-more">
      <van-button
        :loading="eventStore.isLoading"
        @click="handleLoadMore"
        block
      >
        {{ eventStore.isLoading ? '加载中...' : '加载更多' }}
      </van-button>
    </div>

    <!-- 已加载全部 -->
    <van-empty
      v-if="eventStore.currentPage >= eventStore.totalPages - 1 && eventStore.events.length > 0"
      description="已加载全部"
      image="success"
    />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useEventStore } from '@/store'
import { formatDate, getImageUrl } from '@/utils'
import type { Event } from '@/types'

const router = useRouter()
const eventStore = useEventStore()

// 视图模式：list | grid
const viewMode = ref('list')

/**
 * 格式化时间（HH:mm）
 */
const formatTime = (timeStr: string): string => {
  if (!timeStr) return ''
  const time = new Date(`2000-01-01T${timeStr}`)
  return time.toLocaleTimeString('zh-CN', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  })
}

/**
 * 处理活动点击
 */
const handleEventClick = (event: Event) => {
  router.push(`/event/${event.id}`)
}

/**
 * 刷新数据
 */
const handleRefresh = () => {
  // 这里可以添加刷新逻辑，例如重新搜索
  eventStore.searchEvents({})
}

/**
 * 加载更多
 */
const handleLoadMore = () => {
  eventStore.loadMoreEvents()
}

// 暴露方法和变量
defineExpose({
  handleRefresh
})
</script>

<style scoped>
.event-list {
  min-height: 100vh;
}

.error-empty {
  padding-top: 50px;
}

.events-container {
  padding: 0 10px;
}

.event-cell {
  margin-bottom: 10px;
  border-radius: 8px;
  overflow: hidden;
}

/* 列表视图样式 */
.list-view .event-header {
  display: flex;
  gap: 12px;
  align-items: center;
}

.list-view .event-thumbnail {
  width: 100px;
  height: 70px;
  object-fit: cover;
  border-radius: 4px;
  background: #f5f5f5;
}

.list-view .event-content {
  flex: 1;
  min-width: 0;
}

.list-view .event-title {
  font-size: 16px;
  font-weight: 500;
  color: #333;
  margin-bottom: 4px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.event-meta {
  display: flex;
  gap: 12px;
  font-size: 12px;
  color: #666;
  flex-wrap: wrap;
}

.event-date::before {
  content: '📅 ';
}

/* 网格视图样式 */
.grid-view {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.event-grid-item {
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.event-image {
  width: 100%;
  height: 120px;
  object-fit: cover;
  background: #f5f5f5;
}

.event-info {
  padding: 8px;
  background: #fff;
}

.event-name {
  font-size: 14px;
  font-weight: 500;
  color: #333;
  margin-bottom: 4px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.event-date {
  font-size: 12px;
  color: #666;
  margin-bottom: 2px;
}

.event-price {
  font-size: 12px;
  color: #1989fa;
  font-weight: 500;
}

/* 加载更多样式 */
.load-more {
  padding: 20px;
}

/* 响应式设计 */
@media (max-width: 375px) {
  .events-container {
    padding: 0 8px;
  }

  .event-cell {
    margin-bottom: 8px;
  }

  .list-view .event-thumbnail {
    width: 80px;
    height: 56px;
  }

  .list-view .event-title {
    font-size: 14px;
  }

  .event-meta {
    font-size: 11px;
    gap: 8px;
  }

  .grid-view {
    gap: 8px;
  }

  .event-image {
    height: 100px;
  }

  .event-info {
    padding: 6px;
  }

  .event-name {
    font-size: 13px;
  }

  .event-date {
    font-size: 11px;
  }
}

@media (min-width: 768px) {
  .events-container {
    padding: 0 20px;
  }

  .grid-view {
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
  }

  .event-image {
    height: 140px;
  }

  .event-info {
    padding: 12px;
  }

  .event-name {
    font-size: 15px;
  }

  .event-date {
    font-size: 13px;
  }
}

@media (min-width: 1024px) {
  .events-container {
    padding: 0 40px;
    max-width: 1200px;
    margin: 0 auto;
  }

  .grid-view {
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
  }

  .event-image {
    height: 160px;
  }

  .event-name {
    font-size: 16px;
  }

  .event-date {
    font-size: 14px;
  }
}
</style>
