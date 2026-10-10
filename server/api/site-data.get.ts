import brandInfo from '../data/brand.json'
import services from '../data/services.json'
import articles from '../data/articles.json'
import products from '../data/products.json'
import courses from '../data/courses.json'
import team from '../data/team.json'
import testimonials from '../data/testimonials.json'
import timeline from '../data/timeline.json'
import faqs from '../data/faqs.json'
import stats from '../data/stats.json'
import partners from '../data/partners.json'

export default defineEventHandler(async () => {
  const bundle = {
    brandInfo,
    services,
    articles,
    products,
    courses,
    team,
    testimonials,
    timeline,
    faqs,
    stats,
    partners,
  }

  return sendSuccess(bundle, '获取全站配置与展示数据成功')
})
