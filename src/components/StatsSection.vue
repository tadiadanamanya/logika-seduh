<script setup>
</script>

<template>
  <div class="flex flex-col gap-8">
    <div class="bg-yellow-400 border-[3px] border-black p-6 neobrutal-shadow">
      <h2 class="font-['Public_Sans'] font-black text-[24px] uppercase mb-4">STATS</h2>
      <div class="flex flex-col gap-4">
        <div class="bg-white border-[3px] border-black p-4">
          <span class="text-xs font-black uppercase font-['Space_Grotesk'] block mb-1 text-gray-600">Total Brews</span>
          <span class="text-4xl font-black font-['Public_Sans']">142</span>
        </div>
        <div class="bg-white border-[3px] border-black p-4">
          <span class="text-xs font-black uppercase font-['Space_Grotesk'] block mb-1 text-gray-600">Coffee Used</span>
          <span class="text-4xl font-black font-['Public_Sans']">2.8kg</span>
        </div>
      </div>
    </div>

    <div class="bg-white border-[3px] border-black p-6 neobrutal-shadow">
      <h2 class="font-['Public_Sans'] font-black text-[24px] uppercase mb-6">RECENT</h2>
      <div class="flex flex-col gap-6">
        <div class="border-l-[6px] border-orange-500 pl-4">
          <span class="text-xs font-black uppercase font-['Space_Grotesk'] text-gray-500">Yesterday, 08:15</span>
          <p class="font-bold text-lg font-['Space_Grotesk']">Ethiopia Yirgacheffe</p>
          <div class="flex gap-2 mt-2">
            <span class="bg-zinc-200 px-2 py-0.5 text-[10px] font-black uppercase border-[2px] border-black">V60</span>
            <span class="bg-zinc-200 px-2 py-0.5 text-[10px] font-black uppercase border-[2px] border-black">1:16</span>
          </div>
        </div>

        <div class="border-l-[6px] border-zinc-400 pl-4">
          <span class="text-xs font-black uppercase font-['Space_Grotesk'] text-gray-500">Oct 24, 09:30</span>
          <p class="font-bold text-lg font-['Space_Grotesk']">Kenya AA Wash</p>
          <div class="flex gap-2 mt-2">
            <span class="bg-zinc-200 px-2 py-0.5 text-[10px] font-black uppercase border-[2px] border-black">V60</span>
            <span class="bg-zinc-200 px-2 py-0.5 text-[10px] font-black uppercase border-[2px] border-black">1:15</span>
          </div>
        </div>

        <div class="border-l-[6px] border-zinc-400 pl-4">
          <span class="text-xs font-black uppercase font-['Space_Grotesk'] text-gray-500">Oct 23, 07:45</span>
          <p class="font-bold text-lg font-['Space_Grotesk']">Colombia Huila</p>
          <div class="flex gap-2 mt-2">
            <span class="bg-zinc-200 px-2 py-0.5 text-[10px] font-black uppercase border-[2px] border-black">V60</span>
            <span class="bg-zinc-200 px-2 py-0.5 text-[10px] font-black uppercase border-[2px] border-black">1:17</span>
          </div>
        </div>
      </div>

      <button class="w-full mt-8 border-[3px] border-black py-3 font-['Space_Grotesk'] font-bold uppercase hover:bg-black hover:text-white transition-all">
        VIEW ALL LOGS
      </button>
    </div>
  </div>
</template>