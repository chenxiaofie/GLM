/**
 * 应用入口文件
 */
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

import 'uno.css'
import './style.css'
import { i18n } from './i18n/cn'

// 创建 Pinia 实例
const pinia = createPinia()

// 创建 Vue 应用实例
const app = createApp(App)


// 注册插件
app.use(pinia)
app.use(router)
app.use(i18n)
// 挂载应用
app.mount('#app')
