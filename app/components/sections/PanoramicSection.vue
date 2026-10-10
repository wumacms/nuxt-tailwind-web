<template>
  <section class="py-16 md:py-24 bg-[#faf9f7] dark:bg-[#12100e]">
    <AppContainer>
      <div class="max-w-3xl mx-auto text-center mb-10 md:mb-14 animate-on-scroll">
        <span class="text-sm font-semibold text-[#b45309] dark:text-[#f59e0b] uppercase tracking-wider">
          精选作品
        </span>
        <h2 class="mt-3 text-3xl sm:text-4xl md:text-5xl font-bold text-[#1a1816] dark:text-[#f5f2ed] tracking-tight font-display">
          每一帧，都是故事
        </h2>
        <p class="mt-4 text-base md:text-lg text-[#4a4540] dark:text-[#c4bdb1]">
          从人像到风景，从商业到纪实，我们持续用影像记录这个时代的体温与灵魂。
        </p>
      </div>

      <!-- 全景大图卡片 -->
      <div class="relative">
        <div
          class="absolute -top-10 left-1/2 -translate-x-1/2 w-3/4 h-28 blur-3xl -z-10 [background:radial-gradient(circle,rgba(245,158,11,.25)_0%,rgba(245,158,11,0)_70%)] dark:[background:radial-gradient(circle,rgba(245,158,11,.15)_0%,rgba(245,158,11,0)_70%)]"
        ></div>
        <div class="rounded-3xl overflow-hidden shadow-2xl border border-[#ddd8cf] dark:border-[#2d2a26]">
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
            class="inline-flex items-center justify-center w-11 h-11 rounded-xl mb-3 bg-[#fef3c7] text-[#b45309] dark:bg-[#78350f33] dark:text-[#f59e0b]"
          >
            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polygon points="12 2 2 7 12 12 22 7 12 2" />
              <polyline points="2 17 12 22 22 17" />
              <polyline points="2 12 12 17 22 12" />
            </svg>
          </div>
          <div class="font-bold text-base text-[#1a1816] dark:text-[#f5f2ed]">统一风格</div>
          <p class="mt-1.5 text-sm text-[#4a4540] dark:text-[#c4bdb1] leading-relaxed">
            专业色彩管理方案，让全系列品牌作品视觉严谨一致。
          </p>
        </div>

        <div class="animate-on-scroll delay-200">
          <div
            class="inline-flex items-center justify-center w-11 h-11 rounded-xl mb-3 bg-[#fef3c7] text-[#b45309] dark:bg-[#78350f33] dark:text-[#f59e0b]"
          >
            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 14 14" />
            </svg>
          </div>
          <div class="font-bold text-base text-[#1a1816] dark:text-[#f5f2ed]">快速交付</div>
          <p class="mt-1.5 text-sm text-[#4a4540] dark:text-[#c4bdb1] leading-relaxed">
            高效标准化制作流程，绝不耽误你的宣发与上市节点。
          </p>
        </div>

        <div class="animate-on-scroll delay-300">
          <div
            class="inline-flex items-center justify-center w-11 h-11 rounded-xl mb-3 bg-[#fef3c7] text-[#b45309] dark:bg-[#78350f33] dark:text-[#f59e0b]"
          >
            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="18" cy="5" r="3" />
              <circle cx="6" cy="12" r="3" />
              <circle cx="18" cy="19" r="3" />
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
              <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
            </svg>
          </div>
          <div class="font-bold text-base text-[#1a1816] dark:text-[#f5f2ed]">全平台适配</div>
          <p class="mt-1.5 text-sm text-[#4a4540] dark:text-[#c4bdb1] leading-relaxed">
            按需提供社交媒体、户外大牌、画册印刷等多规格输出。
          </p>
        </div>
      </div>
    </AppContainer>
  </section>
</template>
