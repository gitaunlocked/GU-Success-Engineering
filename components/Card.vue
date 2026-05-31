<template>
    <div class="relative bg-[#efe9f9] rounded-xl p-4 w-[360px] flex flex-col justify-between shadow-md">
      <!-- Image/Placeholder Area -->
      <div class="bg-white rounded-lg h-60 mb-4"></div>
  
      <!-- Text Area -->
       <div>

      <div class="w-56">
        <h2 class="font-bold text-lg text-gray-800 text-left">ANXEITY</h2>
        <p class="text-sm text-gray-600 text-left">We will find in more details<br />read more..</p>
      </div>
      <!-- Red Play Button -->
      <div class="absolute bottom-4 right-4">
        <button class="bg-red-600 hover:bg-red-700 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="white" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        </button>
      </div>
    </div>

    </div>
  </template>
  
  <script>
  export default {
    name: 'Card',
  };
  </script>
  