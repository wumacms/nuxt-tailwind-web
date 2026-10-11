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
              <Icon name="lucide:aperture" class="w-4 h-4 text-on-accent" />
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
                <Icon name="lucide:phone" class="w-3.5 h-3.5" />
                {{ brandInfo.phone }}
              </a>
              <span class="text-xs text-gray-400">（{{ brandInfo.hours }}）</span>
            </div>
          </div>

          <div class="mt-6 flex gap-3">
            <a href="#" title="Instagram" aria-label="Instagram"
              class="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-300 hover:text-white transition">
              <Icon name="simple-icons:instagram" class="w-4 h-4" />
            </a>
            <a href="#" title="微博" aria-label="微博"
              class="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-300 hover:text-white transition">
              <Icon name="simple-icons:sinaweibo" class="w-4 h-4" />
            </a>
            <a href="#" title="小红书" aria-label="小红书"
              class="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-300 hover:text-white transition">
              <Icon name="simple-icons:xiaohongshu" class="w-4 h-4" />
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
