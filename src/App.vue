/**
 * 根组件
 */
<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <!-- 路由视图容器 -->
  <div class="min-h-screen bg-gray-50">
    <RouterView />
  </div>
</template>
