<script setup lang="ts">
const { partners } = useSiteData()
</script>

<template>
  <section class="py-10 sm:py-12 border-y border-line bg-surface">
    <AppContainer>
      <p class="text-center text-sm text-caption mb-6 sm:mb-8 font-medium">
        受到以下知名品牌与主流媒体信赖
      </p>
      <div class="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div class="flex gap-10 md:gap-16 animate-marquee w-max">
          <!-- 走马灯一组 -->
          <div class="flex gap-10 md:gap-16 items-center text-lg md:text-2xl font-bold text-caption whitespace-nowrap font-display">
            <span v-for="item in partners" :key="item.name" class="inline-flex items-center gap-2.5">
              <AppIcon v-if="item.icon" :name="item.icon" size="18" class="text-accent/80 shrink-0" />
              <span v-else class="w-2 h-2 rounded-full bg-accent/60"></span>
              {{ item.name }}
            </span>
          </div>
          <!-- 走马灯复制组（实现无缝衔接） -->
          <div aria-hidden="true" class="flex gap-10 md:gap-16 items-center text-lg md:text-2xl font-bold text-caption whitespace-nowrap font-display">
            <span v-for="item in partners" :key="`dup-${item.name}`" class="inline-flex items-center gap-2.5">
              <AppIcon v-if="item.icon" :name="item.icon" size="18" class="text-accent/80 shrink-0" />
              <span v-else class="w-2 h-2 rounded-full bg-accent/60"></span>
              {{ item.name }}
            </span>
          </div>
        </div>
      </div>
    </AppContainer>
  </section>
</template>
