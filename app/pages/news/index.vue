<script setup lang="ts">
import { ref, computed, watch } from 'vue'

useSeoMeta({
  title: '新闻动态与行业观察 - Aperture',
  description: '掌握 Aperture 摄影展讯动态、商业大片幕后花絮与前沿影像色彩科学思考。',
})

const breadcrumbs = [{ label: '新闻动态' }]

const currentTab = ref('all')
const currentPage = ref(1)
const pageSize = 4

// 模拟真实后端接口获取数据
const { fetchArticles } = useApi()
const { data: response, status } = await fetchArticles({
  category: currentTab,
  page: currentPage,
  pageSize,
})

// 当切换分类时，重置当前页码到第一页
watch(currentTab, () => {
  currentPage.value = 1
})

const articles = computed(() => response.value?.data?.list || [])
const total = computed(() => response.value?.data?.total || 0)
const totalPages = computed(() => response.value?.data?.totalPages || 1)
const counts = computed(() => response.value?.data?.categoryCounts || {})

const tabs = computed(() => [
  { id: 'all', label: '全部资讯', count: counts.value.all ?? 0 },
  { id: 'exhibition', label: '影展动态', count: counts.value.exhibition ?? 0 },
  { id: 'industry', label: '行业观察', count: counts.value.industry ?? 0 },
  { id: 'behind', label: '幕后花絮', count: counts.value.behind ?? 0 },
])
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
    <section class="py-16 md:py-24 bg-[#faf9f7] dark:bg-[#12100e]">
      <AppContainer>
        <!-- 分类筛选条件 -->
        <div class="mb-10 flex flex-wrap items-center justify-between gap-4">
          <AppTabs v-model="currentTab" :tabs="tabs" />
          <div class="text-xs text-[#6b655d] dark:text-[#8a8378]">
            共找到 <span class="font-bold text-amber-600 dark:text-amber-400">{{ total }}</span> 篇专栏内容
          </div>
        </div>

        <!-- 加载中微状态提示 -->
        <div v-if="status === 'pending'" class="py-12 text-center text-sm text-[#6b655d] dark:text-[#8a8378]">
          <span class="inline-block animate-spin mr-2">◌</span> 正在从接口获取数据...
        </div>

        <!-- 网格列表（2列画报杂志风格） -->
        <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          <article
            v-for="item in articles"
            :key="item.id"
            class="group rounded-3xl border border-[#ddd8cf] dark:border-[#2d2a26] bg-white dark:bg-[#211f1c] overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
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
                <div class="flex items-center gap-3 text-xs text-[#6b655d] dark:text-[#8a8378] mb-3 font-medium">
                  <span>{{ item.date }}</span>
                  <span v-if="item.author">• {{ item.author }}</span>
                  <span>• 约 4 分钟阅读</span>
                </div>

                <h2 class="font-bold text-xl md:text-2xl leading-snug text-[#1a1816] dark:text-[#f5f2ed] group-hover:text-amber-600 dark:group-hover:text-amber-400 transition font-display line-clamp-2">
                  <NuxtLink :to="`/news/${item.id}`">
                    {{ item.title }}
                  </NuxtLink>
                </h2>

                <p class="mt-3 text-sm md:text-base text-[#4a4540] dark:text-[#c4bdb1] leading-relaxed line-clamp-3">
                  {{ item.summary }}
                </p>
              </div>
            </div>

            <div class="px-6 pb-6 md:px-8 md:pb-8 pt-0">
              <NuxtLink
                :to="`/news/${item.id}`"
                class="inline-flex items-center gap-2 text-sm font-semibold text-amber-700 dark:text-amber-400 hover:text-amber-800 dark:hover:text-amber-300 group-hover:translate-x-1.5 transition-transform"
              >
                <span>阅读全文</span>
                <span>&rarr;</span>
              </NuxtLink>
            </div>
          </article>
        </div>

        <!-- 空状态 -->
        <div
          v-if="status !== 'pending' && articles.length === 0"
          class="text-center py-20 bg-white dark:bg-[#211f1c] rounded-3xl border border-[#ddd8cf] dark:border-[#2d2a26]"
        >
          <p class="text-base text-[#6b655d] dark:text-[#8a8378]">当前分类下暂无文章动态</p>
          <button
            type="button"
            class="mt-4 text-sm font-medium text-amber-600 dark:text-amber-400 hover:underline cursor-pointer"
            @click="currentTab = 'all'"
          >
            查看全部专栏
          </button>
        </div>

        <!-- 统一分页组件 -->
        <div v-if="totalPages > 1" class="mt-14">
          <AppPagination
            v-model:current-page="currentPage"
            :total-pages="totalPages"
          />
        </div>
      </AppContainer>
    </section>
  </div>
</template>
