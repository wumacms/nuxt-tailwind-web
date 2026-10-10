<script setup lang="ts">
const { brandInfo } = useSiteData()

useSeoMeta({
  title: () => `${brandInfo.value.name} — ${brandInfo.value.slogan}`,
  ogTitle: () => `${brandInfo.value.name} — ${brandInfo.value.slogan}`,
  description: () => brandInfo.value.description,
  ogDescription: () => brandInfo.value.description,
})
</script>

<template>
  <div>
    <!-- 首屏视觉 Hero -->
    <HeroSection />

    <!-- 合作品牌走马灯 -->
    <LogoWall />

    <!-- 摄影核心服务特色 -->
    <FeaturesSection />

    <!-- 关键数据展现 -->
    <StatsSection />

    <!-- 为什么选择我们（双栏特色与拍摄策略） -->
    <SplitAboutSection />

    <!-- 智能后期与色彩科学 -->
    <SplitTechSection />

    <!-- 全景视觉大片长廊 -->
    <PanoramicSection />

    <!-- 真实客户评价 -->
    <TestimonialsSection />

    <!-- 常见问题解答 -->
    <FaqSection />

    <!-- 转化号召 Banner -->
    <CtaSection />
  </div>
</template>
