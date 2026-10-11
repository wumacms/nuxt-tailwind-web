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
const displayedCourses = computed(() => (courses.value || []).slice(0, props.limit))
</script>

<template>
  <section class="py-20 md:py-28 lg:py-32 bg-canvas">
    <AppContainer>
      <div class="flex flex-wrap items-end justify-between gap-6 mb-10 md:mb-12">
        <div class="max-w-xl">
          <span class="inline-block text-sm font-semibold text-accent uppercase tracking-wider animate-on-scroll">
            摄影学院
          </span>
          <h2 class="mt-3 text-3xl sm:text-4xl md:text-5xl font-bold text-main tracking-tight font-display animate-on-scroll delay-50">
            提升你的摄影技艺
          </h2>
          <p class="mt-3 text-muted text-base animate-on-scroll delay-100">
            由 Aperture 核心创作团队亲自授课，从入门启蒙到商业实战。
          </p>
        </div>
        <NuxtLink
          v-if="showViewAll"
          to="/courses"
          class="text-accent font-medium inline-flex items-center gap-1 hover:gap-2 transition-all animate-on-scroll delay-150"
        >
          <span>查看全部课程</span>
          <Icon name="lucide:arrow-right" class="w-4 h-4" />
        </NuxtLink>
      </div>

      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        <NuxtLink
          v-for="(course, idx) in displayedCourses"
          :key="course.id"
          :to="`/courses/${course.id}`"
          class="group flex flex-col rounded-2xl border border-line bg-card overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 animate-on-scroll"
          :class="`delay-${(idx + 1) * 100}`"
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
              class="absolute top-4 left-4 text-xs font-semibold px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white shadow-sm"
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
              <h3 class="font-bold text-lg leading-snug text-main group-hover:text-accent transition">
                {{ course.title }}
              </h3>
              <p class="mt-2.5 text-sm text-muted leading-relaxed line-clamp-2">
                {{ course.description }}
              </p>
              <div class="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-caption">
                <span class="inline-flex items-center gap-1">
                  <Icon name="lucide:clock" class="w-3.5 h-3.5 text-accent" />
                  {{ course.duration }}
                </span>
                <span class="inline-flex items-center gap-1">
                  <Icon name="lucide:users" class="w-3.5 h-3.5 text-accent" />
                  {{ course.studentsCount }} 人在学
                </span>
              </div>
            </div>

            <div class="mt-5 pt-4 border-t border-line flex items-center justify-between">
              <span
                class="text-xl font-bold font-display"
                :class="course.isFree ? 'text-emerald-600 dark:text-emerald-400' : 'text-main'"
              >
                {{ course.isFree ? '免费' : `¥${course.price}` }}
              </span>
              <span class="text-accent text-sm font-medium group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                <span>{{ course.isFree ? '开始学习' : '立即报名' }}</span>
                <Icon name="lucide:arrow-right" class="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        </NuxtLink>
      </div>
    </AppContainer>
  </section>
</template>
