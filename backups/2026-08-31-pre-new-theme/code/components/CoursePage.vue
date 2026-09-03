<template>
  <div>
  <div class="flex flex-col md:flex-row justify-center items-start gap-6 md:gap-8 px-4 md:px-8 lg:px-16 pt-24 pb-12">

  <!-- Left Half -->
  <div class="w-full md:w-1/2 space-y-6 flex flex-col">
    <!-- Title -->
    <h2 class="text-2xl md:text-3xl font-bold text-[#D61C75]">Course Title:</h2>
    <p class="text-black text-lg md:text-xl">{{ course.title }}</p>

    <div v-if="course.subtitle">
      <h2 class="text-2xl md:text-3xl font-bold text-[#D61C75]">Subtitle:</h2>
      <p class="text-black text-lg md:text-xl">{{ course.subtitle }}</p>
    </div>

    <!-- Description -->
    <h2 class="text-2xl md:text-3xl font-bold text-[#D61C75]">Course Description:</h2>
    <template v-if="course.description">
      <p v-for="(para, i) in course.description.split('\n').filter(p => p.trim())" :key="'desc-'+i" class="text-black text-lg md:text-xl">{{ para }}</p>
    </template>
    <template v-else>
      <p v-if="course.description1" class="text-black text-lg md:text-xl">{{ course.description1 }}</p>
      <p v-if="course.description2" class="text-black text-lg md:text-xl">{{ course.description2 }}</p>
    </template>

    <!-- Timeline List -->
    <div class="flex flex-col space-y-8 relative">

      <div
        v-for="(chapter, index) in course.chapters"
        :key="index"
        class="flex items-start md:items-center"
      >
        <!-- Chapter/Session Label -->
        <div class="w-24 text-right pr-2 text-base md:text-xl text-[#D61C75]">
          {{ course.chapterLabel || 'Session' }} {{ index + 1 }}
        </div>

        <!-- Dot + Line Container -->
        <div class="relative flex flex-col items-center w-6">
          <!-- Vertical line -->
          <div
            v-if="index !== course.chapters.length - 1"
            class="absolute top-4 bottom-[-4.5rem] w-0.5 bg-[#D61C75]"
          ></div>

          <!-- Dot -->
          <div class="w-3 h-3 md:w-4 md:h-4 rounded-full bg-[#D61C75] z-10"></div>
        </div>

        <!-- Chapter Box -->
        <div class="bg-[#D61C75] shadow p-3 rounded w-full md:w-80 ml-4 hover:bg-[#7A00FF] cursor-pointer text-base md:text-xl">
          <div class="flex justify-between items-center">
            <span class="text-white">{{ chapter }}</span>
            <span class="text-gray-400">&#9654;</span>
          </div>
        </div>
      </div>

    </div>
  </div>

  <!-- Right Half -->
  <div class="w-full md:w-1/2 mt-10 md:mt-12">
    <div class="bg-white shadow p-6 md:px-20 md:py-20 rounded space-y-8 text-center">

      <!-- Course Title -->
      <h2 class="text-3xl md:text-5xl font-bold">{{ course.title }}</h2>

      <img
        v-if="course.image"
        :src="course.image"
        :alt="course.title"
        class="w-full max-w-md mx-auto h-56 object-contain"
      />

      <!-- Course Details with Icons -->
      <div class="space-y-4 md:space-y-6 text-lg md:text-2xl">
        <div v-if="course.totalTime && course.totalTime.trim()" class="flex items-center space-x-3">
          <img src="/CP11.svg" alt="Clock" class="w-6 h-6 md:w-8 md:h-8" />
          <span>{{ course.totalTime }}</span>
        </div>

        <div v-if="course.timePerWeek && course.timePerWeek.trim()" class="flex items-center space-x-3">
          <img src="/CP22.svg" alt="Clock" class="w-6 h-6 md:w-8 md:h-8" />
          <span>{{ course.timePerWeek }}</span>
        </div>

        <div v-if="course.certificate && course.certificate.trim()" class="flex items-center space-x-3">
          <img src="/CP33.svg" alt="Level" class="w-6 h-6 md:w-8 md:h-8" />
          <span>{{ course.certificate }}</span>
        </div>

        <div class="flex items-center space-x-3">
          <img src="/CP44.svg" alt="Language" class="w-6 h-6 md:w-8 md:h-8" />
          <span>{{ course.level }}</span>
        </div>

        <div class="flex items-center space-x-3">
          <span class="w-6 md:w-8">₹</span>
          <span>Rs. {{ course.feeAmount }}/-</span>
        </div>
      </div>

      <!-- Join Button -->
      <div class="pt-4">
        <NuxtLink :to="`/register?course=${course.slug}`">
          <button class="bg-[#D61C75] hover:bg-[#7A00FF] text-white font-bold text-xl md:text-3xl py-2 px-6 rounded">
            REGISTER
          </button>
        </NuxtLink>
      </div>
    </div>
  </div>
</div>

</div>
</template>

<script setup>
defineProps({
  course: {
    type: Object,
    required: true
  }
});
</script>