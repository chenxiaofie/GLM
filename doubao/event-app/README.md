# 移动端活动查询应用

一个基于 Vue 3 + TypeScript + Vite + Vant 的移动端活动查询应用，使用 Ticketmaster API 提供活动搜索和详情查看功能。

## ✨ 功能特性

### 1. 首页 - 活动列表
- **列表/网格视图**：支持切换查看模式
- **分页加载**：加载更多功能
- **分类筛选**：按全部、音乐、体育、艺术等分类
- **搜索功能**：全局搜索和分类搜索
- **响应式设计**：适配不同屏幕尺寸

### 2. 详情页 - 活动详情
- **活动信息**：名称、日期、类型、价格、状态
- **场地信息**：场馆名称、地址、位置
- **座位图**：如果有座位图
- **行动按钮**：立即购票、分享功能

### 3. 搜索页面
- **搜索功能**：实时搜索建议
- **搜索历史**：本地存储搜索历史
- **热门搜索**：推荐热门搜索关键词
- **搜索结果**：展示匹配的活动列表

### 4. 日历页面
- **日历视图**：月份视图选择日期
- **日期标记**：有活动的日期会标记
- **当天活动**：点击日期查看当天活动
- **快速导航**：支持月份切换

### 5. 个人中心
- **用户信息**：头像、昵称、邮箱
- **功能菜单**：我的收藏、订单、浏览、评论
- **系统设置**：通知、推送、震动提醒
- **关于应用**：版本信息、帮助中心、意见反馈

## 🛠️ 技术栈

- **框架**：Vue 3 (Composition API)
- **语言**：TypeScript
- **构建工具**：Vite
- **路由**：Vue Router 4
- **状态管理**：Pinia
- **UI 组件**：Vant 4 (移动端 UI 组件库)
- **HTTP 通信**：Axios
- **API**：Ticketmaster Discovery API

## 📦 依赖库

### 核心依赖
- `vue`: Vue 3 框架
- `vue-router`: 路由管理
- `pinia`: 状态管理
- `axios`: HTTP 请求
- `vant`: 移动端 UI 组件库

### 开发依赖
- `vite`: 构建工具
- `@vitejs/plugin-vue`: Vite Vue 插件
- `@vitejs/plugin-vue-jsx`: Vue JSX 支持
- `@vitejs/plugin-legacy`: 旧浏览器支持
- `typescript`: 类型检查
- `vue-tsc`: Vue TypeScript 检查
- `autoprefixer`: CSS 前缀自动添加
- `postcss-pxtorem`: 像素转 rem
- `eslint`: 代码检查
- `prettier`: 代码格式化
- `vitest`: 测试框架
- `@vue/test-utils`: Vue 组件测试工具
- `jsdom`: DOM 模拟环境

## 📂 项目结构

```
src/
├── api/              # API 接口定义
│   ├── config.ts     # API 配置
│   └── index.ts      # API 接口函数
├── assets/           # 静态资源
│   ├── images/       # 图片资源
│   └── styles/       # 全局样式
├── components/       # 通用组件
│   ├── EventList.vue     # 活动列表组件
│   └── EventDetail.vue   # 活动详情组件
├── router/           # 路由配置
│   └── index.ts
├── store/            # 状态管理 (Pinia)
│   └── index.ts
├── types/            # TypeScript 类型定义
│   └── index.ts
├── utils/            # 工具函数
│   └── index.ts
├── views/            # 页面组件
│   ├── Home.vue         # 首页
│   ├── EventDetail.vue  # 活动详情页
│   ├── Search.vue       # 搜索页
│   ├── Calendar.vue     # 日历页
│   ├── Profile.vue      # 个人中心
│   └── NotFound.vue     # 404 页面
├── __tests__/        # 测试文件
│   ├── utils.test.ts     # 工具函数测试
│   ├── EventList.test.ts # 活动列表组件测试
│   ├── EventDetail.test.ts # 活动详情组件测试
│   └── setup.ts         # 测试设置文件
├── App.vue           # 根组件
├── main.ts           # 应用入口
└── style.css         # 全局样式

public/               # 公共资源
.env                  # 环境变量
.env.example          # 环境变量示例
vite.config.ts        # Vite 配置
package.json          # 项目配置
tsconfig.json         # TypeScript 配置
.eslintrc.cjs         # ESLint 配置
.prettierrc           # Prettier 配置
```

