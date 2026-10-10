import type { Ref } from 'vue'
import { isRef, ref, watch } from 'vue'
import { PAGE_SIZES } from '~/constants/site'
import type {
  ApiResponse,
  PaginatedData,
  ArticleItem,
  ProductItem,
  ProductDetailData,
  CourseItem,
  ArticleDetailData,
} from '~/types'

const DEFAULT_FALLBACK_ARTICLE: ArticleItem = {
  id: '',
  title: '',
  summary: '',
  date: '',
  category: 'industry',
  categoryLabel: '',
  coverImage: '',
}

const DEFAULT_FALLBACK_PRODUCT: ProductItem = {
  id: '',
  title: '',
  description: '',
  price: 0,
  category: 'presets',
  categoryLabel: '',
  coverImage: '',
}

const DEFAULT_FALLBACK_COURSE: CourseItem = {
  id: '',
  title: '',
  description: '',
  level: 'beginner',
  levelLabel: '',
  lessonsCount: 0,
  duration: '',
  studentsCount: 0,
  price: 0,
  coverImage: '',
}

/**
 * 企业级统一前端 API 请求 Composable
 * 支持服务端预渲染 (SSG) 以及纯静态环境 (GitHub Pages) 下的优雅降级
 */
export const useApi = () => {
  const { articles: siteArticles, products: siteProducts, courses: siteCourses } = useSiteData()

  // 1. 获取文章列表（分类、分页联动）
  const fetchArticles = (params: {
    category: Ref<string>
    page: Ref<number>
    pageSize?: number
  }) => {
    const pageSize = params.pageSize || PAGE_SIZES.articles

    const computeFallback = (): ApiResponse<PaginatedData<ArticleItem>> => {
      const category = params.category.value || 'all'
      const page = params.page.value || 1
      const all = siteArticles.value.length ? siteArticles.value : []
      const categoryCounts: Record<string, number> = {
        all: all.length,
        exhibition: all.filter((a) => a.category === 'exhibition').length,
        industry: all.filter((a) => a.category === 'industry').length,
        behind: all.filter((a) => a.category === 'behind').length,
      }
      let filtered = all
      if (category && category !== 'all') {
        filtered = filtered.filter((a) => a.category === category)
      }
      const total = filtered.length
      const totalPages = Math.ceil(total / pageSize) || 1
      const startIndex = (page - 1) * pageSize
      const list = filtered.slice(startIndex, startIndex + pageSize)
      return {
        code: 200,
        message: 'success',
        data: {
          list,
          total,
          page,
          pageSize,
          totalPages,
          categoryCounts,
        },
      }
    }

    const res = useFetch<ApiResponse<PaginatedData<ArticleItem>>>('/api/articles', {
      query: {
        category: params.category,
        page: params.page,
        pageSize,
      },
      watch: [params.category, params.page],
      default: computeFallback,
    })

    watch(
      [res.error, params.category, params.page],
      () => {
        if (res.error.value) {
          res.data.value = computeFallback()
        }
      },
      { immediate: true }
    )

    return res
  }

  // 2. 获取文章详情（带上下篇）
  const fetchArticleById = (id: Ref<string> | string) => {
    const idRef = isRef(id) ? id : ref(id)

    const computeFallback = (): ApiResponse<ArticleDetailData> => {
      const currentId = idRef.value
      const all = siteArticles.value.length ? siteArticles.value : []
      const index = all.findIndex((a) => a.id === currentId)
      const article: ArticleItem =
        (index >= 0 ? all[index] : all[0]) ?? { ...DEFAULT_FALLBACK_ARTICLE, id: currentId }
      const prev = index > 0 ? (all[index - 1] ?? null) : null
      const next = index >= 0 && index < all.length - 1 ? (all[index + 1] ?? null) : null

      return {
        code: 200,
        message: 'success',
        data: {
          article,
          prev,
          next,
        },
      }
    }

    const res = useFetch<ApiResponse<ArticleDetailData>>(() => `/api/articles/${idRef.value}`, {
      default: computeFallback,
    })

    watch(
      [res.error, idRef],
      () => {
        if (res.error.value) {
          res.data.value = computeFallback()
        }
      },
      { immediate: true }
    )

    return res
  }

  // 3. 获取商品列表（分类、分页联动）
  const fetchProducts = (params: {
    category: Ref<string>
    page: Ref<number>
    pageSize?: number
  }) => {
    const pageSize = params.pageSize || PAGE_SIZES.products

    const computeFallback = (): ApiResponse<PaginatedData<ProductItem>> => {
      const category = params.category.value || 'all'
      const page = params.page.value || 1
      const all = siteProducts.value.length ? siteProducts.value : []
      const categoryCounts: Record<string, number> = {
        all: all.length,
        presets: all.filter((p) => p.category === 'presets').length,
        gear: all.filter((p) => p.category === 'gear').length,
        book: all.filter((p) => p.category === 'book').length,
      }
      let filtered = all
      if (category && category !== 'all') {
        filtered = filtered.filter((p) => p.category === category)
      }
      const total = filtered.length
      const totalPages = Math.ceil(total / pageSize) || 1
      const startIndex = (page - 1) * pageSize
      const list = filtered.slice(startIndex, startIndex + pageSize)
      return {
        code: 200,
        message: 'success',
        data: {
          list,
          total,
          page,
          pageSize,
          totalPages,
          categoryCounts,
        },
      }
    }

    const res = useFetch<ApiResponse<PaginatedData<ProductItem>>>('/api/products', {
      query: {
        category: params.category,
        page: params.page,
        pageSize,
      },
      watch: [params.category, params.page],
      default: computeFallback,
    })

    watch(
      [res.error, params.category, params.page],
      () => {
        if (res.error.value) {
          res.data.value = computeFallback()
        }
      },
      { immediate: true }
    )

    return res
  }

  // 4. 获取商品详情
  const fetchProductById = (id: Ref<string> | string) => {
    const idRef = isRef(id) ? id : ref(id)

    const computeFallback = (): ApiResponse<ProductDetailData> => {
      const currentId = idRef.value
      const all = siteProducts.value.length ? siteProducts.value : []
      const product: ProductItem =
        all.find((p) => p.id === currentId) ?? all[0] ?? { ...DEFAULT_FALLBACK_PRODUCT, id: currentId }
      const related = all
        .filter((p) => p.id !== (product.id || currentId))
        .sort((a, b) => (a.category === product.category ? -1 : 1))
        .slice(0, 4)

      return {
        code: 200,
        message: 'success',
        data: {
          product,
          related,
        },
      }
    }

    const res = useFetch<ApiResponse<ProductDetailData>>(() => `/api/products/${idRef.value}`, {
      default: computeFallback,
    })

    watch(
      [res.error, idRef],
      () => {
        if (res.error.value) {
          res.data.value = computeFallback()
        }
      },
      { immediate: true }
    )

    return res
  }

  // 5. 获取课程列表（难度等级/分类、分页联动）
  const fetchCourses = (params: {
    level?: Ref<string>
    category?: Ref<string>
    page: Ref<number>
    pageSize?: number
  }) => {
    const filterRef = params.category || params.level || ref('all')
    const pageSize = params.pageSize || PAGE_SIZES.courses

    const computeFallback = (): ApiResponse<PaginatedData<CourseItem>> => {
      const level = filterRef.value || 'all'
      const page = params.page.value || 1
      const all = siteCourses.value.length ? siteCourses.value : []
      const categoryCounts: Record<string, number> = {
        all: all.length,
        beginner: all.filter((c) => c.level === 'beginner').length,
        intermediate: all.filter((c) => c.level === 'intermediate').length,
        advanced: all.filter((c) => c.level === 'advanced').length,
      }
      let filtered = all
      if (level && level !== 'all') {
        filtered = filtered.filter((c) => c.level === level)
      }
      const total = filtered.length
      const totalPages = Math.ceil(total / pageSize) || 1
      const startIndex = (page - 1) * pageSize
      const list = filtered.slice(startIndex, startIndex + pageSize)
      return {
        code: 200,
        message: 'success',
        data: {
          list,
          total,
          page,
          pageSize,
          totalPages,
          categoryCounts,
        },
      }
    }

    const res = useFetch<ApiResponse<PaginatedData<CourseItem>>>('/api/courses', {
      query: {
        category: filterRef,
        level: filterRef,
        page: params.page,
        pageSize,
      },
      watch: [filterRef, params.page],
      default: computeFallback,
    })

    watch(
      [res.error, filterRef, params.page],
      () => {
        if (res.error.value) {
          res.data.value = computeFallback()
        }
      },
      { immediate: true }
    )

    return res
  }

  // 6. 获取课程详情
  const fetchCourseById = (id: Ref<string> | string) => {
    const idRef = isRef(id) ? id : ref(id)

    const computeFallback = (): ApiResponse<CourseItem> => {
      const currentId = idRef.value
      const all = siteCourses.value.length ? siteCourses.value : []
      const course: CourseItem =
        all.find((c) => c.id === currentId) ?? all[0] ?? { ...DEFAULT_FALLBACK_COURSE, id: currentId }
      return {
        code: 200,
        message: 'success',
        data: course,
      }
    }

    const res = useFetch<ApiResponse<CourseItem>>(() => `/api/courses/${idRef.value}`, {
      default: computeFallback,
    })

    watch(
      [res.error, idRef],
      () => {
        if (res.error.value) {
          res.data.value = computeFallback()
        }
      },
      { immediate: true }
    )

    return res
  }

  return {
    fetchArticles,
    fetchArticleById,
    fetchProducts,
    fetchProductById,
    fetchCourses,
    fetchCourseById,
  }
}
