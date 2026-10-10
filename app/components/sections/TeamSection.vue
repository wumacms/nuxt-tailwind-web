<script setup lang="ts">
const { team } = useSiteData()
</script>

<template>
  <section class="py-20 md:py-28 lg:py-32 bg-[#f3f0eb] dark:bg-[#1a1816]">
    <AppContainer>
      <div class="max-w-2xl mx-auto text-center mb-12 md:mb-16 animate-on-scroll">
        <span class="text-sm font-semibold text-[#b45309] dark:text-[#f59e0b] uppercase tracking-wider">
          核心团队
        </span>
        <h2 class="mt-3 text-3xl sm:text-4xl md:text-5xl font-bold text-[#1a1816] dark:text-[#f5f2ed] tracking-tight font-display">
          镜头背后的眼睛
        </h2>
        <p class="mt-4 text-base md:text-lg text-[#4a4540] dark:text-[#c4bdb1]">
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
          <div class="aspect-square rounded-2xl overflow-hidden mb-4 shadow-lg border border-[#ddd8cf] dark:border-[#2d2a26]">
            <img
              :src="member.avatar"
              :alt="member.name"
              class="w-full h-full object-cover group-hover:scale-105 transition duration-700"
              loading="lazy"
              width="500"
              height="500"
            />
          </div>
          <h3 class="font-bold text-base md:text-lg text-[#1a1816] dark:text-[#f5f2ed]">
            {{ member.name }}
          </h3>
          <p class="text-xs md:text-sm text-[#6b655d] dark:text-[#8a8378] mt-1 font-medium">
            {{ member.role }}
          </p>
          <p v-if="member.bio" class="text-xs text-[#4a4540] dark:text-[#c4bdb1] mt-2 line-clamp-2 px-1">
            {{ member.bio }}
          </p>
        </div>
      </div>
    </AppContainer>
  </section>
</template>
