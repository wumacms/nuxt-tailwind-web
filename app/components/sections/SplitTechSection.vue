<template>
  <section class="py-20 md:py-28 lg:py-32 bg-surface">
    <AppContainer>
      <div class="grid lg:grid-cols-2 gap-10 md:gap-12 lg:gap-20 items-center">
        <!-- 左侧文本与指标 -->
        <div class="space-y-6 order-2 lg:order-1">
          <span class="inline-block text-sm font-semibold text-accent uppercase tracking-wider animate-on-scroll">
            后期与调色
          </span>
          <h2 class="text-3xl sm:text-4xl md:text-5xl font-bold text-main leading-tight tracking-tight font-display animate-on-scroll delay-50">
            从原片到成片<br />只差一次调色
          </h2>
          <p class="text-base md:text-lg text-muted leading-relaxed animate-on-scroll delay-100">
            我们使用专业色彩管理与 AI 辅助修图工作流，确保每一张照片都达到出版级品质。风格统一、细节丰富、经得起无损放大。
          </p>

          <div class="grid grid-cols-2 gap-4 pt-3 animate-on-scroll delay-150">
            <div class="p-5 rounded-2xl border border-line bg-card">
              <div
                class="w-10 h-10 rounded-xl flex items-center justify-center mb-3 bg-accent-soft text-accent-soft-text">
                <Icon name="lucide:sliders-horizontal" class="w-5 h-5" />
              </div>
              <div class="text-2xl md:text-3xl font-extrabold text-main font-display">100%</div>
              <div class="text-xs text-caption mt-1 font-medium">色彩准确度与色域一致</div>
            </div>

            <div class="p-5 rounded-2xl border border-line bg-card">
              <div
                class="w-10 h-10 rounded-xl flex items-center justify-center mb-3 bg-accent-soft text-accent-soft-text">
                <Icon name="lucide:clock" class="w-5 h-5" />
              </div>
              <div class="text-2xl md:text-3xl font-extrabold text-main font-display">-50%</div>
              <div class="text-xs text-caption mt-1 font-medium">AI 加速批量交付周期</div>
            </div>
          </div>
        </div>

        <!-- 右侧调色前后对比图 -->
        <div class="order-1 lg:order-2 animate-on-scroll delay-200">
          <div class="rounded-3xl overflow-hidden shadow-2xl border border-line">
            <img src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&h=700&fit=crop" alt="后期调色监视器工作台"
              class="w-full h-auto object-cover" loading="lazy" width="900" height="700" />
          </div>
        </div>
      </div>
    </AppContainer>
  </section>
</template>
