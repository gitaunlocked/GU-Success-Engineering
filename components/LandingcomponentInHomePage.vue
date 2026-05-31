<template>
  <div class="flex flex-col items-center justify-center px-4 py-12 md:py-20">
    <!-- SUCCESS -->
    <div
      class="flex flex-wrap justify-center gap-2 text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase bg-gradient-to-r from-[#FF7A00] via-[#D61C75] to-[#7A10FF] bg-clip-text text-transparent"
    >
      <span v-for="(letter, i) in 'SUCCESS'" :key="i">{{ letter }}</span>
    </div>

    <!-- Line -->
    <hr class="border-t-4 border-black my-4 w-3/4 sm:w-2/3 md:w-1/2" />

    <!-- SUTRAS FOR -->
    <div
      class="flex flex-wrap justify-center gap-2 text-2xl sm:text-4xl md:text-5xl lg:text-6xl uppercase"
    >
      <span v-for="(letter, i) in 'SUTRAS FOR'" :key="i">{{ letter }}</span>
    </div>

    <!-- YOUTH FROM GITA -->
    <div
      class="flex flex-wrap justify-center gap-2 text-2xl sm:text-4xl md:text-5xl lg:text-6xl uppercase"
    >
      <span v-for="(letter, i) in 'YOUTH FROM GITA'" :key="i">{{ letter }}</span>
    </div>
  </div>
</template>
