<template>
  <article class="flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-2xl">
    <div class="flex h-56 items-center justify-center bg-gradient-to-br from-purple-200 via-pink-100 to-orange-100 p-6">
      <img :src="course.image" :alt="course.title" class="h-full w-full object-contain" />
    </div>

    <div class="flex flex-1 flex-col p-6">
      <p class="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-[#D61C75]">
        {{ course.subtitle }}
      </p>

      <h2 class="mb-3 text-2xl font-bold text-gray-900">
        {{ course.shortTitle }}
      </h2>

      <p class="mb-5 text-base leading-7 text-gray-600">
        {{ course.cardDescription }}
      </p>

      <div class="mb-6 grid grid-cols-2 gap-3 text-sm text-gray-700">
        <div class="rounded-2xl bg-gray-50 p-3">
          <div class="font-semibold text-[#D61C75]">Duration</div>
          <div>{{ course.totalTime }}</div>
        </div>
        <div class="rounded-2xl bg-gray-50 p-3">
          <div class="font-semibold text-[#D61C75]">Level</div>
          <div>{{ course.level }}</div>
        </div>
      </div>

      <div class="mb-6">
        <h3 class="mb-3 text-lg font-semibold text-gray-900">Topics Covered</h3>
        <ul class="space-y-2 text-sm text-gray-600">
          <li
            v-for="chapter in previewChapters"
            :key="chapter"
            class="flex items-start gap-2"
          >
            <span class="mt-1 text-[#D61C75]">•</span>
            <span>{{ chapter }}</span>
          </li>
        </ul>
      </div>

      <NuxtLink
        :to="`/courses/${course.slug}`"
        class="mt-auto inline-flex items-center justify-center rounded-full bg-[#D61C75] px-6 py-3 text-base font-semibold text-white transition hover:bg-[#7A10FF]"
      >
        View full course
      </NuxtLink>
    </div>
  </article>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  course: {
    type: Object,
    required: true
  }
});

const previewChapters = computed(() => props.course.chapters.slice(0, 4));
</script>