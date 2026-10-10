<script setup lang="ts">
import { ref, computed, watch } from 'vue'

useSeoMeta({
  title: '摄影商店与调色预设 - Aperture',
  description: '选购 Aperture 精选调色预设、联名摄影配件包及典藏精装摄影集。',
})

const route = useRoute()
const router = useRouter()

const breadcrumbs = [{ label: '摄影商店' }]

// 从 URL 查询参数中读取初始分类与页码
const parseCategory = (cat: unknown): string => {
  return typeof cat === 'string' && cat.trim() ? cat.trim() : 'all'
}

const parsePage = (p: unknown): number => {
  const pageNum = parseInt(String(p), 10)
  return !isNaN(pageNum) && pageNum > 0 ? pageNum : 1
}

const currentTab = ref(parseCategory(route.query.category))
const currentPage = ref(parsePage(route.query.page))
const pageSize = 8

// 模拟真实后端接口获取商品分页数据
const { fetchProducts } = useApi()
const { data: response, status } = await fetchProducts({
  category: currentTab,
  page: currentPage,
  pageSize,
})

// 将筛选与分页状态同步至 URL Query 参数
const syncUrl = () => {
  const query: Record<string, string> = {}
  if (currentTab.value && currentTab.value !== 'all') {
    query.category = currentTab.value
  }
  if (currentPage.value > 1) {
    query.page = String(currentPage.value)
  }

  const currentQueryCat = (route.query.category as string) || ''
  const targetQueryCat = query.category || ''
  const currentQueryPage = (route.query.page as string) || ''
  const targetQueryPage = query.page || ''

  if (currentQueryCat !== targetQueryCat || currentQueryPage !== targetQueryPage) {
    router.push({
      path: route.path,
      query,
    })
  }
}

// 当分类切换时，重置当前页码到第 1 页并更新 URL
watch(currentTab, () => {
  currentPage.value = 1
  syncUrl()
})

// 当页码变化时，更新 URL
watch(currentPage, () => {
  syncUrl()
})

// 监听浏览器前进/后退等路由 URL Query 变化，保持响应式同步
watch(
  () => route.query,
  (newQuery) => {
    const nextTab = parseCategory(newQuery.category)
    const nextPage = parsePage(newQuery.page)

    if (currentTab.value !== nextTab) {
      currentTab.value = nextTab
    }
    if (currentPage.value !== nextPage) {
      currentPage.value = nextPage
    }
  }
)

const products = computed(() => response.value?.data?.list || [])
const total = computed(() => response.value?.data?.total || 0)
const totalPages = computed(() => response.value?.data?.totalPages || 1)
const counts = computed(() => response.value?.data?.categoryCounts || {})

const tabs = computed(() => [
  { id: 'all', label: '全部商品', count: counts.value.all ?? 0 },
  { id: 'presets', label: '调色预设', count: counts.value.presets ?? 0 },
  { id: 'gear', label: '摄影配件', count: counts.value.gear ?? 0 },
  { id: 'book', label: '摄影画册', count: counts.value.book ?? 0 },
])
</script>

<template>
  <div>
    <!-- 头部带有背景图片的统一 Banner 组件 -->
    <PageBanner
      title="摄影商店与数字资产"
      subtitle="将沉淀多年的色彩科学带入你的日常创作。包含经过严格实战检验的 Lightroom 预设、耐用通勤配件与精装画册。"
      badge="官方正品"
      bg-image="https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=1600&h=700&fit=crop"
      :breadcrumbs="breadcrumbs"
    />

    <!-- 网格分页列表主体 -->
    <section class="py-16 md:py-24 bg-canvas">
      <AppContainer>
        <!-- 分类筛选条件 -->
        <div class="mb-10 flex flex-wrap items-center justify-between gap-4">
          <AppTabs v-model="currentTab" :tabs="tabs" />
          <div class="text-xs text-caption">
            共找到 <span class="font-bold text-accent">{{ total }}</span> 件严选商品
          </div>
        </div>

        <!-- 加载中微状态提示 -->
        <div v-if="status === 'pending'" class="py-12 text-center text-sm text-caption">
          <span class="inline-block animate-spin mr-2">◌</span> 正在从接口获取商品列表...
        </div>

        <!-- 商品网格列表（4列电商矩阵布局） -->
        <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-6">
          <NuxtLink
            v-for="product in products"
            :key="product.id"
            :to="`/products/${product.id}`"
            class="group flex flex-col rounded-2xl border border-line bg-card overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            <div class="relative aspect-[16/10] overflow-hidden bg-subtle">
              <img
                :src="product.coverImage"
                :alt="product.title"
                class="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                loading="lazy"
                width="800"
                height="500"
              />
              <span
                v-if="product.tag"
                class="absolute top-3 left-3 text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-accent text-white shadow-md"
              >
                {{ product.tag }}
              </span>
              <span class="absolute top-3 right-3 text-[11px] font-medium px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-white">
                {{ product.categoryLabel }}
              </span>
            </div>

            <div class="p-5 flex flex-col flex-1 justify-between">
              <div>
                <h2 class="font-bold text-base md:text-lg text-main group-hover:text-accent transition font-display line-clamp-1">
                  {{ product.title }}
                </h2>
                <p class="mt-1.5 text-xs sm:text-sm text-muted leading-relaxed line-clamp-2">
                  {{ product.description }}
                </p>

                <!-- 特色清单 -->
                <ul v-if="product.features" class="mt-3 space-y-1 text-xs text-caption">
                  <li v-for="(feat, fIdx) in product.features.slice(0, 2)" :key="fIdx" class="flex items-center gap-1.5">
                    <span class="text-accent font-bold">✓</span>
                    <span class="truncate">{{ feat }}</span>
                  </li>
                </ul>
              </div>

              <div class="mt-4 pt-3.5 border-t border-line/60 flex items-center justify-between">
                <div class="flex items-baseline gap-1">
                  <span class="text-[11px] text-caption">售价</span>
                  <span class="text-lg md:text-xl font-extrabold text-main font-display">
                    ¥{{ product.price }}
                  </span>
                </div>
                <span class="text-accent text-xs font-semibold group-hover:translate-x-1 transition-transform">
                  查看详情 &rarr;
                </span>
              </div>
            </div>
          </NuxtLink>
        </div>

        <!-- 空状态 -->
        <div
          v-if="status !== 'pending' && products.length === 0"
          class="text-center py-20 bg-card rounded-3xl border border-line"
        >
          <p class="text-base text-caption">当前分类下暂无商品</p>
          <button
            type="button"
            class="mt-4 text-sm font-medium text-accent hover:underline cursor-pointer"
            @click="currentTab = 'all'"
          >
            查看全部商品
          </button>
        </div>

        <!-- 分页组件 -->
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
