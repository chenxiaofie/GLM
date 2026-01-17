<template>
  <div class="event-detail-view">
    <!-- 导航栏 -->
    <van-nav-bar
      title="活动详情"
      left-arrow
      class="nav-bar"
      @click-left="handleBack"
    />

    <!-- 活动详情组件 -->
    <EventDetail />
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import EventDetail from '@/components/EventDetail.vue'

const router = useRouter()

/**
 * 返回上一页
 */
const handleBack = () => {
  if (window.history.length > 1) {
    router.back()
  } else {
    router.push('/')
  }
}
</script>

<style scoped>
.event-detail-view {
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
</style>
