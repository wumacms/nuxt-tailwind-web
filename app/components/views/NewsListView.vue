<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { buildListUrl } from '~/utils/route-helper'
import { PAGE_SIZES, ARTICLE_CATEGORIES } from '~/constants/site'

const route = useRoute()

const breadcrumbs = [{ label: '新闻动态' }]

// 从路由参数（路径或查询参数）读取分类与页码
const parseCategory = (): string => {
  const val = (route.params.category as string) || (route.query.category as string)
  return val && val.trim() ? val.trim() : 'all'
}

const parsePage = (): number => {
  const p = route.params.page || route.query.page
  const pageNum = parseInt(String(p || 1), 10)
  return !isNaN(pageNum) && pageNum > 0 ? pageNum : 1
}

const currentTab = ref(parseCategory())
const currentPage = ref(parsePage())
const pageSize = PAGE_SIZES.articles

useSeoMeta({
  title: computed(() => {
    const pageSuffix = currentPage.value > 1 ? ` (第 ${currentPage.value} 页)` : ''
    return `新闻动态与行业观察${pageSuffix} - Aperture`
  }),
  description: '掌握 Aperture 摄影展讯动态、商业大片幕后花絮与前沿影像色彩科学思考。',
})

// 监听路由参数变化，保持响应式更新
watch(
  () => [route.params.category, route.params.page, route.query.category, route.query.page],
  () => {
    currentTab.value = parseCategory()
    currentPage.value = parsePage()
  }
)

const { fetchArticles } = useApi()
const { data: response, status } = await fetchArticles({
  category: currentTab,
  page: currentPage,
  pageSize,
})

const articles = computed(() => response.value?.data?.list || [])
const total = computed(() => response.value?.data?.total || 0)
const totalPages = computed(() => response.value?.data?.totalPages || 1)
const counts = computed(() => response.value?.data?.categoryCounts || {})

const tabs = computed(() =>
  ARTICLE_CATEGORIES.map((cat) => ({
    id: cat.id,
    label: cat.label,
    count: counts.value[cat.id] ?? 0,
    to: buildListUrl('news', cat.id, 1),
  }))
)
</script>

<template>
  <div>
    <!-- 头部带有背景图片的统一 Banner 组件 -->
    <PageBanner
      title="新闻动态与行业观察"
      subtitle="记录 Aperture 在世界各地的展讯通告、商业幕后花絮与视觉美学思考。"
      badge="资讯专栏"
      bg-image="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=1600&h=700&fit=crop"
      :breadcrumbs="breadcrumbs"
    />

    <!-- 网格分页列表主体 -->
    <section class="py-16 md:py-24 bg-canvas">
      <AppContainer>
        <!-- 分类筛选条件（静态超链接 Tab） -->
        <div class="mb-10 flex flex-wrap items-center justify-between gap-4 animate-on-scroll">
          <AppTabs v-model="currentTab" :tabs="tabs" />
          <div class="text-xs text-caption">
            共找到 <span class="font-bold text-accent">{{ total }}</span> 篇专栏内容
          </div>
        </div>

        <!-- 加载中微状态提示 -->
        <div v-if="status === 'pending'" class="py-12 text-center text-sm text-caption">
          <Icon name="lucide:loader-2" class="inline-block animate-spin mr-2 w-4 h-4 align-middle" /> 正在加载数据...
        </div>

        <!-- 网格列表（2列画报杂志风格） -->
        <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          <article
            v-for="(item, idx) in articles"
            :key="item.id"
            :class="[
              'group rounded-3xl border border-line bg-card overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between animate-on-scroll',
              (idx % 2 === 0) ? 'delay-50' : 'delay-100'
            ]"
          >
            <div>
              <NuxtLink :to="`/news/${item.id}`" class="block aspect-[16/9] overflow-hidden relative">
                <img
                  :src="item.coverImage"
                  :alt="item.title"
                  class="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                  loading="lazy"
                  width="1200"
                  height="700"
                />
                <span
                  class="absolute top-4 left-4 text-xs font-semibold px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white"
                >
                  {{ item.categoryLabel }}
                </span>
              </NuxtLink>

              <div class="p-6 md:p-8">
                <div class="flex items-center gap-3 text-xs text-caption mb-3 font-medium">
                  <span>{{ item.date }}</span>
                  <span v-if="item.author">• {{ item.author }}</span>
                  <span>• 约 4 分钟阅读</span>
                </div>

                <h2 class="font-bold text-xl md:text-2xl leading-snug text-main group-hover:text-accent transition font-display line-clamp-2">
                  <NuxtLink :to="`/news/${item.id}`">
                    {{ item.title }}
                  </NuxtLink>
                </h2>

                <p class="mt-3 text-sm md:text-base text-muted leading-relaxed line-clamp-3">
                  {{ item.summary }}
                </p>
              </div>
            </div>

            <div class="px-6 pb-6 md:px-8 md:pb-8 pt-0">
              <NuxtLink
                :to="`/news/${item.id}`"
                class="inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:text-accent-hover group-hover:translate-x-1.5 transition-transform"
              >
                <span>阅读全文</span>
                <Icon name="lucide:arrow-right" class="w-4 h-4" />
              </NuxtLink>
            </div>
          </article>
        </div>

        <!-- 空状态 -->
        <div
          v-if="status !== 'pending' && articles.length === 0"
          class="text-center py-20 bg-card rounded-3xl border border-line"
        >
          <p class="text-base text-caption">当前分类下暂无文章动态</p>
          <NuxtLink
            to="/news"
            class="mt-4 text-sm font-medium text-accent hover:underline inline-block cursor-pointer"
          >
            查看全部专栏
          </NuxtLink>
        </div>

        <!-- 统一分页组件（静态物理链接） -->
        <div v-if="totalPages > 1" class="mt-14">
          <AppPagination
            v-model:current-page="currentPage"
            :total-pages="totalPages"
            :get-page-url="(p) => buildListUrl('news', currentTab, p)"
          />
        </div>
      </AppContainer>
    </section>
  </div>
</template>
