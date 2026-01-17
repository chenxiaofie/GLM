<template>
  <div class="profile-view">
    <!-- 导航栏 -->
    <van-nav-bar
      title="我的"
      class="nav-bar"
    />

    <!-- 用户信息 -->
    <div class="user-info">
      <div class="avatar-section">
        <van-image
          :src="userInfo.avatar"
          round
          width="80"
          height="80"
          class="avatar"
        />
        <div class="user-details">
          <h2 class="username">{{ userInfo.name }}</h2>
          <p class="email">{{ userInfo.email }}</p>
        </div>
      </div>
      <van-button type="primary" size="small" class="edit-button">
        编辑资料
      </van-button>
    </div>

    <!-- 功能菜单 -->
    <div class="function-menu">
      <van-cell-group inset>
        <van-cell title="我的收藏" icon="star-o" is-link @click="handleFavorites">
          <template #right-icon>
            <van-badge :content="userInfo.favoritesCount" />
          </template>
        </van-cell>
        <van-cell title="我的订单" icon="credit-card" is-link @click="handleOrders">
          <template #right-icon>
            <van-badge :content="userInfo.ordersCount" />
          </template>
        </van-cell>
        <van-cell title="我的浏览" icon="eye-o" is-link @click="handleHistory">
          <template #right-icon>
            <van-badge :content="userInfo.historyCount" />
          </template>
        </van-cell>
        <van-cell title="我的评论" icon="comment-o" is-link @click="handleComments">
          <template #right-icon>
            <van-badge :content="userInfo.commentsCount" />
          </template>
        </van-cell>
      </van-cell-group>
    </div>

    <!-- 系统设置 -->
    <div class="system-settings">
      <van-cell-group inset>
        <van-cell title="通知设置" icon="bell" is-link @click="handleNotifications">
          <template #right-icon>
            <van-switch v-model="notificationSettings.enabled" size="18" />
          </template>
        </van-cell>
        <van-cell title="推送通知" icon="mobile-o" is-link @click="handlePushNotifications">
          <template #right-icon>
            <van-switch v-model="notificationSettings.push" size="18" />
          </template>
        </van-cell>
        <van-cell title="震动提醒" icon="volume-o" is-link @click="handleVibration">
          <template #right-icon>
            <van-switch v-model="notificationSettings.vibration" size="18" />
          </template>
        </van-cell>
      </van-cell-group>
    </div>

    <!-- 关于 -->
    <div class="about-section">
      <van-cell-group inset>
        <van-cell title="关于应用" icon="info-o" is-link @click="handleAbout" />
        <van-cell title="版本号" icon="code-o" is-link @click="handleVersion">
          <template #label>
            <span class="version">{{ appVersion }}</span>
          </template>
        </van-cell>
        <van-cell title="帮助中心" icon="question-o" is-link @click="handleHelp" />
        <van-cell title="意见反馈" icon="chat-o" is-link @click="handleFeedback" />
      </van-cell-group>
    </div>

    <!-- 退出登录 -->
    <div class="logout-section">
      <van-button type="danger" size="large" block class="logout-button" @click="handleLogout">
        退出登录
      </van-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { showDialog, showToast } from 'vant'

// 用户信息
const userInfo = reactive({
  name: '张三',
  email: 'zhangsan@example.com',
  avatar: 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg',
  favoritesCount: 3,
  ordersCount: 0,
  historyCount: 12,
  commentsCount: 5
})

// 应用版本
const appVersion = '1.0.0'

// 通知设置
const notificationSettings = reactive({
  enabled: true,
  push: true,
  vibration: false
})

/**
 * 处理收藏
 */
const handleFavorites = () => {
  showToast('查看收藏功能开发中...')
}

/**
 * 处理订单
 */
const handleOrders = () => {
  showToast('查看订单功能开发中...')
}

/**
 * 处理浏览历史
 */
const handleHistory = () => {
  showToast('查看浏览历史功能开发中...')
}

/**
 * 处理评论
 */
const handleComments = () => {
  showToast('查看评论功能开发中...')
}

/**
 * 处理通知设置
 */
const handleNotifications = () => {
  showToast(notificationSettings.enabled ? '通知已开启' : '通知已关闭')
}

/**
 * 处理推送通知
 */
const handlePushNotifications = () => {
  showToast(notificationSettings.push ? '推送通知已开启' : '推送通知已关闭')
}

/**
 * 处理震动提醒
 */
const handleVibration = () => {
  showToast(notificationSettings.vibration ? '震动提醒已开启' : '震动提醒已关闭')
}

/**
 * 处理关于
 */
const handleAbout = () => {
  showDialog({
    title: '关于活动查询',
    message: '这是一个基于 Ticketmaster API 的活动查询应用\n\n© 2025 活动查询'
  })
}

/**
 * 处理版本号
 */
const handleVersion = () => {
  showToast(`当前版本: ${appVersion}`)
}

/**
 * 处理帮助
 */
const handleHelp = () => {
  showToast('帮助中心功能开发中...')
}

/**
 * 处理反馈
 */
const handleFeedback = () => {
  showToast('意见反馈功能开发中...')
}

/**
 * 处理退出登录
 */
const handleLogout = () => {
  showDialog({
    title: '确认退出',
    message: '确定要退出登录吗？'
  }).then(() => {
    // 这里可以添加退出登录逻辑
    showToast('已退出登录')
  }).catch(() => {
    // 用户取消
  })
}
</script>

<style scoped>
.profile-view {
  min-height: 100vh;
  background: #f5f5f5;
  padding-bottom: 20px;
}

.nav-bar {
  background: #1989fa;
}

.nav-bar :deep(.van-nav-bar__title) {
  color: #fff;
}

.user-info {
  background: #fff;
  padding: 20px;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.avatar-section {
  display: flex;
  align-items: center;
  gap: 15px;
}

.avatar {
  border: 2px solid #f0f0f0;
}

.user-details {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.username {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin: 0;
}

.email {
  font-size: 14px;
  color: #666;
  margin: 0;
}

.edit-button {
  min-width: 80px;
}

.function-menu,
.system-settings,
.about-section {
  margin-bottom: 10px;
}

:deep(.van-cell-group) {
  margin: 0 15px;
}

.version {
  font-size: 14px;
  color: #666;
}

.logout-section {
  padding: 0 15px;
  margin-top: 20px;
}

.logout-button {
  background: #f56c6c;
  border: none;
}
</style>
