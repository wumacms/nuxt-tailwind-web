<script setup lang="ts">
import { ref, computed, watch } from 'vue'

useSeoMeta({
  title: '摄影学院与大师研习班 - Aperture',
  description: 'Aperture 学院提供摄影入门、商业人像布光、Lightroom 调色体系与商业接单全流程课程。',
})

const breadcrumbs = [{ label: '摄影学院' }]

const currentTab = ref('all')
const currentPage = ref(1)
const pageSize = 6

// 模拟真实后端接口获取课程分页数据
const { fetchCourses } = useApi()
const { data: response, status } = await fetchCourses({
  level: currentTab,
  page: currentPage,
  pageSize,
})

watch(currentTab, () => {
  currentPage.value = 1
})

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
    <section class="py-16 md:py-24 bg-[#faf9f7] dark:bg-[#12100e]">
      <AppContainer>
        <!-- 分类筛选条件 -->
        <div class="mb-10 flex flex-wrap items-center justify-between gap-4">
          <AppTabs v-model="currentTab" :tabs="tabs" />
          <div class="text-xs text-[#6b655d] dark:text-[#8a8378]">
            共找到 <span class="font-bold text-amber-600 dark:text-amber-400">{{ total }}</span> 门精品课程
          </div>
        </div>

        <!-- 加载中微状态提示 -->
        <div v-if="status === 'pending'" class="py-12 text-center text-sm text-[#6b655d] dark:text-[#8a8378]">
          <span class="inline-block animate-spin mr-2">◌</span> 正在从接口获取课程列表...
        </div>

        <!-- 课程网格列表 -->
        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          <NuxtLink
            v-for="course in courses"
            :key="course.id"
            :to="`/courses/${course.id}`"
            class="group flex flex-col rounded-2xl border border-[#ddd8cf] dark:border-[#2d2a26] bg-white dark:bg-[#211f1c] overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            <div class="relative aspect-[16/10] overflow-hidden bg-[#e8e4dd] dark:bg-[#2d2a26]">
              <img
                :src="course.coverImage"
                :alt="course.title"
                class="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                loading="lazy"
                width="800"
                height="500"
              />
              <span
                class="absolute top-3.5 left-3.5 text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-600 text-white shadow-md"
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
                <h2 class="font-bold text-lg md:text-xl text-[#1a1816] dark:text-[#f5f2ed] group-hover:text-amber-600 dark:group-hover:text-amber-400 transition font-display line-clamp-1">
                  {{ course.title }}
                </h2>
                <p class="mt-2.5 text-sm text-[#4a4540] dark:text-[#c4bdb1] leading-relaxed line-clamp-2">
                  {{ course.description }}
                </p>

                <div class="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-[#6b655d] dark:text-[#8a8378]">
                  <span>⏱ {{ course.duration }}</span>
                  <span>👥 {{ course.studentsCount }}人学习</span>
                  <span>✦ 原盘RAW</span>
                </div>
              </div>

              <div class="mt-5 pt-4 border-t border-[#ddd8cf]/60 dark:border-[#2d2a26] flex items-center justify-between">
                <div>
                  <span
                    class="text-xl md:text-2xl font-extrabold font-display"
                    :class="course.isFree ? 'text-emerald-600 dark:text-emerald-400' : 'text-[#1a1816] dark:text-[#f5f2ed]'"
                  >
                    {{ course.isFree ? '免费' : `¥${course.price}` }}
                  </span>
                </div>
                <span class="text-amber-700 dark:text-amber-400 text-xs md:text-sm font-semibold group-hover:translate-x-1 transition-transform">
                  {{ course.isFree ? '开始学习' : '查看详情' }} &rarr;
                </span>
              </div>
            </div>
          </NuxtLink>
        </div>

        <!-- 空状态 -->
        <div
          v-if="status !== 'pending' && courses.length === 0"
          class="text-center py-20 bg-white dark:bg-[#211f1c] rounded-3xl border border-[#ddd8cf] dark:border-[#2d2a26]"
        >
          <p class="text-base text-[#6b655d] dark:text-[#8a8378]">当前分类下暂无研习班课程</p>
          <button
            type="button"
            class="mt-4 text-sm font-medium text-amber-600 dark:text-amber-400 hover:underline cursor-pointer"
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
