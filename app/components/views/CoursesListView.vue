<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { buildListUrl } from '~/utils/route-helper'
import { PAGE_SIZES, COURSE_CATEGORIES } from '~/constants/site'

const route = useRoute()

const breadcrumbs = [{ label: '摄影学院' }]

// 从路由参数（路径或查询参数）读取分类与页码
const parseCategory = (): string => {
  const val =
    (route.params.category as string) ||
    (route.query.category as string) ||
    (route.query.level as string)
  return val && val.trim() ? val.trim() : 'all'
}

const parsePage = (): number => {
  const p = route.params.page || route.query.page
  const pageNum = parseInt(String(p || 1), 10)
  return !isNaN(pageNum) && pageNum > 0 ? pageNum : 1
}

const currentTab = ref(parseCategory())
const currentPage = ref(parsePage())
const pageSize = PAGE_SIZES.courses

useSeoMeta({
  title: computed(() => {
    const pageSuffix = currentPage.value > 1 ? ` (第 ${currentPage.value} 页)` : ''
    return `摄影学院与大师研习班${pageSuffix} - Aperture`
  }),
  description: 'Aperture 学院提供摄影入门、商业人像布光、Lightroom 调色体系与商业接单全流程课程。',
})

// 监听路由参数变化，保持响应式更新
watch(
  () => [route.params.category, route.params.page, route.query.category, route.query.page],
  () => {
    currentTab.value = parseCategory()
    currentPage.value = parsePage()
  }
)

const { fetchCourses } = useApi()
const { data: response, status } = await fetchCourses({
  category: currentTab,
  page: currentPage,
  pageSize,
})

const courses = computed(() => response.value?.data?.list || [])
const total = computed(() => response.value?.data?.total || 0)
const totalPages = computed(() => response.value?.data?.totalPages || 1)
const counts = computed(() => response.value?.data?.categoryCounts || {})

const tabs = computed(() =>
  COURSE_CATEGORIES.map((cat) => ({
    id: cat.id,
    label: cat.label,
    count: counts.value[cat.id] ?? 0,
    to: buildListUrl('courses', cat.id, 1),
  }))
)
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
        <!-- 分类筛选条件（静态超链接 Tab） -->
        <div class="mb-10 flex flex-wrap items-center justify-between gap-4">
          <AppTabs v-model="currentTab" :tabs="tabs" />
          <div class="text-xs text-caption">
            共找到 <span class="font-bold text-accent">{{ total }}</span> 门精品课程
          </div>
        </div>

        <!-- 加载中微状态提示 -->
        <div v-if="status === 'pending'" class="py-12 text-center text-sm text-caption">
          <span class="inline-block animate-spin mr-2">◌</span> 正在加载课程列表...
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
          <NuxtLink
            to="/courses"
            class="mt-4 text-sm font-medium text-accent hover:underline inline-block cursor-pointer"
          >
            查看全部研习班
          </NuxtLink>
        </div>

        <!-- 分页组件（静态物理链接） -->
        <div v-if="totalPages > 1" class="mt-14">
          <AppPagination
            v-model:current-page="currentPage"
            :total-pages="totalPages"
            :get-page-url="(p) => buildListUrl('courses', currentTab, p)"
          />
        </div>
      </AppContainer>
    </section>
  </div>
</template>
