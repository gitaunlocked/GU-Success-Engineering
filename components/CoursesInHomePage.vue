<template>
  <section class="bg-gray-100 py-12">
    <!-- Heading -->
    <div class="text-center mb-10 px-4">
      <h2
        class="text-[#D61C75] font-bold uppercase text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-snug"
      >
        Courses
      </h2>
    </div>

    <!-- Cards: only Introduction to Gita and Power of Habits -->
    <div
      class="grid grid-cols-1 md:grid-cols-2 gap-8 mx-auto w-[90%] sm:w-[85%] lg:w-[80%]"
    >
      <NuxtLink
        v-for="course in courses"
        :key="course.slug"
        :to="`/courses/${course.slug}`"
        class="group bg-white rounded-xl shadow-lg hover:shadow-2xl overflow-hidden border border-gray-100 cursor-pointer transition-shadow"
      >
        <div class="flex flex-col h-full">
          <div
            class="relative h-40 flex items-center justify-center bg-gradient-to-br from-purple-300 to-orange-200"
          >
            <img
              :src="course.image"
              :alt="course.shortTitle"
              class="max-h-full object-contain"
            />
          </div>

          <div class="p-6 sm:p-7 flex-1 flex flex-col">
            <h2
              class="text-2xl sm:text-3xl font-bold text-purple-700 mb-1 group-hover:text-[#D61C75] transition-colors"
            >
              {{ course.shortTitle }}
            </h2>
            <p
              class="text-gray-700 text-sm sm:text-base md:text-lg mb-4 border-b border-gray-200 pb-2"
            >
              {{ course.subtitle }}
            </p>

            <p class="text-gray-700 text-sm sm:text-base mb-4">
              {{ course.cardDescription }}
            </p>

            <ul class="text-gray-700 text-sm sm:text-base space-y-1 mb-4">
              <li
                v-for="(ch, i) in (course.chapters || []).slice(0, 4)"
                :key="i"
              >
                • {{ ch }}
              </li>
              <li v-if="(course.chapters || []).length > 4" class="text-gray-500">
                • + {{ course.chapters.length - 4 }} more
              </li>
            </ul>

            <div class="mt-auto flex items-center justify-between pt-2">
              <span class="text-sm font-semibold text-gray-800">
                {{ course.level }} · {{ course.totalTime }}
              </span>
              <span
                class="inline-flex items-center gap-2 bg-orange-500 text-white text-sm font-bold py-2 px-4 rounded-lg group-hover:bg-orange-600 transition-colors"
              >
                View course
                <span class="text-xs">▶</span>
              </span>
            </div>
          </div>
        </div>
      </NuxtLink>
    </div>
  </section>
</template>

<script setup>
import { useCourses } from '~/composables/useCourses';

const { courses } = useCourses();
</script>
