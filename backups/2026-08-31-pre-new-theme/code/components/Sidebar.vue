<template>
  <!-- <aside class="bg-white shadow-lg p-2 rounded-lg text-center w-80">
    <img :src="image" alt="First Image" class="w-full h-auto rounded-lg" />

    {{ title }}
  </aside> -->

  <div class="p-2 bg-gray-100 rounded-lg shadow-lg text-center w-80">
    <img :src="image" alt="First Image" class="w-full h-auto rounded-lg" />

    <h2 class="mt-4 text-xl font-bold text-gray-800">{{ title }}</h2>
    <p class="text-gray-600">{{ txt }}</p>
  </div>
</template>

<script setup>
import { defineProps, computed } from "vue";

const props = defineProps({
  image:String,
  title: String,
  txt:String
});

// ✅ Convert Google Drive link to direct Googleusercontent download URL
// const firstImage = computed(() => {
//   if (props.images.length > 0) {
//     const originalLink = props.images[0]; // Get first image URL
//     const match = originalLink.match(/\/d\/(.*?)\//); // Extract file ID
//     return match ? `https://drive.google.com/download?authuser=0&export=view&id=${match[1]}` : originalLink;
//   }
//   return null;
// });
</script>
