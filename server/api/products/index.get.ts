import products from '../../data/products.json'
import type { ProductItem, PaginatedData } from '~/types'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const category = (query.category as string) || 'all'
  const page = Math.max(1, parseInt((query.page as string) || '1', 10))
  const pageSize = Math.max(1, parseInt((query.pageSize as string) || '4', 10))

  // 1. 各分类统计总数
  const categoryCounts: Record<string, number> = {
    all: products.length,
    presets: products.filter((p) => p.category === 'presets').length,
    gear: products.filter((p) => p.category === 'gear').length,
    book: products.filter((p) => p.category === 'book').length,
  }

  // 2. 筛选
  let filtered = products as ProductItem[]
  if (category && category !== 'all') {
    filtered = filtered.filter((p) => p.category === category)
  }

  // 3. 分页
  const total = filtered.length
  const totalPages = Math.ceil(total / pageSize) || 1
  const startIndex = (page - 1) * pageSize
  const list = filtered.slice(startIndex, startIndex + pageSize)

  const result: PaginatedData<ProductItem> = {
    list,
    total,
    page,
    pageSize,
    totalPages,
    categoryCounts,
  }

  return sendSuccess(result, '获取商品列表成功')
})
