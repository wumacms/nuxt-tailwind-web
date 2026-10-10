import { onMounted } from 'vue'

export type ThemePalette = 'default' | 'obsidian' | 'emerald' | 'ocean' | 'violet'

export interface ThemeOption {
  id: ThemePalette
  label: string
  description: string
  colorHex: string
}

export const THEME_OPTIONS: ThemeOption[] = [
  {
    id: 'default',
    label: '经典相纸',
    description: '温暖复古相纸质感，琥珀金强调',
    colorHex: '#b45309',
  },
  {
    id: 'obsidian',
    label: '黑曜石暗房',
    description: '纯黑冷感极简暗房，高对比度摄影',
    colorHex: '#fafafa',
  },
  {
    id: 'emerald',
    label: '翡翠纪实',
    description: '清新典雅自然纪实，翡翠绿强调',
    colorHex: '#059669',
  },
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
  },
]

export const useTheme = () => {
  const currentTheme = useCookie<ThemePalette>('aperture-theme-palette', {
    default: () => 'default',
  })

  const applyTheme = (theme: ThemePalette) => {
    if (import.meta.client) {
      if (theme === 'default') {
        document.documentElement.removeAttribute('data-theme')
      } else {
        document.documentElement.setAttribute('data-theme', theme)
      }
    }
  }

  const setTheme = (theme: ThemePalette) => {
    currentTheme.value = theme
    applyTheme(theme)
  }

  onMounted(() => {
    if (currentTheme.value && currentTheme.value !== 'default') {
      applyTheme(currentTheme.value)
    }
  })

  return {
    currentTheme,
    setTheme,
    themes: THEME_OPTIONS,
  }
}
