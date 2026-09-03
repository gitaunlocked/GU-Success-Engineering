<!-- <template>
	<div class="h-96 p-4 bg-white">
    <div class="text-center text-[#D61C75] font-bold text-6xl uppercase">
      what great personalities say about GITA
      


    </div>
  </div>

	
</template> -->

<script setup>
// No reactive data or methods needed for this component, so script can be empty or omitted.
// If you were to fetch quotes from an API, you'd add your setup logic here.
</script>

<template>
  <div class="bg-white py-16">
    <div class="text-center text-[#D61C75] font-bold text-6xl uppercase h-36">
      what great personalities say about GITA
      


    </div>
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div class="bg-gray-100 p-6 rounded-lg shadow-md flex flex-col items-center text-center">
          <span class="text-6xl text-gray-400 font-serif mb-4 leading-none relative -top-3">“</span>
          <p class="text-lg text-gray-700 mb-6 flex-grow">
            When I read the <span class="text-orange-600 font-semibold">Bhagavad-Gita</span> and reflect about how God created this universe everything else seems so superfluous
          </p>
          <div class="flex items-center mt-auto">
            <img src="/Albert.svg" alt="Albert Einstein" class="w-10 h-10 rounded-full mr-3" />
            <span class="font-semibold text-gray-800">— Albert Einstein</span>
          </div>
        </div>

        <div class="bg-gray-100 p-6 rounded-lg shadow-md flex flex-col items-center text-center">
          <span class="text-6xl text-gray-400 font-serif mb-4 leading-none relative -top-3">“</span>
          <p class="text-lg text-gray-700 mb-6 flex-grow">
            When doubts haunt me, when disappointments stare me in the face, and I see not one ray of hope on the horizon, I turn to <span class="text-orange-600 font-semibold">Bhagavad-Gita</span>
          </p>
          <div class="flex items-center mt-auto">
            <img src="/Gandhi.svg" alt="Mahatma Gandhi" class="w-10 h-10 rounded-full mr-3" />
            <span class="font-semibold text-gray-800">— Mahatma Gandhi</span>
          </div>
        </div>

        <div class="bg-gray-100 p-6 rounded-lg shadow-md flex flex-col items-center text-center">
          <span class="text-6xl text-gray-400 font-serif mb-4 leading-none relative -top-3">“</span>
          <p class="text-lg text-gray-700 mb-6 flex-grow">
            The <span class="text-orange-600 font-semibold">Bhagavad-Gita</span> is the most systematic statement of spiritual evolution of endowing value to mankind
          </p>
          <div class="flex items-center mt-auto">
            <img src="/Aldous.svg" alt="Aldous Huxley" class="w-10 h-10 rounded-full mr-3" />
            <span class="font-semibold text-gray-800">— Aldous Huxley</span>
          </div>
        </div>

        <div class="bg-gray-100 p-6 rounded-lg shadow-md flex flex-col items-center text-center">
          <span class="text-6xl text-gray-400 font-serif mb-4 leading-none relative -top-3">“</span>
          <p class="text-lg text-gray-700 mb-6 flex-grow">
            In the morning I bathe my intellect in the stupendous and cosmogonal philosophy of the <span class="text-orange-600 font-semibold">Bhagavad-Gita</span>
          </p>
          <div class="flex items-center mt-auto">
            <img src="/HD.svg" alt="H.D Thoreau" class="w-10 h-10 rounded-full mr-3" />
            <span class="font-semibold text-gray-800">— H.D Thoreau</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Adjust the quote icon positioning if needed */
</style>