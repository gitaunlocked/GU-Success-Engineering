<template>
  <!-- Hero Section -->
  <div class="relative w-full min-h-screen overflow-hidden">
    <!-- Background Layer -->
    <div class="absolute inset-0 z-0">
      <!-- Left background -->
      <div
        class="absolute top-0 left-0 w-1/2 h-full bg-cover bg-center"
        :style="{ backgroundImage: `url(${leftBg})` }"
      ></div>
      <!-- Right background (mirrored) -->
      <div
        class="absolute top-0 right-0 w-1/2 h-full bg-cover bg-center scale-x-[-1]"
        :style="{ backgroundImage: `url(${leftBg})` }"
      ></div>
    </div>

    <!-- Foreground Content -->
    <div class="relative z-10 pt-16 sm:pt-20 md:pt-32 lg:pt-40 px-4 sm:px-6 md:px-8">
      <div class="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12 max-w-7xl mx-auto">
        <!-- Book Image -->
        <div class="w-48 sm:w-56 md:w-64 lg:w-80 xl:w-96 order-1 lg:order-2 flex-shrink-0">
          <div
            class="shadow-2xl border border-gray-300 rounded-xl overflow-hidden bg-white transform rotate-3 hover:scale-105 transition duration-300"
          >
            <img
              src="/gita_as_it_is.webp"
              alt="Bhagavad Gita Cover"
              class="w-full h-auto object-cover rounded-xl"
            />
          </div>
        </div>

        <!-- Main Content -->
        <div class="flex-1 order-2 lg:order-1 text-center lg:text-left">
          <!-- SUCCESS Title -->
          <div class="mb-6 lg:mb-8">
            <div
              class="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold uppercase bg-gradient-to-r from-[#FF7A00] via-[#D61C75] to-[#7A10FF] bg-clip-text text-transparent [font-family:'Kaushan_Script',cursive] tracking-wider"
            >
              SUCCESS
            </div>
          </div>

          <!-- Orange Banner -->
          <div
            class="bg-orange-500 text-white rounded-xl px-4 py-3 mb-8 [font-family:'Kaushan_Script']"
          >
            <div class="text-lg sm:text-xl md:text-2xl lg:text-3xl font-thin">
              SUTRAS FOR YOUTH FROM
            </div>
            <div class="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold">
              SRIMAD BHAGAVAD GITA
            </div>
          </div>

          <!-- Course Description -->
          <div class="space-y-4">
            <h3
              class="text-[#D61C75] font-bold text-xl sm:text-2xl md:text-3xl uppercase"
            >
              who is this course for?
            </h3>
            <p class="text-base sm:text-lg md:text-xl text-gray-800">
              This course is ideal for students and young professionals who are:
            </p>
            <div
              class="space-y-2 text-base sm:text-lg md:text-xl text-gray-800"
            >
              <div>🌟 Seeking inner clarity and peace</div>
              <div>🌟 Curious about the deeper meaning of life</div>
              <div>🌟 Interested in balancing spiritual wisdom with modern success</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Why Gita Section -->
  <div class="bg-white overflow-hidden mt-[2rem]">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
      <div class="flex flex-col md:flex-row items-stretch">
        <!-- Left Image -->
        <div class="relative w-full md:w-1/3 h-64 sm:h-80 md:h-96 lg:h-[400px]">
          <img
            src="/KrsnaArjun.jpg"
            alt="Krishna and Arjuna"
            class="w-full h-full object-cover object-center md:[clip-path:polygon(0_0,100%_0,70%_100%,0_100%)]"
          />
        </div>

        <!-- Center Text -->
        <div
          class="w-full md:w-1/3 px-4 sm:px-6 md:px-8 lg:px-10 py-6 sm:py-8 md:py-10 bg-white flex flex-col justify-center"
        >
          <h2
            class="text-xl sm:text-2xl md:text-3xl font-extrabold text-pink-600 mb-4 sm:mb-6 text-center md:text-left"
          >
            WHY GITA UNLOCKED?
          </h2>
          <p
            class="text-gray-800 leading-relaxed text-sm sm:text-base mb-4 text-justify md:text-left"
          >
            At Gita Unlocked, we are presenting the Gita in a way that connects
            with students and youth—as a practical, step-by-step path to clarity,
            purpose, and success. As Gita is known to many, yet deeply understood
            by few. Krishna called it
            <span class="text-orange-600 font-semibold">
              'Rāja Guhyam'—the King of Secrets.</span
            >
            We bring this open secret to life for today's youth, in a way that
            inspires transformation.
          </p>
          <p class="font-bold text-gray-900 text-sm text-center md:text-left">
            READ MORE...
          </p>
        </div>

        <!-- Right Image -->
        <div class="relative w-full md:w-1/3 h-64 sm:h-80 md:h-96 lg:h-[400px]">
          <img
            src="/Dhrtarastra&Sanjay.jpg"
            alt="Dhrtarastra and Sanjay"
            class="w-full h-full object-cover object-center md:[clip-path:polygon(30%_0,100%_0,100%_100%,0_100%)]"
          />
        </div>
      </div>
    </div>
  </div>

  <!-- Find Solutions Section -->
  <div class="bg-gray-100 py-8 sm:py-10 md:py-12">
    <div
      class="text-center text-[#D61C75] font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl uppercase mb-6 sm:mb-8 px-4"
    >
      find solution for...
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
      <div
        class="flex items-center justify-center h-[300px] sm:h-[350px] md:h-[400px] lg:h-[450px] xl:h-[500px] bg-[#f5f5f5] rounded-lg relative overflow-hidden"
      >
        <!-- Left Arrow -->
        <button
          @click="prevCard"
          class="absolute left-2 sm:left-4 md:left-6 text-2xl sm:text-3xl text-gray-700 hover:text-black z-20 bg-white bg-opacity-80 rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center shadow-lg"
        >
          &#10094;
        </button>

        <!-- Cards Container -->
        <div class="flex justify-center items-center w-full px-12 sm:px-16 md:px-20">
          <div
            class="flex gap-4 sm:gap-6 md:gap-8 lg:gap-12 transition-transform duration-500 overflow-hidden"
          >
            <Motion
  v-for="(card, index) in visibleCards"
  :key="card.title + index"
  :initial="{ opacity: 0, x: direction === 'right' ? 50 : -50 }"
  :enter="{ 
    opacity: 1, 
    x: 0, 
    transition: { duration: 0.6, ease: 'easeOut' } 
  }"
  :leave="{ 
    opacity: 0, 
    x: direction === 'right' ? -50 : 50, 
    transition: { duration: 0.6, ease: 'easeIn' } 
  }"
  class="flex-shrink-0"
