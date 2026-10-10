<script setup lang="ts">
const config = useRuntimeConfig()
const qrcodeUrl = computed(() => `${config.app.baseURL.replace(/\/$/, '')}/qrcode.png`)
const { brandInfo } = useSiteData()

const primaryLinks = [
  { label: '网站首页', to: '/' },
  { label: '新闻动态', to: '/news' },
  { label: '摄影商店', to: '/products' },
  { label: '摄影学院', to: '/courses' },
  { label: '关于我们', to: '/about' },
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
              class="w-8 h-8 rounded-lg bg-accent flex items-center justify-center text-on-accent">
              <svg class="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
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

          <!-- 商务联系人与客服电话 -->
          <div class="mt-5 p-3.5 rounded-xl bg-white/[0.03] border border-white/5 space-y-2 text-xs md:text-sm max-w-sm">
            <div class="flex items-center gap-2">
              <span class="text-gray-400 flex-shrink-0">商务联系人：</span>
              <span class="text-gray-200 font-medium">李婷（创意总监）</span>
            </div>
            <div class="flex flex-wrap items-center gap-x-2 gap-y-1">
              <span class="text-gray-400 flex-shrink-0">客服咨询热线：</span>
              <a :href="`tel:${brandInfo.phone}`"
                class="text-accent hover:opacity-80 font-semibold tracking-wide transition inline-flex items-center gap-1.5">
                <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path
                    d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                {{ brandInfo.phone }}
              </a>
              <span class="text-xs text-gray-400">（{{ brandInfo.hours }}）</span>
            </div>
          </div>

          <div class="mt-6 flex gap-3">
            <a href="#" title="Instagram"
              class="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-300 hover:text-white transition">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" stroke-width="2" />
                <circle cx="12" cy="12" r="4" stroke-width="2" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
              </svg>
            </a>
            <a href="#" title="微博"
              class="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-300 hover:text-white transition">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </a>
            <a href="#" title="小红书"
              class="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-300 hover:text-white transition">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
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

        <!-- Links Column 2: 关于与支持 -->
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

        <!-- Links Column 3: 关注公众号 -->
        <div class="col-span-2 sm:col-span-1 text-center sm:text-left">
          <h4 class="text-white font-medium text-sm mb-4">关注公众号</h4>
          <div class="space-y-2.5">
            <div
              class="inline-block p-2 bg-white rounded-xl shadow-lg border border-white/10 group transition-transform hover:scale-105 duration-300">
              <div class="w-28 h-28 relative flex items-center justify-center overflow-hidden rounded-lg">
                <img :src="qrcodeUrl" alt="Aperture 官方微信公众号二维码" class="w-full h-full object-contain" loading="lazy" />
              </div>
            </div>
            <p class="text-xs text-gray-400 leading-relaxed">
              微信扫一扫关注公众号<br class="hidden sm:inline">
              获取最新客片与独家优惠
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Copyright Sub-bar -->
    <div class="border-t border-white/5">
      <div
        class="max-w-7xl mx-auto px-4 md:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500">
        <div>© 2025 Aperture Studio. 保留所有权利。</div>
        <div class="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          <span>沪ICP备2025000002号</span>
          <span>沪公网安备 31010602000002号</span>
        </div>
      </div>
    </div>
  </footer>
</template>
