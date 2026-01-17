<template>
  <div class="event-detail">
    <!-- 加载状态 -->
    <div v-if="eventDetailStore.isLoading" class="loading-state">
      <transition name="fade">
        <van-loading type="spinner" />
      </transition>
    </div>

    <!-- 错误信息 -->
    <div v-else-if="eventDetailStore.error" class="error-state">
      <transition name="slide-up">
        <van-empty
          description="加载失败"
          class="error-empty"
        >
          <van-button type="primary" @click="handleRefresh">重新加载</van-button>
        </van-empty>
      </transition>
    </div>

    <!-- 事件详情 -->
    <div v-else-if="eventDetailStore.event" class="detail-state">
      <transition name="slide-up">
        <div class="event-content">
          <!-- 顶部图片 -->
          <div class="event-header">
            <img
              :src="getImageUrl(eventDetailStore.event.images, 750, 400)"
              :alt="eventDetailStore.event.name"
              class="event-image"
            />
            <div class="event-overlay">
              <h1 class="event-name">{{ eventDetailStore.event.name }}</h1>
            </div>
          </div>

          <!-- 基础信息 -->
          <van-cell-group class="event-info">
            <van-cell title="日期" is-link>
              <template #label>
                <div class="event-date">
                  {{ formatDate(eventDetailStore.event.dates.start.localDate, 'YYYY年MM月DD日') }}
                  <span v-if="eventDetailStore.event.dates.start.localTime">
                    {{ eventDetailStore.event.dates.start.localTime }}
                  </span>
                </div>
              </template>
            </van-cell>

            <van-cell title="类型" is-link>
              <template #label>
                <span class="event-type">
                  {{ eventDetailStore.event.classifications[0]?.genre?.name || '其他' }}
                </span>
              </template>
            </van-cell>

            <van-cell title="价格" is-link>
              <template #label>
                <span class="event-price">{{ formatPrice(eventDetailStore.event.priceRanges) }}</span>
              </template>
            </van-cell>

            <van-cell title="状态" is-link>
              <template #label>
                <van-tag
                  :type="getStatusType(eventDetailStore.event.dates.status.code)"
                  class="event-status"
                >
                  {{ getStatusText(eventDetailStore.event.dates.status.code) }}
                </van-tag>
              </template>
            </van-cell>
          </van-cell-group>

          <!-- 场地信息 -->
          <div class="venue-section">
            <h2 class="section-title">📍 场地信息</h2>
            <div v-if="eventDetailStore.event._embedded?.venues" class="venue-info">
              <van-cell title="场馆名称" is-link>
                <template #label>
                  <span class="venue-name">{{ eventDetailStore.event._embedded.venues?.[0]?.name || '未知' }}</span>
                </template>
              </van-cell>
              <van-cell title="地址" is-link>
                <template #label>
                  <span class="venue-address">
                    {{ eventDetailStore.event._embedded.venues?.[0]?.address?.line1 || '未知' }}
                  </span>
                </template>
              </van-cell>
              <van-cell title="位置" is-link>
                <template #label>
                  <span class="venue-location">
                    {{ eventDetailStore.event._embedded.venues?.[0]?.city?.name || '未知' }},
                    {{ eventDetailStore.event._embedded.venues?.[0]?.state?.name || '未知' }},
                    {{ eventDetailStore.event._embedded.venues?.[0]?.country?.name || '未知' }}
                  </span>
                </template>
              </van-cell>
            </div>
            <div v-else class="no-venue">
              <van-empty description="暂无场地信息" />
            </div>
          </div>

          <!-- 座位图 -->
          <div class="seatmap-section" v-if="eventDetailStore.event.seatmap?.staticUrl">
            <h2 class="section-title">🎫 座位图</h2>
            <div class="seatmap-container">
              <img
                :src="eventDetailStore.event.seatmap.staticUrl"
                alt="座位图"
                class="seatmap-image"
              />
            </div>
          </div>

          <!-- 行动按钮 -->
          <div class="action-section">
            <van-button type="primary" size="large" class="buy-button" block>
              立即购票
            </van-button>
            <van-button type="default" size="large" class="share-button" block>
              分享
            </van-button>
          </div>
        </div>
      </transition>
    </div>

    <!-- 空状态 -->
    <div v-else class="empty-state">
      <transition name="slide-up">
        <van-empty description="暂无数据" />
      </transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, watch, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { useEventDetailStore } from '@/store'
import { formatDate, formatPrice, getImageUrl } from '@/utils'

const route = useRoute()
const eventDetailStore = useEventDetailStore()

/**
 * 获取状态类型
 */
const getStatusType = (code: string) => {
  const statusMap: Record<string, 'primary' | 'success' | 'warning' | 'danger' | 'default'> = {
    onsale: 'success',
    presale: 'warning',
    offsale: 'danger'
  }
  return statusMap[code] || 'default'
}

