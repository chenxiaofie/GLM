# Event Discovery

基于 Ticketmaster API 的活动发现应用，使用 Vue 3、TypeScript、Vite 和 UnoCSS 构建。

## 功能特性

- 活动列表展示（列表/网格视图切换）
- 活动详情查看
- 搜索功能
- 分页加载
- 响应式设计
- 平滑的动画和过渡效果
- 完整的加载和错误状态处理

## 技术栈

- **框架**: Vue 3.5 (Composition API)
- **语言**: TypeScript 5.9
- **构建工具**: Vite 7.2
- **路由**: Vue Router 4.6
- **状态管理**: Pinia 3.0
- **HTTP 客户端**: Axios 1.13
- **日期处理**: Day.js 1.11
- **样式**: UnoCSS (原子化 CSS)
- **测试**: Vitest + @vue/test-utils
- **移动端打包**: Capacitor 6.1

## 项目结构

```
.
├── src/
│   ├── api/              # API 接口层
│   │   ├── client.ts     # Axios 客户端配置
│   │   ├── events.ts     # 活动相关 API
│   │   └── types.ts     # TypeScript 类型定义
│   ├── assets/           # 静态资源
│   ├── components/       # 通用组件
│   ├── composables/      # Vue 组合式函数
│   ├── router/           # 路由配置
│   │   └── index.ts
│   ├── stores/           # Pinia 状态管理
│   │   └── event.ts     # 活动状态 store
│   ├── views/            # 页面组件
│   │   ├── Home.vue      # 首页（活动列表）
│   │   ├── Detail.vue    # 活动详情页
│   │   └── NotFound.vue # 404 页面
│   ├── App.vue           # 根组件
│   ├── main.ts           # 应用入口
│   └── style.css         # 全局样式
├── android/              # Android 原生代码（Capacitor）
├── .env.example          # 环境变量示例
├── capacitor.config.ts    # Capacitor 配置
├── .git
├── .gitignore
├── package.json
├── tsconfig.json
├── vite.config.ts
├── uno.config.ts
├── vitest.config.ts      # 测试配置
└── README.md
```

## 快速开始

### 环境要求

- Node.js 18+
- npm 或 pnpm

### 安装依赖

```bash
npm install
```

### 配置环境变量

复制 `.env.example` 文件为 `.env`，并填入你的 Ticketmaster API Key：

```env
VITE_TICKETMASTER_API_KEY=your_api_key_here
VITE_TICKETMASTER_API_BASE_URL=https://app.ticketmaster.com/discovery/v2
VITE_APP_TITLE=Event Discovery
VITE_APP_DEFAULT_PAGE_SIZE=20
```

### 获取 Ticketmaster API Key

