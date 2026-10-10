import articles from '../../data/articles.json'
import type { ArticleItem, ArticleDetailData } from '~/types'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  const articleList = articles as ArticleItem[]

  const index = articleList.findIndex((a) => a.id === id)

  const article = articleList[index]

  if (!article) {
    return sendFail('文章不存在或已被删除', 404, 404)
  }

  const prev = index > 0 ? (articleList[index - 1] ?? null) : null
  const next = index < articleList.length - 1 ? (articleList[index + 1] ?? null) : null

  const result: ArticleDetailData = {
    article,
    prev,
    next,
  }

  return sendSuccess(result, '获取文章详情成功')
})
