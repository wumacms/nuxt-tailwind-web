<script setup lang="ts">
import { computed } from 'vue'
import type { ArticleItem } from '~/types'

const route = useRoute()
const articleId = computed(() => route.params.id as string)

// 模拟真实后端接口获取单篇文章详情及上一篇/下一篇
const { fetchArticleById } = useApi()
const { data: response, error } = await fetchArticleById(articleId)

if (error.value) {
  throw createError({
    statusCode: 404,
    statusMessage: '文章不存在或已下架',
    fatal: true,
  })
}

const articleDetail = computed(() => response.value?.data)
const currentArticle = computed(() => articleDetail.value?.article || ({} as ArticleItem))
const prevArticle = computed(() => articleDetail.value?.prev || null)
const nextArticle = computed(() => articleDetail.value?.next || null)

useSeoMeta({
  title: () => `${currentArticle.value.title || '专栏文章'} - Aperture 专栏`,
  description: () => currentArticle.value.summary || '',
  ogImage: () => currentArticle.value.coverImage,
})

// 解析段落
const paragraphs = computed(() => {
  if (!currentArticle.value.content) return [currentArticle.value.summary || '']
  return currentArticle.value.content
    .trim()
    .split('\n')
    .map((p) => p.trim())
    .filter((p) => p.length > 0)
})
</script>

