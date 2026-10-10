<script setup lang="ts">
interface Props {
  modelValue: boolean
  title?: string
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const close = () => {
  emit('update:modelValue', false)
}
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="modelValue"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs"
        @click.self="close"
      >
        <div
          class="w-full max-w-lg bg-white dark:bg-[#211f1c] rounded-3xl border border-[#ddd8cf] dark:border-[#2d2a26] shadow-2xl overflow-hidden p-6 md:p-8 animate-float-slow"
        >
          <div class="flex items-center justify-between mb-4">
            <h3 v-if="title" class="text-xl font-bold font-display text-[#1a1816] dark:text-[#f5f2ed]">
              {{ title }}
            </h3>
            <button
              type="button"
              class="w-8 h-8 rounded-lg flex items-center justify-center text-[#6b655d] dark:text-[#8a8378] hover:bg-black/5 dark:hover:bg-white/5 transition"
              @click="close"
            >
              ✕
            </button>
          </div>
          <div class="text-[#4a4540] dark:text-[#c4bdb1] text-sm leading-relaxed">
            <slot />
          </div>
          <div v-if="$slots.footer" class="mt-6 flex justify-end gap-3 pt-4 border-t border-[#ddd8cf] dark:border-[#2d2a26]">
            <slot name="footer" />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
