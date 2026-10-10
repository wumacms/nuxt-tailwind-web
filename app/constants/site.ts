/**
 * 全站核心业务配置与元数据常量
 * 集中管理各模块分页、分类映射、品牌缺省信息，杜绝魔法数字与重复硬编码
 */

export const PAGE_SIZES = {
  courses: 6,
  products: 8,
  articles: 4,
} as const

export const COURSE_CATEGORIES = [
  { id: 'all', label: '全部研习班' },
  { id: 'beginner', label: '入门启蒙' },
  { id: 'intermediate', label: '进阶实战' },
  { id: 'advanced', label: '商业大师' },
] as const

export const PRODUCT_CATEGORIES = [
  { id: 'all', label: '全部商品' },
  { id: 'presets', label: '调色预设' },
  { id: 'gear', label: '摄影器材' },
  { id: 'book', label: '摄影画册' },
] as const

export const ARTICLE_CATEGORIES = [
  { id: 'all', label: '全部文章' },
  { id: 'exhibition', label: '线下展览' },
  { id: 'industry', label: '行业观察' },
  { id: 'behind', label: '幕后纪实' },
] as const

export const DEFAULT_BRAND_INFO = {
  name: 'Aperture',
  slogan: '摄影艺术与视觉叙事',
  description: 'Aperture 专注于商业摄影、人像与品牌视觉叙事。我们用光影捕捉情绪，让画面替你说话。',
  email: 'hello@aperture.studio',
  phone: '400-666-8888',
  hours: '工作日 10:00 - 19:00',
  address: '上海市静安区 M50 创意园 7 号楼',
} as const
