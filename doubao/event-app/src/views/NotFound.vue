<template>
  <div class="not-found">
    <div class="container">
      <van-empty
        description="页面不存在"
        image="search"
        class="empty-component"
      />
      <div class="actions">
        <van-button type="primary" size="large" @click="handleGoHome">
          返回首页
        </van-button>
        <van-button type="default" size="large" @click="handleGoBack">
          返回上一页
        </van-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

/**
 * 返回首页
 */
const handleGoHome = () => {
  router.push('/')
}

/**
 * 返回上一页
 */
const handleGoBack = () => {
  if (window.history.length > 1) {
    router.back()
  } else {
    router.push('/')
  }
}
</script>

<style scoped>
.not-found {
  min-height: 100vh;
  background: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.container {
  width: 100%;
  max-width: 400px;
  background: #fff;
  border-radius: 12px;
  padding: 40px 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.empty-component {
  margin-bottom: 30px;
}

.actions {
  display: flex;
  gap: 12px;
  justify-content: center;
}

:deep(.van-button) {
  min-width: 120px;
}
</style>
