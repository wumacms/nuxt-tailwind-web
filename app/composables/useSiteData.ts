import { computed } from 'vue'
import { DEFAULT_BRAND_INFO } from '~/constants/site'
import type {
  ServiceItem,
  ProductItem,
  ArticleItem,
  CourseItem,
  TeamMember,
  TestimonialItem,
  TimelineItem,
  FaqItem,
  ApiResponse,
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

const defaultStats = [
  { value: '800+', label: '合作客户' },
  { value: '50k+', label: '交付成片' },
  { value: '12年', label: '行业经验' },
  { value: '4.9/5', label: '客户满意度' },
]

const defaultPartners = [
  { name: 'VOGUE', icon: 'hexagon' },
  { name: 'National Geographic', icon: 'triangle' },
  { name: "Harper's BAZAAR", icon: 'square' },
  { name: 'ELLE', icon: 'circle' },
  { name: 'GQ', icon: 'diamond' },
  { name: 'Condé Nast', icon: 'octagon' },
  { name: 'T Magazine', icon: 'star' },
  { name: 'Magnum', icon: 'shield' },
]

export const useSiteData = () => {
  const siteData = useState<SiteDataBundle | null>('site-data')

  const brandInfo = computed(() => siteData.value?.brandInfo ?? DEFAULT_BRAND_INFO)
  const services = computed<ServiceItem[]>(() => siteData.value?.services ?? [])
  const articles = computed<ArticleItem[]>(() => siteData.value?.articles ?? [])
  const products = computed<ProductItem[]>(() => siteData.value?.products ?? [])
  const courses = computed<CourseItem[]>(() => siteData.value?.courses ?? [])
  const team = computed<TeamMember[]>(() => siteData.value?.team ?? [])
  const testimonials = computed<TestimonialItem[]>(() => siteData.value?.testimonials ?? [])
  const timeline = computed<TimelineItem[]>(() => siteData.value?.timeline ?? [])
  const faqs = computed<FaqItem[]>(() => siteData.value?.faqs ?? [])
  const stats = computed(() => siteData.value?.stats ?? defaultStats)
  const partners = computed(() => siteData.value?.partners ?? defaultPartners)

  return {
    siteData,
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
      const res = await $fetch<ApiResponse<SiteDataBundle>>('/api/site-data')
      if (res?.data) {
        siteData.value = res.data
      }
    },
  }
}

