<template>
  <section class="py-16 md:py-24 bg-canvas">
    <AppContainer>
      <div class="max-w-3xl mx-auto text-center mb-10 md:mb-14">
        <span class="inline-block text-sm font-semibold text-accent uppercase tracking-wider animate-on-scroll">
          精选作品
        </span>
        <h2 class="mt-3 text-3xl sm:text-4xl md:text-5xl font-bold text-main tracking-tight font-display animate-on-scroll delay-50">
          每一帧，都是故事
        </h2>
        <p class="mt-4 text-base md:text-lg text-muted animate-on-scroll delay-100">
          从人像到风景，从商业到纪实，我们持续用影像记录这个时代的体温与灵魂。
        </p>
      </div>

      <!-- 全景大图卡片 -->
      <div class="relative">
        <div
          class="absolute -top-10 left-1/2 -translate-x-1/2 w-3/4 h-28 blur-3xl -z-10 [background:radial-gradient(circle,color-mix(in_srgb,var(--color-accent)_25%,transparent)_0%,transparent_70%)]"
        ></div>
        <div class="rounded-3xl overflow-hidden shadow-2xl border border-line">
          <img
            src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1600&h=900&fit=crop"
            alt="摄影作品全景宏伟视野"
            class="w-full h-auto object-cover max-h-[580px]"
            loading="lazy"
            width="1600"
            height="900"
          />
        </div>
      </div>

      <!-- 下方三大保障 -->
      <div class="mt-8 md:mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 max-w-4xl mx-auto text-center">
        <div class="animate-on-scroll delay-100">
          <div
            class="inline-flex items-center justify-center w-11 h-11 rounded-xl mb-3 bg-accent-soft text-accent-soft-text"
          >
            <Icon name="lucide:layers" class="w-5 h-5" />
          </div>
          <div class="font-bold text-base text-main">统一风格</div>
          <p class="mt-1.5 text-sm text-muted leading-relaxed">
            专业色彩管理方案，让全系列品牌作品视觉严谨一致。
          </p>
        </div>

        <div class="animate-on-scroll delay-200">
          <div
            class="inline-flex items-center justify-center w-11 h-11 rounded-xl mb-3 bg-accent-soft text-accent-soft-text"
          >
            <Icon name="lucide:clock" class="w-5 h-5" />
          </div>
          <div class="font-bold text-base text-main">快速交付</div>
          <p class="mt-1.5 text-sm text-muted leading-relaxed">
            高效标准化制作流程，绝不耽误你的宣发与上市节点。
          </p>
        </div>

        <div class="animate-on-scroll delay-300">
          <div
            class="inline-flex items-center justify-center w-11 h-11 rounded-xl mb-3 bg-accent-soft text-accent-soft-text"
          >
            <Icon name="lucide:share-2" class="w-5 h-5" />
          </div>
          <div class="font-bold text-base text-main">全平台适配</div>
          <p class="mt-1.5 text-sm text-muted leading-relaxed">
            按需提供社交媒体、户外大牌、画册印刷等多规格输出。
          </p>
        </div>
      </div>
    </AppContainer>
  </section>
</template>
