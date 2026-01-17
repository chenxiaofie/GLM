/**
 * 路由配置
 */
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

// 路由配置
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
    meta: {
      title: '活动列表',
    },
  },
  {
    path: '/event/:id',
    name: 'Detail',
    component: () => import('../views/Detail.vue'),
    props: true,
    meta: {
      title: '活动详情',
    },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('../views/NotFound.vue'),
    meta: {
      title: '页面未找到',
    },
  },
]

// 创建路由实例
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(_to, _from, savedPosition) {
    // 返回滚动到顶部或保存的位置
    return savedPosition || { top: 0 }
  },
})

// 全局前置守卫 - 设置页面标题
router.beforeEach((to, _from, next) => {
  const pageTitle = to.meta.title as string
  if (pageTitle) {
    document.title = `${pageTitle} - ${import.meta.env.VITE_APP_TITLE || 'Event Discovery'}`
  }
  next()
})

export default router
