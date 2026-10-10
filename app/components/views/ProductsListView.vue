<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { buildListUrl } from '~/utils/route-helper'
import { PAGE_SIZES, PRODUCT_CATEGORIES } from '~/constants/site'

const route = useRoute()

const breadcrumbs = [{ label: '摄影商店' }]

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
const pageSize = PAGE_SIZES.products

useSeoMeta({
  title: computed(() => {
    const pageSuffix = currentPage.value > 1 ? ` (第 ${currentPage.value} 页)` : ''
    return `摄影商店与调色预设${pageSuffix} - Aperture`
  }),
  description: '选购 Aperture 精选调色预设、联名摄影配件包及典藏精装摄影集。',
})

// 监听路由参数变化，保持响应式更新
watch(
  () => [route.params.category, route.params.page, route.query.category, route.query.page],
  () => {
    currentTab.value = parseCategory()
    currentPage.value = parsePage()
  }
)

const { fetchProducts } = useApi()
const { data: response, status } = await fetchProducts({
  category: currentTab,
  page: currentPage,
  pageSize,
})

const products = computed(() => response.value?.data?.list || [])
const total = computed(() => response.value?.data?.total || 0)
const totalPages = computed(() => response.value?.data?.totalPages || 1)
const counts = computed(() => response.value?.data?.categoryCounts || {})

const tabs = computed(() =>
  PRODUCT_CATEGORIES.map((cat) => ({
    id: cat.id,
    label: cat.label,
    count: counts.value[cat.id] ?? 0,
    to: buildListUrl('products', cat.id, 1),
  }))
)
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
        <!-- 分类筛选条件（静态超链接 Tab） -->
        <div class="mb-10 flex flex-wrap items-center justify-between gap-4">
          <AppTabs v-model="currentTab" :tabs="tabs" />
          <div class="text-xs text-caption">
            共找到 <span class="font-bold text-accent">{{ total }}</span> 件严选商品
          </div>
        </div>

        <!-- 加载中微状态提示 -->
        <div v-if="status === 'pending'" class="py-12 text-center text-sm text-caption">
          <span class="inline-block animate-spin mr-2">◌</span> 正在加载商品列表...
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
                class="absolute top-4 left-4 text-[11px] font-semibold px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white shadow-sm"
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
          <NuxtLink
            to="/products"
            class="mt-4 text-sm font-medium text-accent hover:underline inline-block cursor-pointer"
          >
            查看全部商品
          </NuxtLink>
        </div>

        <!-- 分页组件（静态物理链接） -->
        <div v-if="totalPages > 1" class="mt-14">
          <AppPagination
            v-model:current-page="currentPage"
            :total-pages="totalPages"
            :get-page-url="(p) => buildListUrl('products', currentTab, p)"
          />
        </div>
      </AppContainer>
    </section>
  </div>
</template>
