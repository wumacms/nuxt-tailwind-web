<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

const config = useRuntimeConfig()
const qrcodeUrl = computed(() => `${config.app.baseURL.replace(/\/$/, '')}/qrcode.png`)
const colorMode = useColorMode()
const { currentTheme, setTheme, themes } = useTheme()
const { scrollY } = useScroll()
const isScrolled = computed(() => scrollY.value > 300)
const isThemeMenuOpen = ref(false)
const themeDropdownRef = ref<HTMLElement | null>(null)

const toggleTheme = () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}

const toggleThemeMenu = () => {
  isThemeMenuOpen.value = !isThemeMenuOpen.value
}

const selectTheme = (id: typeof currentTheme.value) => {
  setTheme(id)
  isThemeMenuOpen.value = false
}

const handleClickOutside = (event: MouseEvent) => {
  if (themeDropdownRef.value && !themeDropdownRef.value.contains(event.target as Node)) {
    isThemeMenuOpen.value = false
  }
}

const scrollToTop = () => {
  if (typeof window !== 'undefined') {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

onMounted(() => {
  window.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  window.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <aside aria-label="侧边快捷悬浮栏"
    class="hidden md:flex fixed right-0 top-1/2 -translate-y-1/2 z-40 flex-col shadow-2xl rounded-l-2xl overflow-visible bg-gray-900/90 dark:bg-surface/95 backdrop-blur-md border-y border-l border-white/10 divide-y divide-white/10">
    <!-- 1. 微信公众号二维码悬浮弹窗 -->
    <div class="relative group">
      <button type="button" aria-label="关注微信公众号"
        class="w-12 h-12 flex items-center justify-center text-gray-300 hover:text-on-accent hover:bg-accent rounded-tl-2xl transition-colors cursor-pointer">
        <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <rect width="5" height="5" x="3" y="3" rx="1" />
          <rect width="5" height="5" x="16" y="3" rx="1" />
          <rect width="5" height="5" x="3" y="16" rx="1" />
          <path d="M21 16h-3a2 2 0 0 0-2 2v3" />
          <path d="M21 21v.01" />
          <path d="M12 7v3a2 2 0 0 1-2 2H7" />
          <path d="M3 12h.01" />
          <path d="M12 3h.01" />
          <path d="M12 16v.01" />
          <path d="M16 12h1" />
          <path d="M21 12v.01" />
          <path d="M12 21v-1" />
        </svg>
      </button>

      <!-- 二维码浮层卡片 -->
      <div
        class="absolute right-full mr-3.5 top-1/2 -translate-y-1/2 hidden group-hover:flex flex-col items-center p-3.5 bg-card text-main rounded-2xl shadow-2xl border border-line w-44 pointer-events-auto transition-all before:content-[''] before:absolute before:-right-4 before:top-0 before:bottom-0 before:w-5">
        <div class="w-36 h-36 bg-subtle/40 p-1.5 rounded-xl border border-line flex items-center justify-center">
          <img :src="qrcodeUrl" alt="Aperture 官方微信公众号二维码" class="w-full h-full object-contain" loading="lazy" />
        </div>
        <div class="mt-2.5 text-center">
          <div class="text-xs font-semibold text-main">关注 Aperture</div>
          <p class="text-[11px] text-caption mt-0.5">微信扫码获取独家样片</p>
        </div>
        <!-- 右侧小三角指引 -->
        <div
          class="absolute -right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 bg-card rotate-45 border-r border-t border-line">
        </div>
      </div>
    </div>

    <!-- 2. 主题模式切换 (Dark/Light) -->
    <div class="relative group">
      <button type="button" aria-label="切换浅色/深色模式"
        class="w-12 h-12 flex items-center justify-center text-gray-300 hover:text-on-accent hover:bg-accent transition-colors cursor-pointer"
        @click="toggleTheme">
        <!-- 太阳（深色模式显示） -->
        <svg class="w-5 h-5 text-gray-300 group-hover:text-white transition-colors hidden dark:block" viewBox="0 0 24 24"
          fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2" />
          <path d="M12 20v2" />
          <path d="m4.93 4.93 1.41 1.41" />
          <path d="m17.66 17.66 1.41 1.41" />
          <path d="M2 12h2" />
          <path d="M20 12h2" />
          <path d="m6.34 17.66-1.41 1.41" />
          <path d="m19.07 4.93-1.41 1.41" />
        </svg>

        <!-- 月亮（浅色模式显示） -->
        <svg class="w-5 h-5 text-gray-300 group-hover:text-white transition-colors block dark:hidden"
          viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
        </svg>
      </button>

      <!-- Tooltip -->
      <div
        class="absolute right-full mr-3 top-1/2 -translate-y-1/2 hidden group-hover:block px-2.5 py-1 bg-main text-canvas text-xs font-medium rounded-lg shadow-xl whitespace-nowrap pointer-events-none transition-all">
        <span class="hidden dark:inline">切换为浅色模式</span>
        <span class="inline dark:hidden">切换为深色模式</span>
        <div class="absolute -right-1 top-1/2 -translate-y-1/2 w-2 h-2 bg-main rotate-45"></div>
      </div>
    </div>

    <!-- 2.5 动态主题选择器 -->
    <div class="relative group" ref="themeDropdownRef">
      <button type="button" aria-label="切换设计配色主题"
        class="w-12 h-12 flex items-center justify-center transition-colors cursor-pointer" :class="[
          isThemeMenuOpen
            ? 'bg-accent text-on-accent'
            : 'text-gray-300 hover:text-on-accent hover:bg-accent'
        ]" @click.stop="toggleThemeMenu">
        <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="13.5" cy="6.5" r=".5" fill="currentColor" />
          <circle cx="17.5" cy="10.5" r=".5" fill="currentColor" />
          <circle cx="8.5" cy="7.5" r=".5" fill="currentColor" />
          <circle cx="6.5" cy="12.5" r=".5" fill="currentColor" />
          <path
            d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.563-2.512 5.563-5.563C22 6.5 17.5 2 12 2Z" />
        </svg>
      </button>

      <!-- 主题选择浮层卡片 -->
      <div
        class="absolute right-full mr-3.5 top-1/2 -translate-y-1/2 flex-col p-3.5 bg-card text-main rounded-2xl shadow-2xl border border-line w-52 pointer-events-auto transition-all before:content-[''] before:absolute before:-right-4 before:top-0 before:bottom-0 before:w-5"
        :class="[
          isThemeMenuOpen ? 'flex' : 'hidden group-hover:flex'
        ]">
        <div class="text-xs font-bold text-main mb-2 px-1 flex items-center justify-between">
          <span>主题配色</span>
        </div>
        <ClientOnly>
          <div class="space-y-1.5">
            <button v-for="item in themes" :key="item.id" type="button"
              class="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-xs transition cursor-pointer text-left border"
              :class="[
                currentTheme === item.id
                  ? 'bg-accent/15 text-accent font-semibold border-accent/30'
                  : 'text-muted hover:bg-subtle/50 hover:text-main border-transparent'
              ]" @click.stop="selectTheme(item.id)">
              <span class="w-3.5 h-3.5 rounded-full border border-black/10 shrink-0"
                :style="{ backgroundColor: item.colorHex }"></span>
              <div class="flex-1 min-w-0">
                <div class="truncate">{{ item.label }}</div>
              </div>
              <span v-if="currentTheme === item.id" class="text-xs">✓</span>
            </button>
          </div>
        </ClientOnly>
        <!-- 右侧小三角指引 -->
        <div
          class="absolute -right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 bg-card rotate-45 border-r border-t border-line">
        </div>
      </div>
    </div>

    <!-- 3. 返回顶部 -->
    <div class="relative group">
      <button type="button" aria-label="返回顶部" :class="[
        'w-12 h-12 flex items-center justify-center transition-all cursor-pointer rounded-bl-2xl',
        isScrolled
          ? 'text-gray-300 hover:text-on-accent hover:bg-accent opacity-100'
          : 'text-gray-500 opacity-40 hover:opacity-80'
      ]" @click="scrollToTop">
        <svg class="w-5 h-5 stroke-[2.5]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>

      <!-- 悬浮 Tooltip 提示 -->
      <div
        class="absolute right-full mr-3 top-1/2 -translate-y-1/2 hidden group-hover:block px-2.5 py-1 bg-main text-canvas text-xs font-medium rounded-lg shadow-xl whitespace-nowrap pointer-events-none transition-all">
        返回顶部
        <div class="absolute -right-1 top-1/2 -translate-y-1/2 w-2 h-2 bg-main rotate-45"></div>
      </div>
    </div>
  </aside>
</template>
