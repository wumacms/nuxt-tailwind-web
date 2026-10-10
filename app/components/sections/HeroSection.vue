<template>
  <section class="relative overflow-hidden">
    <!-- 背景渐变与光晕 -->
    <div class="absolute inset-0 -z-10 bg-gradient-to-b from-[#f3f0eb] to-[#faf9f7] dark:from-[#1a1816] dark:to-[#12100e]"></div>
    <div class="absolute top-[-10%] right-[-5%] w-[500px] sm:w-[700px] h-[500px] sm:h-[700px] rounded-full blur-3xl -z-10 animate-pulse-glow [background:radial-gradient(circle,rgba(245,158,11,.22)_0%,rgba(245,158,11,0)_70%)] dark:[background:radial-gradient(circle,rgba(245,158,11,.15)_0%,rgba(245,158,11,0)_70%)]"></div>
    <div class="absolute bottom-[-20%] left-[-10%] w-[400px] sm:w-[500px] h-[400px] sm:h-[500px] rounded-full blur-3xl -z-10 [background:radial-gradient(circle,rgba(120,53,15,.18)_0%,rgba(120,53,15,0)_70%)] dark:[background:radial-gradient(circle,rgba(180,83,9,.12)_0%,rgba(180,83,9,0)_70%)]"></div>

    <AppContainer class="py-16 md:py-24 grid lg:grid-cols-[1.05fr_1fr] gap-12 lg:gap-16 items-center">
      <!-- 左侧文案与行动号召 -->
      <div class="space-y-6 md:space-y-7">
        <span class="inline-flex items-center gap-2 text-xs font-medium px-3 py-1.5 rounded-full bg-[#fef3c7] text-[#92400e] dark:bg-[#78350f33] dark:text-[#fcd34d] border border-amber-100 dark:border-amber-900/50 animate-on-scroll delay-100">
          <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
            <circle cx="12" cy="13" r="4" />
          </svg>
          全新视觉叙事系列 · 2025
        </span>

        <h1 class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-[#1a1816] dark:text-[#f5f2ed] leading-[1.05] font-display animate-on-scroll delay-200">
          让每一帧<br />
          <span class="bg-gradient-to-r from-amber-600 via-orange-600 to-rose-600 bg-clip-text text-transparent">成为永恒</span>
        </h1>

        <p class="text-base sm:text-lg md:text-xl text-[#4a4540] dark:text-[#c4bdb1] max-w-lg leading-relaxed animate-on-scroll delay-300">
          Aperture 专注于商业摄影、人像与品牌视觉叙事。我们用光影捕捉情绪，让画面替你说话。
        </p>

        <div class="flex flex-wrap gap-3 pt-2 animate-on-scroll delay-400">
          <AppButton to="/about#contact" size="lg" class="shadow-lg shadow-gray-900/20 dark:shadow-white/10">
            预约拍摄
            <span class="ml-1 text-base">&rarr;</span>
          </AppButton>
          <AppButton to="/cases" variant="outline" size="lg" class="bg-white dark:bg-[#211f1c]">
            <svg class="w-4 h-4 mr-1 text-amber-600 dark:text-amber-400" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
            查看作品集
          </AppButton>
        </div>

        <!-- 客户信赖统计堆叠 -->
        <div class="flex flex-wrap items-center gap-4 pt-4 animate-on-scroll delay-500">
          <div class="flex -space-x-2 flex-shrink-0">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=faces"
              alt="Client avatar"
              class="w-8 h-8 rounded-full border-2 border-[#faf9f7] dark:border-[#12100e] object-cover"
            />
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=64&h=64&fit=crop&crop=faces"
              alt="Client avatar"
              class="w-8 h-8 rounded-full border-2 border-[#faf9f7] dark:border-[#12100e] object-cover"
            />
            <img
              src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=64&h=64&fit=crop&crop=faces"
              alt="Client avatar"
              class="w-8 h-8 rounded-full border-2 border-[#faf9f7] dark:border-[#12100e] object-cover"
            />
            <span class="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold text-white bg-[#b45309] dark:bg-[#f59e0b] border-2 border-[#faf9f7] dark:border-[#12100e]">
              +2k
            </span>
          </div>
          <div class="text-sm text-[#6b655d] dark:text-[#8a8378]">
            <span class="font-semibold text-[#1a1816] dark:text-[#f5f2ed]">800+</span> 位客户的选择
          </div>
        </div>
      </div>

      <!-- 右侧画廊卡片 -->
      <div class="relative">
        <div class="relative rounded-2xl overflow-hidden shadow-2xl border border-[#ddd8cf] dark:border-[#2d2a26] bg-white dark:bg-[#211f1c] animate-on-scroll delay-300">
          <div class="flex items-center gap-1.5 px-4 py-3 border-b border-[#ddd8cf] dark:border-[#2d2a26] bg-[#e8e4dd] dark:bg-[#2d2a26]">
            <span class="w-2.5 h-2.5 rounded-full bg-red-400"></span>
            <span class="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
            <span class="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
            <span class="ml-3 text-[11px] text-[#6b655d] dark:text-[#8a8378] font-mono truncate">aperture.studio/gallery</span>
          </div>
          <img
            src="https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=1200&h=800&fit=crop"
            alt="Aperture 摄影作品展示"
            class="w-full h-auto block object-cover"
            loading="eager"
            width="1200"
            height="800"
          />
        </div>
      </div>
    </AppContainer>
  </section>
</template>
