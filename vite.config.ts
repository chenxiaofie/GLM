import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import viteCompression from 'vite-plugin-compression'
import fs from 'node:fs'
import path from 'node:path'

// https://vite.dev/config/
// 检查是否正在构建 Android（通过检查 .building-android 文件）
const isAndroidBuild = fs.existsSync(path.resolve('.building-android'))

export default defineConfig({
  plugins: [
    vue(),
    UnoCSS(),
    // Gzip 压缩 (仅在构建 Web 时启用，构建 Android 时禁用以避免重复资源错误)
    viteCompression({
      verbose: true,
      disable: isAndroidBuild,
      threshold: 10240,
      algorithm: 'gzip',
      ext: '.gz',
    }),
  ],
  build: {
    // 代码分割
    rollupOptions: {
      output: {
        manualChunks: {
          'vue-vendor': ['vue', 'vue-router', 'pinia'],
          'axios': ['axios'],
          'dayjs': ['dayjs'],
        },
      },
    },
    // 压缩
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    // 生成 source map
    sourcemap: false,
    // chunk 大小警告阈值
    chunkSizeWarningLimit: 1000,
  },
  // 依赖预构建
  optimizeDeps: {
    include: ['vue', 'vue-router', 'pinia', 'axios', 'dayjs'],
  },
})
