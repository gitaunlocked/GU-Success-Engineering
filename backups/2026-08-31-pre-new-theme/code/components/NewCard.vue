<template>
  <div
    class="relative bg-[#efe9f9] rounded-xl p-4 
           w-72 sm:w-80 md:w-96 lg:w-[420px] 
           flex flex-col justify-between shadow-md"
  >
    <!-- Image Area -->
    <img 
      :src="image" 
      alt="card image" 
      class="w-full h-48 object-cover rounded-lg mb-3" 
    />

    <!-- Text Area -->
    <div>
      <h2 class="font-bold text-lg sm:text-xl lg:text-2xl text-gray-800 text-left leading-snug">
        {{ title }}
      </h2>
      <p class="text-sm sm:text-base text-gray-600 text-left mt-1">
        {{ description }}
      </p>
    </div>

    <!-- Play Button -->
    <div class="absolute bottom-4 right-4">
      <button
        class="bg-red-600 hover:bg-red-700 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="white"
          viewBox="0 0 24 24"
        >
          <path d="M8 5v14l11-7z" />
        </svg>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Card",
  props: ["title", "description", "image"],
};
</script>
