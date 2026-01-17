/**
 * 404 页面
 */
<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const goHome = () => {
  router.push('/')
}
</script>

<template>
  <div class="flex h-screen flex-col items-center justify-center bg-gray-50 px-6 text-center">
    <div class="mb-4">
      <span class="text-8xl font-bold text-primary">404</span>
    </div>
    <h1 class="mb-2 text-2xl font-semibold text-gray-800">
      页面未找到
    </h1>
    <p class="mb-6 text-gray-600">
      抱歉，您访问的页面不存在
    </p>
    <button
      class="rounded-lg bg-primary px-6 py-2 text-white transition-colors hover:bg-primary/80"
      @click="goHome"
    >
      返回首页
    </button>
  </div>
</template>
