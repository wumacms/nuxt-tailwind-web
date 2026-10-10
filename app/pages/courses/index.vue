<script setup lang="ts">
import { ref, computed, watch } from 'vue'

useSeoMeta({
  title: '摄影学院与大师研习班 - Aperture',
  description: 'Aperture 学院提供摄影入门、商业人像布光、Lightroom 调色体系与商业接单全流程课程。',
})

const route = useRoute()
const router = useRouter()

const breadcrumbs = [{ label: '摄影学院' }]

// 从 URL 查询参数中读取初始分类与页码（同时兼容 category 与 level）
const parseCategory = (cat: unknown, lvl: unknown): string => {
  const val =
    typeof cat === 'string' && cat.trim()
      ? cat.trim()
      : typeof lvl === 'string' && lvl.trim()
        ? lvl.trim()
        : ''
  return val || 'all'
}

const parsePage = (p: unknown): number => {
  const pageNum = parseInt(String(p), 10)
  return !isNaN(pageNum) && pageNum > 0 ? pageNum : 1
}

const currentTab = ref(parseCategory(route.query.category, route.query.level))
const currentPage = ref(parsePage(route.query.page))
const pageSize = 6

// 模拟真实后端接口获取课程分页数据
const { fetchCourses } = useApi()
const { data: response, status } = await fetchCourses({
  category: currentTab,
  page: currentPage,
  pageSize,
})

// 将筛选与分页状态同步至 URL Query 参数
const syncUrl = () => {
  const query: Record<string, string> = {}
  if (currentTab.value && currentTab.value !== 'all') {
    query.category = currentTab.value
  }
  if (currentPage.value > 1) {
    query.page = String(currentPage.value)
  }

  const currentQueryCat = (route.query.category as string) || (route.query.level as string) || ''
  const targetQueryCat = query.category || ''
  const currentQueryPage = (route.query.page as string) || ''
  const targetQueryPage = query.page || ''

  if (currentQueryCat !== targetQueryCat || currentQueryPage !== targetQueryPage) {
    router.push({
      path: route.path,
      query,
    })
  }
}

// 当分类切换时，重置当前页码到第 1 页并更新 URL
watch(currentTab, () => {
  currentPage.value = 1
  syncUrl()
})

// 当页码变化时，更新 URL
watch(currentPage, () => {
  syncUrl()
})

// 监听浏览器前进/后退等路由 URL Query 变化，保持响应式同步
watch(
  () => route.query,
  (newQuery) => {
    const nextTab = parseCategory(newQuery.category, newQuery.level)
    const nextPage = parsePage(newQuery.page)

    if (currentTab.value !== nextTab) {
      currentTab.value = nextTab
    }
    if (currentPage.value !== nextPage) {
      currentPage.value = nextPage
    }
  }
)

const courses = computed(() => response.value?.data?.list || [])
const total = computed(() => response.value?.data?.total || 0)
const totalPages = computed(() => response.value?.data?.totalPages || 1)
const counts = computed(() => response.value?.data?.categoryCounts || {})

const tabs = computed(() => [
  { id: 'all', label: '全部研习班', count: counts.value.all ?? 0 },
  { id: 'beginner', label: '入门启蒙', count: counts.value.beginner ?? 0 },
  { id: 'intermediate', label: '进阶实战', count: counts.value.intermediate ?? 0 },
  { id: 'advanced', label: '商业大师', count: counts.value.advanced ?? 0 },
])
</script>

<template>
  <div>
    <!-- 头部带有背景图片的统一 Banner 组件 -->
    <PageBanner
      title="摄影学院与大师研习班"
      subtitle="由 Aperture 核心创作团队亲自授课。系统化传授商业棚拍、自然光人像与高级色彩科学的核心心法。"
      badge="线上与工坊实训"
      bg-image="https://images.unsplash.com/photo-1554048612-b6a482bc67e5?w=1600&h=700&fit=crop"
      :breadcrumbs="breadcrumbs"
    />

    <!-- 网格分页列表主体 -->
    <section class="py-16 md:py-24 bg-canvas">
      <AppContainer>
        <!-- 分类筛选条件 -->
        <div class="mb-10 flex flex-wrap items-center justify-between gap-4">
          <AppTabs v-model="currentTab" :tabs="tabs" />
          <div class="text-xs text-caption">
            共找到 <span class="font-bold text-accent">{{ total }}</span> 门精品课程
          </div>
        </div>

        <!-- 加载中微状态提示 -->
        <div v-if="status === 'pending'" class="py-12 text-center text-sm text-caption">
          <span class="inline-block animate-spin mr-2">◌</span> 正在从接口获取课程列表...
        </div>

        <!-- 课程网格列表 -->
        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          <NuxtLink
            v-for="course in courses"
            :key="course.id"
            :to="`/courses/${course.id}`"
            class="group flex flex-col rounded-2xl border border-line bg-card overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            <div class="relative aspect-[16/10] overflow-hidden bg-subtle">
              <img
                :src="course.coverImage"
                :alt="course.title"
                class="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                loading="lazy"
                width="800"
                height="500"
              />
              <span
                class="absolute top-3.5 left-3.5 text-xs font-semibold px-2.5 py-1 rounded-full bg-accent text-white shadow-md"
              >
                {{ course.levelLabel }}
              </span>
              <span
                class="absolute top-3.5 right-3.5 text-xs font-medium px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-white"
              >
                {{ course.lessonsCount }} 节精讲
              </span>
            </div>

            <div class="p-6 flex flex-col flex-1 justify-between">
              <div>
                <h2 class="font-bold text-lg md:text-xl text-main group-hover:text-accent transition font-display line-clamp-1">
                  {{ course.title }}
                </h2>
                <p class="mt-2.5 text-sm text-muted leading-relaxed line-clamp-2">
                  {{ course.description }}
                </p>

                <div class="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-caption">
                  <span>⏱ {{ course.duration }}</span>
                  <span>👥 {{ course.studentsCount }}人学习</span>
                  <span>✦ 原盘RAW</span>
                </div>
              </div>

              <div class="mt-5 pt-4 border-t border-line/60 flex items-center justify-between">
                <div>
                  <span
                    class="text-xl md:text-2xl font-extrabold font-display"
                    :class="course.isFree ? 'text-emerald-600 dark:text-emerald-400' : 'text-main'"
                  >
                    {{ course.isFree ? '免费' : `¥${course.price}` }}
                  </span>
                </div>
                <span class="text-accent text-xs md:text-sm font-semibold group-hover:translate-x-1 transition-transform">
                  {{ course.isFree ? '开始学习' : '查看详情' }} &rarr;
                </span>
              </div>
            </div>
          </NuxtLink>
        </div>

        <!-- 空状态 -->
        <div
          v-if="status !== 'pending' && courses.length === 0"
          class="text-center py-20 bg-card rounded-3xl border border-line"
        >
          <p class="text-base text-caption">当前分类下暂无研习班课程</p>
          <button
            type="button"
            class="mt-4 text-sm font-medium text-accent hover:underline cursor-pointer"
            @click="currentTab = 'all'"
          >
            查看全部研习班
          </button>
        </div>

        <!-- 分页组件 -->
        <div v-if="totalPages > 1" class="mt-14">
          <AppPagination
            v-model:current-page="currentPage"
            :total-pages="totalPages"
          />
        </div>
      </AppContainer>
    </section>
  </div>
</template>
