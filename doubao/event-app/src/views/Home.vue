<template>
  <div class="home">
    <!-- 导航栏 -->
    <transition name="fade">
      <van-nav-bar
        title="活动查询"
        class="nav-bar"
      >
        <template #right>
          <van-icon name="search" size="18" @click="handleSearch" />
        </template>
      </van-nav-bar>
    </transition>

    <!-- 搜索栏 -->
    <transition name="slide-down">
      <div class="search-section">
        <van-search
          v-model="searchKeyword"
          placeholder="搜索活动..."
          @search="handleSearch"
          @clear="handleClear"
        />
      </div>
    </transition>

    <!-- 分类筛选 -->
    <transition name="slide-up">
      <div class="filter-section">
        <van-tabs v-model:active="activeTab" type="card">
          <van-tab title="全部">
            <EventList ref="eventListRef" />
          </van-tab>
          <van-tab title="音乐">
            <EventList ref="musicListRef" />
          </van-tab>
          <van-tab title="体育">
            <EventList ref="sportsListRef" />
          </van-tab>
          <van-tab title="艺术">
            <EventList ref="artsListRef" />
          </van-tab>
        </van-tabs>
      </div>
    </transition>

    <!-- 视图切换 -->
    <div class="view-toggle">
      <van-button
        :type="viewMode === 'list' ? 'primary' : 'default'"
        size="small"
        @click="viewMode = 'list'"
      >
        列表
      </van-button>
      <van-button
        :type="viewMode === 'grid' ? 'primary' : 'default'"
        size="small"
        @click="viewMode = 'grid'"
      >
        网格
      </van-button>
    </div>

    <!-- 底部导航 -->
    <van-tabbar v-model="activeTabbar" safe-area-inset-bottom>
      <van-tabbar-item icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item icon="search">搜索</van-tabbar-item>
      <van-tabbar-item icon="calendar">日历</van-tabbar-item>
      <van-tabbar-item icon="manager-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import EventList from '@/components/EventList.vue'
import { useAppStore, useEventStore } from '@/store'

const appStore = useAppStore()
const eventStore = useEventStore()

// 搜索关键词
const searchKeyword = ref('')

// 活跃标签
const activeTab = ref(0)

// 活跃底部导航
const activeTabbar = ref(0)

// 视图模式
const viewMode = ref<'list' | 'grid'>('list')

/**
 * 页面加载时获取数据
 */
onMounted(() => {
  eventStore.getCategories()
  eventStore.searchEvents({})
})

/**
 * 监听标签切换
 */
watch(activeTab, (newVal) => {
  // 根据标签索引获取对应的分类ID
  const categoryMap: Record<number, string> = {
    0: '', // 全部
    1: 'KZFzniwnSyZfZ7v7nJ', // 音乐
    2: 'KZFzniwnSyZfZ7v7nE', // 体育
    3: 'KZFzniwnSyZfZ7v7na' // 艺术
  }

  // 搜索对应分类的活动
  eventStore.searchEvents({
    category: categoryMap[newVal]
  })
})

/**
 * 处理搜索
 */
const handleSearch = () => {
  if (!searchKeyword.value.trim()) {
    return
  }

  // 添加到搜索历史
  appStore.addSearchHistory(searchKeyword.value.trim())

  // 搜索活动
  eventStore.searchEvents({
    keyword: searchKeyword.value.trim()
  })
}

/**
 * 处理清空搜索
 */
const handleClear = () => {
  searchKeyword.value = ''
  // 重新加载全部活动
  eventStore.searchEvents({})
}

</script>

<style scoped>
.home {
  min-height: 100vh;
  background: #f5f5f5;
}

.nav-bar {
  background: #1989fa;
}

.nav-bar :deep(.van-nav-bar__title) {
  color: #fff;
}

.nav-bar :deep(.van-icon) {
  color: #fff;
}

.search-section {
  padding: 10px;
  background: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.filter-section {
  padding: 10px;
}

.view-toggle {
  display: flex;
  justify-content: flex-end;
  padding: 0 10px 10px;
  gap: 8px;
}

/* 标签栏样式 */
:deep(.van-tabs__nav) {
  position: relative;
  border-bottom: 1px solid #f0f0f0;
}

:deep(.van-tabs__line) {
  bottom: 0;
  height: 2px;
  background-color: #1989fa;
}

:deep(.van-tab__pane) {
  min-height: calc(100vh - 300px);
}

/* 响应式设计 */
@media (max-width: 375px) {
  .search-section {
    padding: 8px;
  }

  .filter-section {
    padding: 8px;
  }

  .view-toggle {
    padding: 0 8px 8px;
  }

  .view-toggle button {
    font-size: 12px;
    padding: 4px 8px;
  }
}

@media (min-width: 768px) {
  .home {
    max-width: 768px;
    margin: 0 auto;
  }

  .search-section {
    padding: 15px;
  }

  .filter-section {
    padding: 15px;
  }

  .view-toggle {
    padding: 0 15px 15px;
  }

  .view-toggle button {
    font-size: 14px;
    padding: 6px 12px;
  }
}

@media (min-width: 1024px) {
  .home {
    max-width: 900px;
  }

  .search-section {
    padding: 20px;
  }

  .filter-section {
    padding: 20px;
  }

  .view-toggle {
    padding: 0 20px 20px;
  }

  .view-toggle button {
    font-size: 15px;
    padding: 8px 16px;
  }
}
</style>
