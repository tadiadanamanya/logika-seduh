<script setup>
import { ref } from 'vue';
import SetupSection from './components/SetupSection.vue';
import TimerSection from './components/TimerSection.vue';
import StatsSection from './components/StatsSection.vue';
import GearSection from './components/GearSection.vue';

const currentTab = ref('brew'); // brew, methods, history, gear
</script>

<template>
  <div class="bg-gray-50 text-gray-900 font-['Space_Grotesk'] min-h-screen pb-32">
    <!-- TopAppBar -->
    <header class="fixed top-0 left-0 w-full z-50 px-6 h-16 flex items-center justify-between bg-white border-b-[3px] border-black shadow-[0px_4px_0px_0px_#000000]">
      <div class="flex items-center gap-4">
        <button class="flex items-center justify-center w-10 h-10 border-[3px] border-black bg-white active:translate-y-1 active:shadow-none transition-all">
          <span class="material-symbols-outlined">menu</span>
        </button>
        <h1 class="font-['Public_Sans'] font-black uppercase tracking-tight text-black text-xl italic tracking-widest hidden sm:block">V60 BREW LOGIC</h1>
      </div>
      <div class="flex items-center gap-3">
        <span class="font-['Space_Grotesk'] text-sm bg-yellow-400 px-3 py-1 border-[3px] border-black font-black uppercase">LIVE</span>
        <button class="flex items-center justify-center w-10 h-10 border-[3px] border-black bg-white active:translate-y-1 active:shadow-none transition-all">
          <span class="material-symbols-outlined">timer</span>
        </button>
      </div>
    </header>

    <!-- Main Content -->
    <main class="pt-24 px-4 sm:px-6 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8">
      <!-- Setup Section (Left) -->
      <section class="md:col-span-4 flex flex-col gap-8">
        <SetupSection v-if="currentTab === 'brew'" />
        <GearSection v-if="currentTab === 'gear'" />
      </section>

      <!-- Timer & Visualizer Section (Center) -->
      <section class="md:col-span-5 flex flex-col gap-8">
        <TimerSection v-if="currentTab === 'brew'" />
      </section>

      <!-- History/Stats Section (Right) -->
      <section class="md:col-span-3 flex flex-col gap-8">
        <StatsSection v-if="currentTab === 'brew'" />
      </section>
    </main>

    <!-- BottomNavBar -->
    <nav class="fixed bottom-0 left-0 w-full z-50 h-20 flex justify-around items-center px-4 bg-white border-t-[3px] border-black">
      <button
        @click="currentTab = 'brew'"
        class="text-black border-[3px] border-black shadow-[4px_4px_0px_0px_#000000] p-2 -mt-2 translate-x-[-2px] translate-y-[-2px] flex flex-col items-center justify-center w-16 transition-all duration-75"
        :class="currentTab === 'brew' ? 'bg-yellow-400' : 'bg-white text-gray-500 border-gray-400 shadow-none'"
      >
        <span class="material-symbols-outlined">coffee_maker</span>
        <span class="font-['Public_Sans'] font-black text-[12px] uppercase">Brew</span>
      </button>
      <button
        @click="currentTab = 'methods'"
        class="text-black p-2 flex flex-col items-center justify-center w-16 hover:bg-orange-500 hover:text-white transition-all"
        :class="{'text-orange-500': currentTab === 'methods'}"
      >
        <span class="material-symbols-outlined">list_alt</span>
        <span class="font-['Public_Sans'] font-black text-[12px] uppercase">Methods</span>
      </button>
      <button
        @click="currentTab = 'history'"
        class="text-black p-2 flex flex-col items-center justify-center w-16 hover:bg-orange-500 hover:text-white transition-all"
        :class="{'text-orange-500': currentTab === 'history'}"
      >
        <span class="material-symbols-outlined">history</span>
        <span class="font-['Public_Sans'] font-black text-[12px] uppercase">History</span>
      </button>
      <button
        @click="currentTab = 'gear'"
        class="text-black p-2 flex flex-col items-center justify-center w-16 hover:bg-orange-500 hover:text-white transition-all"
        :class="{'text-orange-500': currentTab === 'gear'}"
      >
        <span class="material-symbols-outlined">settings</span>
        <span class="font-['Public_Sans'] font-black text-[12px] uppercase">Gear</span>
      </button>
    </nav>
  </div>
</template>

<style scoped>
</style>