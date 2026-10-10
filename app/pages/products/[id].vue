<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import type { ProductItem, ProductDetailData } from '~/types'

const route = useRoute()
const productId = computed(() => route.params.id as string)

// 通过标准接口获取商品详情与相关推荐
const { fetchProductById } = useApi()
const { data: response, error } = await fetchProductById(productId)

if (error.value) {
  throw createError({
    statusCode: 404,
    statusMessage: '商品不存在或已下架',
    fatal: true,
  })
}

const detailData = computed<ProductDetailData | undefined>(() => response.value?.data)
const currentProduct = computed<ProductItem>(() => detailData.value?.product || ({} as ProductItem))
const relatedProducts = computed<ProductItem[]>(() => detailData.value?.related || [])

useSeoMeta({
  title: () => `${currentProduct.value.title || '商品'} - Aperture 摄影商店`,
  description: () => currentProduct.value.description || currentProduct.value.detailDescription || '',
  ogImage: () => currentProduct.value.coverImage,
})

const breadcrumbs = computed(() => [
  { label: '摄影商店', to: '/products' },
  { label: currentProduct.value.categoryLabel || '商品分类', to: `/products?category=${currentProduct.value.category}` },
  { label: currentProduct.value.title || '商品详情' },
])

// 图片画廊选择
const activeImage = ref<string>('')
watch(
  () => currentProduct.value,
  (product) => {
    if (product?.coverImage) {
      activeImage.value = product.coverImage
    }
  },
  { immediate: true }
)

const galleryImages = computed(() => {
  const images = currentProduct.value.gallery || []
  if (images.length === 0 && currentProduct.value.coverImage) {
    return [currentProduct.value.coverImage]
  }
  return images
})

// 购买弹窗控制
const isPurchasedModalOpen = ref(false)
</script>

