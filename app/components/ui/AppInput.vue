<script setup lang="ts">
interface Props {
  modelValue?: string | number
  label?: string
  id?: string
  placeholder?: string
  type?: string
  required?: boolean
  error?: string
  hint?: string
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  type: 'text',
  required: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const inputId = props.id || `input-${Math.random().toString(36).substring(2, 9)}`
</script>

<template>
  <div class="w-full">
    <label
      v-if="label"
      :for="inputId"
      class="block text-sm font-medium mb-1.5 text-[#1a1816] dark:text-[#f5f2ed]"
    >
      {{ label }}
      <span v-if="required" class="text-rose-500">*</span>
    </label>
    <input
      :id="inputId"
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :required="required"
      class="w-full px-4 py-2.5 rounded-xl border border-[#c4bdb1] dark:border-[#4a4540] bg-[#faf9f7] dark:bg-[#12100e] text-[#1a1816] dark:text-[#f5f2ed] placeholder-gray-400 dark:placeholder-gray-500 outline-none transition focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-sm"
      :class="{ 'border-rose-500 focus:ring-rose-500': error }"
      @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />
    <p v-if="error" class="mt-1 text-xs text-rose-500">{{ error }}</p>
    <p v-else-if="hint" class="mt-1 text-xs text-[#6b655d] dark:text-[#8a8378]">{{ hint }}</p>
  </div>
</template>
