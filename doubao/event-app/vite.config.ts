import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import legacy from '@vitejs/plugin-legacy'
import autoprefixer from 'autoprefixer'
import pxtorem from 'postcss-pxtorem'

export default defineConfig(({ mode }) => {
  const isTest = mode === 'test'

  return {
  // 开发服务器配置
  server: {
    port: 3000,
    open: true
  },

  // 构建配置
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'terser',
    chunkSizeWarningLimit: 1000
  },

  // 插件配置
  plugins: [
    vue(),
    vueJsx(),
    legacy({
      targets: ['defaults', 'not IE 11']
    })
  ],

  // CSS 预处理器配置
  css: {
    postcss: {
      plugins: [
        autoprefixer({
          overrideBrowserslist: [
            'Android 4.1',
            'iOS 7.1',
            'Chrome > 31',
            'ff > 31',
            'ie >= 8'
          ]
        }),
        pxtorem({
          rootValue: 20,
          propList: ['*'],
          selectorBlackList: ['.norem']
        })
      ]
    }
  },

  // 路径别名配置
  resolve: {
    alias: {
      '@': '/src'
    }
  },

  // 测试配置
  test: isTest ? {
    globals: true,
    environment: 'jsdom',
    deps: {
      inline: ['vant']
    },
    setupFiles: './src/__tests__/setup.ts'
  } : undefined
  }
})
