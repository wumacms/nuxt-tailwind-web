<script setup lang="ts">
interface Props {
  limit?: number
  showViewAll?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  limit: 3,
  showViewAll: true,
})

const { products } = useSiteData()
const displayedProducts = computed(() => (products.value || []).slice(0, props.limit))
</script>

<template>
  <section class="py-20 md:py-28 lg:py-32 bg-canvas">
    <AppContainer>
      <div class="flex flex-wrap items-end justify-between gap-6 mb-10 md:mb-12 animate-on-scroll">
        <div class="max-w-xl">
          <span class="text-sm font-semibold text-accent uppercase tracking-wider">
            摄影商店
          </span>
          <h2 class="mt-3 text-3xl sm:text-4xl md:text-5xl font-bold text-main tracking-tight font-display">
            精选摄影周边与预设
          </h2>
        </div>
        <NuxtLink
          v-if="showViewAll"
          to="/products"
          class="text-accent font-medium inline-flex items-center gap-1 hover:gap-2 transition-all"
        >
          查看全部商品 &rarr;
        </NuxtLink>
      </div>

      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        <NuxtLink
          v-for="(product, idx) in displayedProducts"
          :key="product.id"
          :to="`/products/${product.id}`"
          class="group flex flex-col rounded-2xl border border-line bg-card overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 animate-on-scroll"
          :class="`delay-${(idx + 1) * 100}`"
        >
          <div class="relative aspect-[4/3] overflow-hidden bg-subtle">
            <img
              :src="product.coverImage"
              :alt="product.title"
              class="w-full h-full object-cover group-hover:scale-105 transition duration-700"
              loading="lazy"
              width="800"
              height="600"
            />
            <span
              v-if="product.tag"
              class="absolute top-4 left-4 text-xs font-semibold px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white shadow-sm"
            >
              {{ product.tag }}
            </span>
          </div>

          <div class="p-6 flex flex-col flex-1">
            <div class="flex items-center gap-2 text-xs text-caption mb-2 font-medium">
              <span>{{ product.categoryLabel }}</span>
            </div>
            <h3 class="font-bold text-lg text-main group-hover:text-accent transition">
              {{ product.title }}
            </h3>
            <p class="mt-2 text-sm text-muted leading-relaxed flex-1 line-clamp-2">
              {{ product.description }}
            </p>

            <div class="mt-5 pt-4 border-t border-line flex items-center justify-between">
              <div>
                <span class="text-2xl font-extrabold text-main font-display">
                  ¥{{ product.price }}
                </span>
              </div>
              <span class="text-accent text-sm font-medium group-hover:translate-x-1 transition-transform">
                查看详情 &rarr;
              </span>
            </div>
          </div>
        </NuxtLink>
      </div>
    </AppContainer>
  </section>
</template>
