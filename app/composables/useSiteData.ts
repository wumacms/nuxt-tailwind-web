import type {
  ServiceItem,
  ProductItem,
  ArticleItem,
  CourseItem,
  TeamMember,
  TestimonialItem,
  TimelineItem,
  FaqItem,
} from '~/types'

export interface SiteDataBundle {
  brandInfo: {
    name: string
    slogan: string
    description: string
    email: string
    phone: string
    hours: string
    address: string
  }
  services: ServiceItem[]
  articles: ArticleItem[]
  products: ProductItem[]
  courses: CourseItem[]
  team: TeamMember[]
  testimonials: TestimonialItem[]
  timeline: TimelineItem[]
  faqs: FaqItem[]
  stats: { value: string; label: string }[]
  partners: { name: string; icon: string }[]
}

const defaultBrandInfo = {
  name: 'Aperture',
  slogan: '摄影艺术与视觉叙事',
  description: 'Aperture 专注于商业摄影、人像与品牌视觉叙事。我们用光影捕捉情绪，让画面替你说话。',
  email: 'hello@aperture.studio',
  phone: '400-666-8888',
  hours: '工作日 10:00 - 19:00',
  address: '上海市静安区 M50 创意园 7 号楼',
}

export const useSiteData = () => {
  const siteData = useState<SiteDataBundle | null>('site-data')

  const bundle = siteData.value

  const brandInfo = bundle?.brandInfo ?? defaultBrandInfo
  const services: ServiceItem[] = bundle?.services ?? []
  const articles: ArticleItem[] = bundle?.articles ?? []
  const products: ProductItem[] = bundle?.products ?? []
  const courses: CourseItem[] = bundle?.courses ?? []
  const team: TeamMember[] = bundle?.team ?? []
  const testimonials: TestimonialItem[] = bundle?.testimonials ?? []
  const timeline: TimelineItem[] = bundle?.timeline ?? []
  const faqs: FaqItem[] = bundle?.faqs ?? []
  const stats = bundle?.stats ?? [
    { value: '800+', label: '合作客户' },
    { value: '50k+', label: '交付成片' },
    { value: '12年', label: '行业经验' },
    { value: '4.9/5', label: '客户满意度' },
  ]
  const partners = bundle?.partners ?? [
    { name: 'VOGUE', icon: 'hexagon' },
    { name: 'National Geographic', icon: 'triangle' },
    { name: "Harper's BAZAAR", icon: 'square' },
    { name: 'ELLE', icon: 'circle' },
    { name: 'GQ', icon: 'diamond' },
    { name: 'Condé Nast', icon: 'octagon' },
    { name: 'T Magazine', icon: 'star' },
    { name: 'Magnum', icon: 'shield' },
  ]

  return {
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
    refresh: async () => {
      const freshData = await $fetch<SiteDataBundle>('/api/site-data')
      siteData.value = freshData
    },
  }
}
