<script setup>
import { ref, onMounted } from 'vue';

const customBeans = ref([]);
const newBeanName = ref('');

onMounted(() => {
  const saved = localStorage.getItem('v60_custom_beans');
  if (saved) {
    try {
      customBeans.value = JSON.parse(saved);
    } catch(e) {
      console.error(e);
    }
  }
});

const saveBeans = () => {
  localStorage.setItem('v60_custom_beans', JSON.stringify(customBeans.value));
};

const addBean = () => {
  if (newBeanName.value.trim() && !customBeans.value.includes(newBeanName.value.trim())) {
    customBeans.value.push(newBeanName.value.trim());
    saveBeans();
    newBeanName.value = '';
  }
};

const removeBean = (index) => {
  customBeans.value.splice(index, 1);
  saveBeans();
};

</script>

<template>
  <div class="bg-white border-[3px] border-black p-6 neobrutal-shadow flex flex-col gap-6">
    <h2 class="font-['Public_Sans'] font-black text-[24px] uppercase flex items-center gap-2">
      <span class="material-symbols-outlined">settings</span> GEAR / PROFILE
    </h2>

    <div>
      <h3 class="font-['Space_Grotesk'] font-bold text-lg mb-2">My Bean Cellar</h3>
      <p class="text-xs text-gray-500 mb-4">Add your custom beans here to make them available in the Setup menu.</p>

      <div class="flex gap-2 mb-4">
        <input
          v-model="newBeanName"
          @keyup.enter="addBean"
          placeholder="e.g. Panama Geisha Natural"
          class="flex-1 bg-white border-[3px] border-black p-3 font-['Space_Grotesk'] font-medium focus:bg-yellow-50 focus:outline-none"
        />
        <button
          @click="addBean"
          class="bg-yellow-400 text-black border-[3px] border-black px-4 font-['Public_Sans'] font-black uppercase neobrutal-shadow-btn"
        >
          ADD
        </button>
      </div>

      <div class="flex flex-col gap-2">
        <div
          v-for="(bean, index) in customBeans"
          :key="index"
          class="flex items-center justify-between border-[2px] border-black p-3 bg-gray-50"
        >
          <span class="font-['Space_Grotesk'] font-medium">{{ bean }}</span>
          <button @click="removeBean(index)" class="text-red-600 hover:text-red-800">
            <span class="material-symbols-outlined">delete</span>
          </button>
        </div>
        <p v-if="customBeans.length === 0" class="text-sm text-gray-400 italic">No custom beans added yet.</p>
      </div>
    </div>
  </div>
</template>