<template>
  <div>
    <!-- 头部：使用文章封面作为全景大图背景 -->
    <section
      class="relative min-h-[460px] md:min-h-[540px] flex items-end pb-16 pt-24 text-white overflow-hidden bg-gray-950">
      <div class="absolute inset-0 pointer-events-none select-none">
        <img :src="currentArticle.coverImage" :alt="currentArticle.title"
          class="w-full h-full object-cover object-center scale-105 transition-transform duration-1000 brightness-90" />
        <!-- 渐变暗层叠加确保文字清晰 -->
        <div class="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/75 to-black/40"></div>
        <div class="absolute inset-0 bg-gradient-to-r from-gray-950/80 via-transparent to-transparent"></div>
      </div>

      <AppContainer class="relative z-10 w-full">
        <!-- 面包屑 -->
        <nav aria-label="Breadcrumb" class="mb-5">
          <ol class="flex items-center space-x-2 text-xs md:text-sm text-gray-300">
            <li>
              <NuxtLink to="/" class="hover:text-accent transition-colors">首页</NuxtLink>
            </li>
            <li class="text-gray-500">/</li>
            <li>
              <NuxtLink to="/news" class="hover:text-accent transition-colors">新闻动态</NuxtLink>
            </li>
            <li class="text-gray-500">/</li>
            <li class="text-accent truncate max-w-xs md:max-w-md font-medium">正文</li>
          </ol>
        </nav>

        <div class="max-w-4xl">
          <!-- 标签与元数据 -->
          <div class="flex flex-wrap items-center gap-3 mb-4">
            <span
              class="text-xs font-semibold px-3 py-1 rounded-full bg-accent text-on-accent uppercase tracking-wider">
              {{ currentArticle.categoryLabel }}
            </span>
            <span class="text-xs md:text-sm text-gray-300">
              发布日期：{{ currentArticle.date }}
            </span>
            <span v-if="currentArticle.author" class="text-xs md:text-sm text-gray-300">
              • 作者：{{ currentArticle.author }}
            </span>
            <span class="text-xs md:text-sm text-gray-400">
              • 深度专栏
            </span>
          </div>

          <!-- 文章大标题 -->
          <h1
            class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold font-display tracking-tight leading-tight text-white mb-6">
            {{ currentArticle.title }}
          </h1>

          <!-- 导言摘要 -->
          <p
            class="text-base sm:text-lg md:text-xl text-gray-200/90 leading-relaxed font-light border-l-2 border-accent pl-4 py-1 italic max-w-3xl">
            {{ currentArticle.summary }}
          </p>
        </div>
      </AppContainer>
    </section>

    <!-- 文章正文区域（内容丰富充实，撑起页面） -->
    <section class="py-16 md:py-24 bg-canvas">
      <div class="max-w-7xl mx-auto px-4 md:px-8">
        <!-- 正文段落排版 -->
        <article class="bg-card p-8 sm:p-12 md:p-16 rounded-3xl border border-line shadow-md space-y-6 text-main">
          <template v-for="(para, idx) in paragraphs" :key="idx">
            <!-- 小标题 -->
            <h2 v-if="para.startsWith('### ')"
              class="text-2xl sm:text-3xl font-bold font-display text-main pt-6 pb-1 border-b border-line/60">
              {{ para.replace('### ', '') }}
            </h2>

            <!-- 引用块 -->
            <blockquote v-else-if="para.startsWith('> ')"
              class="p-5 rounded-2xl bg-subtle border-l-4 border-accent text-muted italic my-6 text-base md:text-lg leading-relaxed">
              {{ para.replace('> ', '') }}
            </blockquote>

            <!-- 无序列表项 -->
            <div v-else-if="para.startsWith('- ')"
              class="flex items-start gap-3 pl-2 text-base text-muted leading-relaxed">
              <span class="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0"></span>
              <span>{{ para.replace('- ', '') }}</span>
            </div>

            <!-- 有序列表项 -->
            <div v-else-if="para.match(/^[0-9]\./)"
              class="p-4 rounded-xl bg-subtle border border-line/50 text-sm md:text-base text-muted leading-relaxed my-3">
              {{ para }}
            </div>

            <!-- 常规文本段落 -->
            <p v-else class="text-base sm:text-lg text-muted leading-relaxed">
              {{ para }}
            </p>
          </template>

          <!-- 专栏版权声明 -->
          <div
            class="mt-12 pt-8 border-t border-line flex flex-wrap items-center justify-between gap-4 text-xs text-caption">
            <div>© 本文为 Aperture Studio 原创视觉专栏，未经许可严禁转载。</div>
            <div class="flex gap-2 font-medium">
              <span class="px-2.5 py-1 rounded bg-subtle border border-line">光影美学</span>
              <span class="px-2.5 py-1 rounded bg-subtle border border-line">色彩管理</span>
              <span class="px-2.5 py-1 rounded bg-subtle border border-line">大师创作</span>
            </div>
          </div>
        </article>

        <!-- 底部必须有：上一篇和下一篇导航组件 -->
        <div class="mt-12 grid sm:grid-cols-2 gap-6">
          <!-- 上一篇 -->
          <div v-if="prevArticle"
            class="group p-6 rounded-2xl border border-line bg-card hover:shadow-lg hover:border-accent transition">
            <div class="text-xs text-caption mb-2 flex items-center gap-1 font-medium">
              <span>&larr;</span> 上一篇文章
            </div>
            <NuxtLink :to="`/news/${prevArticle.id}`"
              class="block font-bold text-base md:text-lg text-main group-hover:text-accent transition line-clamp-2">
              {{ prevArticle.title }}
            </NuxtLink>
          </div>
          <div v-else
            class="p-6 rounded-2xl border border-dashed border-line flex items-center justify-center text-xs text-caption">
            已是第一篇专栏
          </div>

          <!-- 下一篇 -->
          <div v-if="nextArticle"
            class="group p-6 rounded-2xl border border-line bg-card hover:shadow-lg hover:border-accent transition sm:text-right">
            <div class="text-xs text-caption mb-2 flex items-center justify-start sm:justify-end gap-1 font-medium">
              下一篇文章 <span>&rarr;</span>
            </div>
            <NuxtLink :to="`/news/${nextArticle.id}`"
              class="block font-bold text-base md:text-lg text-main group-hover:text-accent transition line-clamp-2">
              {{ nextArticle.title }}
            </NuxtLink>
          </div>
          <div v-else
            class="p-6 rounded-2xl border border-dashed border-line flex items-center justify-center text-xs text-caption">
            已是最后一篇专栏
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
