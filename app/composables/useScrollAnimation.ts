import { onMounted, onBeforeUnmount, nextTick } from 'vue'

export const useScrollAnimation = () => {
  let observerInstance: IntersectionObserver | null = null
  let mutationObserver: MutationObserver | null = null

  const cleanup = () => {
    if (observerInstance) {
      observerInstance.disconnect()
      observerInstance = null
    }
    if (mutationObserver) {
      mutationObserver.disconnect()
      mutationObserver = null
    }
  }

  const observeElements = (container: ParentNode = document) => {
    if (!observerInstance) return
    const elements = container.querySelectorAll('.animate-on-scroll:not(.is-visible)')
    elements.forEach((el) => observerInstance?.observe(el))
  }

  const initObserver = () => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return

    // 清理先前的观察器实例
    cleanup()

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
        threshold: 0.05,
        // 正向 60px 边距：在元素即将进入视口前 60px 提前启动过渡，消除快速滚动时的白屏迟滞感
        rootMargin: '0px 0px 60px 0px',
      }
    )

    // 初次扫描现有元素
    observeElements()

    // 监听 DOM 树变化，自动捕获异步数据加载、Tab 切换或动态挂载的元素，彻底废除脆弱的 setTimeout
    if (typeof window !== 'undefined' && 'MutationObserver' in window) {
      mutationObserver = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
          if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
            mutation.addedNodes.forEach((node) => {
              if (node instanceof HTMLElement) {
                if (node.classList.contains('animate-on-scroll') && !node.classList.contains('is-visible')) {
                  observerInstance?.observe(node)
                }
                const nested = node.querySelectorAll?.('.animate-on-scroll:not(.is-visible)')
                nested?.forEach((el) => observerInstance?.observe(el))
              }
            })
          }
        }
      })

      const targetNode = document.getElementById('__nuxt') || document.body
      if (targetNode) {
        mutationObserver.observe(targetNode, {
          childList: true,
          subtree: true,
        })
      }
    }
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
    observeElements,
    cleanup,
  }
}

