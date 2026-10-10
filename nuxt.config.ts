// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

// 计算所有分页与分类的独立物理静态路由
function getStaticPrerenderRoutes(): string[] {
  const routes: string[] = ['/api/site-data', '/courses', '/products', '/news']

  try {
    // 1. Courses
    const coursesPath = path.resolve('./server/data/courses.json')
    if (fs.existsSync(coursesPath)) {
      const courses = JSON.parse(fs.readFileSync(coursesPath, 'utf-8'))
      const pageSize = 6
      const totalPages = Math.ceil(courses.length / pageSize) || 1
      for (let p = 2; p <= totalPages; p++) {
        routes.push(`/courses/page/${p}`)
      }

      const categories = ['beginner', 'intermediate', 'advanced']
      for (const cat of categories) {
        const filtered = courses.filter((c: any) => c.level === cat)
        routes.push(`/courses/category/${cat}`)
        const catPages = Math.ceil(filtered.length / pageSize) || 1
        for (let p = 2; p <= catPages; p++) {
          routes.push(`/courses/category/${cat}/page/${p}`)
        }
      }

      // 显式追加所有课程详情页，确保即使外部深层链接直连也能秒开
      for (const c of courses) {
        if (c.id) routes.push(`/courses/${c.id}`)
      }
    }

    // 2. Products
    const productsPath = path.resolve('./server/data/products.json')
    if (fs.existsSync(productsPath)) {
      const products = JSON.parse(fs.readFileSync(productsPath, 'utf-8'))
      const pageSize = 8
      const totalPages = Math.ceil(products.length / pageSize) || 1
      for (let p = 2; p <= totalPages; p++) {
        routes.push(`/products/page/${p}`)
      }

      const categories = ['presets', 'gear', 'book']
      for (const cat of categories) {
        const filtered = products.filter((p: any) => p.category === cat)
        routes.push(`/products/category/${cat}`)
        const catPages = Math.ceil(filtered.length / pageSize) || 1
        for (let p = 2; p <= catPages; p++) {
          routes.push(`/products/category/${cat}/page/${p}`)
        }
      }

      // 显式追加所有商品详情页
      for (const p of products) {
        if (p.id) routes.push(`/products/${p.id}`)
      }
    }

    // 3. Articles (News)
    const articlesPath = path.resolve('./server/data/articles.json')
    if (fs.existsSync(articlesPath)) {
      const articles = JSON.parse(fs.readFileSync(articlesPath, 'utf-8'))
      const pageSize = 4
      const totalPages = Math.ceil(articles.length / pageSize) || 1
      for (let p = 2; p <= totalPages; p++) {
        routes.push(`/news/page/${p}`)
      }

      const categories = ['exhibition', 'industry', 'behind']
      for (const cat of categories) {
        const filtered = articles.filter((a: any) => a.category === cat)
        routes.push(`/news/category/${cat}`)
        const catPages = Math.ceil(filtered.length / pageSize) || 1
        for (let p = 2; p <= catPages; p++) {
          routes.push(`/news/category/${cat}/page/${p}`)
        }
      }

      // 显式追加所有新闻专栏详情页
      for (const a of articles) {
        if (a.id) routes.push(`/news/${a.id}`)
      }
    }
  } catch (err) {
    console.warn('Failed to calculate static prerender routes:', err)
  }

  return routes
}

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  alias: {
    "~/types": fileURLToPath(new URL("./types", import.meta.url)),
    "~/types/*": fileURLToPath(new URL("./types/*", import.meta.url)),
    "@/types": fileURLToPath(new URL("./types", import.meta.url)),
    "@/types/*": fileURLToPath(new URL("./types/*", import.meta.url)),
  },
  modules: ["@nuxtjs/color-mode"],
  colorMode: {
    preference: "system",
    fallback: "light",
    classSuffix: "",
  },
  css: ["~/assets/css/main.css"],
  components: [
    {
      path: "~/components",
      pathPrefix: false,
    },
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  app: {
    baseURL: process.env.NUXT_APP_BASE_URL || '/',
    head: {
      title: "Aperture — 摄影艺术与视觉叙事",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1.0" },
        {
          name: "description",
          content: "Aperture 专注于商业摄影、人像写真与品牌视觉叙事。用光影捕捉情绪，让每一帧都成为永恒。",
        },
      ],
      link: [
        { rel: "icon", type: "image/x-icon", href: `${(process.env.NUXT_APP_BASE_URL || '/').replace(/\/$/, '')}/favicon.ico` },
      ],
    },
  },
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: getStaticPrerenderRoutes(),
    },
  },
});