>
  <NewCard
    :title="card.title"
    :description="card.description"
    :image="card.image"
  />
</Motion>
          </div>
        </div>

        <!-- Right Arrow -->
        <button
          @click="nextCard"
          class="absolute right-2 sm:right-4 md:right-6 text-2xl sm:text-3xl text-gray-700 hover:text-black z-20 bg-white bg-opacity-80 rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center shadow-lg"
        >
          &#10095;
        </button>
      </div>
    </div>
  </div>

  <!-- Testimonials Section -->
  <div class="bg-white py-8 sm:py-12 md:py-16">
    <section class="bg-white py-12 sm:py-16">
    <!-- Heading -->
    <div class="text-center px-4">
      <h2
        class="text-[#D61C75] font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl uppercase leading-snug"
      >
        What great personalities say about GITA
      </h2>
    </div>

    <!-- Quotes Grid -->
    <div class="container mx-auto px-4 mt-10">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        <!-- Card 1 -->
        <div
          class="bg-gray-100 p-6 rounded-lg shadow-md flex flex-col items-center text-center"
        >
          <span
            class="text-5xl md:text-6xl text-gray-400 font-serif mb-4 leading-none relative -top-3"
          >
            “
          </span>
          <p class="text-base md:text-lg text-gray-700 mb-6 flex-grow">
            When I read the
            <span class="text-orange-600 font-semibold">Bhagavad-Gita</span> and
            reflect about how God created this universe everything else seems so
            superfluous
          </p>
          <div class="flex items-center mt-auto">
            <img
              src="/Albert.svg"
              alt="Albert Einstein"
              class="w-10 h-10 rounded-full mr-3"
            />
            <span class="font-semibold text-gray-800">— Albert Einstein</span>
          </div>
        </div>

        <!-- Card 2 -->
        <div
          class="bg-gray-100 p-6 rounded-lg shadow-md flex flex-col items-center text-center"
        >
          <span
            class="text-5xl md:text-6xl text-gray-400 font-serif mb-4 leading-none relative -top-3"
          >
            “
          </span>
          <p class="text-base md:text-lg text-gray-700 mb-6 flex-grow">
            When doubts haunt me, when disappointments stare me in the face, and
            I see not one ray of hope on the horizon, I turn to
            <span class="text-orange-600 font-semibold">Bhagavad-Gita</span>
          </p>
          <div class="flex items-center mt-auto">
            <img
              src="/Gandhi.svg"
              alt="Mahatma Gandhi"
              class="w-10 h-10 rounded-full mr-3"
            />
            <span class="font-semibold text-gray-800">— Mahatma Gandhi</span>
          </div>
        </div>

        <!-- Card 3 -->
        <div
          class="bg-gray-100 p-6 rounded-lg shadow-md flex flex-col items-center text-center"
        >
          <span
            class="text-5xl md:text-6xl text-gray-400 font-serif mb-4 leading-none relative -top-3"
          >
            “
          </span>
          <p class="text-base md:text-lg text-gray-700 mb-6 flex-grow">
            The
            <span class="text-orange-600 font-semibold">Bhagavad-Gita</span> is
            the most systematic statement of spiritual evolution of endowing
            value to mankind
          </p>
          <div class="flex items-center mt-auto">
            <img
              src="/Aldous.svg"
              alt="Aldous Huxley"
              class="w-10 h-10 rounded-full mr-3"
            />
            <span class="font-semibold text-gray-800">— Aldous Huxley</span>
          </div>
        </div>

        <!-- Card 4 -->
        <div
          class="bg-gray-100 p-6 rounded-lg shadow-md flex flex-col items-center text-center"
        >
          <span
            class="text-5xl md:text-6xl text-gray-400 font-serif mb-4 leading-none relative -top-3"
          >
            “
          </span>
          <p class="text-base md:text-lg text-gray-700 mb-6 flex-grow">
            In the morning I bathe my intellect in the stupendous and cosmogonal
            philosophy of the
            <span class="text-orange-600 font-semibold">Bhagavad-Gita</span>
          </p>
          <div class="flex items-center mt-auto">
            <img
              src="/HD.svg"
              alt="H.D Thoreau"
              class="w-10 h-10 rounded-full mr-3"
            />
            <span class="font-semibold text-gray-800">— H.D Thoreau</span>
          </div>
        </div>
      </div>
    </div>
  </section>
  </div>

  <CoursesInHomePage />

    <section class="bg-gray-100 py-10 px-4 sm:px-8 lg:px-12 rounded-lg shadow-md ">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
      <!-- Left: Form -->
      <div class="w-full">
        <h2
          class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-pink-600 mb-6"
        >
          CONNECT WITH US
        </h2>

        <form
          @submit.prevent="submitForm"
          class="bg-white rounded-lg shadow p-4 sm:p-6"
        >
          <!-- Name -->
          <div class="mb-4">
            <input
              v-model="form.name"
              type="text"
              required
              placeholder="NAME"
              class="w-full rounded border py-2 px-3 bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
          </div>

          <!-- WhatsApp -->
          <div class="mb-4">
            <input
              v-model="form.whatsapp"
              type="text"
              required
              placeholder="WHATSAPP NUMBER"
              class="w-full rounded border py-2 px-3 bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
          </div>

          <!-- Query -->
          <div class="mb-4">
            <textarea
              v-model="form.query"
              rows="4"
              required
              placeholder="QUERY"
              class="w-full rounded border py-2 px-3 bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-400"
            ></textarea>
          </div>

          <!-- Submit -->
          <div class="flex justify-end">
            <button
              type="submit"
              class="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-6 sm:px-8 rounded-lg shadow transition duration-200"
            >
              SUBMIT
            </button>
          </div>
        </form>
      </div>

      <!-- Right: Contact Info -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <!-- Email -->
        <div>
          <div class="flex items-center mb-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 text-pink-500 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            <h3 class="text-lg font-semibold text-gray-700">Email</h3>
          </div>
          <p class="text-gray-600 text-sm">Our friendly team is here to help.</p>
          <p class="text-pink-600 text-sm">gitaunlocked@gmail.com</p>
        </div>

        <!-- Live Chat -->
        <div>
          <div class="flex items-center mb-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 text-pink-500 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
              />
            </svg>
            <h3 class="text-lg font-semibold text-gray-700">Live chat</h3>
          </div>
          <p class="text-gray-600 text-sm">You can chat in WhatsApp at</p>
          <p class="text-pink-600 text-sm">+91 81256 30802</p>
        </div>

        <!-- Office -->
        <div>
          <div class="flex items-center mb-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 text-pink-500 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0l-2-2m2 2l7-7 7 7"
              />
            </svg>
            <h3 class="text-lg font-semibold text-gray-700">Office</h3>
          </div>
          <p class="text-gray-600 text-sm">Come say hello at our HQ.</p>
          <p class="text-gray-700 text-sm">Doddanekundi, Bengaluru</p>
        </div>

        <!-- Phone -->
        <div>
          <div class="flex items-center mb-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 text-pink-500 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1c-1.666 0-3.168-.98-4.54-2.6A11.062 11.062 0 015.46 6.6A11.042 11.042 0 003 9.21v-1a2 2 0 012-2z"
              />
            </svg>
            <h3 class="text-lg font-semibold text-gray-700">Phone</h3>
          </div>
          <p class="text-gray-600 text-sm">Mon-Fri from 10am to 5pm.</p>
          <p class="text-pink-600 text-sm">+91 81256 30802</p>
        </div>
      </div>
    </div>
  </section>

