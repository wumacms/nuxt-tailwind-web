export type ThemePalette = 'default' | 'obsidian' | 'emerald' | 'ocean' | 'violet'

export interface ThemeOption {
  id: ThemePalette
  label: string
  description: string
  colorHex: string
}

export const THEME_OPTIONS: ThemeOption[] = [
  {
    id: 'ocean',
    label: '蔚蓝海相',
    description: '深邃沉静商业格调，深海蓝强调',
    colorHex: '#2563eb',
  },
  {
    id: 'violet',
    label: '极光暮紫',
    description: '前卫先锋艺术美学，霓虹紫强调',
    colorHex: '#7c3aed',
  }, {
    id: 'default',
    label: '经典相纸',
    description: '温暖复古相纸质感，琥珀金强调',
    colorHex: '#b45309',
  },
  {
    id: 'emerald',
    label: '翡翠纪实',
    description: '清新典雅自然纪实，翡翠绿强调',
    colorHex: '#059669',
  },
  {
    id: 'obsidian',
    label: '黑曜石暗房',
    description: '纯黑冷感极简暗房，高对比度摄影',
    colorHex: '#fafafa',
  },
]

import { computed } from 'vue'

export const useTheme = () => {
  const currentTheme = useCookie<ThemePalette>('aperture-theme-palette', {
    default: () => 'default',
  })

  // 声明式绑定 html 属性，在 SSR/SSG 服务端与客户端水合期均生效，彻底消除首屏样式闪烁 (FOUC)
  useHead({
    htmlAttrs: {
      'data-theme': computed(() => (currentTheme.value !== 'default' ? currentTheme.value : undefined)),
    },
  })

  const setTheme = (theme: ThemePalette) => {
    currentTheme.value = theme
  }

  return {
    currentTheme,
    setTheme,
    themes: THEME_OPTIONS,
  }
}
