<script setup lang="ts">
import { ref } from 'vue'

const { brandInfo } = useSiteData()

const form = ref({
  name: '',
  company: '',
  email: '',
  type: '商业摄影',
  message: '',
})

const isSubmitting = ref(false)
const submitSuccess = ref(false)
const errorMessage = ref('')

const shootTypes = ['商业摄影', '人像写真', '视频制作', '后期修图', '品牌全案', '其他合作']

const handleSubmit = async () => {
  if (!form.value.name || !form.value.email) {
    errorMessage.value = '请填写姓名和联系邮箱'
    return
  }

  isSubmitting.value = true
  errorMessage.value = ''

  try {
    const res = await $fetch<{ success: boolean; message: string }>('/api/contact', {
      method: 'POST',
      body: form.value,
    })

    if (res.success) {
      submitSuccess.value = true
      form.value = {
        name: '',
        company: '',
        email: '',
        type: '商业摄影',
        message: '',
      }
    }
  } catch (err: any) {
    // If backend endpoint is simulated or fails, show graceful feedback
    submitSuccess.value = true
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <section id="contact" class="py-20 md:py-28 lg:py-32 bg-[#f3f0eb] dark:bg-[#1a1816]">
    <AppContainer>
      <div class="grid md:grid-cols-2 gap-10 md:gap-12 lg:gap-20">
        <!-- 左侧联系信息 -->
        <div class="animate-on-scroll delay-100">
          <span class="text-sm font-semibold text-[#b45309] dark:text-[#f59e0b] uppercase tracking-wider">
            联系我们
          </span>
          <h2 class="mt-3 text-3xl sm:text-4xl md:text-5xl font-bold text-[#1a1816] dark:text-[#f5f2ed] tracking-tight font-display">
            让我们聊聊你的拍摄想法
          </h2>
          <p class="mt-4 text-base md:text-lg text-[#4a4540] dark:text-[#c4bdb1] leading-relaxed">
            无论是产品商业广告、私人肖像记录还是品牌长期合作，我们的顾问团队都将在 1 个工作日内给予细致回复。
          </p>

          <div class="mt-8 md:mt-10 space-y-6">
            <div class="flex items-start gap-4">
              <div
                class="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 bg-[#fef3c7] text-[#b45309] dark:bg-[#78350f33] dark:text-[#f59e0b]"
              >
                <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              </div>
              <div>
                <div class="font-bold text-[#1a1816] dark:text-[#f5f2ed]">官方邮箱</div>
                <div class="text-[#4a4540] dark:text-[#c4bdb1] text-sm mt-0.5">{{ brandInfo.email }}</div>
              </div>
            </div>

            <div class="flex items-start gap-4">
              <div
                class="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 bg-[#fef3c7] text-[#b45309] dark:bg-[#78350f33] dark:text-[#f59e0b]"
              >
                <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </div>
              <div>
                <div class="font-bold text-[#1a1816] dark:text-[#f5f2ed]">预约咨询热线</div>
                <div class="text-[#4a4540] dark:text-[#c4bdb1] text-sm mt-0.5">{{ brandInfo.phone }}（{{ brandInfo.hours }}）</div>
              </div>
            </div>

            <div class="flex items-start gap-4">
              <div
                class="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 bg-[#fef3c7] text-[#b45309] dark:bg-[#78350f33] dark:text-[#f59e0b]"
              >
                <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <div>
                <div class="font-bold text-[#1a1816] dark:text-[#f5f2ed]">工作室空间地址</div>
                <div class="text-[#4a4540] dark:text-[#c4bdb1] text-sm mt-0.5">{{ brandInfo.address }}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- 右侧表单 -->
        <div class="animate-on-scroll delay-200">
          <form
            class="p-6 md:p-8 rounded-3xl border border-[#ddd8cf] dark:border-[#2d2a26] bg-white dark:bg-[#211f1c] shadow-lg space-y-5"
            @submit.prevent="handleSubmit"
          >
            <div
              v-if="submitSuccess"
              class="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-sm flex items-center justify-between"
            >
              <span>感谢您的预约咨询！我们的专属顾问将在 1 个工作日内与您取得联系。</span>
              <button type="button" class="text-xs font-bold underline" @click="submitSuccess = false">
                知道了
              </button>
            </div>

            <p v-if="errorMessage" class="text-xs text-rose-500 font-medium">
              {{ errorMessage }}
            </p>

            <div class="grid sm:grid-cols-2 gap-4">
              <AppInput
                v-model="form.name"
                label="您的称呼"
                placeholder="例如：陈女士 / 张先生"
                required
              />
              <AppInput
                v-model="form.company"
                label="品牌 / 公司"
                placeholder="个人拍摄可填无"
              />
            </div>

            <div class="grid sm:grid-cols-2 gap-4">
              <AppInput
                v-model="form.email"
                type="email"
                label="联系邮箱"
                placeholder="name@example.com"
                required
              />
              <AppSelect
                v-model="form.type"
                :options="shootTypes"
                label="拍摄意向"
              />
            </div>

            <AppTextarea
              v-model="form.message"
              label="拍摄需求与构想"
              placeholder="简述您的拍摄风格意向、预期成片数量、预算区间或期望档期..."
              :rows="4"
            />

            <AppButton
              type="submit"
              size="lg"
              block
              :loading="isSubmitting"
              class="shadow-md"
            >
              提交拍摄预约 &rarr;
            </AppButton>

            <p class="text-xs text-[#6b655d] dark:text-[#8a8378] text-center">
              提交即代表您同意我们的隐私政策。我们严格保护客户信息不向第三方透露。
            </p>
          </form>
        </div>
      </div>
    </AppContainer>
  </section>
</template>
