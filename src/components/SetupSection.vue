<script setup>
import { ref, watch, onMounted } from 'vue';
import grindersData from '../data/grinders.json';
import { generateBrewRecipe } from '../services/geminiService';

const baseBeans = [
  'Ethiopia Yirgacheffe Washed',
  'Colombia Huila',
  'Kenya AA Wash'
];
const beans = ref([...baseBeans]);
const selectedBean = ref(beans.value[0]);

const selectedGrinderBrand = ref(grindersData[0].brand);
const availableModels = ref([]);
const selectedGrinderModel = ref('');
const customGrinder = ref('');

const recipe = ref(null);
const isGenerating = ref(false);

const updateModels = () => {
  const brandData = grindersData.find(g => g.brand === selectedGrinderBrand.value);
  if (brandData) {
    availableModels.value = brandData.models;
    selectedGrinderModel.value = brandData.models[0].name;
  }
};

watch(selectedGrinderBrand, updateModels);

onMounted(() => {
  updateModels();

  // Load custom beans from Gear/Profile
  const savedBeans = localStorage.getItem('v60_custom_beans');
  if (savedBeans) {
    try {
      const parsed = JSON.parse(savedBeans);
      beans.value = [...baseBeans, ...parsed];
    } catch(e) {
      console.error(e);
    }
  }

  // Load cached recipe
  const cachedRecipe = localStorage.getItem('v60_cached_recipe');
  if (cachedRecipe) {
    try {
      recipe.value = JSON.parse(cachedRecipe);
    } catch(e) {
      console.error(e);
    }
  }
});

const generateRecipe = async () => {
  isGenerating.value = true;
  // Fallback API Key if env var is missing, or ask user later if required. For now, use a dummy or let service handle it
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY || localStorage.getItem('geminiApiKey');

  if(!apiKey) {
    // If no key is set anywhere, simulate a recipe for demo purposes based on design
    setTimeout(() => {
      recipe.value = {
        ratio: '1:15',
        coffee: '20g',
        water: '300ml',
        temp: '94°C',
        grindSize: 'Medium (15 Clicks)',
        totalTime: '02:30',
        intervals: [
          { timeRange: '0:00 -> 0:45', action: 'Bloom (40ml)' },
          { timeRange: '0:45 -> 1:30', action: 'Pour to 150ml' },
          { timeRange: '1:30 -> 2:30', action: 'Pour to 300ml' }
        ]
      };
      isGenerating.value = false;
    }, 1000);
    return;
  }

  try {
    const formData = {
      beanInfo: selectedBean.value,
      grinderBrand: selectedGrinderBrand.value,
      grinderModel: selectedGrinderModel.value,
      customGrinder: customGrinder.value,
      tasteProfile: 'Overall Balance',
      isIced: false
    };
    const res = await generateBrewRecipe(apiKey, formData);
    // Map response to v2 format
    recipe.value = {
      ratio: '1:15',
      coffee: '20g',
      water: '300ml',
      temp: res.temperature,
      grindSize: res.grindSize,
      totalTime: res.totalTime,
      intervals: res.intervals
    };

    // Cache the successful generation
    localStorage.setItem('v60_cached_recipe', JSON.stringify(recipe.value));
  } catch(e) {
    console.error(e);
  } finally {
    isGenerating.value = false;
  }
};
</script>

