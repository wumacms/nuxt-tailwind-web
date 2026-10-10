# GitHub Pages 自动化部署指南

本项目采用 **Nuxt 4 + Tailwind CSS (v4)** 开发，并配置了通过 **GitHub Actions** 在推送代码至 `main` 分支时自动构建并发布到 **GitHub Pages** 的完整 CI/CD 流程。

---

## 一、自动化部署工作原理

1. **静态预渲染 (SSG)**：Nuxt 底层 Nitro 引擎在执行 `pnpm generate` 时，会把所有页面、路由及动态详情（共 70+ 条路由）预渲染成纯静态 HTML、JS、CSS 和 `_payload.json` 数据文件，输出至 `.output/public`。
2. **GitHub Actions 触发**：当代码推送到 `main` 分支，或在 Actions 页面手动触发时，GitHub runner 会自动拉取代码、安装依赖、注入环境 Base URL 并执行静态编译。
3. **官方 Pages 部署**：通过 `actions/upload-pages-artifact` 上传产物并由 `actions/deploy-pages` 部署，免去维护单独 `gh-pages` 分支的繁琐操作。

---

## 二、关键配置文件与工程适配

### 1. GitHub Actions 工作流
- **文件路径**：[`.github/workflows/deploy.yml`](file:///Users/devlink/code/github/wumacms/nuxt-tailwind-web/.github/workflows/deploy.yml)
- **核心逻辑**：
  - 授权 `pages: write` 与 `id-token: write` 部署权限。
  - 动态计算 Base URL：
    - 若在仓库配置了 `vars.NUXT_APP_BASE_URL`，优先使用自定义配置；
    - 若为根组织页面（如 `wumacms.github.io`），Base URL 设为 `/`；
    - 若为常规项目仓库，自动计算为 `/${{ github.event.repository.name }}/`（如 `/nuxt-tailwind-web/`）。
  - 执行 `pnpm generate` 完成静态编译。
  - 创建 `.nojekyll` 标记。
  - 打包并推送到 GitHub Pages。

### 2. Jekyll 引擎过滤绕过 (`.nojekyll`)
- **文件路径**：[`public/.nojekyll`](file:///Users/devlink/code/github/wumacms/nuxt-tailwind-web/public/.nojekyll)
- **作用**：GitHub Pages 默认启用了 Jekyll 引擎，Jekyll 会自动忽略以下划线 `_` 开头的目录。由于 Nuxt 生成的核心静态资产存放在 `_nuxt/` 目录中，缺少 `.nojekyll` 会导致所有样式和脚本 404。此文件确保 GitHub Pages 将其作为纯静态资源原样托管。

### 3. Base URL 动态适配
- **文件路径**：[`nuxt.config.ts`](file:///Users/devlink/code/github/wumacms/nuxt-tailwind-web/nuxt.config.ts)
  - `app.baseURL` 读取 `process.env.NUXT_APP_BASE_URL || '/'`。
  - `head.link` 中 favicon 图标地址跟随 Base URL 动态拼接，防止在二级路径部署时图标 404。
  - 配置 `nitro.prerender.routes: ['/api/site-data']`，确保公共配置接口在静态托管中同样可用。

### 4. 页面静态资源路径适配
- **文件路径**：
  - [`app/components/layout/AppFooter.vue`](file:///Users/devlink/code/github/wumacms/nuxt-tailwind-web/app/components/layout/AppFooter.vue)
  - [`app/components/layout/SideToolbar.vue`](file:///Users/devlink/code/github/wumacms/nuxt-tailwind-web/app/components/layout/SideToolbar.vue)
- **作用**：二维码图片资源通过 `useRuntimeConfig().app.baseURL` 动态拼接路径，无论本地开发还是线上二级路径，均能正确寻址加载。

### 5. 包管理器锁版本
- **文件路径**：[`package.json`](file:///Users/devlink/code/github/wumacms/nuxt-tailwind-web/package.json)
- **作用**：声明 `"packageManager": "pnpm@10.17.1"`，使 GitHub Actions 与本地构建环境严格对齐，避免依赖版本漂移。

---

## 三、GitHub 仓库配置说明（首次部署必做）

部署脚本基于 GitHub 官方的 Actions 部署机制，需要在 GitHub 仓库中开启权限（只需设置一次）：

1. 进入 GitHub 仓库主页：`https://github.com/wumacms/nuxt-tailwind-web`
2. 点击仓库右上角的 **Settings**。
3. 在左侧导航栏找到并点击 **Pages**。
4. 在 **Build and deployment** 栏目下的 **Source** 下拉菜单中：
   - 选择 **GitHub Actions**（切勿选择 "Deploy from a branch"）。
5. 点击保存后即可生效。

---

## 四、触发与查看部署

### 1. 自动触发
向 `main` 分支推送任意代码即可自动触发部署：
```bash
git add .
git commit -m "feat: 更新页面内容"
git push origin main
```

### 2. 手动触发
1. 打开仓库的 **Actions** 标签页。
2. 在左侧选择 **Deploy to GitHub Pages** 工作流。
3. 点击右侧 **Run workflow** 下拉按钮，选择 `Branch: main`，点击确认运行。

### 3. 查看部署状态与访问地址
构建完成后，在仓库的 **Settings -> Pages** 或 Actions 构建日志的 `deploy` 阶段输出中，可看到实际访问网址：
```text
https://wumacms.github.io/nuxt-tailwind-web/
```

---

## 五、常见问题与注意事项

| 问题场景 | 原因 | 解决方案 |
| :--- | :--- | :--- |
| 页面样式丢失，控制台大量 `_nuxt/*.css` 或 `*.js` 404 | GitHub Pages 默认 Jekyll 忽略了 `_nuxt` 目录 | 确认构建产物根目录下包含 `.nojekyll` 文件（工作流已内置自动生成） |
| 绑定了自定义域名后页面资源 404 | 仓库名称子路径与根域名冲突 | 在仓库 **Settings -> Secrets and variables -> Actions -> Variables** 中添加 `NUXT_APP_BASE_URL`，值设置为 `/` |
| 动态刷新子路由 404 | 静态托管单页应用刷新 | Nuxt generate 已默认生成对应路由目录下的 `index.html` 以及根目录 `404.html` 作为 SPA 回退 |
