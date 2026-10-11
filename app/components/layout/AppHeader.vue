<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

const route = useRoute()
const colorMode = useColorMode()
const isMobileMenuOpen = ref(false)
const showAnnouncement = ref(true)
const { scrollY } = useScroll()
const isScrolled = computed(() => scrollY.value > 15)

const { articles } = useSiteData()
const exhibitionArticleId = computed(() => {
  const list = articles.value || []
  const exhibition = list.find((a) => a.category === 'exhibition') || list[0]
  return exhibition?.id || ''
})

const toggleTheme = () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}

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
  <div v-if="showAnnouncement"
    class="bg-gray-900 dark:bg-black text-white text-xs sm:text-sm transition-all relative z-40">
    <div
      class="max-w-7xl mx-auto px-4 md:px-8 py-2 flex items-center justify-between sm:justify-center gap-2 sm:gap-3 relative">
      <span class="inline-flex items-center gap-1.5 min-w-0">
        <span class="w-2 h-2 rounded-full bg-accent animate-pulse flex-shrink-0"></span>
        <span class="truncate">新展开幕：Aperture「城市光影」年度摄影展现已开放预约</span>
      </span>
      <NuxtLink :to="exhibitionArticleId ? `/news/${exhibitionArticleId}` : '/news'"
        class="hidden sm:inline-flex underline underline-offset-4 hover:text-accent transition items-center gap-1 flex-shrink-0">
        查看详情 &rarr;
      </NuxtLink>
      <button type="button" class="text-gray-400 hover:text-white text-xs sm:absolute sm:right-6 p-1 cursor-pointer"
        aria-label="关闭公告栏" @click="showAnnouncement = false">
        ✕
      </button>
    </div>
  </div>

  <!-- 主导航条（吸顶固定：sticky top-0） -->
  <header id="site-header" class="sticky top-0 z-50 w-full transition-all duration-300" :class="[
    isScrolled
      ? 'shadow-lg backdrop-blur-md bg-canvas/95 border-b border-line'
      : 'backdrop-blur-sm bg-canvas/90 border-b border-line/80',
  ]">
    <nav class="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between gap-4">
      <!-- Brand Logo -->
      <NuxtLink to="/"
        class="flex items-center gap-2.5 font-bold text-lg font-display text-main flex-shrink-0">
        <span
          class="w-9 h-9 rounded-xl bg-accent flex items-center justify-center text-on-accent shadow-md flex-shrink-0">
          <Icon name="lucide:aperture" class="w-5 h-5 text-on-accent" />
        </span>
        <span class="tracking-wider text-xl font-bold font-display">Aperture</span>
      </NuxtLink>

      <!-- Desktop Navigation Links (仅首页、新闻、商品、课程、关于) -->
      <ul class="hidden md:flex items-center gap-8 text-sm font-medium text-muted">
        <li v-for="item in navItems" :key="item.to">
          <NuxtLink :to="item.to" class="transition py-1.5 relative hover:text-main"
            :class="[
              isActive(item.to)
                ? 'text-main font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-accent'
                : '',
            ]">
            {{ item.label }}
          </NuxtLink>
        </li>
      </ul>

      <!-- Right Side Actions -->
      <div class="flex items-center gap-2.5 sm:gap-3 flex-shrink-0">
        <!-- Theme Toggle -->
        <button type="button" aria-label="切换明暗主题"
          class="w-10 h-10 rounded-xl text-muted hover:text-main flex items-center justify-center transition hover:bg-subtle cursor-pointer"
          @click="toggleTheme">
          <ClientOnly>
            <Icon :name="colorMode.value === 'dark' ? 'lucide:sun' : 'lucide:moon'" class="w-5 h-5 text-muted hover:text-main transition-colors" />
            <template #fallback>
              <span class="w-5 h-5 inline-block" />
            </template>
          </ClientOnly>
        </button>

        <!-- 预约咨询 CTA (跳转关于页 #contact) -->
        <NuxtLink to="/about#contact"
          class="text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-xl bg-main text-canvas hover:opacity-90 transition shadow-sm inline-flex items-center gap-1.5">
          <span>预约拍摄</span>
        </NuxtLink>

        <!-- Mobile Hamburger Menu Button -->
        <button type="button" aria-label="打开导航菜单"
          class="md:hidden w-10 h-10 rounded-xl text-muted hover:text-main flex items-center justify-center transition hover:bg-subtle cursor-pointer"
          @click="isMobileMenuOpen = !isMobileMenuOpen">
          <Icon v-if="!isMobileMenuOpen" name="lucide:menu" class="w-5 h-5" />
          <Icon v-else name="lucide:x" class="w-5 h-5" />
        </button>
      </div>
    </nav>

    <!-- Mobile Dropdown Menu -->
    <div v-show="isMobileMenuOpen"
      class="md:hidden border-t border-line bg-canvas transition-all">
      <ul class="px-4 py-4 space-y-1.5 text-sm font-medium text-muted">
        <li v-for="item in navItems" :key="item.to">
          <NuxtLink :to="item.to" class="block px-3.5 py-2.5 rounded-xl transition" :class="[
            isActive(item.to)
              ? 'bg-accent-soft text-accent-soft-text font-semibold'
              : 'hover:bg-subtle/50',
          ]" @click="isMobileMenuOpen = false">
            {{ item.label }}
          </NuxtLink>
        </li>
        <li class="pt-2 border-t border-line">
          <NuxtLink to="/about#contact"
            class="block text-center w-full py-2.5 rounded-xl bg-accent text-white font-medium hover:bg-accent-hover transition"
            @click="isMobileMenuOpen = false">
            预约专属拍摄
          </NuxtLink>
        </li>
      </ul>
    </div>
  </header>
</template>