</template>

<script setup>
const leftBg = "/background_left.png"
import LandingPhotoInHomePage2 from "./LandingcomponentInHomePage2.vue";
import WhyGitaInHomePage from "./WhysectionInHomePage.vue";
import GreatPersonalitiesSayAboutGita from "./PersonsSayAboutGita.vue";
import CoursesInHomePage from "./CoursesInHomePage.vue";
import NavBarFooterInHomePage from "./NavBarFooterInHomePage.vue";
import FindSolutionsCards from "./FindSolutionsCards.vue";
import ConnectWithUsComponent from "./ConnectWithUsComponent.vue";
// No longer need to emit events - using direct navigation

import NewCard from "./NewCard.vue";

const cards = ref([
  { title: 'Overthinking', description: 'The Hidden Enemy That Destorys Peace.' , image:"/2.svg"},
  { title: 'Anger', description: 'A Fire -- When uncontrolled, it burns who holds it.', image:"/1.svg" },
  { title: 'Loneliness', description: 'When Hearts Drifts furthers Than Galaxies', image:"/3.svg" },
  { title: 'Laziness', description: `It's Not You — It's the Mode You're In.` , image:"/2.svg"},
  { title: 'Greed', description: 'The Hidden Enemy That Destroys Peace.', image:"/1.svg" },
  { title: 'Depression', description: 'The Darkness Within.', image:"/3.svg" },
  { title: 'Stress', description: 'Finding the Eye of the Storm.' , image:"/2.svg"},
  { title: 'Sleep', description: 'Restful Pause or Regressive Escape?', image:"/1.svg" },
  { title: 'Addiction', description: 'A Battle for Our Consciousness.', image:"/3.svg" },
  { title: 'Relationships', description: 'A Guide to Love, Respect, and Stability.' , image:"/2.svg"}
])

