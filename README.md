# Aperture — 摄影艺术与视觉叙事企业官网

<p align="center">
  <img src="https://img.shields.io/badge/Nuxt-4.6.0-00DC82?style=flat-square&logo=nuxt.js" alt="Nuxt 4" />
  <img src="https://img.shields.io/badge/TailwindCSS-4.3.3-38B2AC?style=flat-square&logo=tailwind-css" alt="Tailwind CSS v4" />
  <img src="https://img.shields.io/badge/Vue-3.5+-4FC08D?style=flat-square&logo=vuedotjs" alt="Vue 3" />
  <img src="https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat-square&logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/License-MIT-blue?style=flat-square" alt="License" />
</p>

> **Aperture** 是一套基于 **Nuxt 4 + Tailwind CSS v4 + TypeScript + Vue 3** 打造的高美学商业摄影与视觉叙事企业官网实战项目。具备全响应式流体布局、多主题与深色模式无缝切换、SSR 服务端渲染优化、模块化数据驱动及细腻视口动效等现代企业级前端能力。

---

## ✨ 核心特性

- 🎨 **Tailwind CSS v4 现代化架构**：
  - 采用全新的 CSS-First `@theme` 指令与 `@tailwindcss/vite` 插件集成。
  - 构建完整的**语义化设计令牌系统**（`canvas`、`surface`、`card`、`line`、`main`、`accent` 等），彻底告别散落的硬编码颜色。
  - 支持 **5 套精选艺术级主题配色**（经典暖金、黑曜石暗房 Obsidian、翡翠纪实 Emerald、蔚蓝海相 Ocean、极光暮紫 Violet）。
- 🌓 **深度集成深色模式**：
  - 结合 `@nuxtjs/color-mode`，支持跟随系统与手动自由切换。
  - 全局平滑过渡动画，深浅色自适应对比度友好。
- ⚡ **Nuxt 4 企业级规范结构**：
  - 标准 `app/` 组织结构（`pages`、`components`、`layouts`、`composables`、`assets`）。
  - 组件自动导入（`pathPrefix: false`），开发体验如丝般顺滑。
  - 路由与多布局支持，内置全局顶部进度提示与 404/错误自愈页面。
- 🧩 **全功能业务模块 & 丰富组件库**：
  - **16+ 个首页业务 Section**：Hero 沉浸巨幕、品牌看板、核心服务、专业特色、商店专区、大师班、客户故事、口碑评价、主创团队、历程、定价方案、FAQ 手风琴、动态资讯、合作表单、伙伴 Logo 墙等。
  - **多维度内页系统**：
    - 📖 **关于我们 (`/about`)**：品牌理念与视觉工作室环境展示。
    - 🛍️ **摄影商店 (`/products`)**：调色预设与画册分类筛选、翻页分页组件；商品详情页（`/products/:id`）规格参数、核心卖点与相关推荐。
    - 🎓 **课程体系 (`/courses`)**：大师工作坊列表与课程大纲详情页（`/courses/:id`）。
    - 📰 **新闻动态 (`/news`)**：行业观察与影展资讯分类归档；详情页（`/news/:id`）富文本排版与上下文上/下一篇导航。
  - **通用原子 UI 组件库**：按钮（Button）、卡片（Card）、模态框（Modal）、标签页（Tabs）、徽章（Badge）、分页器（Pagination）、输入表单（Input/Textarea/Select）、面包屑（Breadcrumb）、回到顶部（BackToTop）、侧边悬浮工具栏（SideToolbar）。
- 💫 **前沿交互与性能**：
  - `IntersectionObserver` 驱动的视口滚动淡入动画（`animate-on-scroll`）。
  - CSS Keyframe 驱动的无级无限平滑跑马灯（Marquee）。
  - 原生图片懒加载（`loading="lazy"`）与流体比例适配。
- 🔍 **SEO 与企业最佳实践**：
  - 语义化 HTML5 标签体系，规范的标题层级（`h1` ~ `h4`）。
  - 各页面独立的 `useHead` / `useSeoMeta` TDK 元数据定制。
- 🔌 **内置 Nitro 服务端 Mock API**：
  - 模拟真实后端 RESTful 接口（支持全量配置、商品/新闻列表分页检索、详情查询与表单提交）。

---

## 🛠️ 技术栈

