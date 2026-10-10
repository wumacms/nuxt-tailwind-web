export interface ApiResponse<T> {
  code: number
  message: string
  data: T
}

export interface PaginatedData<T> {
  list: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
  categoryCounts?: Record<string, number>
}

export interface ArticleDetailData {
  article: ArticleItem
  prev: ArticleItem | null
  next: ArticleItem | null
}

export interface ServiceItem {
  id: string
  title: string
  description: string
  icon: string
  tag?: string
  highlights?: string[]
  coverImage?: string
}

export interface CaseItem {
  id: string
  title: string
  client: string
  category: 'fashion' | 'food' | 'architecture' | 'commercial'
  categoryLabel: string
  coverImage: string
  summary: string
  description?: string
  challenge?: string
  solution?: string
  resultMetric?: string
  date?: string
}

export interface ProductDetailData {
  product: ProductItem
  related: ProductItem[]
}

export interface ProductSpecItem {
  label: string
  value: string
}

export interface ProductHighlight {
  title: string
  description: string
  icon?: string
}

export interface ProductItem {
  id: string
  title: string
  description: string
  price: number
  originalPrice?: number
  tag?: string
  category: 'presets' | 'gear' | 'book'
  categoryLabel: string
  coverImage: string
  features?: string[]
  gallery?: string[]
  content?: string
  detailDescription?: string
  specs?: ProductSpecItem[]
  highlights?: ProductHighlight[]
  packageIncludes?: string[]
  usageGuide?: string[]
  faqs?: FaqItem[]
  rating?: number
  salesCount?: number
}

export interface ArticleItem {
  id: string
  title: string
  summary: string
  date: string
  category: 'exhibition' | 'industry' | 'behind'
  categoryLabel: string
  coverImage: string
  content?: string
  author?: string
}

export interface CourseItem {
  id: string
  title: string
  description: string
  level: 'beginner' | 'intermediate' | 'advanced'
  levelLabel: string
  lessonsCount: number
  duration: string
  studentsCount: number
  price: number
  isFree?: boolean
  coverImage: string
  syllabus?: string[]
}

export interface TeamMember {
  id: string
  name: string
  role: string
  avatar: string
  bio?: string
}

export interface TestimonialItem {
  id: string
  author: string
  role: string
  company: string
  quote: string
  avatar: string
  rating: number
}

export interface TimelineItem {
  year: string
  title: string
  description: string
}

export interface FaqItem {
  question: string
  answer: string
}
