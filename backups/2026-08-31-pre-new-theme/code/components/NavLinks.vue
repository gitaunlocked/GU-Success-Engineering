<template>
  <nav class="fixed flex justify-between items-center w-full top-0 left-0 bg-white z-50 px-4 py-2 shadow-md">
    <!-- Logo -->
    <NuxtLink to="/">
      <img src="/public/logo2.png" alt="Logo" class="w-28 sm:w-36 h-12 sm:h-14 mx-4 sm:mx-8" />
    </NuxtLink>

    <!-- Desktop Menu -->
    <ul class="hidden md:flex space-x-10 lg:space-x-16 text-lg font-medium items-center">
      <li>
        <NuxtLink to="/" class="text-gray-700 hover:text-blue-500 transition">HOME</NuxtLink>
      </li>
      <li>
        <NuxtLink to="/contact" class="text-gray-700 hover:text-blue-500 transition">CONNECT WITH US</NuxtLink>
      </li>
      <li>
        <NuxtLink to="/about" class="text-gray-700 hover:text-blue-500 transition">ABOUT US</NuxtLink>
      </li>
      <li v-if="currentUser" class="border-l-2 border-gray-300 pl-10 flex items-center gap-4">
        <NuxtLink v-if="isAdmin" to="/admin" class="text-orange-600 hover:text-orange-700 transition font-semibold">Admin Panel</NuxtLink>
        <button @click="handleLogout" class="text-red-600 hover:text-red-700 transition font-semibold">Logout</button>
      </li>
    </ul>

    <!-- Mobile Hamburger -->
    <div class="md:hidden">
      <button @click="mobileOpen = !mobileOpen" class="focus:outline-none" type="button">
        <svg
          v-if="!mobileOpen"
          class="w-7 h-7 text-gray-700"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16" />
        </svg>
        <svg
          v-else
          class="w-7 h-7 text-gray-700"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    <!-- Mobile Menu Dropdown -->
    <div
      v-if="mobileOpen"
      class="absolute top-16 left-0 w-full bg-white shadow-md rounded-b-lg md:hidden"
    >
      <ul class="flex flex-col space-y-4 px-6 py-4 text-lg font-medium">
        <li><NuxtLink to="/" class="text-gray-700 hover:text-blue-500 transition" @click="closeMobileMenu">HOME</NuxtLink></li>
        <li><NuxtLink to="/contact" class="text-gray-700 hover:text-blue-500 transition" @click="closeMobileMenu">CONNECT WITH US</NuxtLink></li>
        <li><NuxtLink to="/about" class="text-gray-700 hover:text-blue-500 transition" @click="closeMobileMenu">ABOUT US</NuxtLink></li>
        <li v-if="currentUser" class="border-t-2 border-gray-300 pt-4 mt-2">
          <NuxtLink v-if="isAdmin" to="/admin" class="block text-orange-600 hover:text-orange-700 transition font-semibold" @click="closeMobileMenu">Admin Panel</NuxtLink>
          <button @click="handleLogout" class="block mt-2 text-red-600 hover:text-red-700 transition font-semibold">Logout</button>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue';
import { useAuth } from '~/composables/useAuth';

const { currentUser, isAdmin, logout } = useAuth();

const mobileOpen = ref(false);

const handleLogout = async () => {
  await logout();
  closeMobileMenu();
};

const closeMobileMenu = () => {
  mobileOpen.value = false;
};
</script>
