<script setup>
</script>

<template>
  <div class="flex flex-col gap-8">
    <div class="bg-zinc-900 text-white border-[3px] border-black p-8 neobrutal-shadow flex flex-col items-center justify-center relative overflow-hidden">
      <div class="absolute top-4 left-4 opacity-20 text-yellow-400">
        <span class="material-symbols-outlined text-6xl">hourglass_empty</span>
      </div>
      <span class="font-['Space_Grotesk'] text-yellow-400 uppercase tracking-widest mb-2 font-black text-sm">Current Phase: BLOOM</span>

      <div class="font-['Public_Sans'] font-black text-[80px] sm:text-[100px] leading-none mb-4 italic">
        02:45
      </div>

      <div class="w-full h-8 bg-zinc-800 border-[3px] border-black mb-8">
        <div class="h-full bg-yellow-400 w-3/4 border-r-[3px] border-black"></div>
      </div>

      <div class="flex gap-4 w-full">
        <button class="flex-1 bg-yellow-400 text-black border-[3px] border-black py-4 font-['Public_Sans'] font-black text-lg uppercase neobrutal-shadow-btn">
          PAUSE
        </button>
        <button class="flex-1 bg-orange-500 text-white border-[3px] border-black py-4 font-['Public_Sans'] font-black text-lg uppercase neobrutal-shadow-btn">
          RESET
        </button>
      </div>
    </div>

    <div class="bg-white border-[3px] border-black p-6 neobrutal-shadow">
      <h2 class="font-['Public_Sans'] font-black text-[24px] uppercase mb-6">TASTING NOTES</h2>
      <div class="grid grid-cols-2 gap-3">
        <button class="border-[3px] border-black p-3 font-['Space_Grotesk'] font-bold text-sm uppercase hover:bg-yellow-400 transition-colors flex items-center justify-between group">
          Citrus <span class="material-symbols-outlined group-hover:animate-bounce">sunny</span>
        </button>
        <button class="border-[3px] border-black p-3 font-['Space_Grotesk'] font-bold text-sm uppercase hover:bg-yellow-400 transition-colors flex items-center justify-between group">
          Berry <span class="material-symbols-outlined group-hover:animate-bounce">nutrition</span>
        </button>
        <button class="border-[3px] border-black p-3 font-['Space_Grotesk'] font-bold text-sm uppercase hover:bg-yellow-400 transition-colors flex items-center justify-between group">
          Floral <span class="material-symbols-outlined group-hover:animate-bounce">local_florist</span>
        </button>
        <button class="border-[3px] border-black p-3 font-['Space_Grotesk'] font-bold text-sm uppercase hover:bg-yellow-400 transition-colors flex items-center justify-between group">
          Chocolate <span class="material-symbols-outlined group-hover:animate-bounce">cookie</span>
        </button>
        <button class="border-[3px] border-black p-3 font-['Space_Grotesk'] font-bold text-sm uppercase hover:bg-yellow-400 transition-colors flex items-center justify-between group">
          Nutty <span class="material-symbols-outlined group-hover:animate-bounce">grass</span>
        </button>
        <button class="border-[3px] border-black p-3 font-['Space_Grotesk'] font-bold text-sm uppercase hover:bg-yellow-400 transition-colors flex items-center justify-between group">
          Tea-like <span class="material-symbols-outlined group-hover:animate-bounce">emoji_food_beverage</span>
        </button>
      </div>
    </div>
  </div>
</template>