<script setup lang="ts">
defineProps<{
  active: boolean;
  label: string;
}>();

defineEmits(['click']);
</script>

<template>
  <button
    @click="$emit('click')"
    :class="[
      'flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-semibold text-[13px] border',
      active 
        ? 'bg-purple-50 text-purple-600 border-purple-200' 
        : 'bg-white text-slate-500 border-transparent hover:bg-slate-50'
    ]"
  >
    <slot name="icon" />
    <span>{{ label }}</span>
    <div v-if="active" class="ml-auto w-1.5 h-1.5 rounded-full bg-purple-600" />
  </button>
</template>
