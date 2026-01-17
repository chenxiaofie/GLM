<template>
  <div class="search-view">
    <!-- 导航栏 -->
    <van-nav-bar
      title="搜索"
      left-arrow
      class="nav-bar"
      @click-left="handleBack"
    />

    <!-- 搜索栏 -->
    <div class="search-section">
      <van-search
        v-model="searchKeyword"
        placeholder="搜索活动..."
        @search="handleSearch"
        @clear="handleClear"
        show-action
        action-text="取消"
        @blur="handleCancel"
      />
    </div>

    <!-- 搜索历史 -->
    <div v-if="appStore.searchHistory.length > 0" class="history-section">
      <div class="history-header">
        <span class="title">搜索历史</span>
        <van-icon name="delete-o" size="16" @click="handleClearHistory" />
      </div>
      <div class="history-tags">
        <van-tag
          v-for="(keyword, index) in appStore.searchHistory"
          :key="index"
          type="default"
          plain
          @click="handleHistoryClick(keyword)"
        >
          {{ keyword }}
        </van-tag>
      </div>
    </div>

    <!-- 热门搜索 -->
    <div class="hot-section">
      <div class="hot-header">
        <span class="title">热门搜索</span>
      </div>
      <div class="hot-tags">
        <van-tag
          v-for="(keyword, index) in hotKeywords"
          :key="index"
          type="primary"
          plain
          @click="handleHotClick(keyword)"
        >
          {{ keyword }}
        </van-tag>
      </div>
    </div>

    <!-- 搜索结果 -->
    <div v-if="searchResults.length > 0" class="results-section">
      <div class="results-header">
        <span class="title">搜索结果 ({{ searchResults.length }})</span>
      </div>
      <div class="events-list">
        <van-cell
          v-for="event in searchResults"
          :key="event.id"
          class="event-cell"
          clickable
          @click="handleEventClick(event)"
        >
          <template #title>
            <div class="event-title">{{ event.name }}</div>
            <div class="event-meta">
              <span class="event-date">{{ formatDate(event.dates.start.localDate, 'MM-DD') }}</span>
              <span class="event-price">{{ formatPrice(event.priceRanges) }}</span>
            </div>
          </template>
        </van-cell>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAppStore, useEventStore } from '@/store'
import { formatDate, formatPrice } from '@/utils'
import type { Event } from '@/types'

const router = useRouter()
const appStore = useAppStore()
const eventStore = useEventStore()

// 搜索关键词
const searchKeyword = ref('')

// 搜索结果
const searchResults = ref<Event[]>([])

// 热门搜索关键词
const hotKeywords = reactive([
  '周杰伦',
  '陈奕迅',
  'NBA',
  '演唱会',
  '话剧',
  '足球',
  '音乐节',
  '相声'
])

/**
 * 返回上一页
 */
const handleBack = () => {
  router.back()
}

/**
 * 处理搜索
 */
const handleSearch = () => {
  if (!searchKeyword.value.trim()) {
    return
  }

  appStore.addSearchHistory(searchKeyword.value.trim())
  eventStore.searchEvents({
    keyword: searchKeyword.value.trim()
  }).then(() => {
    searchResults.value = eventStore.events
  })
}

/**
 * 处理清空搜索
 */
const handleClear = () => {
  searchKeyword.value = ''
  searchResults.value = []
}

/**
 * 处理取消
 */
const handleCancel = () => {
  if (!searchKeyword.value.trim()) {
    router.back()
  }
}

/**
 * 处理搜索历史点击
 */
const handleHistoryClick = (keyword: string) => {
  searchKeyword.value = keyword
  handleSearch()
}

/**
 * 处理热门搜索点击
 */
const handleHotClick = (keyword: string) => {
  searchKeyword.value = keyword
  handleSearch()
}

/**
 * 清空搜索历史
 */
const handleClearHistory = () => {
  appStore.clearSearchHistory()
}

/**
 * 处理活动点击
 */
const handleEventClick = (event: Event) => {
  router.push(`/event/${event.id}`)
}
</script>

<style scoped>
.search-view {
  min-height: 100vh;
  background: #f5f5f5;
}

.nav-bar {
  background: #1989fa;
}

.nav-bar :deep(.van-nav-bar__title),
.nav-bar :deep(.van-icon) {
  color: #fff;
}

.search-section {
  padding: 10px;
  background: #fff;
}

.history-section,
.hot-section,
.results-section {
  padding: 15px;
  background: #fff;
  margin-bottom: 10px;
}

.history-header,
.hot-header,
.results-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.title {
  font-size: 14px;
  font-weight: 500;
  color: #333;
}

.history-tags,
.hot-tags {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.events-list {
  margin-top: 10px;
}

.event-cell {
  margin-bottom: 8px;
}

.event-title {
  font-size: 15px;
  font-weight: 500;
  color: #333;
  margin-bottom: 4px;
}

.event-meta {
  display: flex;
  gap: 12px;
  font-size: 12px;
  color: #666;
}

.event-date::before {
  content: '📅 ';
}

.event-price::before {
  content: '💰 ';
}
</style>
