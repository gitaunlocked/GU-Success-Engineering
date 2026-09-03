<template>
  <div v-if="coursesLoading" class="min-h-screen flex items-center justify-center">
    <p class="text-gray-500 text-lg">Loading course...</p>
  </div>
  <CoursePage v-else-if="course" :course="course" />
  <div v-else class="min-h-screen flex items-center justify-center">
    <p class="text-red-500 text-lg">Course not found.</p>
  </div>
</template>

<script setup>
import { computed, watch } from 'vue';
import CoursePage from '~/components/CoursePage.vue';
import { useCourses } from '~/composables/useCourses';

const route = useRoute();
const { courses, coursesLoaded, coursesLoading, getCourseBySlug } = useCourses();

const course = computed(() => getCourseBySlug(route.params.slug));

watch(() => coursesLoaded.value, (loaded) => {
  if (loaded && course.value) {
    useHead({ title: course.value.title });
  }
}, { immediate: true });
</script>