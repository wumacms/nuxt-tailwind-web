<script setup lang="ts">
interface Props {
  limit?: number
  showViewAll?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  limit: 3,
  showViewAll: true,
})

const { courses } = useSiteData()
const displayedCourses = computed(() => courses.slice(0, props.limit))
</script>

<template>
  <section class="py-20 md:py-28 lg:py-32 bg-[#faf9f7] dark:bg-[#12100e]">
    <AppContainer>
      <div class="flex flex-wrap items-end justify-between gap-6 mb-10 md:mb-12 animate-on-scroll">
        <div class="max-w-xl">
          <span class="text-sm font-semibold text-[#b45309] dark:text-[#f59e0b] uppercase tracking-wider">
            摄影学院
          </span>
          <h2 class="mt-3 text-3xl sm:text-4xl md:text-5xl font-bold text-[#1a1816] dark:text-[#f5f2ed] tracking-tight font-display">
            提升你的摄影技艺
          </h2>
          <p class="mt-3 text-[#4a4540] dark:text-[#c4bdb1] text-base">
            由 Aperture 核心创作团队亲自授课，从入门启蒙到商业实战。
          </p>
        </div>
        <NuxtLink
          v-if="showViewAll"
          to="/courses"
          class="text-[#b45309] dark:text-[#f59e0b] font-medium inline-flex items-center gap-1 hover:gap-2 transition-all"
        >
          查看全部课程 &rarr;
        </NuxtLink>
      </div>

      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        <NuxtLink
          v-for="(course, idx) in displayedCourses"
          :key="course.id"
          :to="`/courses/${course.id}`"
          class="group flex flex-col rounded-2xl border border-[#ddd8cf] dark:border-[#2d2a26] bg-white dark:bg-[#211f1c] overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 animate-on-scroll"
          :class="`delay-${(idx + 1) * 100}`"
        >
          <div class="relative aspect-[16/10] overflow-hidden">
            <img
              :src="course.coverImage"
              :alt="course.title"
              class="w-full h-full object-cover group-hover:scale-105 transition duration-700"
              loading="lazy"
              width="800"
              height="500"
            />
            <span
              class="absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-md bg-amber-600 text-white shadow-sm"
            >
              {{ course.levelLabel }}
            </span>
            <span
              class="absolute top-3 right-3 text-xs font-medium px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-xs text-white"
            >
              {{ course.lessonsCount }} 节课
            </span>
          </div>

          <div class="p-6 flex flex-col flex-1 justify-between">
            <div>
              <h3 class="font-bold text-lg leading-snug text-[#1a1816] dark:text-[#f5f2ed] group-hover:text-amber-600 dark:group-hover:text-amber-400 transition">
                {{ course.title }}
              </h3>
              <p class="mt-2.5 text-sm text-[#4a4540] dark:text-[#c4bdb1] leading-relaxed line-clamp-2">
                {{ course.description }}
              </p>
              <div class="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-[#6b655d] dark:text-[#8a8378]">
                <span>⏱ {{ course.duration }}</span>
                <span>👥 {{ course.studentsCount }} 人在学</span>
              </div>
            </div>

            <div class="mt-5 pt-4 border-t border-[#ddd8cf] dark:border-[#2d2a26] flex items-center justify-between">
              <span
                class="text-xl font-bold font-display"
                :class="course.isFree ? 'text-emerald-600 dark:text-emerald-400' : 'text-[#1a1816] dark:text-[#f5f2ed]'"
              >
                {{ course.isFree ? '免费' : `¥${course.price}` }}
              </span>
              <span class="text-[#b45309] dark:text-[#f59e0b] text-sm font-medium group-hover:translate-x-1 transition-transform">
                {{ course.isFree ? '开始学习' : '立即报名' }} &rarr;
              </span>
            </div>
          </div>
        </NuxtLink>
      </div>
    </AppContainer>
  </section>
</template>
