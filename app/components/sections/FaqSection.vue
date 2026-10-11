<script setup lang="ts">
const { faqs } = useSiteData()
</script>

<template>
  <section id="faq" class="py-20 md:py-28 lg:py-32 bg-surface">
    <div class="max-w-3xl mx-auto px-4 md:px-8">
      <div class="text-center mb-10 md:mb-14">
        <span class="inline-block text-sm font-semibold text-accent uppercase tracking-wider animate-on-scroll">
          常见问题
        </span>
        <h2 class="mt-3 text-3xl sm:text-4xl md:text-5xl font-bold text-main tracking-tight font-display animate-on-scroll delay-50">
          你可能想知道
        </h2>
        <p class="mt-4 text-base text-muted animate-on-scroll delay-100">
          关于拍摄流程、成片交付与异地差旅的常见解答。
        </p>
      </div>

      <div class="space-y-4">
        <details
          v-for="(item, idx) in faqs"
          :key="idx"
          :open="idx === 0"
          class="group p-5 md:p-6 rounded-2xl border border-line bg-card transition-all open:shadow-md animate-on-scroll"
          :class="`delay-${(idx + 1) * 100}`"
        >
          <summary class="flex items-center justify-between gap-4 cursor-pointer list-none select-none">
            <span class="font-bold text-main text-base md:text-lg">
              {{ item.question }}
            </span>
            <span class="faq-icon text-accent text-xl font-bold flex-shrink-0 transition-transform duration-250">
              +
            </span>
          </summary>
          <p class="mt-4 text-muted text-sm md:text-base leading-relaxed pt-3 border-t border-line/60">
            {{ item.answer }}
          </p>
        </details>
      </div>
    </div>
  </section>
</template>
