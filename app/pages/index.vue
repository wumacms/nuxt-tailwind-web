<script setup lang="ts">
useSeoMeta({
  title: 'Aperture — 摄影艺术与视觉叙事',
  ogTitle: 'Aperture — 摄影艺术与视觉叙事',
  description: 'Aperture 专注于商业摄影、人像写真与品牌视觉叙事。用光影捕捉情绪，让每一帧都成为永恒。',
  ogDescription: 'Aperture 专注于商业摄影、人像写真与品牌视觉叙事。用光影捕捉情绪，让每一帧都成为永恒。',
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
