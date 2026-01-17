import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import Vant from 'vant'
import 'vant/lib/index.css'

// 创建应用实例
const app = createApp(App)

// 安装 Pinia 状态管理
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(pinia)

// 安装路由
app.use(router)

// 安装 Vant UI 组件库
app.use(Vant)

// 挂载应用
app.mount('#app')
