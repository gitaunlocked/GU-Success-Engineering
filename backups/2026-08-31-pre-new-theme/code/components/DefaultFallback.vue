<!-- src/components/DefaultFallback.vue -->
<template>
  <div class="text-center py-16 px-8 bg-red-50 rounded-lg shadow-md">
    <h1 class="text-4xl font-bold text-red-600 mb-4">404 - Page Not Available</h1>
    <p class="text-lg text-gray-700 mb-6">
      Sorry, we couldn't find the page for <strong>{{ missingPage }}</strong>.
    </p>
    <p class="text-gray-500">Please check the name or go back to the homepage.</p>
  </div>
</template>

<script setup>
defineProps({
  missingPage: {
    type: String,
    default: 'this page'
  }
});
</script>

<style scoped>
</style>
