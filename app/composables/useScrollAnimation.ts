import { onMounted, onBeforeUnmount, nextTick } from 'vue'

export const useScrollAnimation = () => {
  let observerInstance: IntersectionObserver | null = null

  const cleanup = () => {
    if (observerInstance) {
      observerInstance.disconnect()
      observerInstance = null
    }
  }

  const initObserver = () => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return

    // Clean up previous observer instance to prevent memory leaks across page navigations
    cleanup()

    const elements = document.querySelectorAll('.animate-on-scroll:not(.is-visible)')
    if (!elements.length) return

    observerInstance = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observerInstance?.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px',
      }
    )

    elements.forEach((el) => observerInstance?.observe(el))
  }

  onMounted(() => {
    nextTick(() => {
      initObserver()
    })
  })

  onBeforeUnmount(() => {
    cleanup()
  })

  return {
    initObserver,
    cleanup,
  }
}
