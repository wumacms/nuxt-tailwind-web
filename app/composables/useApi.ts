import type { Ref } from 'vue'
import { isRef, ref } from 'vue'
import type {
  ApiResponse,
  PaginatedData,
  ArticleItem,
  ProductItem,
  CourseItem,
  ArticleDetailData,
} from '~/types'

/**
 * 企业级统一前端 API 请求 Composable
 * 封装对后端 /api/* 接口的标准请求、参数绑定与响应式自动重新获取
 */
export const useApi = () => {
  // 获取文章列表（分类、分页联动）
  const fetchArticles = (params: {
    category: Ref<string>
    page: Ref<number>
    pageSize?: number
  }) => {
    return useFetch<ApiResponse<PaginatedData<ArticleItem>>>('/api/articles', {
      query: {
        category: params.category,
        page: params.page,
        pageSize: params.pageSize || 4,
      },
      watch: [params.category, params.page],
    })
  }

  // 获取文章详情（带上下篇）
  const fetchArticleById = (id: Ref<string> | string) => {
    const idRef = isRef(id) ? id : ref(id)
    return useFetch<ApiResponse<ArticleDetailData>>(() => `/api/articles/${idRef.value}`)
  }

  // 获取商品列表（分类、分页联动）
  const fetchProducts = (params: {
    category: Ref<string>
    page: Ref<number>
    pageSize?: number
  }) => {
    return useFetch<ApiResponse<PaginatedData<ProductItem>>>('/api/products', {
      query: {
        category: params.category,
        page: params.page,
        pageSize: params.pageSize || 4,
      },
      watch: [params.category, params.page],
    })
  }

  // 获取商品详情
  const fetchProductById = (id: Ref<string> | string) => {
    const idRef = isRef(id) ? id : ref(id)
    return useFetch<ApiResponse<ProductItem>>(() => `/api/products/${idRef.value}`)
  }

  // 获取课程列表（难度等级、分页联动）
  const fetchCourses = (params: {
    level: Ref<string>
    page: Ref<number>
    pageSize?: number
  }) => {
    return useFetch<ApiResponse<PaginatedData<CourseItem>>>('/api/courses', {
      query: {
        level: params.level,
        page: params.page,
        pageSize: params.pageSize || 4,
      },
      watch: [params.level, params.page],
    })
  }

  // 获取课程详情
  const fetchCourseById = (id: Ref<string> | string) => {
    const idRef = isRef(id) ? id : ref(id)
    return useFetch<ApiResponse<CourseItem>>(() => `/api/courses/${idRef.value}`)
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
