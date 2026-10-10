<template>
  <section id="pricing" class="py-20 md:py-28 lg:py-32 bg-surface">
    <AppContainer>
      <div class="max-w-2xl mx-auto text-center mb-10 md:mb-14 animate-on-scroll">
        <span class="text-sm font-semibold text-accent uppercase tracking-wider">
          拍摄套餐
        </span>
        <h2 class="mt-3 text-3xl sm:text-4xl md:text-5xl font-bold text-main tracking-tight font-display">
          简单透明的价格
        </h2>
        <p class="mt-4 text-base md:text-lg text-muted">
          按需选择标准套餐，亦可根据品牌要求量身定制。
        </p>
      </div>

      <div class="grid md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
        <!-- 基础套餐 -->
        <div
          class="flex flex-col p-6 md:p-8 rounded-2xl border border-line bg-card animate-on-scroll delay-100"
        >
          <div class="w-10 h-10 rounded-xl flex items-center justify-center mb-4 bg-subtle text-muted">
            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
              <circle cx="12" cy="13" r="4" />
            </svg>
          </div>
          <h3 class="font-bold text-xl text-main">基础套餐</h3>
          <p class="mt-2 text-sm text-muted">适合个人写真与小型产品拍摄</p>
          <div class="mt-6 flex items-baseline">
            <span class="text-3xl md:text-4xl font-extrabold text-main font-display">¥1,999</span>
            <span class="text-caption text-sm ml-1">/次</span>
          </div>

          <ul class="mt-6 md:mt-8 space-y-3.5 text-sm flex-1 text-muted">
            <li class="flex items-center gap-2.5">
              <span class="text-accent font-bold">✓</span> 2 小时拍摄
            </li>
            <li class="flex items-center gap-2.5">
              <span class="text-accent font-bold">✓</span> 30 张精修成片
            </li>
            <li class="flex items-center gap-2.5">
              <span class="text-accent font-bold">✓</span> 1 个精选场景
            </li>
            <li class="flex items-center gap-2.5">
              <span class="text-accent font-bold">✓</span> 7 个工作日交付
            </li>
            <li class="flex items-center gap-2.5 text-caption opacity-60">
              <span class="font-bold">✕</span> 视频动态拍摄
            </li>
            <li class="flex items-center gap-2.5 text-caption opacity-60">
              <span class="font-bold">✕</span> 专属企划团队
            </li>
          </ul>

          <AppButton to="/about#contact" variant="outline" class="mt-8" block>
            立即预约
          </AppButton>
        </div>

        <!-- 专业套餐 (最受欢迎) -->
        <div
          class="relative flex flex-col p-6 md:p-8 rounded-2xl bg-gray-900 dark:bg-gray-800 text-white shadow-2xl lg:-translate-y-4 border-2 border-accent animate-on-scroll delay-200"
        >
          <span
            class="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full bg-accent text-xs font-semibold inline-flex items-center gap-1 shadow-md whitespace-nowrap text-white"
          >
            ★ 最受欢迎
          </span>
          <div class="w-10 h-10 rounded-xl bg-white/10 text-white flex items-center justify-center mb-4">
            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10" />
              <path d="m14.3 8 5.7 9.9" />
              <path d="M9.7 8h11.5" />
            </svg>
          </div>
          <h3 class="font-bold text-xl">专业套餐</h3>
          <p class="mt-2 text-sm text-gray-300">适合品牌形象、电商大片与商业活动</p>
          <div class="mt-6 flex items-baseline">
            <span class="text-3xl md:text-4xl font-extrabold font-display">¥5,999</span>
            <span class="text-gray-400 text-sm ml-1">/次</span>
          </div>

          <ul class="mt-6 md:mt-8 space-y-3.5 text-sm flex-1 text-gray-200">
            <li class="flex items-center gap-2.5">
              <span class="text-accent font-bold">✓</span> 全天专属拍摄（8 小时）
            </li>
            <li class="flex items-center gap-2.5">
              <span class="text-accent font-bold">✓</span> 100 张精修大片
            </li>
            <li class="flex items-center gap-2.5">
              <span class="text-accent font-bold">✓</span> 3 个内景/外景场景
            </li>
            <li class="flex items-center gap-2.5">
              <span class="text-accent font-bold">✓</span> 3 个工作日极速交付
            </li>
            <li class="flex items-center gap-2.5">
              <span class="text-accent font-bold">✓</span> 15 秒 4K 宣传短视频
            </li>
            <li class="flex items-center gap-2.5">
              <span class="text-accent font-bold">✓</span> 包含基础妆造搭配
            </li>
          </ul>

          <AppButton to="/about#contact" variant="accent" class="mt-8 shadow-md" block>
            立即预约
          </AppButton>
        </div>

        <!-- 企业定制 -->
        <div
          class="flex flex-col p-6 md:p-8 rounded-2xl border border-line bg-card animate-on-scroll delay-300"
        >
          <div class="w-10 h-10 rounded-xl flex items-center justify-center mb-4 bg-subtle text-muted">
            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" />
              <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2" />
              <path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2" />
            </svg>
          </div>
          <h3 class="font-bold text-xl text-main">企业定制</h3>
          <p class="mt-2 text-sm text-muted">适合长期合作、品牌全案与整合营销</p>
          <div class="mt-6 flex items-baseline">
            <span class="text-3xl md:text-4xl font-extrabold text-main font-display">专属定制</span>
          </div>

          <ul class="mt-6 md:mt-8 space-y-3.5 text-sm flex-1 text-muted">
            <li class="flex items-center gap-2.5">
              <span class="text-accent font-bold">✓</span> 全年战略合作框架
            </li>
            <li class="flex items-center gap-2.5">
              <span class="text-accent font-bold">✓</span> 不限单次拍摄数量
            </li>
            <li class="flex items-center gap-2.5">
              <span class="text-accent font-bold">✓</span> 首席创意团队驻场
            </li>
            <li class="flex items-center gap-2.5">
              <span class="text-accent font-bold">✓</span> 24 小时出片绿色通道
            </li>
            <li class="flex items-center gap-2.5">
              <span class="text-accent font-bold">✓</span> 4K/8K 电影机团队配备
            </li>
            <li class="flex items-center gap-2.5">
              <span class="text-accent font-bold">✓</span> 季度品牌视觉复盘报告
            </li>
          </ul>

          <AppButton to="/about#contact" variant="outline" class="mt-8" block>
            联系顾问
          </AppButton>
        </div>
      </div>
    </AppContainer>
  </section>
</template>
