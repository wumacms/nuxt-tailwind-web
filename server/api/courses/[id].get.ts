import courses from '../../data/courses.json'
import type { CourseItem } from '~/types'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  const course = (courses as CourseItem[]).find((c) => c.id === id)

  if (!course) {
    return sendFail('课程不存在或已下架', 404, 404)
  }

  return sendSuccess(course, '获取课程详情成功')
})
