<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const route = useRoute()
const colorMode = useColorMode()
const isMobileMenuOpen = ref(false)
const showAnnouncement = ref(true)
const isScrolled = ref(false)

const toggleTheme = () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}

const handleScroll = () => {
  if (typeof window !== 'undefined') {
    isScrolled.value = window.scrollY > 15
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  handleScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

const navItems = [
  { label: '首页', to: '/' },
  { label: '新闻', to: '/news' },
  { label: '商品', to: '/products' },
  { label: '课程', to: '/courses' },
  { label: '关于', to: '/about' },
]

const isActive = (path: string) => {
  if (path === '/') return route.path === '/'
  return route.path.startsWith(path)
}
</script>

<template>
  <!-- 顶部展讯公告栏（常规文档流，随页面滚动自然离开视口） -->
  <div
    v-if="showAnnouncement"
    class="bg-gray-900 dark:bg-black text-white text-xs sm:text-sm transition-all relative z-40"
  >
    <div class="max-w-7xl mx-auto px-4 md:px-8 py-2 flex items-center justify-between sm:justify-center gap-2 sm:gap-3 relative">
      <span class="inline-flex items-center gap-1.5 min-w-0">
        <span class="w-2 h-2 rounded-full bg-amber-400 animate-pulse flex-shrink-0"></span>
        <span class="truncate">新展开幕：Aperture「城市光影」年度摄影展现已开放预约</span>
      </span>
      <NuxtLink
        to="/news/urban-light-exhibition"
        class="hidden sm:inline-flex underline underline-offset-4 hover:text-amber-300 transition items-center gap-1 flex-shrink-0"
      >
        查看详情 &rarr;
      </NuxtLink>
      <button
        type="button"
        class="text-gray-400 hover:text-white text-xs sm:absolute sm:right-6 p-1 cursor-pointer"
        aria-label="关闭公告栏"
        @click="showAnnouncement = false"
      >
        ✕
      </button>
    </div>
  </div>

  <!-- 主导航条（吸顶固定：sticky top-0） -->
  <header
    id="site-header"
    class="sticky top-0 z-50 w-full transition-all duration-300"
    :class="[
      isScrolled
        ? 'shadow-lg backdrop-blur-md bg-[#faf9f7]/95 dark:bg-[#12100e]/95 border-b border-[#ddd8cf] dark:border-[#2d2a26]'
        : 'backdrop-blur-sm bg-[#faf9f7]/90 dark:bg-[#12100e]/90 border-b border-[#ddd8cf]/80 dark:border-[#2d2a26]/80',
    ]"
  >
    <nav class="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between gap-4">
      <!-- Brand Logo -->
      <NuxtLink
        to="/"
        class="flex items-center gap-2.5 font-bold text-lg font-display text-[#1a1816] dark:text-[#f5f2ed] flex-shrink-0"
      >
        <span
          class="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-600 via-orange-600 to-rose-600 flex items-center justify-center text-white shadow-md flex-shrink-0"
        >
          <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10" />
            <line x1="14.31" y1="8" x2="20.05" y2="17.94" />
            <line x1="9.69" y1="8" x2="21.17" y2="8" />
            <line x1="7.38" y1="12" x2="13.12" y2="2.06" />
            <line x1="9.69" y1="16" x2="3.95" y2="6.06" />
            <line x1="14.31" y1="16" x2="2.83" y2="16" />
            <line x1="16.62" y1="12" x2="10.88" y2="21.94" />
          </svg>
        </span>
        <span class="tracking-wider text-xl font-bold font-display">Aperture</span>
      </NuxtLink>

      <!-- Desktop Navigation Links (仅首页、新闻、商品、课程、关于) -->
      <ul class="hidden md:flex items-center gap-8 text-sm font-medium text-[#4a4540] dark:text-[#c4bdb1]">
        <li v-for="item in navItems" :key="item.to">
          <NuxtLink
            :to="item.to"
            class="transition py-1.5 relative hover:text-[#1a1816] dark:hover:text-[#f5f2ed]"
            :class="[
              isActive(item.to)
                ? 'text-[#1a1816] dark:text-[#f5f2ed] font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-amber-600 dark:after:bg-amber-400'
                : '',
            ]"
          >
            {{ item.label }}
          </NuxtLink>
        </li>
      </ul>

      <!-- Right Side Actions -->
      <div class="flex items-center gap-2.5 sm:gap-3 flex-shrink-0">
        <!-- Theme Toggle -->
        <button
          type="button"
          aria-label="切换明暗主题"
          class="w-10 h-10 rounded-xl text-[#4a4540] dark:text-[#c4bdb1] hover:text-[#1a1816] dark:hover:text-[#f5f2ed] flex items-center justify-center transition hover:bg-[#e8e4dd] dark:hover:bg-[#2d2a26] cursor-pointer"
          @click="toggleTheme"
        >
          <svg
            v-if="colorMode.value === 'dark'"
            class="w-5 h-5 text-amber-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
          <svg
            v-else
            class="w-5 h-5 text-gray-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
            />
          </svg>
        </button>

        <!-- 预约咨询 CTA (跳转关于页 #contact) -->
        <NuxtLink
          to="/about#contact"
          class="text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:opacity-90 transition shadow-sm inline-flex items-center gap-1.5"
        >
          <span>预约拍摄</span>
        </NuxtLink>

        <!-- Mobile Hamburger Menu Button -->
        <button
          type="button"
          aria-label="打开导航菜单"
          class="md:hidden w-10 h-10 rounded-xl text-[#4a4540] dark:text-[#c4bdb1] hover:text-[#1a1816] dark:hover:text-[#f5f2ed] flex items-center justify-center transition hover:bg-[#e8e4dd] dark:hover:bg-[#2d2a26] cursor-pointer"
          @click="isMobileMenuOpen = !isMobileMenuOpen"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              v-if="!isMobileMenuOpen"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
            <path
              v-else
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </nav>

    <!-- Mobile Dropdown Menu -->
    <div
      v-show="isMobileMenuOpen"
      class="md:hidden border-t border-[#ddd8cf] dark:border-[#2d2a26] bg-[#faf9f7] dark:bg-[#1a1816] transition-all"
    >
      <ul class="px-4 py-4 space-y-1.5 text-sm font-medium text-[#4a4540] dark:text-[#c4bdb1]">
        <li v-for="item in navItems" :key="item.to">
          <NuxtLink
            :to="item.to"
            class="block px-3.5 py-2.5 rounded-xl transition"
            :class="[
              isActive(item.to)
                ? 'bg-amber-100/70 dark:bg-amber-900/40 text-amber-800 dark:text-amber-300 font-semibold'
                : 'hover:bg-gray-100 dark:hover:bg-white/5',
            ]"
            @click="isMobileMenuOpen = false"
          >
            {{ item.label }}
          </NuxtLink>
        </li>
        <li class="pt-2 border-t border-[#ddd8cf] dark:border-[#2d2a26]">
          <NuxtLink
            to="/about#contact"
            class="block text-center w-full py-2.5 rounded-xl bg-amber-600 text-white font-medium hover:bg-amber-700 transition"
            @click="isMobileMenuOpen = false"
          >
            预约专属拍摄
          </NuxtLink>
        </li>
      </ul>
    </div>
  </header>
</template>
