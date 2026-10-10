<script setup lang="ts">
import { ref, computed } from 'vue'
import type { CourseItem } from '~/types'

const route = useRoute()
const courseId = computed(() => route.params.id as string)

// 模拟真实后端接口根据 ID 查询课程研习班详情
const { fetchCourseById } = useApi()
const { data: response, error } = await fetchCourseById(courseId)

if (error.value) {
  throw createError({
    statusCode: 404,
    statusMessage: '课程不存在或已下架',
    fatal: true,
  })
}

const currentCourse = computed(() => response.value?.data || ({} as CourseItem))

useSeoMeta({
  title: () => `${currentCourse.value.title || '研习班'} - Aperture 摄影学院`,
  description: () => currentCourse.value.description || '',
})

const breadcrumbs = computed(() => [
  { label: '摄影学院', to: '/courses' },
  { label: currentCourse.value.title || '课程详情' },
])

const isEnrollModalOpen = ref(false)
</script>

<template>
  <div>
    <!-- 头部横幅 -->
    <section class="border-b border-[#ddd8cf] dark:border-[#2d2a26] bg-[#f3f0eb] dark:bg-[#1a1816] py-12 md:py-16">
      <AppContainer>
        <AppBreadcrumb :items="breadcrumbs" />
        <div class="max-w-3xl mt-4">
          <AppBadge variant="amber" class="mb-3">
            {{ currentCourse.levelLabel }}阶段课程
          </AppBadge>
          <h1 class="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#1a1816] dark:text-[#f5f2ed] font-display">
            {{ currentCourse.title }}
          </h1>
          <p class="text-base sm:text-lg text-[#4a4540] dark:text-[#c4bdb1] mt-3 leading-relaxed">
            {{ currentCourse.description }}
          </p>
        </div>
      </AppContainer>
    </section>

    <!-- 课程大纲与报名卡片 -->
    <section class="py-16 md:py-24 bg-[#faf9f7] dark:bg-[#12100e]">
      <AppContainer>
        <div class="grid lg:grid-cols-[1.2fr_0.8fr] gap-12 items-start">
          <!-- 左侧课程大纲 -->
          <div class="space-y-8">
            <div class="rounded-3xl overflow-hidden border border-[#ddd8cf] dark:border-[#2d2a26] shadow-xl">
              <img
                :src="currentCourse.coverImage"
                :alt="currentCourse.title"
                class="w-full h-auto object-cover max-h-[480px]"
              />
            </div>

            <div class="bg-white dark:bg-[#211f1c] p-6 md:p-8 rounded-2xl border border-[#ddd8cf] dark:border-[#2d2a26] space-y-5">
              <h2 class="text-2xl font-bold font-display text-[#1a1816] dark:text-[#f5f2ed]">
                课程章节与实践项目
              </h2>
              <div class="space-y-3">
                <div
                  v-for="(chap, idx) in currentCourse.syllabus"
                  :key="idx"
                  class="p-4 rounded-xl border border-[#ddd8cf] dark:border-[#2d2a26] flex items-center justify-between"
                >
                  <div class="flex items-center gap-3">
                    <span class="w-7 h-7 rounded-lg bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-400 font-bold text-xs flex items-center justify-center">
                      0{{ idx + 1 }}
                    </span>
                    <span class="font-medium text-sm text-[#1a1816] dark:text-[#f5f2ed]">
                      {{ chap }}
                    </span>
                  </div>
                  <span class="text-xs text-[#6b655d] dark:text-[#8a8378]">视频实操</span>
                </div>
              </div>
            </div>
          </div>

          <!-- 右侧报名面板 -->
          <div class="sticky top-24 space-y-6">
            <div class="p-6 md:p-8 rounded-3xl border border-[#ddd8cf] dark:border-[#2d2a26] bg-white dark:bg-[#211f1c] shadow-lg space-y-6">
              <div class="flex items-baseline gap-2">
                <span class="text-4xl font-extrabold text-[#1a1816] dark:text-[#f5f2ed] font-display">
                  {{ currentCourse.isFree ? '完全免费' : `¥${currentCourse.price}` }}
                </span>
                <span v-if="!currentCourse.isFree" class="text-xs text-[#6b655d] dark:text-[#8a8378]">限时优惠</span>
              </div>

              <div class="text-xs text-[#6b655d] dark:text-[#8a8378] space-y-2">
                <div class="flex justify-between">
                  <span>总课时数：</span>
                  <span class="font-semibold text-[#1a1816] dark:text-[#f5f2ed]">{{ currentCourse.lessonsCount }} 节精讲</span>
                </div>
                <div class="flex justify-between">
                  <span>视频总时长：</span>
                  <span class="font-semibold text-[#1a1816] dark:text-[#f5f2ed]">{{ currentCourse.duration }}</span>
                </div>
                <div class="flex justify-between">
                  <span>学习有效期：</span>
                  <span class="font-semibold text-[#1a1816] dark:text-[#f5f2ed]">永久回放 + 配套工程 RAW</span>
                </div>
              </div>

              <AppButton
                size="lg"
                block
                class="shadow-md"
                @click="isEnrollModalOpen = true"
              >
                {{ currentCourse.isFree ? '立即开始免费学习' : '立即报名大师班' }}
              </AppButton>
              <AppButton to="/courses" variant="outline" size="md" block>
                查看其他课程
              </AppButton>
            </div>
          </div>
        </div>
      </AppContainer>
    </section>

    <!-- 弹窗反馈 -->
    <AppModal v-model="isEnrollModalOpen" title="课程报名通道">
      <div class="space-y-3">
        <p>感谢您对《{{ currentCourse.title }}》的关注！</p>
        <p class="text-xs text-[#6b655d] dark:text-[#8a8378]">
          本站为实战演示企业官网项目。您可以点击下方联系我们，或在官方交流群中获取开课通知与专属 RAW 素材包。
        </p>
      </div>
      <template #footer>
        <AppButton to="/contact" size="sm">
          前往咨询
        </AppButton>
      </template>
    </AppModal>

    <CtaSection />
  </div>
</template>
