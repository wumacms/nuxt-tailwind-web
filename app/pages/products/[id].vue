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
                  class="px-3 py-1 text-xs font-bold rounded-full bg-accent text-white shadow-md tracking-wide"
                >
                  {{ currentProduct.tag }}
                </span>
                <span
                  class="px-3 py-1 text-xs font-semibold rounded-full bg-black/70 backdrop-blur-md text-white border border-white/20"
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

    <!-- 商品图文结构化深度详情区域（摒弃脆弱反向解析，直接结构化呈现） -->
    <section class="py-12 md:py-20 bg-surface/50 border-t border-line">
      <AppContainer>
        <div class="max-w-5xl mx-auto space-y-12">
          <!-- 1. 设计哲学与产品背景 -->
          <div v-if="currentProduct.detailDescription" class="bg-card p-6 sm:p-10 rounded-3xl border border-line shadow-sm space-y-4">
            <h2 class="text-xl sm:text-2xl font-bold font-display text-main pb-3 border-b border-line/60">
              设计哲学与产品背景
            </h2>
            <p class="text-base sm:text-lg text-muted leading-relaxed">
              {{ currentProduct.detailDescription }}
            </p>
          </div>

          <!-- 2. 核心亮点与产品优势 -->
          <div v-if="currentProduct.highlights && currentProduct.highlights.length > 0" class="space-y-6">
            <h2 class="text-xl sm:text-2xl font-bold font-display text-main text-center sm:text-left">
              核心亮点与产品优势
            </h2>
            <div class="grid sm:grid-cols-2 gap-6">
              <div
                v-for="(hl, idx) in currentProduct.highlights"
                :key="idx"
                class="bg-card p-6 rounded-2xl border border-line shadow-sm space-y-2.5 hover:shadow-md transition"
              >
                <div class="flex items-center gap-2">
                  <span class="w-7 h-7 rounded-lg bg-accent-soft text-accent-soft-text font-bold text-xs flex items-center justify-center">
                    0{{ idx + 1 }}
                  </span>
                  <h3 class="font-bold text-base text-main font-display">
                    {{ hl.title }}
                  </h3>
                </div>
                <p class="text-sm text-muted leading-relaxed">
                  {{ hl.description }}
                </p>
              </div>
            </div>
          </div>

          <!-- 3. 实拍效果与细节展示 -->
          <div v-if="currentProduct.gallery && currentProduct.gallery.length > 1" class="space-y-6">
            <h2 class="text-xl sm:text-2xl font-bold font-display text-main">
              实拍效果与细节展示
            </h2>
            <div class="grid sm:grid-cols-2 gap-6">
              <div
                v-for="(img, idx) in currentProduct.gallery.slice(1)"
                :key="idx"
                class="rounded-2xl overflow-hidden border border-line bg-card shadow-sm group"
              >
                <div class="aspect-[16/10] overflow-hidden">
                  <img
                    :src="img"
                    :alt="`${currentProduct.title} 实拍细节 ${idx + 1}`"
                    class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                </div>
                <div class="p-3 text-center text-xs text-caption border-t border-line/40">
                  {{ currentProduct.title }} · 细节样片 0{{ idx + 1 }}
                </div>
              </div>
            </div>
          </div>

          <!-- 4. 规格参数清单 -->
          <div v-if="currentProduct.specs && currentProduct.specs.length > 0" class="bg-card p-6 sm:p-8 rounded-3xl border border-line shadow-sm space-y-6">
            <h2 class="text-xl sm:text-2xl font-bold font-display text-main pb-2 border-b border-line/60">
              规格参数清单
            </h2>
            <div class="overflow-hidden rounded-2xl border border-line">
              <table class="w-full text-left text-sm">
                <tbody>
                  <tr
                    v-for="(spec, sIdx) in currentProduct.specs"
                    :key="sIdx"
                    class="border-b border-line/60 last:border-b-0"
                    :class="sIdx % 2 === 0 ? 'bg-surface/50' : 'bg-card'"
                  >
                    <td class="py-3.5 px-5 font-semibold text-main w-1/3 sm:w-1/4 border-r border-line/40">
                      {{ spec.label }}
                    </td>
                    <td class="py-3.5 px-5 text-muted leading-relaxed">
                      {{ spec.value }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- 5. 包装与交付内容 & 使用操作指引 (双栏并排) -->
          <div
            v-if="(currentProduct.packageIncludes && currentProduct.packageIncludes.length > 0) || (currentProduct.usageGuide && currentProduct.usageGuide.length > 0)"
            class="grid md:grid-cols-2 gap-6"
          >
            <!-- 包装内容 -->
            <div v-if="currentProduct.packageIncludes" class="bg-card p-6 rounded-3xl border border-line shadow-sm space-y-4">
              <h2 class="text-lg font-bold font-display text-main pb-2 border-b border-line/60">
                包装与交付内容
              </h2>
              <ul class="space-y-3">
                <li
                  v-for="(item, idx) in currentProduct.packageIncludes"
                  :key="idx"
                  class="flex items-start gap-3 text-sm text-muted leading-relaxed"
                >
                  <span class="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0"></span>
                  <span>{{ item }}</span>
                </li>
              </ul>
            </div>

            <!-- 使用操作指引 -->
            <div v-if="currentProduct.usageGuide" class="bg-card p-6 rounded-3xl border border-line shadow-sm space-y-4">
              <h2 class="text-lg font-bold font-display text-main pb-2 border-b border-line/60">
                使用与操作指引
              </h2>
              <ol class="space-y-3">
                <li
                  v-for="(step, sIdx) in currentProduct.usageGuide"
                  :key="sIdx"
                  class="flex items-start gap-3 p-3 rounded-xl bg-canvas border border-line/50 text-sm text-muted leading-relaxed"
                >
                  <span class="w-5 h-5 rounded-md bg-accent-soft text-accent-soft-text font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                    {{ sIdx + 1 }}
                  </span>
                  <span class="flex-1">{{ step }}</span>
                </li>
              </ol>
            </div>
          </div>

          <!-- 6. 常见问题解答 -->
          <div v-if="currentProduct.faqs && currentProduct.faqs.length > 0" class="bg-card p-6 sm:p-8 rounded-3xl border border-line shadow-sm space-y-4">
            <h2 class="text-xl sm:text-2xl font-bold font-display text-main pb-2 border-b border-line/60">
              常见问题解答
            </h2>
            <div class="space-y-3">
              <details
                v-for="(faq, fIdx) in currentProduct.faqs"
                :key="fIdx"
                class="group p-4 rounded-xl border border-line/60 bg-surface/30 open:bg-surface/70 transition"
              >
                <summary class="font-semibold text-sm text-main cursor-pointer list-none flex items-center justify-between">
                  <span>{{ faq.question }}</span>
                  <span class="text-accent transition-transform group-open:rotate-45 font-bold text-lg">+</span>
                </summary>
                <p class="mt-3 text-sm text-muted leading-relaxed pt-3 border-t border-line/40">
                  {{ faq.answer }}
                </p>
              </details>
            </div>
          </div>

          <!-- 底部保障声明 -->
          <div class="pt-6 border-t border-line flex flex-wrap items-center justify-between gap-4 text-xs text-caption">
            <div>© Aperture 官方正品严选 · 提供终身技术咨询与正版授权</div>
            <div class="flex gap-2">
              <span class="px-2.5 py-1 rounded bg-card border border-line">品质保证</span>
              <span class="px-2.5 py-1 rounded bg-card border border-line">极速交付</span>
              <span class="px-2.5 py-1 rounded bg-card border border-line">终身支持</span>
            </div>
          </div>
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
