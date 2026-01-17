<template>
  <div class="calendar-view">
    <!-- 导航栏 -->
    <van-nav-bar
      title="日历"
      class="nav-bar"
    />

    <!-- 日历组件 -->
    <van-calendar
      v-model:current-month="currentMonth"
      :pointers="selectedDates"
      @select="handleDateSelect"
      class="calendar-component"
    />

    <!-- 日期详情 -->
    <div v-if="selectedDate" class="date-detail">
      <div class="date-header">
        <span class="date-text">{{ formatDate(selectedDate, 'YYYY年MM月DD日') }}</span>
      </div>
      <div class="events-section">
        <h3 class="events-title">当天活动</h3>
        <div v-if="currentDateEvents.length > 0" class="events-list">
          <van-cell
            v-for="event in currentDateEvents"
            :key="event.id"
            class="event-cell"
            clickable
            @click="handleEventClick(event)"
          >
            <template #title>
              <div class="event-title">{{ event.name }}</div>
              <div class="event-meta">
                <span class="event-time">{{ event.dates.start.localTime }}</span>
                <span class="event-price">{{ formatPrice(event.priceRanges) }}</span>
              </div>
            </template>
          </van-cell>
        </div>
        <van-empty
          v-else
          description="当天暂无活动"
          image="calendar-o"
          class="no-events"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useEventStore } from '@/store'
import { formatDate, formatPrice } from '@/utils'
import type { Event } from '@/types'

const router = useRouter()
const eventStore = useEventStore()

// 当前月份
const currentMonth = ref(new Date())

// 选中的日期
const selectedDate = ref<string | null>(null)

// 标记的日期
const selectedDates = reactive<Date[]>([])

// 当前日期的活动
const currentDateEvents = ref<Event[]>([])

/**
 * 处理日期选择
 */
const handleDateSelect = (date: Date) => {
  const dateStr = formatDate(date.toISOString().split('T')[0] || '', 'YYYY-MM-DD')
  selectedDate.value = dateStr

  // 添加到标记日期
  if (!selectedDates.some(d => formatDate(d.toISOString().split('T')[0] || '', 'YYYY-MM-DD') === dateStr)) {
    selectedDates.push(date)
  }

  // 加载当天的活动
  eventStore.searchEvents({
    startDate: dateStr,
    endDate: dateStr
  }).then(() => {
    currentDateEvents.value = eventStore.events
  })
}

/**
 * 处理活动点击
 */
const handleEventClick = (event: Event) => {
  router.push(`/event/${event.id}`)
}
</script>

<style scoped>
.calendar-view {
  min-height: 100vh;
  background: #f5f5f5;
}

.nav-bar {
  background: #1989fa;
}

.nav-bar :deep(.van-nav-bar__title) {
  color: #fff;
}

.calendar-component {
  background: #fff;
  margin-bottom: 10px;
}

.date-detail {
  background: #fff;
  padding: 15px;
  border-radius: 8px;
  margin: 0 15px;
}

.date-header {
  margin-bottom: 15px;
  padding-bottom: 10px;
  border-bottom: 1px solid #f0f0f0;
}

.date-text {
  font-size: 16px;
  font-weight: 600;
  color: #333;
}

.events-section {
  margin-top: 10px;
}

.events-title {
  font-size: 14px;
  font-weight: 500;
  color: #333;
  margin-bottom: 10px;
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

.event-time::before {
  content: '⏰ ';
}

.event-price::before {
  content: '💰 ';
}

.no-events {
  padding: 40px 20px;
}
</style>
