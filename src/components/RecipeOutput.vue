<script setup>
import { Settings, Thermometer, Clock, ArrowRight } from 'lucide-vue-next';

const props = defineProps({
  recipe: {
    type: Object,
    required: true
  }
});
</script>

<template>
  <div class="bg-gray-800 rounded-2xl p-6 border border-neon/50 shadow-[0_0_20px_rgba(204,255,0,0.1)] space-y-6 animate-fade-in">

    <div class="text-center space-y-1">
      <h2 class="text-xl font-bold text-gray-100">Recipe Setup</h2>
      <p class="text-xs text-neon">AI Generated Parameters</p>
    </div>

    <!-- Key Metrics -->
    <div class="grid grid-cols-3 gap-3">
      <div class="bg-gray-900 rounded-xl p-3 text-center border border-gray-700">
        <Settings class="w-5 h-5 text-gray-400 mx-auto mb-2" />
        <p class="text-[10px] text-gray-500 uppercase tracking-wider mb-1">Grind Size</p>
        <p class="font-bold text-neon text-sm leading-tight">{{ recipe.grindSize }}</p>
      </div>

      <div class="bg-gray-900 rounded-xl p-3 text-center border border-gray-700">
        <Thermometer class="w-5 h-5 text-gray-400 mx-auto mb-2" />
        <p class="text-[10px] text-gray-500 uppercase tracking-wider mb-1">Temp</p>
        <p class="font-bold text-neon text-sm leading-tight">{{ recipe.temperature }}</p>
      </div>

      <div class="bg-gray-900 rounded-xl p-3 text-center border border-gray-700">
        <Clock class="w-5 h-5 text-gray-400 mx-auto mb-2" />
        <p class="text-[10px] text-gray-500 uppercase tracking-wider mb-1">Time</p>
        <p class="font-bold text-neon text-sm leading-tight">{{ recipe.totalTime }}</p>
      </div>
    </div>

    <hr class="border-gray-700" />

    <!-- Timeline -->
    <div class="space-y-4">
      <h3 class="font-semibold text-gray-300 text-sm">Pouring Intervals</h3>

      <div class="relative border-l-2 border-gray-700 ml-3 pl-6 space-y-6">
        <div
          v-for="(interval, index) in recipe.intervals"
          :key="index"
          class="relative"
        >
          <div class="absolute -left-[31px] bg-gray-900 border-2 border-neon w-4 h-4 rounded-full"></div>

          <div class="bg-gray-900 border border-gray-700 rounded-xl p-3 shadow-sm">
            <span class="text-xs font-mono text-neon bg-neon/10 px-2 py-1 rounded">{{ interval.timeRange }}</span>
            <p class="mt-2 text-sm text-gray-200">{{ interval.action }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Actions -->
    <div class="flex gap-3 pt-4">
      <button class="flex-1 bg-neon text-gray-900 font-bold py-3 rounded-xl hover:bg-[#b3e600] active:scale-[0.98] transition-all flex justify-center items-center gap-2 shadow-[0_0_10px_rgba(204,255,0,0.2)]">
        Mulai Seduh
        <ArrowRight class="w-4 h-4" />
      </button>
      <button class="flex-1 bg-transparent border-2 border-gray-600 text-gray-300 font-bold py-3 rounded-xl hover:bg-gray-700 active:scale-[0.98] transition-all">
        Save Recipe
      </button>
    </div>

  </div>
</template>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.5s ease-out forwards;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
