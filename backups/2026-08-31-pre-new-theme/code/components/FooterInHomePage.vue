<template>
  <!-- Main Container -->
  <div class="grid grid-cols-1 md:grid-cols-2 gap-6 justify-center items-center p-4 md:p-8 bg-gray-50">

    <!-- Logo -->
    <div class="flex justify-center">
      <img 
        src="/logo3.png" 
        alt="Logo" 
        class="w-48 sm:w-64 md:w-80 lg:w-[32rem] h-auto object-contain"
      />
    </div>

    <!-- Links Section -->
    <div class="bg-white py-6 px-4 md:px-8 flex flex-col md:flex-row justify-center md:justify-around items-center md:items-start text-center w-full rounded-lg shadow-md">

      <!-- Quick Links -->
      <div class="mb-8 md:mb-0 text-center md:text-left">
        <h2 class="text-xl md:text-2xl font-semibold text-pink-600 mb-4">QUICK LINKS</h2>
        <ul class="space-y-2">
          <li>
            <a href="#" class="text-gray-700 hover:text-pink-500">HOME</a>
          </li>
          <li>
            <a href="#" class="text-gray-700 hover:text-pink-500">COURSES</a>
          </li>
          <li>
            <a href="#" class="text-gray-700 hover:text-pink-500">ABOUT US</a>
          </li>
        </ul>
      </div>

      <!-- Social Media -->
      <div class="text-center md:text-left">
        <h2 class="text-xl md:text-2xl font-semibold text-pink-600 mb-4">SOCIAL MEDIA</h2>
        <ul class="space-y-4">

          <!-- YouTube -->
          <li class="flex items-center justify-center md:justify-start space-x-3">
            <img src="/youtube.png" alt="YouTube" class="w-6 h-6">
            <a href="https://www.youtube.com/@GitaUnlocked-w8n" target="_blank"
               class="text-gray-700 hover:text-pink-500 font-medium">
              YouTube - Gita Unlocked
            </a>
          </li>

          <!-- WhatsApp -->
          <li class="flex items-center justify-center md:justify-start space-x-3">
            <img src="/whatsapp.jpeg" alt="WhatsApp" class="w-6 h-6">
            <a href="https://whatsapp.com/channel/0029Vb9c7bB7IUYSUbEyJx3X" target="_blank"
               class="text-gray-700 hover:text-pink-500 font-medium">
              WhatsApp - Join Our Group
            </a>
          </li>

        </ul>
      </div>
    </div>
  </div>

  <!-- Gradient Bar -->
  <div class="w-full flex justify-center items-center shadow-md tracking-[0.2em] px-4 py-3 font-bold text-base md:text-xl lg:text-2xl bg-gradient-to-r from-[#FF7A00] via-[#D61C75] to-[#7A10FF] text-white">
    Copyright © 2025 Gita Unlocked - All Rights Reserved.
  </div>

  <!-- Spacer -->
  <div class="h-6 bg-white"></div>
</template>
