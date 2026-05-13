<script setup lang="ts">
import { ArrowRight } from 'lucide-vue-next';

defineProps<{
  id: string;
  name: string;
  description: string;
  iconColor: string;
  hoverBorder: string;
}>();

defineEmits(['click']);
</script>

<template>
  <button
    :id="id"
    @click="$emit('click')"
    :class="[
      'bg-white p-10 rounded-2xl border border-slate-200 shadow-xl text-left relative overflow-hidden transition-all hover:-translate-y-2',
      hoverBorder
    ]"
  >
    <div :class="['mb-6 w-12 h-12 rounded-xl flex items-center justify-center bg-slate-50', iconColor]">
      <slot name="icon" />
    </div>
    <h3 class="text-2xl font-bold mb-2">{{ name }}</h3>
    <p class="text-slate-400 mb-8 text-sm font-medium">{{ description }}</p>
    <div :class="['flex items-center gap-2 text-xs font-bold uppercase', iconColor]">
      查看详情 <ArrowRight class="w-4 h-4" />
    </div>
  </button>
</template>