<template>
  <div class="flex flex-col gap-8">
    <!-- Setup Card -->
    <div class="bg-white border-[3px] border-black p-6 neobrutal-shadow">
      <h2 class="font-['Public_Sans'] font-black text-[24px] uppercase mb-6 flex items-center gap-2">
        <span class="material-symbols-outlined">coffee</span> SETUP
      </h2>

      <div class="flex flex-col gap-4">
        <!-- Beans -->
        <div class="flex flex-col gap-2">
          <label class="font-['Space_Grotesk'] uppercase text-xs font-black">Beans</label>
          <select
            v-model="selectedBean"
            class="w-full bg-white border-[3px] border-black p-3 font-['Space_Grotesk'] font-medium focus:bg-yellow-50 focus:outline-none appearance-none"
          >
            <option v-for="bean in beans" :key="bean" :value="bean">{{ bean }}</option>
          </select>
        </div>

        <!-- Grinder Brand -->
        <div class="flex flex-col gap-2">
          <label class="font-['Space_Grotesk'] uppercase text-xs font-black">Grinder Brand</label>
          <select
            v-model="selectedGrinderBrand"
            class="w-full bg-white border-[3px] border-black p-3 font-['Space_Grotesk'] font-medium focus:bg-yellow-50 focus:outline-none appearance-none"
          >
            <option v-for="g in grindersData" :key="g.brand" :value="g.brand">{{ g.brand }}</option>
          </select>
        </div>

        <!-- Grinder Model -->
        <div class="flex flex-col gap-2" v-if="selectedGrinderBrand !== 'Other'">
          <label class="font-['Space_Grotesk'] uppercase text-xs font-black">Grinder Model</label>
          <select
            v-model="selectedGrinderModel"
            class="w-full bg-white border-[3px] border-black p-3 font-['Space_Grotesk'] font-medium focus:bg-yellow-50 focus:outline-none appearance-none"
          >
            <option v-for="m in availableModels" :key="m.name" :value="m.name">{{ m.name }}</option>
          </select>
        </div>

        <!-- Custom Grinder Input -->
        <div class="flex flex-col gap-2" v-if="selectedGrinderBrand === 'Other'">
          <label class="font-['Space_Grotesk'] uppercase text-xs font-black">Custom Grinder</label>
          <input
            v-model="customGrinder"
            placeholder="Name your grinder"
            class="w-full bg-white border-[3px] border-black p-3 font-['Space_Grotesk'] font-medium focus:bg-yellow-50 focus:outline-none"
          />
        </div>

        <button
          @click="generateRecipe"
          class="mt-4 bg-yellow-400 text-black border-[3px] border-black py-4 font-['Public_Sans'] font-black text-lg uppercase neobrutal-shadow-btn flex justify-center items-center gap-2"
        >
          <span v-if="isGenerating" class="material-symbols-outlined animate-spin">refresh</span>
          {{ isGenerating ? 'GENERATING...' : 'GENERATE RECIPE' }}
        </button>
      </div>
    </div>

    <!-- Recipe Card -->
    <div v-if="recipe" class="bg-white border-[3px] border-black p-6 neobrutal-shadow">
      <h2 class="font-['Public_Sans'] font-black text-[24px] uppercase mb-4">RECIPE</h2>

      <div class="flex flex-col gap-3">
        <div class="flex items-center justify-between border-b-[2px] border-black pb-2">
          <span class="font-['Space_Grotesk'] font-bold">Ratio</span>
          <span class="font-['Space_Grotesk'] font-black text-lg bg-orange-500 text-white px-2 py-0.5 border-[2px] border-black">{{ recipe.ratio }}</span>
        </div>
        <div class="flex items-center justify-between border-b-[2px] border-black pb-2">
          <span class="font-['Space_Grotesk'] font-bold">Coffee</span>
          <span class="font-['Space_Grotesk'] font-black text-lg">{{ recipe.coffee }}</span>
        </div>
        <div class="flex items-center justify-between border-b-[2px] border-black pb-2">
          <span class="font-['Space_Grotesk'] font-bold">Water</span>
          <span class="font-['Space_Grotesk'] font-black text-lg">{{ recipe.water }}</span>
        </div>
        <div class="flex items-center justify-between border-b-[2px] border-black pb-2">
          <span class="font-['Space_Grotesk'] font-bold">Temp</span>
          <span class="font-['Space_Grotesk'] font-black text-lg">{{ recipe.temp }}</span>
        </div>
        <div class="flex items-center justify-between border-b-[2px] border-black pb-2">
          <span class="font-['Space_Grotesk'] font-bold">Grind Size</span>
          <span class="font-['Space_Grotesk'] font-black text-lg text-right">{{ recipe.grindSize }}</span>
        </div>
        <div class="flex items-center justify-between border-b-[2px] border-black pb-2">
          <span class="font-['Space_Grotesk'] font-bold">Total Time</span>
          <span class="font-['Space_Grotesk'] font-black text-lg">{{ recipe.totalTime }}</span>
        </div>
      </div>

      <div class="mt-6">
        <h3 class="font-['Space_Grotesk'] font-black uppercase text-sm mb-3">Pouring Intervals</h3>
        <div class="flex flex-col gap-2">
          <div v-for="(interval, index) in recipe.intervals" :key="index" class="bg-gray-50 border-[2px] border-black p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
            <span class="font-['Space_Grotesk'] font-black bg-yellow-400 px-2 py-1 text-xs uppercase self-start sm:self-auto border-[2px] border-black">{{ interval.timeRange }}</span>
            <span class="font-['Space_Grotesk'] font-medium text-sm text-right">{{ interval.action }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>