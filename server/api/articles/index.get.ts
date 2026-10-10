import articles from '../../data/articles.json'
import type { ArticleItem, PaginatedData } from '~/types'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const category = (query.category as string) || 'all'
  const page = Math.max(1, parseInt((query.page as string) || '1', 10))
  const pageSize = Math.max(1, parseInt((query.pageSize as string) || '4', 10))
  const keyword = (query.keyword as string)?.trim().toLowerCase()

  // 1. 计算各个分类的统计总数（真实后端聚合查询）
  const categoryCounts: Record<string, number> = {
    all: articles.length,
    exhibition: articles.filter((a) => a.category === 'exhibition').length,
    industry: articles.filter((a) => a.category === 'industry').length,
    behind: articles.filter((a) => a.category === 'behind').length,
  }

  // 2. 按条件筛选
  let filtered = articles as ArticleItem[]

  if (category && category !== 'all') {
    filtered = filtered.filter((a) => a.category === category)
  }

  if (keyword) {
    filtered = filtered.filter(
      (a) =>
        a.title.toLowerCase().includes(keyword) ||
        a.summary.toLowerCase().includes(keyword)
    )
  }

  // 3. 计算分页
  const total = filtered.length
  const totalPages = Math.ceil(total / pageSize) || 1
  const startIndex = (page - 1) * pageSize
  const list = filtered.slice(startIndex, startIndex + pageSize)

  // 4. 返回标准分页结构
  const result: PaginatedData<ArticleItem> = {
    list,
    total,
    page,
    pageSize,
    totalPages,
    categoryCounts,
  }

  return sendSuccess(result, '获取文章列表成功')
})