const currentIndex = ref(0)
const direction = ref('right')

// Show different number of cards based on screen size
const visibleCards = computed(() => {
  const visible = []
  // Mobile: 1 card, Tablet: 2 cards, Desktop: 3 cards
  const cardCount = typeof window !== 'undefined' ? 
    (window.innerWidth < 640 ? 1 : window.innerWidth < 1024 ? 2 : 3) : 3
  
  for (let i = 0; i < cardCount; i++) {
    visible.push(cards.value[(currentIndex.value + i) % cards.value.length])
  }
  return visible
})

const nextCard = () => {
  direction.value = 'right'
  currentIndex.value = (currentIndex.value + 1) % cards.value.length
}

const prevCard = () => {
  direction.value = 'left'
  currentIndex.value =
    (currentIndex.value - 1 + cards.value.length) % cards.value.length
}
import db from "../src/firebase/init";
import { collection, addDoc } from "firebase/firestore";
import { reactive } from "vue";

const form = reactive({
  name: "",
  whatsapp: "",
  query: "",
});

async function submitForm() {
  try {
    await addDoc(collection(db, "connectRequests"), { ...form });
    alert("✅ Your request has been submitted!");
    form.name = "";
    form.whatsapp = "";
    form.query = "";
  } catch (err) {
    console.error("Firestore error:", err);
    alert("❌ Failed to submit");
  }
}
</script>
