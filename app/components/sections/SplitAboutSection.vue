<template>
  <section class="py-20 md:py-28 lg:py-32 bg-[#faf9f7] dark:bg-[#12100e]">
    <AppContainer>
      <div class="grid lg:grid-cols-2 gap-10 md:gap-12 lg:gap-20 items-center">
        <!-- 摄影工作图 -->
        <div class="order-1 animate-on-scroll delay-100">
          <div class="rounded-3xl overflow-hidden shadow-2xl border border-[#ddd8cf] dark:border-[#2d2a26]">
            <img
              src="https://images.unsplash.com/photo-1554048612-b6a482bc67e5?w=900&h=700&fit=crop"
              alt="摄影师现场创作"
              class="w-full h-auto object-cover"
              loading="lazy"
              width="900"
              height="700"
            />
          </div>
        </div>

        <!-- 为什么选择我们 说明 -->
        <div class="space-y-6 order-2 animate-on-scroll delay-200">
          <span class="text-sm font-semibold text-[#b45309] dark:text-[#f59e0b] uppercase tracking-wider">
            为什么选择我们
          </span>
          <h2 class="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1a1816] dark:text-[#f5f2ed] leading-tight tracking-tight font-display">
            不只是拍照<br />更是视觉策略
          </h2>
          <p class="text-base md:text-lg text-[#4a4540] dark:text-[#c4bdb1] leading-relaxed">
            我们相信好的影像不只是好看，更要能传递品牌价值、打动人心、带来转化。从策略到执行，全程为你考虑。
          </p>

          <ul class="space-y-5 pt-2">
            <li class="flex items-start gap-3.5">
              <span
                class="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-[#fef3c7] text-[#b45309] dark:bg-[#78350f33] dark:text-[#f59e0b]"
              >
                ✓
              </span>
              <div>
                <div class="font-bold text-[#1a1816] dark:text-[#f5f2ed]">专业团队，全流程把控</div>
                <p class="text-sm text-[#4a4540] dark:text-[#c4bdb1] mt-1">
                  导演、摄影、灯光、后期，各环节均由经验丰富的资深人员负责。
                </p>
              </div>
            </li>
            <li class="flex items-start gap-3.5">
              <span
                class="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-[#fef3c7] text-[#b45309] dark:bg-[#78350f33] dark:text-[#f59e0b]"
              >
                ✓
              </span>
              <div>
                <div class="font-bold text-[#1a1816] dark:text-[#f5f2ed]">定制化方案，拒绝千篇一律</div>
                <p class="text-sm text-[#4a4540] dark:text-[#c4bdb1] mt-1">
                  每个项目都从深入了解你的品牌定位与目标受众开始绘制专属情绪板。
                </p>
              </div>
            </li>
            <li class="flex items-start gap-3.5">
              <span
                class="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-[#fef3c7] text-[#b45309] dark:bg-[#78350f33] dark:text-[#f59e0b]"
              >
                ✓
              </span>
              <div>
                <div class="font-bold text-[#1a1816] dark:text-[#f5f2ed]">高效交付，不耽误你的节奏</div>
                <p class="text-sm text-[#4a4540] dark:text-[#c4bdb1] mt-1">
                  标准商业项目 7 个工作日内交付，急单支持开启 48 小时极速交付通道。
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </AppContainer>
  </section>
</template>
