# 纯静态托管环境下的动态分页与分类预渲染优化方案（方案二）

## 一、方案背景与问题诊断

### 1.1 背景
本项目基于 **Nuxt 4 + Tailwind CSS (v4)** 开发，并使用 **GitHub Pages** 进行自动化静态托管。

### 1.2 故障现象
项目初步部署上线后，列表页默认状态（第 1 页）可以正常访问，但在浏览器中点击分页按钮（如第 2 页）或切换分类 Tab 时，控制台抛出网络异常：
```http
GET https://wumacms.github.io/nuxt-tailwind-web/api/courses?category=all&level=all&page=2&pageSize=6
Status Code: 404 Not Found
```

### 1.3 根本原因分析
1. **GitHub Pages 是纯静态文件托管（无 Node.js 运行时）**：静态服务器仅根据请求路径从磁盘匹配现成文件，无法像动态服务器一样解析 `?query` 参数并执行服务端脚本（`server/api/*`）。
2. **构建期预渲染与客户端 Ajax 的脱节**：
   - 执行 `pnpm generate` 时，Nuxt 只爬取并预渲染了默认的初始路由（第 1 页）。
   - 用户在客户端点击第 2 页时，Vue 响应式状态变更触发了客户端二次 Ajax 网络请求，而目标接口在静态托管中根本不存在，因而导致 404。

---

## 二、架构选型与决策

为解决静态环境下的数据交互问题，对两种主流方案进行了评估：

| 维度 | 方案一：纯客户端切片分页 | 方案二：独立物理路由静态化（本项目采用） |
| :--- | :--- | :--- |
| **核心机制** | 构建期仅生成单页，首屏带入全量数据，客户端做内存 `slice()` | 构建期为每个分类和页码生成物理独立的 `.html` 文件 |
| **URL 表现** | `?page=2`（Query 参数） | `/courses/page/2`、`/courses/category/beginner` |
| **SEO 价值** | 仅收录首页，深层内容依赖客户端 JS | **极高**：每个分类、每个分页都有独立 URL 与 Meta |
| **纯静态支持** | 依赖客户端 JS 运行时 | **原生支持**：即使禁用 JavaScript，页面内容依然完整呈现 |
| **工程实现** | 极简 | 需重构路由、视图抽象、分页器升级与预渲染清单计算 |

**决策结果**：采用**方案二**，打造符合大型商业官网标准、深层 SEO 友好、且 100% 物理静态化的健壮架构。

---

## 三、物理路由规范设计

对全站三大列表模块（课程、商品、新闻）统一规范 RESTful 物理静态路由体系：

### 1. 课程学院 (`courses`)
- **全部分类首页（第 1 页）**：`/courses`
- **全部分类指定页（第 N 页）**：`/courses/page/:page`（如 `/courses/page/2`）
- **指定分类首页（第 1 页）**：`/courses/category/:category`（如 `/courses/category/beginner`）
- **指定分类指定页（第 N 页）**：`/courses/category/:category/page/:page`（如 `/courses/category/beginner/page/2`）

### 2. 摄影商店 (`products`)
- `/products`
- `/products/page/:page`
- `/products/category/:category`（分类：`presets`、`gear`、`book`）
- `/products/category/:category/page/:page`

### 3. 新闻专栏 (`news`)
- `/news`
- `/news/page/:page`
- `/news/category/:category`（分类：`exhibition`、`industry`、`behind`）
- `/news/category/:category/page/:page`

---

## 四、核心工程改造与实现

### 4.1 URL 构造辅助函数 (`app/utils/route-helper.ts`)
提供全局通用的静态物理路由计算工具，消除各业务组件中硬编码拼接的问题：
```ts
export const buildListUrl = (base: string, category = 'all', page = 1): string => {
  const isAll = !category || category === 'all'
  const validPage = Math.max(1, Math.floor(page || 1))

  if (isAll && validPage <= 1) return `/${base}`
  if (isAll) return `/${base}/page/${validPage}`
  if (validPage <= 1) return `/${base}/category/${category}`
  return `/${base}/category/${category}/page/${validPage}`
}
```

### 4.2 基础 UI 组件升级为静态超链接
为确保 Nuxt 静态爬虫及搜索引擎蜘蛛可以顺藤摸瓜爬取所有链接，将组件底层的 JavaScript 点击事件升级为 `<NuxtLink>`：