/**
 * 获取状态文本
 */
const getStatusText = (code: string) => {
  const statusMap: Record<string, string> = {
    onsale: '售票中',
    presale: '预售中',
    offsale: '已售罄'
  }
  return statusMap[code] || '未知状态'
}

/**
 * 刷新数据
 */
const handleRefresh = () => {
  const eventId = route.params.id as string
  if (eventId) {
    eventDetailStore.getEventDetail(eventId)
  }
}

// 监听路由变化
watch(() => route.params.id, (newId) => {
  if (newId) {
    eventDetailStore.getEventDetail(newId as string)
  }
})

// 组件挂载时获取数据
onMounted(() => {
  const eventId = route.params.id as string
  if (eventId) {
    eventDetailStore.getEventDetail(eventId)
  }
})

// 组件卸载时清理数据
onUnmounted(() => {
  eventDetailStore.clearEventDetail()
})
</script>

<style scoped>
.event-detail {
  min-height: 100vh;
  background: #f5f5f5;
}

.error-empty {
  padding-top: 50px;
}

.event-content {
  background: #fff;
}

.event-header {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.event-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.event-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
  padding: 20px 15px;
}

.event-name {
  font-size: 18px;
  font-weight: 600;
  color: #fff;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 1.4;
}

.event-info {
  margin: 15px;
  border-radius: 8px;
  overflow: hidden;
}

.event-date {
  font-size: 14px;
  color: #333;
}

.event-type {
  font-size: 14px;
  color: #666;
}

.event-price {
  font-size: 14px;
  color: #1989fa;
  font-weight: 500;
}

.event-status {
  font-size: 12px;
}

.section-title {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  padding: 15px;
  margin: 0;
  border-bottom: 1px solid #f0f0f0;
}

.venue-section,
.seatmap-section {
  margin: 15px;
  border-radius: 8px;
  overflow: hidden;
  background: #fff;
}

.venue-info {
  padding: 0 15px;
}

.venue-name,
.venue-address,
.venue-location {
  font-size: 14px;
  color: #666;
}

.no-venue {
  padding: 40px 20px;
}

.seatmap-container {
  padding: 15px;
}

.seatmap-image {
  width: 100%;
  height: auto;
  border-radius: 4px;
}

.action-section {
  padding: 15px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.buy-button {
  height: 48px;
  font-size: 16px;
  font-weight: 500;
  transition: all 0.3s ease;
}

.buy-button:hover {
  transform: scale(1.02);
  box-shadow: 0 4px 12px rgba(25, 137, 250, 0.4);
}

.share-button {
  height: 48px;
  font-size: 16px;
  transition: all 0.3s ease;
}

.share-button:hover {
  transform: scale(1.02);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

/* 响应式设计 */
@media (max-width: 375px) {
  .event-header {
    height: 160px;
  }

  .event-overlay {
    padding: 15px 12px;
  }

  .event-name {
    font-size: 16px;
    line-height: 1.3;
  }

  .event-info {
    margin: 12px;
  }

  .section-title {
    font-size: 15px;
    padding: 12px;
  }

  .venue-section,
  .seatmap-section {
    margin: 12px;
  }

  .venue-info {
    padding: 0 12px;
  }

  .seatmap-container {
    padding: 12px;
  }

  .action-section {
    padding: 12px;
  }

  .buy-button,
  .share-button {
    height: 44px;
    font-size: 15px;
  }
}

@media (min-width: 768px) {
  .event-detail {
    max-width: 768px;
    margin: 0 auto;
  }

  .event-header {
    height: 250px;
  }

  .event-name {
    font-size: 20px;
  }

  .event-info {
    margin: 20px;
  }

  .section-title {
    font-size: 18px;
    padding: 20px;
  }

  .venue-section,
  .seatmap-section {
    margin: 20px;
  }

  .venue-info {
    padding: 0 20px;
  }

  .seatmap-container {
    padding: 20px;
  }

  .action-section {
    padding: 20px;
    flex-direction: row;
  }

  .buy-button,
  .share-button {
    flex: 1;
    height: 52px;
    font-size: 17px;
  }
}

@media (min-width: 1024px) {
  .event-detail {
    max-width: 900px;
  }

  .event-header {
    height: 300px;
  }

  .event-name {
    font-size: 24px;
  }

  .event-info {
    margin: 25px;
  }

  .section-title {
    font-size: 20px;
    padding: 25px;
  }

  .venue-section,
  .seatmap-section {
    margin: 25px;
  }

  .venue-info {
    padding: 0 25px;
  }

  .seatmap-container {
    padding: 25px;
  }

  .action-section {
    padding: 25px;
  }

  .buy-button,
  .share-button {
    height: 56px;
    font-size: 18px;
  }
}
</style>
