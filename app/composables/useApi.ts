import type { Ref } from 'vue'
import { isRef, ref, watch } from 'vue'
import type {
  ApiResponse,
  PaginatedData,
  ArticleItem,
  ProductItem,
  ProductDetailData,
  CourseItem,
  ArticleDetailData,
} from '~/types'

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
    const pageSize = params.pageSize || 4

    const computeFallback = (): ApiResponse<PaginatedData<ArticleItem>> => {
      const category = params.category.value || 'all'
      const page = params.page.value || 1
      const all = siteArticles.length ? siteArticles : []
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
      const all = siteArticles.length ? siteArticles : []
      const index = all.findIndex((a) => a.id === currentId)
      const article = all[index] || all[0]
      const prev = index > 0 ? { id: all[index - 1].id, title: all[index - 1].title } : null
      const next = index < all.length - 1 ? { id: all[index + 1].id, title: all[index + 1].title } : null

      return {
        code: 200,
        message: 'success',
        data: {
          ...article,
          authorName: 'Aperture 影像实验室',
          authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop',
          authorBio: '探索光影边界与视觉情绪叙事的先锋摄影团队。',
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
    const pageSize = params.pageSize || 8

    const computeFallback = (): ApiResponse<PaginatedData<ProductItem>> => {
      const category = params.category.value || 'all'
      const page = params.page.value || 1
      const all = siteProducts.length ? siteProducts : []
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
      const all = siteProducts.length ? siteProducts : []
      const product = all.find((p) => p.id === currentId) || all[0]
      return {
        code: 200,
        message: 'success',
        data: {
          ...product,
          images: [
            product.coverImage,
            'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&h=800&fit=crop',
            'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800&h=800&fit=crop',
          ],
          parameters: [
            { label: '适用设备', value: 'Sony / Canon / Nikon / 手机' },
            { label: '文件格式', value: '.xmp / .cube / RAW' },
            { label: '支持软件', value: 'Lightroom / Photoshop / DaVinci' },
            { label: '交付方式', value: '数字下载 / 实体顺丰速递' },
          ],
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
    const pageSize = params.pageSize || 6

    const computeFallback = (): ApiResponse<PaginatedData<CourseItem>> => {
      const level = filterRef.value || 'all'
      const page = params.page.value || 1
      const all = siteCourses.length ? siteCourses : []
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
      const all = siteCourses.length ? siteCourses : []
      const course = all.find((c) => c.id === currentId) || all[0]
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
