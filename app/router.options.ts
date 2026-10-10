import type { RouterConfig } from '@nuxt/schema'

// 自定义路由滚动行为：页面跳转时直接瞬间定位到顶部，避免平滑滚动动画
export default <RouterConfig>{
  scrollBehavior(to, from, savedPosition) {
    // 浏览器前进/后退时恢复之前的滚动位置
    if (savedPosition) {
      return savedPosition
    }

    // 锚点跳转保持平滑定位（如页面内部 #faq 等）
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
      }
    }

    // 页面跳转时直接定位到顶部，使用 instant 瞬间定位
    return {
      top: 0,
      left: 0,
      behavior: 'instant',
    }
  },
}
