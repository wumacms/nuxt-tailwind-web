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
    <section class="relative min-h-[460px] md:min-h-[540px] flex items-end pb-16 pt-24 text-white overflow-hidden bg-gray-950">
      <div class="absolute inset-0 pointer-events-none select-none">
        <img
          :src="currentArticle.coverImage"
          :alt="currentArticle.title"
          class="w-full h-full object-cover object-center scale-105 transition-transform duration-1000 brightness-90"
        />
        <!-- 渐变暗层叠加确保文字清晰 -->
        <div class="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/75 to-black/40"></div>
        <div class="absolute inset-0 bg-gradient-to-r from-gray-950/80 via-transparent to-transparent"></div>
      </div>

      <AppContainer class="relative z-10 w-full">
        <!-- 面包屑 -->
        <nav aria-label="Breadcrumb" class="mb-5">
          <ol class="flex items-center space-x-2 text-xs md:text-sm text-gray-300">
            <li>
              <NuxtLink to="/" class="hover:text-amber-400 transition-colors">首页</NuxtLink>
            </li>
            <li class="text-gray-500">/</li>
            <li>
              <NuxtLink to="/news" class="hover:text-amber-400 transition-colors">新闻动态</NuxtLink>
            </li>
            <li class="text-gray-500">/</li>
            <li class="text-amber-400 truncate max-w-xs md:max-w-md font-medium">正文</li>
          </ol>
        </nav>

        <div class="max-w-4xl">
          <!-- 标签与元数据 -->
          <div class="flex flex-wrap items-center gap-3 mb-4">
            <span class="text-xs font-semibold px-3 py-1 rounded-full bg-amber-500 text-gray-950 uppercase tracking-wider">
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
          <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold font-display tracking-tight leading-tight text-white mb-6">
            {{ currentArticle.title }}
          </h1>

          <!-- 导言摘要 -->
          <p class="text-base sm:text-lg md:text-xl text-gray-200/90 leading-relaxed font-light border-l-2 border-amber-400 pl-4 py-1 italic max-w-3xl">
            {{ currentArticle.summary }}
          </p>
        </div>
      </AppContainer>
    </section>

    <!-- 文章正文区域（内容丰富充实，撑起页面） -->
    <section class="py-16 md:py-24 bg-[#faf9f7] dark:bg-[#12100e]">
      <div class="max-w-4xl mx-auto px-4 md:px-8">
        <!-- 核心参数指标盒 -->
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-2xl bg-white dark:bg-[#211f1c] border border-[#ddd8cf] dark:border-[#2d2a26] shadow-sm mb-12">
          <div>
            <div class="text-xs text-[#6b655d] dark:text-[#8a8378]">拍摄器材</div>
            <div class="text-sm font-bold text-[#1a1816] dark:text-[#f5f2ed] mt-1">Hasselblad 100c</div>
          </div>
          <div>
            <div class="text-xs text-[#6b655d] dark:text-[#8a8378]">核心镜头</div>
            <div class="text-sm font-bold text-[#1a1816] dark:text-[#f5f2ed] mt-1">XCD 80mm f/1.9</div>
          </div>
          <div>
            <div class="text-xs text-[#6b655d] dark:text-[#8a8378]">光影设定</div>
            <div class="text-sm font-bold text-[#1a1816] dark:text-[#f5f2ed] mt-1">Broncolor 3200J</div>
          </div>
          <div>
            <div class="text-xs text-[#6b655d] dark:text-[#8a8378]">色彩空间</div>
            <div class="text-sm font-bold text-[#1a1816] dark:text-[#f5f2ed] mt-1">ProPhoto RGB</div>
          </div>
        </div>

        <!-- 正文段落排版 -->
        <article class="bg-white dark:bg-[#211f1c] p-8 sm:p-12 md:p-16 rounded-3xl border border-[#ddd8cf] dark:border-[#2d2a26] shadow-md space-y-6 text-[#1a1816] dark:text-[#f5f2ed]">
          <template v-for="(para, idx) in paragraphs" :key="idx">
            <!-- 小标题 -->
            <h2
              v-if="para.startsWith('### ')"
              class="text-2xl sm:text-3xl font-bold font-display text-[#1a1816] dark:text-[#f5f2ed] pt-6 pb-1 border-b border-[#ddd8cf]/60 dark:border-[#2d2a26]"
            >
              {{ para.replace('### ', '') }}
            </h2>

            <!-- 引用块 -->
            <blockquote
              v-else-if="para.startsWith('> ')"
              class="p-5 rounded-2xl bg-[#faf9f7] dark:bg-[#12100e] border-l-4 border-amber-600 text-[#4a4540] dark:text-[#c4bdb1] italic my-6 text-base md:text-lg leading-relaxed"
            >
              {{ para.replace('> ', '') }}
            </blockquote>

            <!-- 无序列表项 -->
            <div
              v-else-if="para.startsWith('- ')"
              class="flex items-start gap-3 pl-2 text-base text-[#4a4540] dark:text-[#c4bdb1] leading-relaxed"
            >
              <span class="w-2 h-2 rounded-full bg-amber-600 mt-2 flex-shrink-0"></span>
              <span>{{ para.replace('- ', '') }}</span>
            </div>

            <!-- 有序列表项 -->
            <div
              v-else-if="para.match(/^[0-9]\./)"
              class="p-4 rounded-xl bg-[#faf9f7] dark:bg-[#12100e] border border-[#ddd8cf]/50 dark:border-[#2d2a26] text-sm md:text-base text-[#4a4540] dark:text-[#c4bdb1] leading-relaxed my-3"
            >
              {{ para }}
            </div>

            <!-- 常规文本段落 -->
            <p
              v-else
              class="text-base sm:text-lg text-[#4a4540] dark:text-[#c4bdb1] leading-relaxed"
            >
              {{ para }}
            </p>
          </template>

          <!-- 专栏版权声明 -->
          <div class="mt-12 pt-8 border-t border-[#ddd8cf] dark:border-[#2d2a26] flex flex-wrap items-center justify-between gap-4 text-xs text-[#6b655d] dark:text-[#8a8378]">
            <div>© 本文为 Aperture Studio 原创视觉专栏，未经许可严禁转载。</div>
            <div class="flex gap-2 font-medium">
              <span class="px-2.5 py-1 rounded bg-[#faf9f7] dark:bg-[#12100e] border border-[#ddd8cf] dark:border-[#2d2a26]">光影美学</span>
              <span class="px-2.5 py-1 rounded bg-[#faf9f7] dark:bg-[#12100e] border border-[#ddd8cf] dark:border-[#2d2a26]">色彩管理</span>
              <span class="px-2.5 py-1 rounded bg-[#faf9f7] dark:bg-[#12100e] border border-[#ddd8cf] dark:border-[#2d2a26]">大师创作</span>
            </div>
          </div>
        </article>

        <!-- 底部必须有：上一篇和下一篇导航组件 -->
        <div class="mt-12 grid sm:grid-cols-2 gap-6">
          <!-- 上一篇 -->
          <div
            v-if="prevArticle"
            class="group p-6 rounded-2xl border border-[#ddd8cf] dark:border-[#2d2a26] bg-white dark:bg-[#211f1c] hover:shadow-lg hover:border-amber-600 dark:hover:border-amber-400 transition"
          >
            <div class="text-xs text-[#6b655d] dark:text-[#8a8378] mb-2 flex items-center gap-1 font-medium">
              <span>&larr;</span> 上一篇文章
            </div>
            <NuxtLink :to="`/news/${prevArticle.id}`" class="block font-bold text-base md:text-lg text-[#1a1816] dark:text-[#f5f2ed] group-hover:text-amber-600 dark:group-hover:text-amber-400 transition line-clamp-2">
              {{ prevArticle.title }}
            </NuxtLink>
            <div class="text-xs text-amber-700 dark:text-amber-400 mt-2">
              {{ prevArticle.date }} · {{ prevArticle.categoryLabel }}
            </div>
          </div>
          <div v-else class="p-6 rounded-2xl border border-dashed border-[#ddd8cf] dark:border-[#2d2a26] flex items-center justify-center text-xs text-[#6b655d] dark:text-[#8a8378]">
            已是第一篇专栏
          </div>

          <!-- 下一篇 -->
          <div
            v-if="nextArticle"
            class="group p-6 rounded-2xl border border-[#ddd8cf] dark:border-[#2d2a26] bg-white dark:bg-[#211f1c] hover:shadow-lg hover:border-amber-600 dark:hover:border-amber-400 transition sm:text-right"
          >
            <div class="text-xs text-[#6b655d] dark:text-[#8a8378] mb-2 flex items-center justify-start sm:justify-end gap-1 font-medium">
              下一篇文章 <span>&rarr;</span>
            </div>
            <NuxtLink :to="`/news/${nextArticle.id}`" class="block font-bold text-base md:text-lg text-[#1a1816] dark:text-[#f5f2ed] group-hover:text-amber-600 dark:group-hover:text-amber-400 transition line-clamp-2">
              {{ nextArticle.title }}
            </NuxtLink>
            <div class="text-xs text-amber-700 dark:text-amber-400 mt-2">
              {{ nextArticle.date }} · {{ nextArticle.categoryLabel }}
            </div>
          </div>
          <div v-else class="p-6 rounded-2xl border border-dashed border-[#ddd8cf] dark:border-[#2d2a26] flex items-center justify-center text-xs text-[#6b655d] dark:text-[#8a8378]">
            已是最后一篇专栏
          </div>
        </div>

        <!-- 返回列表 -->
        <div class="mt-8 text-center">
          <NuxtLink
            to="/news"
            class="inline-flex items-center gap-2 text-sm font-semibold text-amber-700 dark:text-amber-400 hover:underline"
          >
            &larr; 返回全部新闻与专栏列表
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>
