<script setup lang="ts">
const { brandInfo } = useSiteData()

useSeoMeta({
  title: () => `关于我们 - ${brandInfo.value.name} ${brandInfo.value.slogan}`,
  description: () => `了解 ${brandInfo.value.name} 的创办理念、发展历程与核心团队。用光影捕捉情绪，让画面替你说话。`,
})

const breadcrumbs = [{ label: '关于我们' }]

const studioSpecs = [
  { label: '主机系统', value: '哈苏 H6D-100c & 索尼 α1 双全画幅 / 中画幅矩阵', icon: 'lucide:camera' },
  { label: '灯光设备', value: '瑞士布朗（Broncolor）Scoro 3200 电箱与控光附件', icon: 'lucide:zap' },
  { label: '色彩管理', value: '日本艺卓（EIZO）ColorEdge 4K 硬件校准工作站', icon: 'lucide:monitor' },
  { label: '摄影空间', value: 'M50 艺术区 800㎡ 挑高 6 米专业无影摄影棚与自然光房', icon: 'lucide:building-2' },
]
</script>

<template>
  <div>
    <!-- 头部横幅 Banner（带背景图与遮罩） -->
    <PageBanner
      title="关于 Aperture"
      subtitle="用光影刻画时代的情感肖像，坚守每一寸灰阶与色彩的纯粹。"
      badge="工作室简介"
      bg-image="https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=1600&h=700&fit=crop"
      :breadcrumbs="breadcrumbs"
    />

    <!-- 品牌故事与理念 -->
    <section class="py-16 md:py-24 bg-canvas">
      <AppContainer>
        <div class="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div class="space-y-6">
            <span class="inline-block text-sm font-semibold text-accent uppercase tracking-wider animate-on-scroll">
              我们的艺术哲学
            </span>
            <h2 class="text-3xl sm:text-4xl md:text-5xl font-bold font-display text-main leading-tight animate-on-scroll delay-50">
              在快节奏的世界里<br />留下经得起凝视的沉淀
            </h2>
            <p class="text-base text-muted leading-relaxed animate-on-scroll delay-100">
              Aperture 创立于 2013 年，最初诞生于上海一处狭小的黑白暗房。我们从手工冲洗银盐胶片开始，探索光线在感光材料上留下的微妙呼吸。
            </p>
            <p class="text-base text-muted leading-relaxed animate-on-scroll delay-150">
              十二年间，技术从机械胶片演进至一亿像素数码与智能计算摄影，但我们始终笃信：器械只是视网膜的延伸，真正的灵性在于摄影师对人性的共情、对光影的敬畏，以及在喧嚣中捕捉静止瞬间的专注力。
            </p>
          </div>

          <div class="relative animate-on-scroll delay-200">
            <div class="rounded-3xl overflow-hidden border border-line shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1554048612-b6a482bc67e5?w=900&h=700&fit=crop"
                alt="Aperture 创作者现场"
                class="w-full h-auto object-cover"
                loading="lazy"
                width="900"
                height="700"
              />
            </div>
          </div>
        </div>
      </AppContainer>
    </section>

    <!-- 发展历程时间轴（关于页独有深度区块） -->
    <TimelineSection />

    <!-- 核心团队介绍（关于页独有团队展示） -->
    <TeamSection />

    <!-- 影棚环境与硬件配置标准 -->
    <section class="py-16 md:py-24 bg-canvas border-t border-line">
      <AppContainer>
        <div class="max-w-2xl mx-auto text-center mb-12">
          <span class="inline-block text-sm font-semibold text-accent uppercase tracking-wider animate-on-scroll">
            生产力标准
          </span>
          <h2 class="mt-2 text-3xl md:text-4xl font-bold font-display text-main animate-on-scroll delay-50">
            顶级工作室配置矩阵
          </h2>
          <p class="mt-3 text-sm text-muted animate-on-scroll delay-100">
            卓越的视觉呈现离不开严苛的工程化与硬件底层支撑。
          </p>
        </div>

        <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div
            v-for="(spec, idx) in studioSpecs"
            :key="spec.label"
            :class="[
              'p-6 rounded-2xl bg-card border border-line shadow-sm animate-on-scroll',
              idx === 0 ? 'delay-50' : idx === 1 ? 'delay-100' : idx === 2 ? 'delay-150' : 'delay-200'
            ]"
          >
            <div class="w-9 h-9 rounded-xl bg-accent-soft text-accent flex items-center justify-center mb-4">
              <Icon :name="spec.icon" class="w-5 h-5" />
            </div>
            <div class="text-xs font-semibold text-accent mb-1.5 uppercase tracking-wide">
              {{ spec.label }}
            </div>
            <div class="text-sm font-medium text-main leading-relaxed">
              {{ spec.value }}
            </div>
          </div>
        </div>
      </AppContainer>
    </section>

    <!-- 预约咨询号召 -->
    <CtaSection />

    <!-- 预约咨询与表单（ID锚点：#contact） -->
    <ContactSection />
  </div>
</template>
