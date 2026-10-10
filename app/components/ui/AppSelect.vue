<script setup lang="ts">
export interface SelectOption {
  label: string
  value: string | number
}

interface Props {
  modelValue?: string | number
  options: SelectOption[] | string[]
  label?: string
  id?: string
  required?: boolean
  error?: string
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  required: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const selectId = props.id || `select-${Math.random().toString(36).substring(2, 9)}`

const normalizedOptions = computed(() => {
  return props.options.map((opt) => {
    if (typeof opt === 'string') {
      return { label: opt, value: opt }
    }
    return opt
  })
})
</script>

<template>
  <div class="w-full">
    <label
      v-if="label"
      :for="selectId"
      class="block text-sm font-medium mb-1.5 text-main"
    >
      {{ label }}
      <span v-if="required" class="text-rose-500">*</span>
    </label>
    <div class="relative">
      <select
        :id="selectId"
        :value="modelValue"
        :required="required"
        class="w-full px-4 py-2.5 rounded-xl border border-line-strong bg-canvas text-main outline-none transition focus:ring-2 focus:ring-accent focus:border-accent text-sm appearance-none cursor-pointer pr-10"
        :class="{ 'border-rose-500 focus:ring-rose-500': error }"
        @change="emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
      >
        <option
          v-for="opt in normalizedOptions"
          :key="opt.value"
          :value="opt.value"
          class="bg-card text-main"
        >
          {{ opt.label }}
        </option>
      </select>
      <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-caption">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
    <p v-if="error" class="mt-1 text-xs text-rose-500">{{ error }}</p>
  </div>
</template>
