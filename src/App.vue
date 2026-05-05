<script setup>
import { ref } from 'vue';
import BrewForm from './components/BrewForm.vue';

import { generateBrewRecipe } from './services/geminiService';
import { onMounted } from 'vue';
import RecipeOutput from './components/RecipeOutput.vue';

const isGenerating = ref(false);
const recipeError = ref('');
const generatedRecipe = ref(null);

onMounted(() => {
  const cached = localStorage.getItem('v60_cached_recipe');
  if (cached) {
    try {
      generatedRecipe.value = JSON.parse(cached);
    } catch(e) {
      console.error(e);
    }
  }
});

const handleGenerateRecipe = async (data) => {
  recipeError.value = '';
  isGenerating.value = true;
  generatedRecipe.value = null; // Clear previous while loading

  try {
    const result = await generateBrewRecipe(data.apiKey, data);
    generatedRecipe.value = result;
    localStorage.setItem('v60_cached_recipe', JSON.stringify(result));
  } catch (error) {
    recipeError.value = error.message || 'An error occurred';
  } finally {
    isGenerating.value = false;
  }
};
</script>

<template>
  <div class="max-w-md mx-auto min-h-screen bg-gray-900 text-gray-100 p-4 font-montserrat">
    <header class="mb-8 mt-4 text-center">
      <h1 class="text-3xl font-bold text-neon mb-2">V60 Logic Brew</h1>
      <p class="text-gray-400 text-sm">Generator Resep Seduh Akurat</p>
    </header>

    <main class="pb-12 space-y-8">
      <BrewForm @generate="handleGenerateRecipe" :isGenerating="isGenerating" />

      <div v-if="recipeError" class="bg-red-900/50 border border-red-500/50 text-red-200 p-4 rounded-xl">
        {{ recipeError }}
      </div>

      <!-- Output Section Placeholder -->
      <div v-if="isGenerating" class="flex justify-center items-center py-10">
        <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-neon"></div>
      </div>

      <div v-if="generatedRecipe && !isGenerating">
        <RecipeOutput :recipe="generatedRecipe" />
      </div>
    </main>
  </div>
</template>

<style scoped>
</style>
