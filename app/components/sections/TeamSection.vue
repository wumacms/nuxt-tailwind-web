<script setup lang="ts">
const { team } = useSiteData()
</script>

<template>
  <section class="py-20 md:py-28 lg:py-32 bg-surface">
    <AppContainer>
      <div class="max-w-2xl mx-auto text-center mb-12 md:mb-16">
        <span class="inline-block text-sm font-semibold text-accent uppercase tracking-wider animate-on-scroll">
          核心团队
        </span>
        <h2 class="mt-3 text-3xl sm:text-4xl md:text-5xl font-bold text-main tracking-tight font-display animate-on-scroll delay-50">
          镜头背后的眼睛
        </h2>
        <p class="mt-4 text-base md:text-lg text-muted animate-on-scroll delay-100">
          来自不同美学背景，却同样对光影探索充满克制与深沉的热情。
        </p>
      </div>

      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
        <div
          v-for="(member, idx) in team"
          :key="member.id"
          class="group text-center animate-on-scroll"
          :class="`delay-${(idx + 1) * 100}`"
        >
          <div class="aspect-square rounded-2xl overflow-hidden mb-4 shadow-lg border border-line">
            <img
              :src="member.avatar"
              :alt="member.name"
              class="w-full h-full object-cover group-hover:scale-105 transition duration-700"
              loading="lazy"
              width="500"
              height="500"
            />
          </div>
          <h3 class="font-bold text-base md:text-lg text-main">
            {{ member.name }}
          </h3>
          <p class="text-xs md:text-sm text-caption mt-1 font-medium">
            {{ member.role }}
          </p>
          <p v-if="member.bio" class="text-xs text-muted mt-2 line-clamp-2 px-1">
            {{ member.bio }}
          </p>
        </div>
      </div>
    </AppContainer>
  </section>
</template>
