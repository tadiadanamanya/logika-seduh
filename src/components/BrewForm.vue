<script setup>
import { ref, reactive, watch, onMounted } from 'vue';
import { ChevronDown, Beaker, Coffee, Info, KeyRound } from 'lucide-vue-next';

const props = defineProps({
  isGenerating: Boolean
});

const emit = defineEmits(['generate']);

// Form State
const formData = reactive({
  grinderBrand: '',
  grinderModel: '',
  customGrinder: '',
  beanInfo: '',
  tasteProfile: 'Overall Balance',
  isIced: false,
  apiKey: '',
});

// Options
const tasteProfiles = [
  'Body Tebal',
  'Acidity',
  'Manis',
  'Clean',
  'Overall Balance'
];

const grinders = {
  'Comandante': ['C40 MK4', 'C40 MK3', 'Trailmaster'],
  'Timemore': ['Chestnut C2', 'Chestnut C3', 'Slim', 'X'],
  '1Zpresso': ['JX-Pro', 'K-Max', 'K-Ultra', 'Q2'],
  'Kingrinder': ['K4', 'K6'],
  'Other (Manual)': ['Custom']
};

const grinderBrands = Object.keys(grinders);
const availableModels = ref([]);

watch(() => formData.grinderBrand, (newBrand) => {
  if (newBrand) {
    availableModels.value = grinders[newBrand] || [];
    formData.grinderModel = availableModels.value[0] || '';
  } else {
    availableModels.value = [];
    formData.grinderModel = '';
  }
});

onMounted(() => {
  const savedKey = localStorage.getItem('geminiApiKey');
  if (savedKey) {
    formData.apiKey = savedKey;
  }
});

const saveApiKey = () => {
  localStorage.setItem('geminiApiKey', formData.apiKey);
};

const handleGenerate = () => {
  saveApiKey();
  emit('generate', formData);
};

</script>

<template>
  <div class="bg-gray-800 rounded-2xl p-5 border border-gray-700 shadow-lg space-y-6">

    <!-- Gemini API Key -->
    <div class="space-y-2">
      <label class="text-sm font-medium text-gray-300 flex items-center gap-2">
        <KeyRound class="w-4 h-4 text-neon" />
        Gemini API Key (Free)
      </label>
      <input
        v-model="formData.apiKey"
        type="password"
        placeholder="Enter your Google Gemini API Key"
        @change="saveApiKey"
        class="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 min-h-[48px] text-gray-100 focus:outline-none focus:border-neon transition-colors"
      />
      <p class="text-xs text-gray-500">Your key is stored locally on your device.</p>
    </div>

    <hr class="border-gray-700" />

    <!-- Grinder Selection -->
    <div class="space-y-3">
      <label class="text-sm font-medium text-gray-300 flex items-center gap-2">
        <Info class="w-4 h-4 text-neon" />
        Grinder Setup
      </label>

      <div class="grid grid-cols-2 gap-3">
        <div class="relative">
          <select
            v-model="formData.grinderBrand"
            class="w-full appearance-none bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 min-h-[48px] text-gray-100 focus:outline-none focus:border-neon transition-colors"
          >
            <option value="" disabled>Brand</option>
            <option v-for="brand in grinderBrands" :key="brand" :value="brand">
              {{ brand }}
            </option>
          </select>
          <ChevronDown class="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
        </div>

        <div class="relative" v-if="formData.grinderBrand !== 'Other (Manual)'">
          <select
            v-model="formData.grinderModel"
            :disabled="!formData.grinderBrand"
            class="w-full appearance-none bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 min-h-[48px] text-gray-100 focus:outline-none focus:border-neon transition-colors disabled:opacity-50"
          >
            <option value="" disabled>Model</option>
            <option v-for="model in availableModels" :key="model" :value="model">
              {{ model }}
            </option>
          </select>
          <ChevronDown class="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
        </div>
      </div>

      <!-- Custom Grinder Input -->
      <div v-if="formData.grinderBrand === 'Other (Manual)'">
        <input
          v-model="formData.customGrinder"
          type="text"
          placeholder="Nama grinder (misal: Guerrero, One Two Cups...)"
          class="w-full mt-3 bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 min-h-[48px] text-gray-100 focus:outline-none focus:border-neon transition-colors"
        />
        <p class="text-xs text-gray-500 mt-2">AI akan mencoba mencari konfigurasi optimal untuk grinder ini.</p>
      </div>
    </div>

    <!-- Bean Info -->
    <div class="space-y-2">
      <label class="text-sm font-medium text-gray-300 flex items-center gap-2">
        <Coffee class="w-4 h-4 text-neon" />
        Informasi Beans
      </label>
      <input
        v-model="formData.beanInfo"
        type="text"
        placeholder="Jenis Beans (e.g., Ethiopia Wash...)"
        class="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 min-h-[48px] text-gray-100 focus:outline-none focus:border-neon transition-colors"
      />
    </div>

    <!-- Water Badge -->
    <div class="bg-gray-900/50 border border-neon/30 rounded-xl p-3 flex items-center justify-between">
      <div class="flex items-center gap-2">
        <Beaker class="w-5 h-5 text-neon" />
        <span class="font-medium text-gray-200">Water: Cleo</span>
      </div>
      <span class="text-xs bg-neon/20 text-neon px-2 py-1 rounded-md font-semibold tracking-wide uppercase">Locked</span>
    </div>

    <!-- Target Taste Profile -->
    <div class="space-y-3">
      <label class="text-sm font-medium text-gray-300">Target Taste Profile</label>
      <div class="flex flex-wrap gap-2">
        <button
          v-for="profile in tasteProfiles"
          :key="profile"
          @click="formData.tasteProfile = profile"
          class="px-4 py-2 min-h-[44px] rounded-full text-sm font-medium transition-all duration-200"
          :class="formData.tasteProfile === profile
            ? 'bg-neon text-gray-900 shadow-[0_0_10px_rgba(204,255,0,0.3)]'
            : 'bg-gray-900 text-gray-400 border border-gray-700 hover:border-gray-500'"
        >
          {{ profile }}
        </button>
      </div>
    </div>

    <!-- Iced Coffee Toggle -->
    <div class="flex items-center justify-between bg-gray-900 border border-gray-700 rounded-xl p-4">
      <div>
        <h4 class="font-medium text-gray-100">Japanese Iced Coffee</h4>
        <p class="text-xs text-gray-400">Pakai Es Batu</p>
      </div>
      <button
        @click="formData.isIced = !formData.isIced"
        class="w-14 h-8 rounded-full p-1 transition-colors duration-300 focus:outline-none"
        :class="formData.isIced ? 'bg-neon' : 'bg-gray-700'"
      >
        <div
          class="bg-white w-6 h-6 rounded-full shadow-md transform transition-transform duration-300"
          :class="formData.isIced ? 'translate-x-6' : 'translate-x-0'"
        ></div>
      </button>
    </div>

    <!-- Generate Button -->
    <button
      @click="handleGenerate"
      class="w-full bg-neon text-gray-900 font-bold text-lg py-4 min-h-[56px] rounded-xl hover:bg-[#b3e600] active:scale-[0.98] transition-all shadow-[0_0_15px_rgba(204,255,0,0.2)] disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
      :disabled="!formData.apiKey || !formData.beanInfo || !formData.grinderBrand || props.isGenerating"
    >
      <span v-if="props.isGenerating" class="animate-spin h-5 w-5 border-2 border-gray-900 border-t-transparent rounded-full"></span>
      {{ props.isGenerating ? 'Generating...' : 'Generate Resep Seduh' }}
    </button>
  </div>
</template>
