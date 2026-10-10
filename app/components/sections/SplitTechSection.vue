<template>
  <section class="py-20 md:py-28 lg:py-32 bg-[#f3f0eb] dark:bg-[#1a1816]">
    <AppContainer>
      <div class="grid lg:grid-cols-2 gap-10 md:gap-12 lg:gap-20 items-center">
        <!-- 左侧文本与指标 -->
        <div class="space-y-6 order-2 lg:order-1 animate-on-scroll delay-100">
          <span class="text-sm font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
            后期与调色
          </span>
          <h2 class="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1a1816] dark:text-[#f5f2ed] leading-tight tracking-tight font-display">
            从原片到成片<br />只差一次调色
          </h2>
          <p class="text-base md:text-lg text-[#4a4540] dark:text-[#c4bdb1] leading-relaxed">
            我们使用专业色彩管理与 AI 辅助修图工作流，确保每一张照片都达到出版级品质。风格统一、细节丰富、经得起无损放大。
          </p>

          <div class="grid grid-cols-2 gap-4 pt-3">
            <div class="p-5 rounded-2xl border border-[#ddd8cf] dark:border-[#2d2a26] bg-white dark:bg-[#211f1c]">
              <div class="w-10 h-10 rounded-xl flex items-center justify-center mb-3 bg-[#ecfdf5] text-[#059669] dark:bg-[#064e3b33] dark:text-[#34d399]">
                <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <line x1="4" y1="21" x2="4" y2="14" />
                  <line x1="4" y1="10" x2="4" y2="3" />
                  <line x1="12" y1="21" x2="12" y2="12" />
                  <line x1="12" y1="8" x2="12" y2="3" />
                  <line x1="20" y1="21" x2="20" y2="16" />
                  <line x1="20" y1="12" x2="20" y2="3" />
                  <line x1="1" y1="14" x2="7" y2="14" />
                  <line x1="9" y1="8" x2="15" y2="8" />
                  <line x1="17" y1="16" x2="23" y2="16" />
                </svg>
              </div>
              <div class="text-2xl md:text-3xl font-extrabold text-[#1a1816] dark:text-[#f5f2ed] font-display">100%</div>
              <div class="text-xs text-[#6b655d] dark:text-[#8a8378] mt-1 font-medium">色彩准确度与色域一致</div>
            </div>

            <div class="p-5 rounded-2xl border border-[#ddd8cf] dark:border-[#2d2a26] bg-white dark:bg-[#211f1c]">
              <div class="w-10 h-10 rounded-xl flex items-center justify-center mb-3 bg-[#fef3c7] text-[#b45309] dark:bg-[#78350f33] dark:text-[#f59e0b]">
                <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </div>
              <div class="text-2xl md:text-3xl font-extrabold text-[#1a1816] dark:text-[#f5f2ed] font-display">-50%</div>
              <div class="text-xs text-[#6b655d] dark:text-[#8a8378] mt-1 font-medium">AI 加速批量交付周期</div>
            </div>
          </div>
        </div>

        <!-- 右侧调色前后对比图 -->
        <div class="order-1 lg:order-2 animate-on-scroll delay-200">
          <div class="rounded-3xl overflow-hidden shadow-2xl border border-[#ddd8cf] dark:border-[#2d2a26]">
            <img
              src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&h=700&fit=crop"
              alt="后期调色监视器工作台"
              class="w-full h-auto object-cover"
              loading="lazy"
              width="900"
              height="700"
            />
          </div>
        </div>
      </div>
    </AppContainer>
  </section>
</template>