## 🚀 快速开始

### 1. 环境准备

确保你已经安装了 Node.js 16+ 版本。

### 2. 安装依赖

```bash
npm install
```

### 3. 配置环境变量

复制 `.env.example` 并创建 `.env` 文件：

```bash
cp .env.example .env
```

在 `.env` 文件中配置你的 Ticketmaster API Key：

```
VITE_TICKETMASTER_API_KEY=YOUR_API_KEY_HERE
```

**获取 API Key：**
1. 访问 [Ticketmaster Developer Portal](https://developer.ticketmaster.com/)
2. 注册账号
3. 创建应用
4. 获取 API Key

### 4. 开发模式

启动开发服务器：

```bash
npm run dev
```

应用将在 `http://localhost:3000` 启动。

### 5. 生产构建

构建生产版本：

```bash
npm run build
```

构建产物将输出到 `dist` 目录。

### 6. 预览构建结果

```bash
npm run preview
```

### 7. 运行测试

```bash
# 运行单元测试
npm run test:run

# 运行测试并生成覆盖率报告
npm run test:coverage

# 监听模式运行测试
npm run test
```

## 🔧 配置说明

### Vite 配置

```typescript
// vite.config.ts
export default defineConfig({
  server: {
    port: 3000,
    open: true
  },
  css: {
    postcss: {
      plugins: [
        autoprefixer(),
        pxtorem({ rootValue: 37.5 }) // 设计稿宽度 375px
      ]
    }
  },
  resolve: {
    alias: {
      '@': '/src' // 路径别名
    }
  }
})
```

### 移动端适配

项目使用 `postcss-pxtorem` 进行移动端适配，设计稿基准宽度为 375px。

### 状态管理

使用 Pinia 进行状态管理，分为：
- `appStore`: 应用全局状态
- `eventStore`: 活动搜索状态
- `eventDetailStore`: 活动详情状态

## 📝 API 接口

### 主要接口

```typescript
// 搜索活动
searchEvents(params: SearchParams): Promise<EventsResponse>

// 获取活动详情
getEventDetail(id: string): Promise<{ _embedded: { events: Event[] } }>

// 获取活动分类
getCategories(): Promise<any>

// 搜索建议
getSearchSuggestions(keyword: string): Promise<any>
```

### 搜索参数

```typescript
interface SearchParams {
  keyword?: string      // 搜索关键词
  category?: string     // 分类
  city?: string         // 城市
  startDate?: string    // 开始日期
  endDate?: string      // 结束日期
  page?: number         // 页码
  size?: number         // 每页大小
}
```

## 🌟 代码规范

### ESLint 配置

- 使用 Vue 3 推荐规则
- TypeScript 推荐规则
- Prettier 格式化

### 开发规范

- 使用 Composition API
- 组件命名使用 PascalCase
- 文件命名使用 kebab-case
- 变量命名语义化
- 关键代码添加注释

## 📱 功能演示

### 首页
- 列表视图和网格视图切换
- 下拉刷新和上拉加载
- 搜索框和分类筛选

### 详情页
- 活动信息展示
- 场地地图
- 座位图
- 购票和分享按钮

### 搜索页
- 实时搜索
- 搜索历史
- 热门搜索
- 搜索结果列表

### 日历页
- 月份视图
- 日期标记
- 当天活动

### 个人中心
- 用户信息
- 功能菜单
- 系统设置
- 关于应用

## 🤝 贡献指南

1. Fork 项目
2. 创建功能分支
3. 提交更改
4. 推送到分支
5. 创建 Pull Request

## 📄 许可证

MIT License

## 📞 联系方式

如有问题或建议，请提交 Issue 或联系开发团队。
