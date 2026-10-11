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
        <Icon name="lucide:qr-code" class="w-5 h-5" />
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
        <Icon name="lucide:sun" class="w-5 h-5 text-gray-300 group-hover:text-white transition-colors hidden dark:block" />

        <!-- 月亮（浅色模式显示） -->
        <Icon name="lucide:moon" class="w-5 h-5 text-gray-300 group-hover:text-white transition-colors block dark:hidden" />
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
        <Icon name="lucide:palette" class="w-5 h-5" />
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
              <Icon v-if="currentTheme === item.id" name="lucide:check" class="w-3.5 h-3.5 text-accent" />
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
        <Icon name="lucide:arrow-up" class="w-5 h-5 stroke-[2.5]" />
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
