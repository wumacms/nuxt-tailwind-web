<template>
  <section id="pricing" class="py-20 md:py-28 lg:py-32 bg-surface">
    <AppContainer>
      <div class="max-w-2xl mx-auto text-center mb-10 md:mb-14">
        <span class="inline-block text-sm font-semibold text-accent uppercase tracking-wider animate-on-scroll">
          拍摄套餐
        </span>
        <h2 class="mt-3 text-3xl sm:text-4xl md:text-5xl font-bold text-main tracking-tight font-display animate-on-scroll delay-50">
          简单透明的价格
        </h2>
        <p class="mt-4 text-base md:text-lg text-muted animate-on-scroll delay-100">
          按需选择标准套餐，亦可根据品牌要求量身定制。
        </p>
      </div>

      <div class="grid md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
        <!-- 基础套餐 -->
        <div
          class="flex flex-col p-6 md:p-8 rounded-2xl border border-line bg-card animate-on-scroll delay-100"
        >
          <div class="w-10 h-10 rounded-xl flex items-center justify-center mb-4 bg-subtle text-muted">
            <Icon name="lucide:camera" class="w-5 h-5" />
          </div>
          <h3 class="font-bold text-xl text-main">基础套餐</h3>
          <p class="mt-2 text-sm text-muted">适合个人写真与小型产品拍摄</p>
          <div class="mt-6 flex items-baseline">
            <span class="text-3xl md:text-4xl font-extrabold text-main font-display">¥1,999</span>
            <span class="text-caption text-sm ml-1">/次</span>
          </div>

          <ul class="mt-6 md:mt-8 space-y-3.5 text-sm flex-1 text-muted">
            <li class="flex items-center gap-2.5">
              <Icon name="lucide:check" class="w-4 h-4 text-accent shrink-0" /> 2 小时拍摄
            </li>
            <li class="flex items-center gap-2.5">
              <Icon name="lucide:check" class="w-4 h-4 text-accent shrink-0" /> 30 张精修成片
            </li>
            <li class="flex items-center gap-2.5">
              <Icon name="lucide:check" class="w-4 h-4 text-accent shrink-0" /> 1 个精选场景
            </li>
            <li class="flex items-center gap-2.5">
              <Icon name="lucide:check" class="w-4 h-4 text-accent shrink-0" /> 7 个工作日交付
            </li>
            <li class="flex items-center gap-2.5 text-caption opacity-60">
              <Icon name="lucide:x" class="w-4 h-4 shrink-0" /> 视频动态拍摄
            </li>
            <li class="flex items-center gap-2.5 text-caption opacity-60">
              <Icon name="lucide:x" class="w-4 h-4 shrink-0" /> 专属企划团队
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
            class="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full bg-accent text-xs font-semibold inline-flex items-center gap-1.5 shadow-md whitespace-nowrap text-on-accent"
          >
            <Icon name="lucide:sparkles" class="w-3.5 h-3.5 text-on-accent" />
            最受欢迎
          </span>
          <div class="w-10 h-10 rounded-xl bg-white/10 text-white flex items-center justify-center mb-4">
            <Icon name="lucide:aperture" class="w-5 h-5 text-accent" />
          </div>
          <h3 class="font-bold text-xl">专业套餐</h3>
          <p class="mt-2 text-sm text-gray-300">适合品牌形象、电商大片与商业活动</p>
          <div class="mt-6 flex items-baseline">
            <span class="text-3xl md:text-4xl font-extrabold font-display">¥5,999</span>
            <span class="text-gray-400 text-sm ml-1">/次</span>
          </div>

          <ul class="mt-6 md:mt-8 space-y-3.5 text-sm flex-1 text-gray-200">
            <li class="flex items-center gap-2.5">
              <Icon name="lucide:check" class="w-4 h-4 text-accent shrink-0" /> 全天专属拍摄（8 小时）
            </li>
            <li class="flex items-center gap-2.5">
              <Icon name="lucide:check" class="w-4 h-4 text-accent shrink-0" /> 100 张精修大片
            </li>
            <li class="flex items-center gap-2.5">
              <Icon name="lucide:check" class="w-4 h-4 text-accent shrink-0" /> 3 个内景/外景场景
            </li>
            <li class="flex items-center gap-2.5">
              <Icon name="lucide:check" class="w-4 h-4 text-accent shrink-0" /> 3 个工作日极速交付
            </li>
            <li class="flex items-center gap-2.5">
              <Icon name="lucide:check" class="w-4 h-4 text-accent shrink-0" /> 15 秒 4K 宣传短视频
            </li>
            <li class="flex items-center gap-2.5">
              <Icon name="lucide:check" class="w-4 h-4 text-accent shrink-0" /> 包含基础妆造搭配
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
            <Icon name="lucide:building-2" class="w-5 h-5" />
          </div>
          <h3 class="font-bold text-xl text-main">企业定制</h3>
          <p class="mt-2 text-sm text-muted">适合长期合作、品牌全案与整合营销</p>
          <div class="mt-6 flex items-baseline">
            <span class="text-3xl md:text-4xl font-extrabold text-main font-display">专属定制</span>
          </div>

          <ul class="mt-6 md:mt-8 space-y-3.5 text-sm flex-1 text-muted">
            <li class="flex items-center gap-2.5">
              <Icon name="lucide:check" class="w-4 h-4 text-accent shrink-0" /> 全年战略合作框架
            </li>
            <li class="flex items-center gap-2.5">
              <Icon name="lucide:check" class="w-4 h-4 text-accent shrink-0" /> 不限单次拍摄数量
            </li>
            <li class="flex items-center gap-2.5">
              <Icon name="lucide:check" class="w-4 h-4 text-accent shrink-0" /> 首席创意团队驻场
            </li>
            <li class="flex items-center gap-2.5">
              <Icon name="lucide:check" class="w-4 h-4 text-accent shrink-0" /> 24 小时出片绿色通道
            </li>
            <li class="flex items-center gap-2.5">
              <Icon name="lucide:check" class="w-4 h-4 text-accent shrink-0" /> 4K/8K 电影机团队配备
            </li>
            <li class="flex items-center gap-2.5">
              <Icon name="lucide:check" class="w-4 h-4 text-accent shrink-0" /> 季度品牌视觉复盘报告
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
