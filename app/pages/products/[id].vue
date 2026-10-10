<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import type { ProductItem, ProductDetailData } from '~/types'

const route = useRoute()
const productId = computed(() => route.params.id as string)

// 模拟真实后端接口根据 ID 查询商品详情及推荐
const { fetchProductById } = useApi()
const { data: response, error } = await fetchProductById(productId)

if (error.value) {
  throw createError({
    statusCode: 404,
    statusMessage: '商品不存在或已下架',
    fatal: true,
  })
}

const productData = computed(() => response.value?.data as ProductDetailData | undefined)

// 兼容单对象返回或带 related 的结构
const currentProduct = computed(() => {
  if (productData.value && 'product' in productData.value) {
    return productData.value.product
  }
  return (productData.value as unknown as ProductItem) || ({} as ProductItem)
})

const relatedProducts = computed(() => {
  if (productData.value && 'related' in productData.value) {
    return productData.value.related || []
  }
  return []
})

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
  (newVal) => {
    if (newVal?.coverImage) {
      activeImage.value = newVal.coverImage
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

// 富文本段落生成与解析
const richTextContent = computed(() => {
  if (currentProduct.value.content) {
    return currentProduct.value.content
  }

  // 构造标准图文富文本 Markdown 内容
  const lines: string[] = []

  if (currentProduct.value.detailDescription) {
    lines.push('### 设计哲学与产品背景')
    lines.push(currentProduct.value.detailDescription)
  }

  if (currentProduct.value.highlights && currentProduct.value.highlights.length > 0) {
    lines.push('### 核心亮点与产品优势')
    const highlightLines = currentProduct.value.highlights.map((h) => `- **${h.title}**：${h.description}`)
    lines.push(highlightLines.join('\n'))
  }

  if (currentProduct.value.gallery && currentProduct.value.gallery.length > 1) {
    lines.push('### 实拍效果与细节展示')
    currentProduct.value.gallery.slice(1, 3).forEach((img, i) => {
      lines.push(`![${currentProduct.value.title} 实拍细节 ${i + 1}](${img})`)
    })
  }

  if (currentProduct.value.specs && currentProduct.value.specs.length > 0) {
    lines.push('### 规格参数清单')
    const tableLines = ['| 参数项目 | 规格详情 |', '| --- | --- |']
    currentProduct.value.specs.forEach((s) => {
      tableLines.push(`| ${s.label} | ${s.value} |`)
    })
    lines.push(tableLines.join('\n'))
  }

  if (currentProduct.value.packageIncludes && currentProduct.value.packageIncludes.length > 0) {
    lines.push('### 包装与交付内容')
    const packageLines = currentProduct.value.packageIncludes.map((item) => `- ${item}`)
    lines.push(packageLines.join('\n'))
  }

  if (currentProduct.value.usageGuide && currentProduct.value.usageGuide.length > 0) {
    lines.push('### 使用与操作指引')
    const guideLines = currentProduct.value.usageGuide.map((step, idx) => `${idx + 1}. ${step}`)
    lines.push(guideLines.join('\n'))
  }

  if (currentProduct.value.faqs && currentProduct.value.faqs.length > 0) {
    lines.push('### 常见问题解答')
    currentProduct.value.faqs.forEach((faq) => {
      lines.push(`> **问：${faq.question}**\n答：${faq.answer}`)
    })
  }

  return lines.join('\n\n')
})

const paragraphs = computed(() => {
  return richTextContent.value
    .trim()
    .split('\n\n')
    .map((p) => p.trim())
    .filter((p) => p.length > 0)
})

// 简单富文本辅助解析器
const extractImageUrl = (str: string) => {
  const match = str.match(/!\[.*?\]\((.*?)\)/)
  return match ? match[1] : ''
}

const extractImageAlt = (str: string) => {
  const match = str.match(/!\[(.*?)\]\(.*?\)/)
  return match ? match[1] : ''
}

const parseTableRows = (str: string) => {
  return str
    .split('\n')
    .filter((line) => line.includes('|') && !line.includes('---') && !line.includes('参数项目'))
    .map((line) =>
      line
        .split('|')
        .map((c) => c.trim())
        .filter(Boolean)
    )
    .filter((cells) => cells.length >= 2)
}

const formatInlineMarkdown = (text: string) => {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-main">$1</strong>')
    .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
}

// 购买弹窗
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
            <div
              class="relative rounded-3xl overflow-hidden border border-line bg-card shadow-lg group">
              <div
                class="aspect-[4/3] w-full overflow-hidden bg-subtle flex items-center justify-center">
                <img :src="activeImage || currentProduct.coverImage" :alt="currentProduct.title"
                  class="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out" />
              </div>

              <!-- 浮动标签 -->
              <div class="absolute top-4 left-4 flex flex-wrap gap-2">
                <span v-if="currentProduct.tag"
                  class="px-3 py-1 text-xs font-bold rounded-full bg-accent text-white shadow-md tracking-wide">
                  {{ currentProduct.tag }}
                </span>
                <span
                  class="px-3 py-1 text-xs font-semibold rounded-full bg-black/70 backdrop-blur-md text-white border border-white/20">
                  {{ currentProduct.categoryLabel }}
                </span>
              </div>
            </div>

            <!-- 缩略图选择器 -->
            <div v-if="galleryImages.length > 1" class="grid grid-cols-4 sm:grid-cols-5 gap-3">
              <button v-for="(img, idx) in galleryImages" :key="idx" type="button"
                class="relative aspect-[4/3] rounded-xl overflow-hidden border-2 transition-all duration-200 cursor-pointer bg-card"
                :class="[
                  activeImage === img
                    ? 'border-accent ring-2 ring-accent/30 shadow-md scale-102'
                    : 'border-line opacity-70 hover:opacity-100'
                ]" @click="activeImage = img">
                <img :src="img" :alt="`${currentProduct.title} 缩略图 ${idx + 1}`" class="w-full h-full object-cover" />
              </button>
            </div>
          </div>

          <!-- 右侧：商品信息与购买 -->
          <div class="lg:col-span-5 space-y-6">
            <div
              class="bg-card p-6 sm:p-8 rounded-3xl border border-line shadow-md space-y-6">

              <div>
                <div class="flex items-center justify-between gap-2 mb-2">
                  <AppBadge variant="amber">
                    {{ currentProduct.categoryLabel }}
                  </AppBadge>
                </div>

                <h1
                  class="text-2xl sm:text-3xl font-extrabold text-main font-display tracking-tight leading-snug">
                  {{ currentProduct.title }}
                </h1>

                <p class="mt-3 text-sm text-muted leading-relaxed">
                  {{ currentProduct.description }}
                </p>
              </div>

              <!-- 价格 -->
              <div
                class="p-4 rounded-2xl bg-surface/70 border border-line flex items-baseline justify-between">
                <div class="flex items-baseline gap-3">
                  <span class="text-xs text-caption">售价</span>
                  <span class="text-3xl sm:text-4xl font-extrabold text-main font-display">
                    ¥{{ currentProduct.price }}
                  </span>
                  <span v-if="currentProduct.originalPrice"
                    class="text-xs text-caption line-through">
                    ¥{{ currentProduct.originalPrice }}
                  </span>
                </div>
              </div>

              <!-- 核心特色清单 -->
              <div v-if="currentProduct.features && currentProduct.features.length > 0"
                class="pt-4 border-t border-line space-y-2">
                <div class="text-xs font-bold uppercase tracking-wider text-caption mb-2">
                  核心功能与特色
                </div>
                <ul class="space-y-2">
                  <li v-for="(feat, idx) in currentProduct.features" :key="idx"
                    class="flex items-start gap-2.5 text-xs text-muted leading-relaxed">
                    <span class="text-accent font-bold mt-0.5">✓</span>
                    <span>{{ feat }}</span>
                  </li>
                </ul>
              </div>

              <!-- 购买按钮组 -->
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

    <!-- 商品图文描述区域（标准富文本排版） -->
    <section class="py-12 md:py-20 bg-surface/50 border-t border-line">
      <AppContainer>
        <div class="max-w-7xl mx-auto">

          <article
            class="bg-card p-6 sm:p-10 md:p-14 rounded-3xl border border-line shadow-sm space-y-6 text-main">

            <div class="border-b border-line/60 pb-4 mb-6 flex items-center justify-between">
              <h2 class="text-xl sm:text-2xl font-bold font-display text-main">
                商品图文详情
              </h2>
            </div>

            <!-- 富文本内容段落循环渲染 -->
            <template v-for="(para, idx) in paragraphs" :key="idx">
              <!-- 三级标题 -->
              <h3 v-if="para.startsWith('### ')"
                class="text-xl sm:text-2xl font-bold font-display text-main pt-6 pb-2 border-b border-line/50">
                {{ para.replace('### ', '') }}
              </h3>

              <!-- 引用说明 / 问答块 -->
              <blockquote v-else-if="para.startsWith('> ')"
                class="p-4 sm:p-5 rounded-2xl bg-canvas border-l-4 border-accent text-muted my-4 text-sm sm:text-base leading-relaxed whitespace-pre-line">
                {{ para.replace(/^>\s*/, '') }}
              </blockquote>

              <!-- 富文本图片展示 -->
              <div v-else-if="para.startsWith('![')"
                class="my-6 rounded-2xl overflow-hidden border border-line shadow-sm bg-canvas">
                <img :src="extractImageUrl(para)" :alt="extractImageAlt(para)"
                  class="w-full h-auto max-h-[500px] object-cover" loading="lazy" />
                <div v-if="extractImageAlt(para)"
                  class="py-2 text-center text-xs text-caption border-t border-line/40">
                  {{ extractImageAlt(para) }}
                </div>
              </div>

              <!-- 规格参数表格 -->
              <div v-else-if="para.includes('| --- |')"
                class="my-6 overflow-hidden rounded-2xl border border-line">
                <table class="w-full text-left text-sm">
                  <tbody>
                    <tr v-for="(row, rIdx) in parseTableRows(para)" :key="rIdx"
                      class="border-b border-line/60 last:border-b-0"
                      :class="rIdx % 2 === 0 ? 'bg-surface/60' : 'bg-card'">
                      <td
                        class="py-3.5 px-5 font-semibold text-main w-1/3 sm:w-1/4 border-r border-line/40">
                        {{ row[0] }}
                      </td>
                      <td class="py-3.5 px-5 text-muted leading-relaxed">
                        {{ row[1] }}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <!-- 无序列表项 -->
              <div v-else-if="para.startsWith('- ')" class="space-y-2.5 my-3">
                <div v-for="(item, itemIdx) in para.split('\n')" :key="itemIdx"
                  class="flex items-start gap-2.5 text-sm sm:text-base text-muted leading-relaxed">
                  <span class="w-1.5 h-1.5 rounded-full bg-accent mt-2.5 flex-shrink-0"></span>
                  <span v-html="formatInlineMarkdown(item.replace(/^[-\*]\s*/, ''))"></span>
                </div>
              </div>

              <!-- 有序列表项 -->
              <div v-else-if="para.match(/^[0-9]\./)" class="space-y-2.5 my-3">
                <div v-for="(step, sIdx) in para.split('\n')" :key="sIdx"
                  class="flex items-start gap-3 p-3.5 rounded-xl bg-canvas border border-line/50 text-sm sm:text-base text-muted leading-relaxed">
                  <span
                    class="w-6 h-6 rounded-lg bg-accent-soft text-accent-soft-text font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                    {{ sIdx + 1 }}
                  </span>
                  <span class="flex-1" v-html="formatInlineMarkdown(step.replace(/^[0-9]+\.\s*/, ''))"></span>
                </div>
              </div>

              <!-- 普通文本段落 -->
              <p v-else class="text-base sm:text-lg text-muted leading-relaxed font-normal"
                v-html="formatInlineMarkdown(para)"></p>
            </template>

            <!-- 底部说明 -->
            <div
              class="mt-10 pt-6 border-t border-line flex flex-wrap items-center justify-between gap-4 text-xs text-caption">
              <div>© Aperture 官方正品严选 · 提供终身技术咨询</div>
              <div class="flex gap-2">
                <span
                  class="px-2.5 py-1 rounded bg-canvas border border-line">品质保证</span>
                <span
                  class="px-2.5 py-1 rounded bg-canvas border border-line">极速交付</span>
              </div>
            </div>

          </article>

        </div>
      </AppContainer>
    </section>

    <!-- 相关推荐商品区域 -->
    <section v-if="relatedProducts.length > 0"
      class="py-16 md:py-24 bg-canvas border-t border-line">
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
          <NuxtLink to="/products"
            class="text-xs sm:text-sm font-semibold text-accent hover:underline">
            查看全部商店商品 &rarr;
          </NuxtLink>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <NuxtLink v-for="rel in relatedProducts" :key="rel.id" :to="`/products/${rel.id}`"
            class="group flex flex-col rounded-2xl border border-line bg-card overflow-hidden shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div class="relative aspect-[16/10] overflow-hidden bg-subtle">
              <img :src="rel.coverImage" :alt="rel.title"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                loading="lazy" />
              <span v-if="rel.tag"
                class="absolute top-2.5 left-2.5 text-[10px] font-bold px-2 py-0.5 rounded-full bg-accent text-white shadow-xs">
                {{ rel.tag }}
              </span>
              <span
                class="absolute top-2.5 right-2.5 text-[10px] font-medium px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-xs text-white">
                {{ rel.categoryLabel }}
              </span>
            </div>

            <div class="p-4 flex flex-col flex-1 justify-between">
              <div>
                <h3
                  class="font-bold text-sm text-main group-hover:text-accent transition font-display line-clamp-1">
                  {{ rel.title }}
                </h3>
                <p class="mt-1 text-xs text-caption line-clamp-2 leading-relaxed">
                  {{ rel.description }}
                </p>
              </div>

              <div
                class="mt-3 pt-3 border-t border-line/60 flex items-center justify-between">
                <span class="text-base font-extrabold text-main font-display">
                  ¥{{ rel.price }}
                </span>
                <span
                  class="text-xs text-accent font-semibold group-hover:translate-x-1 transition-transform">
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