1. 访问 [Ticketmaster Developer Portal](https://developer.ticketmaster.com/)
2. 注册账户并创建应用
3. 获取 API Key

### 运行开发服务器

```bash
npm run dev
```

访问 http://localhost:5173 查看应用。

### 构建生产版本

```bash
npm run build
```

### 预览生产构建

```bash
npm run preview
```

## 运行测试

```bash
# 运行所有测试
npm run test

# 运行测试（一次性）
npm run test:run

# 运行测试 UI（需要安装 @vitest/ui）
npm run test:ui
```

## Android 打包

项目已配置使用 Capacitor 打包成 Android APK。

### 初始化 Capacitor

首次打包前需要初始化 Capacitor（只需执行一次）：

```bash
npm run cap:init
```

### 添加 Android 平台

添加 Android平台支持：

```bash
npm run cap:add:android
```

### 构建 Android APK

一键构建生产版本 APK：

```bash
npm run android:build
```

构建完成后，APK 文件位于 `android/app/build/outputs/apk/debug/` 目录下。

### 调试 Android 应用

在连接的 Android 设备或模拟器上运行：

```bash
npm run android:debug
```

### 使用 Android Studio

在 Android Studio 中打开项目：

```bash
npm run cap:open:android
```

### 分步构建

如果需要分步操作：

```bash
# 1. 构建 Web 应用
npm run build

# 2. 同步到原生平台
npm run cap:sync

# 3. 构建 APK
npm run cap:build:android
```

## 部署建议

### 1. Web 部署

#### Vercel

1. 连接 GitHub 仓库到 Vercel
2. 配置构建命令：`npm run build`
3. 配置输出目录：`dist`
4. 在 Vercel 环境变量中添加 `VITE_TICKETMASTER_API_KEY`

#### Netlify

1. 连接 GitHub 仓库到 Netlify
2. 配置构建命令：`npm run build`
3. 配置发布目录：`dist`
4. 在 Netlify 环境变量中添加 `VITE_TICKETMASTER_API_KEY`

#### 静态文件服务器

```bash
# 构建后，将 dist 目录部署到任何静态文件服务器
npm run build
# 然后将 dist/ 目录上传到服务器
```

### 2. Android APK 分发

#### 直接分发

构建完成后，直接分享 `app-debug.apk` 文件。

#### Google Play Store

1. 签名配置：
   - 在 `capacitor.config.ts` 中设置 `signingType`
   - 或在 Android Studio 中配置签名

2. 构建 Release APK/AAB：
   ```bash
   npx cap build android --release
   ```

3. 上传到 Google Play Console

#### 第三方应用商店

- Firebase App Distribution
- TestFlight (iOS)
- 蒲公英
- 腾讯云移动应用推送

## API 说明

### 获取活动列表

```
GET /events.json
```

### 获取活动详情

```
GET /events/{eventId}.json
```

### 搜索活动

```
GET /events.json?keyword={keyword}
```

## 主要功能

### 1. 活动列表页

- 展示活动列表
- 支持列表和网格视图切换
- 搜索功能
- 分页加载更多
- 响应式布局（移动端 2 列，平板 3 列，桌面 4 列）

### 2. 活动详情页

- 显示活动完整信息
- 活动图片（带加载动画）
- 日期时间
- 场地信息
- 价格范围
- 跳转到官方购票页面

### 3. 状态管理

使用 Pinia 管理应用状态：

- `events` - 活动列表
- `currentEvent` - 当前活动详情
- `loading` - 加载状态
- `error` - 错误信息
- `page` - 分页信息
- `searchKeyword` - 搜索关键词

## 打包优化

### Vite 配置优化

- 代码分割（Vue、Axios、Day.js 分离）
- Gzip 压缩
- Terser 压缩（移除 console 和 debugger）
- CSS 代码分割
- 依赖预构建

### 预期包体积

- 打包后 dist 目录通常小于 500KB（gzipped）
- Android APK 约 3-5MB

## 样式系统

### 主题颜色

```css
--color-primary: #ff3366;
--color-secondary: #6633ff;
--color-success: #33cc66;
--color-warning: #ff9933;
--color-danger: #ff3333;
```

### UnoCSS 快捷类

```vue
<!-- 按钮 -->
<button class="btn-primary">主按钮</button>
<button class="btn-secondary">次按钮</button>
<button class="btn-ghost">幽灵按钮</button>

<!-- 卡片 -->
<div class="card">卡片内容</div>
<div class="card card-hover">带 hover 效果的卡片</div>

<!-- 输入框 -->
<input class="input" placeholder="请输入..." />

<!-- 徽章 -->
<span class="badge">标签</span>
```

## 浏览器支持

- Chrome (推荐)
- Firefox
- Safari
- Edge

## 开发规范

### 代码风格

- 使用 TypeScript 编写所有代码
- 遵循 ESLint 规则
- 使用 Prettier 格式化代码
- 组件使用 Composition API

### 提交规范

遵循 [Conventional Commits](https://www.conventionalcommits.org/)：

```
feat: 新功能
fix: 修复 bug
docs: 文档更新
style: 代码格式调整
refactor: 重构代码
test: 测试相关
chore: 构建/工具相关
```

## 许可证

MIT

## 贡献

欢迎提交 Issue 和 Pull Request！