1. **[`AppPagination.vue`](file:///Users/devlink/code/github/wumacms/nuxt-tailwind-web/app/components/ui/AppPagination.vue)**：
   - 新增 `getPageUrl?: (page: number) => string` 属性。
   - 传入该属性时，页码、上一页、下一页自动渲染为带真实 `href` 的 `<NuxtLink>`。
   - 保留原有的 `@click` 事件模式，向下完全兼容其他不需要静态链接的场景。
2. **[`AppTabs.vue`](file:///Users/devlink/code/github/wumacms/nuxt-tailwind-web/app/components/ui/AppTabs.vue)**：
   - 扩展 `TabItem` 接口，支持可选的 `to?: string` 属性。
   - 存在 `to` 属性时渲染为 `<NuxtLink :to="tab.to">`，实现分类切换直接走物理路由跳转。

### 4.3 视图层抽象与 DRY 代码复用
为避免几十个分页/分类路由页面复制代码，将核心列表展示与交互抽取为独立视图组件：
- [`app/components/views/CoursesListView.vue`](file:///Users/devlink/code/github/wumacms/nuxt-tailwind-web/app/components/views/CoursesListView.vue)
- [`app/components/views/ProductsListView.vue`](file:///Users/devlink/code/github/wumacms/nuxt-tailwind-web/app/components/views/ProductsListView.vue)
- [`app/components/views/NewsListView.vue`](file:///Users/devlink/code/github/wumacms/nuxt-tailwind-web/app/components/views/NewsListView.vue)

各路由页面（如 `/courses/page/[page].vue`）仅需引用对应视图即可：
```vue
<template>
  <CoursesListView />
</template>
```

视图组件内部特性：
- **双源参数解析**：优先读取 `route.params`（路径参数），向下兼容 `route.query`（查询参数）。
- **动态 SEO 优化**：在页码大于 1 时，动态生成独立的 Title（例如：`摄影学院与大师研习班 (第 2 页) - Aperture`）。

### 4.4 构建期全量路由推算 (`nuxt.config.ts`)
在 [`nuxt.config.ts`](file:///Users/devlink/code/github/wumacms/nuxt-tailwind-web/nuxt.config.ts) 中增加 `getStaticPrerenderRoutes()`：
- 在 Node 编译期读取 `server/data/*.json` 真实数据集。
- 结合各模块的 `pageSize` 自动计算出所有排列组合的路由地址。
- 注入 `nitro.prerender.routes`，确保构建时强制生成所有物理 HTML 文件。

```ts
nitro: {
  prerender: {
    crawlLinks: true,
    routes: getStaticPrerenderRoutes(),
  },
}
```

### 4.5 双重健壮性兜底保障 (`app/composables/useApi.ts`)
在统一数据层中，为 `fetchCourses`、`fetchProducts`、`fetchArticles` 及其详情接口增加了本地 Fallback 机制：
- 在 Node 环境及 SSG 编译期，正常走 `/api/*` 后端逻辑。
- 在纯静态托管运行期，一旦请求产生异常（如 404），自动使用注入的 `useSiteData` 数据进行内存切片计算，确保界面 0 白屏、0 报错。

---

## 五、产物验证与效果分析

在本地执行 `pnpm generate` 测试，验证构建结果：

### 1. 预渲染覆盖范围
```text
ℹ Prerendered 133 routes in 2.017 seconds
✔ Generated public .output/public
✨ You can now deploy .output/public to any static hosting!
```
全站共计 **133 条路由** 顺利完成静态预渲染。

### 2. 生成的静态物理文件目录
```text
.output/public/
├── courses/
│   ├── index.html                           # 第 1 页 HTML
│   ├── _payload.json                        # 第 1 页数据包
│   ├── page/
│   │   └── 2/
│   │       ├── index.html                   # 第 2 页独立物理 HTML
│   │       └── _payload.json
│   └── category/
│       ├── beginner/
│       │   ├── index.html                   # 入门分类第 1 页独立 HTML
│       │   └── _payload.json
│       ├── intermediate/index.html
│       └── advanced/index.html
├── products/
│   ├── index.html
│   ├── page/2/index.html
│   └── category/{presets,gear,book}/index.html
└── news/
    ├── index.html
    ├── page/{2,3}/index.html
    └── category/{exhibition,industry,behind}/index.html
```

### 3. 内容烘焙验证
对生成的 `.output/public/courses/page/2/index.html` 进行源码分析：
- **SEO Title**：`<title>摄影学院与大师研习班 (第 2 页) - Aperture</title>`
- **页面内容**：直接包含了属于第 2 页的课程标题（如《城市街头纪实抓拍》、《黑白摄影精修课》等），完全脱离对 `/api/courses` 的运行时请求，彻底消除 404 错误。

---

## 六、维护与扩展规范

当未来需要扩展新模块或增加更多分页数据时，请遵循以下规范：

1. **新增数据**：直接在 `server/data/*.json` 中添加数据记录。构建脚本会根据数据量自动计算出新的最大页码，无需手动修改路由配置。
2. **新增模块**：
   - 参照 `app/utils/route-helper.ts` 扩展 `buildListUrl`。
   - 创建对应的 `*ListView.vue` 视图组件。
   - 配置对应的 `page/` 与 `category/` 页面目录。
   - 在 `nuxt.config.ts` 中的 `getStaticPrerenderRoutes()` 追加该模块的推算规则。
