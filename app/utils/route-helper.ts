/**
 * 构造静态物理路由 URL
 * 方案 2：将动态 Query 参数转为独立物理静态路由
 *
 * @param base 基础模块路由，如 'courses' | 'products' | 'news'
 * @param category 分类标识，默认 'all'
 * @param page 页码，默认 1
 */
export const buildListUrl = (base: string, category = 'all', page = 1): string => {
  const isAll = !category || category === 'all'
  const validPage = Math.max(1, Math.floor(page || 1))

  if (isAll && validPage <= 1) {
    return `/${base}`
  }
  if (isAll) {
    return `/${base}/page/${validPage}`
  }
  if (validPage <= 1) {
    return `/${base}/category/${category}`
  }
  return `/${base}/category/${category}/page/${validPage}`
}
