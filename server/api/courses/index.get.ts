import courses from '../../data/courses.json'
import type { CourseItem, PaginatedData } from '~/types'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const level = (query.level as string) || 'all'
  const page = Math.max(1, parseInt((query.page as string) || '1', 10))
  const pageSize = Math.max(1, parseInt((query.pageSize as string) || '4', 10))

  // 1. 各等级统计总数
  const categoryCounts: Record<string, number> = {
    all: courses.length,
    beginner: courses.filter((c) => c.level === 'beginner').length,
    intermediate: courses.filter((c) => c.level === 'intermediate').length,
    advanced: courses.filter((c) => c.level === 'advanced').length,
  }

  // 2. 筛选
  let filtered = courses as CourseItem[]
  if (level && level !== 'all') {
    filtered = filtered.filter((c) => c.level === level)
  }

  // 3. 分页
  const total = filtered.length
  const totalPages = Math.ceil(total / pageSize) || 1
  const startIndex = (page - 1) * pageSize
  const list = filtered.slice(startIndex, startIndex + pageSize)

  const result: PaginatedData<CourseItem> = {
    list,
    total,
    page,
    pageSize,
    totalPages,
    categoryCounts,
  }

  return sendSuccess(result, '获取课程列表成功')
})
