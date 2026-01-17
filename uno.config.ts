import { defineConfig, presetUno, presetIcons, presetWebFonts, transformerDirectives } from 'unocss'

export default defineConfig({
  presets: [
    // 默认原子化 CSS 预设
    presetUno(),
    // 图标预设
    presetIcons({
      cdn: 'https://esm.sh/',
    }),
    // Web 字体预设
    presetWebFonts({
      fonts: {
        sans: 'Inter:400,500,600,700',
      },
    }),
  ],
  transformers: [
    transformerDirectives(),
  ],
  theme: {
    colors: {
      // 自定义主题色
      primary: '#ff3366',
      'primary-light': '#ff6699',
      'primary-dark': '#cc2952',
      secondary: '#6633ff',
      success: '#33cc66',
      warning: '#ff9933',
      danger: '#ff3333',
    },
    boxShadow: {
      'card': '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
      'card-hover': '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    },
  },
  shortcuts: {
    // 按钮快捷类
    'btn-primary': 'bg-primary text-white rounded-2xl px-4 py-2 font-medium shadow-sm hover:shadow-md active:shadow-none disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none',
    'btn-secondary': 'bg-gray-100 text-gray-700 rounded-2xl px-4 py-2 font-medium shadow-sm hover:bg-gray-200 hover:shadow-md hover:-translate-y-0.5 active:shadow-none disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 focus:outline-none',
    'btn-ghost': 'text-gray-600 rounded-xl p-2 hover:text-gray-900 focus:outline-none flex items-center justify-center',

    // 卡片快捷类
    'card': 'bg-white rounded-2xl shadow-sm transition-all duration-200',
    'card-hover': 'hover:shadow-md hover:-translate-y-1',

    // 输入框快捷类 - 移除默认 border，使用更现代的样式
    'input': 'flex-1 rounded-xl px-3 py-2 text-gray-900 border placeholder-gray-400 focus:outline-none',

    // 状态快捷类
    'badge': 'inline-flex items-center rounded-full text-xs font-medium',
    'icon-animate': 'transition-transform duration-200 hover:scale-110 active:scale-95 inline-flex',
  },
  rules: [
    // 自定义动画规则
    [
      /^animate-slide-in-(\d+)$/,
      ([, d]) => ({
        animation: `slideIn ${d}ms ease-out forwards`,
      }),
    ],
  ],
})
