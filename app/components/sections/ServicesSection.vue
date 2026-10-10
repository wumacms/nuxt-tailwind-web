<script setup lang="ts">
const { services } = useSiteData()

// Filter to domain services (fashion, food, architecture)
const domainServices = services.filter((s) => ['fashion', 'food', 'architecture'].includes(s.id))
</script>

<template>
  <section id="services" class="py-20 md:py-28 lg:py-32 bg-[#f3f0eb] dark:bg-[#1a1816]">
    <AppContainer>
      <div class="max-w-2xl mx-auto text-center mb-12 md:mb-16 animate-on-scroll">
        <span class="text-sm font-semibold text-[#b45309] dark:text-[#f59e0b] uppercase tracking-wider">
          拍摄领域
        </span>
        <h2 class="mt-3 text-3xl sm:text-4xl md:text-5xl font-bold text-[#1a1816] dark:text-[#f5f2ed] tracking-tight font-display">
          为不同行业定制视觉方案
        </h2>
        <p class="mt-4 text-base md:text-lg text-[#4a4540] dark:text-[#c4bdb1]">
          无论你身处哪个行业，我们都有成熟的灯光布景与镜头叙事经验。
        </p>
      </div>

      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        <div
          v-for="(service, idx) in domainServices"
          :key="service.id"
          class="group rounded-2xl border border-[#ddd8cf] dark:border-[#2d2a26] bg-white dark:bg-[#211f1c] overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 animate-on-scroll flex flex-col"
          :class="`delay-${(idx + 1) * 100}`"
        >
          <div class="aspect-[16/10] overflow-hidden relative">
            <img
              :src="service.coverImage"
              :alt="service.title"
              class="w-full h-full object-cover group-hover:scale-105 transition duration-700"
              loading="lazy"
              width="800"
              height="500"
            />
            <span
              v-if="service.tag"
              class="absolute top-3 right-3 text-xs font-medium px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-xs text-white"
            >
              {{ service.tag }}
            </span>
          </div>

          <div class="p-6 md:p-8 flex-1 flex flex-col justify-between">
            <div>
              <div
                class="w-11 h-11 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white mb-5 shadow-md"
              >
                <svg class="w-5 h-5 md:w-6 md:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                  <path d="M3 6h18" />
                  <path d="M16 10a4 4 0 0 1-8 0" />
                </svg>
              </div>

              <h3 class="text-xl font-bold mb-3 text-[#1a1816] dark:text-[#f5f2ed]">
                {{ service.title }}
              </h3>
              <p class="text-[#4a4540] dark:text-[#c4bdb1] text-sm mb-5 leading-relaxed">
                {{ service.description }}
              </p>

              <ul v-if="service.highlights" class="space-y-2 text-sm text-[#4a4540] dark:text-[#c4bdb1] mb-6">
                <li
                  v-for="(item, hIdx) in service.highlights"
                  :key="hIdx"
                  class="flex items-center gap-2"
                >
                  <svg class="w-4 h-4 text-[#b45309] dark:text-[#f59e0b] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{{ item }}</span>
                </li>
              </ul>
            </div>

            <NuxtLink
              :to="`/services/${service.id}`"
              class="text-[#b45309] dark:text-[#f59e0b] font-medium text-sm inline-flex items-center gap-1 group-hover:gap-2 transition-all mt-auto pt-2"
            >
              了解详情 <span>&rarr;</span>
            </NuxtLink>
          </div>
        </div>
      </div>
    </AppContainer>
  </section>
</template>
