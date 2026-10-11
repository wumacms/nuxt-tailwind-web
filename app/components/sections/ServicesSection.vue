<script setup lang="ts">
import { computed } from 'vue'

const { services } = useSiteData()

// Filter to domain services (fashion, food, architecture)
const domainServices = computed(() =>
  (services.value || []).filter((s) => ['fashion', 'food', 'architecture'].includes(s.id))
)
</script>

<template>
  <section id="services" class="py-20 md:py-28 lg:py-32 bg-surface">
    <AppContainer>
      <div class="max-w-2xl mx-auto text-center mb-12 md:mb-16">
        <span class="inline-block text-sm font-semibold text-accent uppercase tracking-wider animate-on-scroll">
          拍摄领域
        </span>
        <h2 class="mt-3 text-3xl sm:text-4xl md:text-5xl font-bold text-main tracking-tight font-display animate-on-scroll delay-50">
          为不同行业定制视觉方案
        </h2>
        <p class="mt-4 text-base md:text-lg text-muted animate-on-scroll delay-100">
          无论你身处哪个行业，我们都有成熟的灯光布景与镜头叙事经验。
        </p>
      </div>

      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        <div
          v-for="(service, idx) in domainServices"
          :key="service.id"
          class="group rounded-2xl border border-line bg-card overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 animate-on-scroll flex flex-col"
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
                class="w-11 h-11 md:w-12 md:h-12 rounded-xl bg-accent flex items-center justify-center text-on-accent mb-5 shadow-md"
              >
                <AppIcon :name="service.icon || 'camera'" size="22" class="text-on-accent" />
              </div>

              <h3 class="text-xl font-bold mb-3 text-main">
                {{ service.title }}
              </h3>
              <p class="text-muted text-sm mb-5 leading-relaxed">
                {{ service.description }}
              </p>

              <ul v-if="service.highlights" class="space-y-2 text-sm text-muted mb-6">
                <li
                  v-for="(item, hIdx) in service.highlights"
                  :key="hIdx"
                  class="flex items-center gap-2"
                >
                  <Icon name="lucide:check" class="w-4 h-4 text-accent shrink-0" />
                  <span>{{ item }}</span>
                </li>
              </ul>
            </div>

            <NuxtLink
              :to="`/services/${service.id}`"
              class="text-accent font-medium text-sm inline-flex items-center gap-1 group-hover:gap-2 transition-all mt-auto pt-2"
            >
              <span>了解详情</span>
              <Icon name="lucide:arrow-right" class="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </NuxtLink>
          </div>
        </div>
      </div>
    </AppContainer>
  </section>
</template>
