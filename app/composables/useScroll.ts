import { ref, onMounted, onUnmounted } from 'vue'

// 共享的单一滚动位置状态，避免多组件重复绑定 window 滚动监听器
const scrollY = ref(0)
let listenerCount = 0

const onScroll = () => {
  if (typeof window !== 'undefined') {
    scrollY.value = window.scrollY
  }
}

export const useScroll = () => {
  onMounted(() => {
    if (typeof window === 'undefined') return
    if (listenerCount === 0) {
      window.addEventListener('scroll', onScroll, { passive: true })
      onScroll()
    }
    listenerCount++
  })

  onUnmounted(() => {
    if (typeof window === 'undefined') return
    listenerCount--
    if (listenerCount <= 0) {
      listenerCount = 0
      window.removeEventListener('scroll', onScroll)
    }
  })

  return {
    scrollY,
  }
}
