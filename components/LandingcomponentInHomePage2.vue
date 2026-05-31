<template>
  <div class="absolute left-1/2 -translate-x-1/2 top-[100px] md:top-[200px] bg-transparent p-4 md:p-6 w-full max-w-7xl">
    <div class="flex flex-col lg:flex-row w-full justify-center items-center lg:items-start gap-6 lg:gap-0">
      
      <!-- Main Content Section -->
      <div class="w-full lg:w-[60%] p-2 md:p-4 order-2 lg:order-1">
        <!-- SUCCESS Title -->
        <div class="flex justify-around w-full text-[60px] sm:text-[80px] md:text-[100px] lg:text-[120px] xl:text-[159px] font-[400px] uppercase bg-gradient-to-r from-[#FF7A00] via-[#D61C75] to-[#7A10FF] bg-clip-text text-transparent p-4 md:p-8 -mt-8 md:-mt-12 lg:-mt-20 [font-family:'Kaushan_Script',cursive]">
          <span>S</span>
          <span>U</span>
          <span>C</span>
          <span>C</span>
          <span>E</span>
          <span>S</span>
          <span>S</span>
        </div>
        
        <!-- Orange Banner -->
        <div class="bg-orange-500 text-white rounded-xl px-4 md:px-6 py-3 md:py-4 inline-block text-center [font-family:'Kaushan_Script'] w-full -mt-8 md:-mt-12 lg:-mt-20">
          <p>
            <span class="text-[1.5rem] sm:text-[2rem] md:text-[2.5rem] lg:text-[3rem] font-thin block">SUTRAS FOR YOUTH FROM</span>
            <strong class="text-[2rem] sm:text-[2.5rem] md:text-[3rem] lg:text-[3.8rem] font-thin block">SRIMAD BHAGAVAD GITA</strong>
          </p>
        </div>
        
        <!-- Course Description -->
        <div>
          <div class="text-center text-[#D61C75] font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl uppercase mt-4 md:mt-6 mb-3 md:mb-4">
            who is this course for?
          </div>
          <div class="text-lg sm:text-xl md:text-2xl text-justify mb-2 md:mb-3">
            This course is ideal for students and young professionals who are:
          </div>
          <div class="text-lg sm:text-xl md:text-2xl text-justify mb-2 md:mb-3">
            🌟 Seeking inner clarity and peace
          </div>
          <div class="text-lg sm:text-xl md:text-2xl text-justify mb-2 md:mb-3">
            🌟 Curious about the deeper meaning of life
          </div>
          <div class="text-lg sm:text-xl md:text-2xl text-justify mb-2 md:mb-3">
            🌟 Interested in balancing spiritual wisdom with modern success
          </div>
        </div>
      </div>
      
      <!-- Book Image Section -->
      <div class="w-full sm:w-[80%] md:w-[60%] lg:w-[30%] max-w-sm mx-auto lg:mx-0 order-1 lg:order-2">
        <div class="shadow-2xl border border-gray-300 rounded-xl overflow-hidden bg-white transform rotate-2 lg:rotate-6 hover:scale-105 transition duration-300 z-10">
          <img
            src="/gita_as_it_is.webp"
            alt="Bhagavad Gita Cover"
            class="w-full h-auto object-cover rounded-xl"
          />
        </div>
      </div>
      
      <!-- Spacer (hidden on mobile) -->
      <div class="hidden lg:block lg:w-[5%] p-4"></div>
    </div>
  </div>
</template>

<script setup>
const leftBg = "/background_left.png"
</script>