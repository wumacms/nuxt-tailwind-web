<script setup lang="ts">
interface Props {
  modelValue?: string
  label?: string
  id?: string
  placeholder?: string
  rows?: number
  required?: boolean
  error?: string
  hint?: string
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  rows: 4,
  required: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const inputId = props.id || `textarea-${Math.random().toString(36).substring(2, 9)}`
</script>

<template>
  <div class="w-full">
    <label
      v-if="label"
      :for="inputId"
      class="block text-sm font-medium mb-1.5 text-main"
    >
      {{ label }}
      <span v-if="required" class="text-rose-500">*</span>
    </label>
    <textarea
      :id="inputId"
      :rows="rows"
      :value="modelValue"
      :placeholder="placeholder"
      :required="required"
      class="w-full px-4 py-2.5 rounded-xl border border-line-strong bg-canvas text-main placeholder:text-caption/60 outline-none transition focus:ring-2 focus:ring-accent focus:border-accent text-sm resize-y"
      :class="{ 'border-rose-500 focus:ring-rose-500': error }"
      @input="emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
    ></textarea>
    <p v-if="error" class="mt-1 text-xs text-rose-500">{{ error }}</p>
    <p v-else-if="hint" class="mt-1 text-xs text-caption">{{ hint }}</p>
  </div>
</template>
