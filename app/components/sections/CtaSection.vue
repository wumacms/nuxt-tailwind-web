<template>
  <section class="py-16 md:py-24 bg-canvas">
    <AppContainer>
      <div
        class="relative overflow-hidden rounded-3xl [background:linear-gradient(135deg,var(--color-section-accent),color-mix(in_srgb,var(--color-section-accent)_75%,black))] px-6 py-12 sm:px-8 sm:py-16 md:px-16 md:py-20 text-center text-section-on-accent shadow-2xl animate-on-scroll"
      >
        <div class="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-section-on-accent/10 blur-3xl pointer-events-none"></div>
        <div class="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-section-on-accent/10 blur-3xl pointer-events-none"></div>

        <div class="relative max-w-3xl mx-auto">
          <h2 class="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight font-display text-section-on-accent">
            准备好记录你的故事了吗？
          </h2>
          <p class="mt-5 text-base sm:text-lg text-section-on-accent/90 max-w-2xl mx-auto leading-relaxed">
            无论是一次极具仪式感的个人写真，还是品牌年度商业视觉全案，Aperture 都能为你量身雕琢光影。
          </p>

          <div class="mt-8 flex flex-wrap gap-3 justify-center">
            <a
              href="#contact"
              class="px-6 sm:px-7 py-3 sm:py-3.5 rounded-xl bg-section-on-accent text-section-accent font-semibold hover:bg-section-on-accent/90 hover:scale-[1.02] active:scale-[0.98] transition-all inline-flex items-center gap-2 shadow-lg text-sm sm:text-base cursor-pointer select-none"
            >
              预约拍摄
              <svg class="w-4 h-4 transition-transform group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
            <a
              href="#contact"
              class="px-6 sm:px-7 py-3 sm:py-3.5 rounded-xl border border-section-on-accent/30 text-section-on-accent font-semibold hover:bg-section-on-accent/10 active:scale-[0.98] transition text-sm sm:text-base cursor-pointer select-none"
            >
              联系顾问
            </a>
          </div>

          <div class="mt-8 flex flex-wrap gap-x-8 gap-y-2 justify-center text-sm text-section-on-accent/90 font-medium">
            <span class="inline-flex items-center gap-1.5">✓ 免费方案咨询</span>
            <span class="inline-flex items-center gap-1.5">✓ 24小时极速响应</span>
            <span class="inline-flex items-center gap-1.5">✓ 拍摄不满意承诺重拍</span>
          </div>
        </div>
      </div>
    </AppContainer>
  </section>
</template>
