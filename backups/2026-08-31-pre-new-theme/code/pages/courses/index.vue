<template>
  <section class="min-h-screen bg-gradient-to-b from-white to-[#f8f3ff] px-4 pb-14 pt-28 sm:px-6 lg:px-8">
    <div class="mx-auto max-w-7xl">
      <div class="mx-auto mb-12 max-w-3xl text-center">
        <p class="mb-3 text-sm font-bold uppercase tracking-[0.35em] text-[#D61C75]">Courses</p>
        <h1 class="mb-4 text-4xl font-bold text-gray-900 sm:text-5xl">Choose a course to see the full details</h1>
        <p class="text-lg leading-8 text-gray-600">
          Click any course card below to open its separate detailed page with description, sutras, duration, fees, and registration.
        </p>
      </div>

      <div class="mx-auto mb-10 max-w-xl rounded-3xl bg-white p-5 shadow-md">
        <label for="course-filter" class="mb-2 block text-sm font-semibold uppercase tracking-[0.2em] text-[#D61C75]">
          Course dropdown
        </label>
        <select
          id="course-filter"
          v-model="selectedCourse"
          class="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-base text-gray-700 outline-none transition focus:border-[#D61C75]"
        >
          <option value="all">Show all courses</option>
          <option
            v-for="course in courses"
            :key="course.slug"
            :value="course.slug"
          >
            {{ course.shortTitle }}
          </option>
        </select>
      </div>

      <div class="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
        <CourseCard
          v-for="course in displayedCourses"
          :key="course.slug"
          :course="course"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, ref } from 'vue';
import CourseCard from "../../components/CourseCard.vue";
import { useCourses } from '~/composables/useCourses';

const { courses } = useCourses();
const selectedCourse = ref('all');

const displayedCourses = computed(() => {
  if (selectedCourse.value === 'all') {
    return courses.value;
  }

  return courses.value.filter((course) => course.slug === selectedCourse.value);
});
</script>