| 层次 | 选型 | 版本 | 说明 |
| :--- | :--- | :--- | :--- |
| **基础框架** | [Nuxt](https://nuxt.com/) | `^4.6.0` | 现代化全栈 Vue 框架 |
| **视图层** | [Vue 3](https://vuejs.org/) | `^3.5.43` | Composition API + `<script setup>` |
| **样式引擎** | [Tailwind CSS](https://tailwindcss.com/) | `^4.3.3` | Tailwind CSS v4 CSS-First 架构 |
| **构建插件** | `@tailwindcss/vite` | `^4.3.3` | Vite 极速构建驱动 |
| **类型检查** | [TypeScript](https://www.typescriptlang.org/) | `^5.x` | 强类型接口约束与推导 |
| **主题管理** | `@nuxtjs/color-mode` | `^4.0.1` | 深色/浅色自适应方案 |
| **服务端引擎**| Nitro Engine | 内置 | 接口路由与服务端渲染 |
| **包管理工具**| [pnpm](https://pnpm.io/) | `^9.x` / `^10.x` | 快速、节省磁盘空间的依赖管理 |

---

## 📁 目录结构

```text
nuxt-tailwind-web/
├── app/                              # Nuxt 4 应用主体目录
│   ├── assets/
│   │   └── css/
│   │       └── main.css              # 主样式表（Tailwind v4 @theme 与色彩系统）
│   ├── components/                   # Vue 组件（自动导入）
│   │   ├── layout/                   # 布局组件（Header, Footer, Breadcrumb, SideToolbar 等）
│   │   ├── sections/                 # 业务板块（Hero, Services, Products, News, Faq 等 16+）
│   │   └── ui/                       # 基础原子 UI（Button, Card, Modal, Tabs, Pagination 等）
│   ├── composables/                  # 组合式函数（useSiteData, useTheme, useApi, useScrollAnimation 等）
│   ├── layouts/
│   │   └── default.vue               # 默认应用外层布局
│   ├── pages/                        # 文件路由系统
│   │   ├── index.vue                 # 官网首页
│   │   ├── about.vue                 # 关于我们
│   │   ├── products/                 # 商店列表与详情页 ([id].vue)
│   │   ├── courses/                  # 课程列表与详情页 ([id].vue)
│   │   └── news/                     # 资讯列表与详情页 ([id].vue)
│   ├── plugins/                      # 客户端/服务端插件
│   ├── router.options.ts             # 路由平滑滚动配置
│   ├── app.vue                       # 应用根组件
│   └── error.vue                     # 404 与通用错误页面
├── public/                           # 静态资源（favicon, 二维码等）
├── server/                           # Nitro 服务端接口与数据
│   ├── api/                          # 服务端 API 接口路由（site-data, products, news 等）
│   ├── data/                         # Mock JSON 模拟数据源
│   └── utils/                        # 服务端通用辅助函数
├── types/                            # 全局 TypeScript 契约接口定义
│   └── index.ts
├── nuxt.config.ts                    # Nuxt 核心工程配置文件
├── package.json                      # 依赖与脚本定义
└── README.md                         # 项目说明文档
```

---

## 🎨 语义色彩系统速查

项目通过 Tailwind v4 `@theme` 注册了标准化的语义设计令牌，编写样式时推荐优先使用以下类名：

| 语义分类 | Tailwind 类名 | 用途描述 |
| :--- | :--- | :--- |
| **背景画布** | `bg-canvas` | 全局基础底色（浅色米纸白 / 深色暗墨黑） |
| **内容表面** | `bg-surface` | 次级区块背景色、交替行或带底色的 Section |
| **容器卡片** | `bg-card` | 内容卡片底色（高对比度，承载核心信息） |
| **次级背景** | `bg-subtle` | 搜索框、小标签、弱化背景 |
| **主标题字** | `text-main` | 高对比度主标题与强调正文字 |
| **次级说明** | `text-muted` | 段落正文、说明副标题文本 |
| **辅助弱字** | `text-caption`| 元信息、日期、角标、页脚弱提示字 |
| **通用边框** | `border-line` | 卡片与容器的标准分隔线 |
| **强边框**   | `border-line-strong` | 激活态、聚焦框或高对比轮廓 |
| **品牌主色** | `text-accent` / `bg-accent` | 品牌高亮强调色（随主题切换） |
| **品牌悬浮** | `hover:bg-accent-hover` | 按钮或链接悬浮高亮反馈 |
| **品牌浅底** | `bg-accent-soft` / `text-accent-soft-text` | 品牌徽章与弱强调背景块 |

---

## 🚀 快速开始

### 1. 环境准备
- **Node.js**：推荐 `>= 20.10.0`
- **包管理器**：推荐使用 [pnpm](https://pnpm.io/)（亦可使用 npm / yarn）

### 2. 安装依赖
```bash
pnpm install
```

### 3. 启动本地开发服务器
```bash
pnpm dev
```
打开浏览器访问 [http://localhost:3000](http://localhost:3000) 即可开始开发与调试。

### 4. 项目构建与产物预览
```bash
# 构建生产环境代码
pnpm build

# 本地预览生产构建产物
pnpm preview
```

### 5. 静态站点生成 (SSG)
```bash
pnpm generate
```

---

## 📄 开源许可

本项目基于 [MIT License](LICENSE) 协议发布，可自由用于学习、实战及商业二次开发。