<template>
  <div>
    <!-- 面包屑导航与头部背景 -->
    <section class="border-b border-line bg-surface py-6 md:py-8">
      <AppContainer>
        <AppBreadcrumb :items="breadcrumbs" />
      </AppContainer>
    </section>

    <!-- 商品核心购买区域 -->
    <section class="py-10 md:py-16 bg-canvas">
      <AppContainer>
        <div class="grid lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          <!-- 左侧：商品画廊 -->
          <div class="lg:col-span-7 space-y-4">
            <div class="relative rounded-3xl overflow-hidden border border-line bg-card shadow-lg group">
              <div class="aspect-[4/3] w-full overflow-hidden bg-subtle flex items-center justify-center">
                <img
                  :src="activeImage || currentProduct.coverImage"
                  :alt="currentProduct.title"
                  class="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>

              <!-- 浮动标签 -->
              <div class="absolute top-4 left-4 flex flex-wrap gap-2">
                <span
                  v-if="currentProduct.tag"
                  class="px-3 py-1 text-xs font-bold rounded-full bg-black/60 backdrop-blur-md text-white shadow-sm tracking-wide"
                >
                  {{ currentProduct.tag }}
                </span>
                <span
                  class="px-3 py-1 text-xs font-semibold rounded-full bg-black/60 backdrop-blur-md text-white shadow-sm"
                >
                  {{ currentProduct.categoryLabel }}
                </span>
              </div>
            </div>

            <!-- 缩略图选择器 -->
            <div v-if="galleryImages.length > 1" class="grid grid-cols-4 sm:grid-cols-5 gap-3">
              <button
                v-for="(img, idx) in galleryImages"
                :key="idx"
                type="button"
                class="relative aspect-[4/3] rounded-xl overflow-hidden border-2 transition-all duration-200 cursor-pointer bg-card"
                :class="[
                  activeImage === img
                    ? 'border-accent ring-2 ring-accent/30 shadow-md scale-102'
                    : 'border-line opacity-70 hover:opacity-100',
                ]"
                @click="activeImage = img"
              >
                <img :src="img" :alt="`${currentProduct.title} 缩略图 ${idx + 1}`" class="w-full h-full object-cover" />
              </button>
            </div>
          </div>

          <!-- 右侧：商品信息与购买面板 -->
          <div class="lg:col-span-5 space-y-6">
            <div class="bg-card p-6 sm:p-8 rounded-3xl border border-line shadow-md space-y-6">
              <div>
                <div class="flex items-center justify-between gap-2 mb-2">
                  <AppBadge variant="amber">
                    {{ currentProduct.categoryLabel }}
                  </AppBadge>
                  <span v-if="currentProduct.rating" class="text-xs font-semibold text-amber-600 dark:text-amber-400">
                    ★ {{ currentProduct.rating }} ({{ currentProduct.salesCount || 100 }}+ 已售)
                  </span>
                </div>

                <h1 class="text-2xl sm:text-3xl font-extrabold text-main font-display tracking-tight leading-snug">
                  {{ currentProduct.title }}
                </h1>

                <p class="mt-3 text-sm text-muted leading-relaxed">
                  {{ currentProduct.description }}
                </p>
              </div>

              <!-- 价格板块 -->
              <div class="p-4 rounded-2xl bg-surface/70 border border-line flex items-baseline justify-between">
                <div class="flex items-baseline gap-3">
                  <span class="text-xs text-caption">售价</span>
                  <span class="text-3xl sm:text-4xl font-extrabold text-main font-display">
                    ¥{{ currentProduct.price }}
                  </span>
                  <span v-if="currentProduct.originalPrice" class="text-xs text-caption line-through">
                    ¥{{ currentProduct.originalPrice }}
                  </span>
                </div>
                <span class="text-xs font-medium text-emerald-600 dark:text-emerald-400">
                  官方正版授权
                </span>
              </div>

              <!-- 核心特色清单 -->
              <div v-if="currentProduct.features && currentProduct.features.length > 0" class="pt-4 border-t border-line space-y-2">
                <div class="text-xs font-bold uppercase tracking-wider text-caption mb-2">
                  核心功能与特色
                </div>
                <ul class="space-y-2">
                  <li
                    v-for="(feat, idx) in currentProduct.features"
                    :key="idx"
                    class="flex items-start gap-2.5 text-xs text-muted leading-relaxed"
                  >
                    <span class="text-accent font-bold mt-0.5">✓</span>
                    <span>{{ feat }}</span>
                  </li>
                </ul>
              </div>

              <!-- 购买按钮 -->
              <div class="pt-2 flex flex-col gap-3">
                <AppButton size="lg" block class="shadow-md font-bold" @click="isPurchasedModalOpen = true">
                  立即购买 / 获取下载
                </AppButton>
              </div>
            </div>
          </div>
        </div>
      </AppContainer>
    </section>

    <!-- 商品图文详情区域（富文本描述） -->
    <section class="py-12 md:py-20 bg-surface/50 border-t border-line">
      <AppContainer>
        <div class="bg-card p-6 sm:p-10 md:p-12 rounded-3xl border border-line shadow-sm text-main leading-relaxed">
          <div v-html="currentProduct.content || currentProduct.detailDescription"></div>
        </div>
      </AppContainer>
    </section>

    <!-- 相关推荐商品区域 -->
    <section v-if="relatedProducts.length > 0" class="py-16 md:py-24 bg-canvas border-t border-line">
      <AppContainer>
        <div class="flex items-baseline justify-between mb-10">
          <div>
            <div class="text-xs font-bold text-accent uppercase tracking-widest mb-1">
              RECOMMENDED
            </div>
            <h2 class="text-2xl sm:text-3xl font-extrabold text-main font-display">
              相关商品推荐
            </h2>
          </div>
          <NuxtLink to="/products" class="text-xs sm:text-sm font-semibold text-accent hover:underline">
            查看全部商店商品 &rarr;
          </NuxtLink>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <NuxtLink
            v-for="rel in relatedProducts"
            :key="rel.id"
            :to="`/products/${rel.id}`"
            class="group flex flex-col rounded-2xl border border-line bg-card overflow-hidden shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            <div class="relative aspect-[16/10] overflow-hidden bg-subtle">
              <img
                :src="rel.coverImage"
                :alt="rel.title"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
              <span
                v-if="rel.tag"
                class="absolute top-2.5 left-2.5 text-[10px] font-bold px-2 py-0.5 rounded-full bg-accent text-white shadow-xs"
              >
                {{ rel.tag }}
              </span>
              <span
                class="absolute top-2.5 right-2.5 text-[10px] font-medium px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-xs text-white"
              >
                {{ rel.categoryLabel }}
              </span>
            </div>

            <div class="p-4 flex flex-col flex-1 justify-between">
              <div>
                <h3 class="font-bold text-sm text-main group-hover:text-accent transition font-display line-clamp-1">
                  {{ rel.title }}
                </h3>
                <p class="mt-1 text-xs text-caption line-clamp-2 leading-relaxed">
                  {{ rel.description }}
                </p>
              </div>

              <div class="mt-3 pt-3 border-t border-line/60 flex items-center justify-between">
                <span class="text-base font-extrabold text-main font-display">
                  ¥{{ rel.price }}
                </span>
                <span class="text-xs text-accent font-semibold group-hover:translate-x-1 transition-transform">
                  查看详情 &rarr;
                </span>
              </div>
            </div>
          </NuxtLink>
        </div>
      </AppContainer>
    </section>

    <!-- 交互式购买与咨询弹窗 -->
    <AppModal v-model="isPurchasedModalOpen" title="购买咨询通道">
      <div class="space-y-3">
        <p>感谢您对《{{ currentProduct.title }}》的关注！</p>
        <p class="text-xs text-caption">
          本站为实战演示企业官网项目。您可以点击下方联系我们，或在官方交流群中获取专属购买与下载通道。
        </p>
      </div>
      <template #footer>
        <AppButton to="/about#contact" size="sm">
          前往预约咨询
        </AppButton>
      </template>
    </AppModal>

    <!-- 底部行动呼吁 -->
    <CtaSection />
  </div>
</template>
