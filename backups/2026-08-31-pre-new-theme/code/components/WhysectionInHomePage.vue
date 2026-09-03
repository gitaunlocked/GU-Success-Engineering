<template>
  <div class="flex flex-col md:flex-row items-stretch bg-white px-0 py-10 overflow-hidden relative">
    <!-- Left Image (sharper diagonal + smaller) -->
    <div class="relative w-full md:w-1/3 h-[400px]">
      <img
        src="/KrsnaArjun.jpg"
        alt="Left Image"
        class="w-full h-full object-cover [clip-path:polygon(0_0,100%_0,70%_100%,0_100%)]"
      />
    </div>

    <!-- Center Text -->
    <div class="w-full md:w-1/3 text-center md:text-left px-4 md:px-10 py-4 bg-white z-10 flex flex-col justify-center">
      <h2 class="text-2xl md:text-3xl font-extrabold text-pink-600 mb-4">
        WHY GITA UNLOCKED?
      </h2>
      <p class="text-gray-800 leading-relaxed text-sm md:text-base">
        At Gita Unlocked, we are presenting the Gita in a way that connects with students and youth—as a practical, step-by-step path to clarity, purpose, and success. As Gita is known to many, yet deeply understood by few. Krishna called it
        <span class="text-orange-600 font-semibold"> ‘Rāja Guhyam’—the King of Secrets.</span> We bring this open secret to life for today’s youth, in a way that inspires transformation.
      </p>
      <p class="mt-4 font-bold text-gray-900 text-sm">READ MORE...</p>
    </div>

    <!-- Right Image (sharper diagonal + smaller) -->
    <div class="relative w-full md:w-1/3 h-[400px]">
      <img
        src="/Dhrtarastra&Sanjay.jpg"
        alt="Right Image"
        class="w-full h-full object-cover [clip-path:polygon(30%_0,100%_0,100%_100%,0_100%)]"
      />
    </div>
  </div>
</template>
