<script setup lang="ts">
const primaryLinks = [
  { label: '网站首页', to: '/' },
  { label: '新闻动态', to: '/news' },
  { label: '摄影商店', to: '/products' },
  { label: '摄影学院', to: '/courses' },
  { label: '关于我们', to: '/about' },
]

const servicesList = [
  '商业静物广告拍摄',
  '高级时装与肖像写真',
  '建筑空间与全景航拍',
  '4K电影级视频制作',
  '数字色彩管理与修图',
]

const legalLinks = [
  { label: '关于工作室', to: '/about' },
  { label: '在线预约咨询', to: '/about#contact' },
  { label: '隐私保护政策', to: '/about' },
  { label: '版权声明', to: '/about' },
]
</script>

<template>
  <footer class="bg-gray-900 dark:bg-black text-gray-400 border-t border-gray-800">
    <div class="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-16">
      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 md:gap-10">
        <!-- Brand Info -->
        <div class="col-span-2 sm:col-span-3 lg:col-span-2">
          <NuxtLink to="/" class="flex items-center gap-2.5 font-bold text-lg text-white font-display">
            <span
              class="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white"
            >
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10" />
                <line x1="14.31" y1="8" x2="20.05" y2="17.94" />
                <line x1="9.69" y1="8" x2="21.17" y2="8" />
                <line x1="7.38" y1="12" x2="13.12" y2="2.06" />
                <line x1="9.69" y1="16" x2="3.95" y2="6.06" />
                <line x1="14.31" y1="16" x2="2.83" y2="16" />
                <line x1="16.62" y1="12" x2="10.88" y2="21.94" />
              </svg>
            </span>
            <span class="text-xl">Aperture</span>
          </NuxtLink>
          <p class="mt-4 text-sm leading-relaxed max-w-sm text-gray-400">
            用光影捕捉情绪，让每一帧都成为永恒。Aperture 致力于为品牌与创作者提供国际水准的视觉叙事服务。
          </p>
          <div class="mt-6 flex gap-3">
            <a
              href="#"
              title="Instagram"
              class="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-300 hover:text-white transition"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" stroke-width="2" />
                <circle cx="12" cy="12" r="4" stroke-width="2" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
              </svg>
            </a>
            <a
              href="#"
              title="微博"
              class="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-300 hover:text-white transition"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </a>
            <a
              href="#"
              title="小红书"
              class="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-300 hover:text-white transition"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
            </a>
          </div>
        </div>

        <!-- Links Column 1: 核心频道 -->
        <div>
          <h4 class="text-white font-medium text-sm mb-4">网站频道</h4>
          <ul class="space-y-2.5 text-sm">
            <li v-for="item in primaryLinks" :key="item.to">
              <NuxtLink :to="item.to" class="hover:text-white transition">
                {{ item.label }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Links Column 2: 拍摄领域 -->
        <div>
          <h4 class="text-white font-medium text-sm mb-4">核心业务</h4>
          <ul class="space-y-2.5 text-sm">
            <li v-for="srv in servicesList" :key="srv" class="text-gray-400">
              {{ srv }}
            </li>
          </ul>
        </div>

        <!-- Links Column 3: 关于与支持 -->
        <div>
          <h4 class="text-white font-medium text-sm mb-4">关于与支持</h4>
          <ul class="space-y-2.5 text-sm">
            <li v-for="item in legalLinks" :key="item.label">
              <NuxtLink :to="item.to" class="hover:text-white transition">
                {{ item.label }}
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Copyright Sub-bar -->
    <div class="border-t border-white/5">
      <div class="max-w-7xl mx-auto px-4 md:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500">
        <div>© 2025 Aperture Studio. 保留所有权利。</div>
        <div class="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          <span>沪ICP备2025000002号</span>
          <span>沪公网安备 31010602000002号</span>
        </div>
      </div>
    </div>
  </footer>
</template>
