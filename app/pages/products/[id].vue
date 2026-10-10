<script setup lang="ts">
import { ref, computed } from 'vue'
import type { ProductItem } from '~/types'

const route = useRoute()
const productId = computed(() => route.params.id as string)

// 模拟真实后端接口根据 ID 查询商品详情
const { fetchProductById } = useApi()
const { data: response, error } = await fetchProductById(productId)

if (error.value) {
  throw createError({
    statusCode: 404,
    statusMessage: '商品不存在或已下架',
    fatal: true,
  })
}

const currentProduct = computed(() => response.value?.data || ({} as ProductItem))

useSeoMeta({
  title: () => `${currentProduct.value.title || '商品'} - Aperture 摄影商店`,
  description: () => currentProduct.value.description || '',
})

const breadcrumbs = computed(() => [
  { label: '摄影商店', to: '/products' },
  { label: currentProduct.value.title || '商品详情' },
])

const isPurchasedModalOpen = ref(false)
</script>

<template>
  <div>
    <!-- 面包屑与产品头部 -->
    <section class="border-b border-[#ddd8cf] dark:border-[#2d2a26] bg-[#f3f0eb] dark:bg-[#1a1816] py-12 md:py-16">
      <AppContainer>
        <AppBreadcrumb :items="breadcrumbs" />
        <div class="max-w-3xl mt-4">
          <AppBadge variant="amber" class="mb-3">
            {{ currentProduct.categoryLabel }}
          </AppBadge>
          <h1 class="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#1a1816] dark:text-[#f5f2ed] font-display">
            {{ currentProduct.title }}
          </h1>
          <p class="text-base sm:text-lg text-[#4a4540] dark:text-[#c4bdb1] mt-3 leading-relaxed">
            {{ currentProduct.description }}
          </p>
        </div>
      </AppContainer>
    </section>

    <!-- 产品详情主体 -->
    <section class="py-16 md:py-24 bg-[#faf9f7] dark:bg-[#12100e]">
      <AppContainer>
        <div class="grid lg:grid-cols-2 gap-12 items-start">
          <!-- 左侧商品展示图 -->
          <div class="rounded-3xl overflow-hidden border border-[#ddd8cf] dark:border-[#2d2a26] shadow-xl bg-white dark:bg-[#211f1c]">
            <img
              :src="currentProduct.coverImage"
              :alt="currentProduct.title"
              class="w-full h-auto object-cover max-h-[550px]"
            />
          </div>

          <!-- 右侧购买与规格属性 -->
          <div class="space-y-8">
            <div class="bg-white dark:bg-[#211f1c] p-6 md:p-8 rounded-3xl border border-[#ddd8cf] dark:border-[#2d2a26] shadow-md space-y-6">
              <div class="flex items-baseline gap-3">
                <span class="text-4xl font-extrabold text-[#1a1816] dark:text-[#f5f2ed] font-display">
                  ¥{{ currentProduct.price }}
                </span>
                <span class="text-xs text-[#6b655d] dark:text-[#8a8378]">包含官方授权与终身售后服务</span>
              </div>

              <div class="pt-4 border-t border-[#ddd8cf] dark:border-[#2d2a26]">
                <h3 class="font-bold text-base text-[#1a1816] dark:text-[#f5f2ed] mb-3">
                  核心功能与产品特色
                </h3>
                <ul class="space-y-2.5">
                  <li
                    v-for="(feat, idx) in currentProduct.features"
                    :key="idx"
                    class="flex items-center gap-2.5 text-sm text-[#4a4540] dark:text-[#c4bdb1]"
                  >
                    <span class="text-amber-600 dark:text-amber-400 font-bold">✓</span>
                    <span>{{ feat }}</span>
                  </li>
                </ul>
              </div>

              <div class="pt-4 border-t border-[#ddd8cf] dark:border-[#2d2a26] flex flex-col gap-3">
                <AppButton
                  size="lg"
                  block
                  class="shadow-md"
                  @click="isPurchasedModalOpen = true"
                >
                  立即购买 / 获取下载
                </AppButton>
                <AppButton to="/products" variant="outline" size="md" block>
                  返回摄影商店
                </AppButton>
              </div>
            </div>

            <!-- 服务承诺卡片 -->
            <div class="p-6 rounded-2xl bg-[#f3f0eb] dark:bg-[#1a1816] border border-[#ddd8cf] dark:border-[#2d2a26] text-xs text-[#6b655d] dark:text-[#8a8378] space-y-2">
              <div class="font-semibold text-[#1a1816] dark:text-[#f5f2ed] text-sm">
                Aperture 官方正品保障
              </div>
              <p>数字预设产品购买后自动生成专属下载链接并发送至您的邮箱；实物商品由顺丰特快从上海工作室直发，支持 7 天无理由退换货。</p>
            </div>
          </div>
        </div>
      </AppContainer>
    </section>

    <!-- 弹窗反馈 -->
    <AppModal v-model="isPurchasedModalOpen" title="购买咨询通道">
      <div class="space-y-3">
        <p>感谢您对 Aperture 产品的喜爱！</p>
        <p class="text-xs text-[#6b655d] dark:text-[#8a8378]">
          实战演示版本中，请直接点击下方按钮前往预约咨询页，或联系官方客服微信获取该预设及画册购买通道。
        </p>
      </div>
      <template #footer>
        <AppButton to="/contact" size="sm">
          前往预约咨询
        </AppButton>
      </template>
    </AppModal>

    <CtaSection />
  </div>
</template>
